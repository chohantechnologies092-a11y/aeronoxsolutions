import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  try {
    // Only allow authenticated users to upload files
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const mimeType = file.type || "image/jpeg";
    const base64Fallback = `data:${mimeType};base64,${buffer.toString("base64")}`;

    const hasCloudinaryKeys = 
      process.env.CLOUDINARY_CLOUD_NAME && 
      process.env.CLOUDINARY_API_KEY && 
      process.env.CLOUDINARY_API_SECRET;

    if (!hasCloudinaryKeys) {
      return NextResponse.json({ url: base64Fallback });
    }

    // Try uploading to Cloudinary with a 6-second timeout race
    const uploadPromise = new Promise<string>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { 
          folder: "aeronox_uploads",
          resource_type: "auto"
        },
        (error: any, result: any) => {
          if (error) reject(error);
          else resolve(result?.secure_url as string);
        }
      );
      uploadStream.end(buffer);
    });

    const timeoutPromise = new Promise<string>((_, reject) => {
      setTimeout(() => reject(new Error("Cloudinary timeout")), 30000);
    });

    try {
      const publicUrl = await Promise.race([uploadPromise, timeoutPromise]);
      return NextResponse.json({ url: publicUrl });
    } catch (uploadError) {
      console.warn("Cloudinary upload failed or timed out. Falling back to base64 Data URI:", uploadError);
      return NextResponse.json({ url: base64Fallback });
    }
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: error.message || "Failed to upload file" }, { status: 500 });
  }
}
