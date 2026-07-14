import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { storage } from "@/lib/firebase-admin";

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

    // Sanitize filename to prevent directory traversal or weird characters
    const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
    const uniqueFilename = `${Date.now()}-${safeName}`;

    // Upload to Firebase Storage instead of local filesystem
    // Netlify/Vercel serverless functions have a read-only filesystem
    const bucket = storage.bucket();
    const fileRef = bucket.file(`uploads/${uniqueFilename}`);
    
    // Generate a unique token for Firebase Storage download URL
    const token = crypto.randomUUID();

    await fileRef.save(buffer, {
      metadata: { 
        contentType: file.type,
        metadata: {
          firebaseStorageDownloadTokens: token
        }
      },
    });
    
    // Construct the standard Firebase Storage public URL
    const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(fileRef.name)}?alt=media&token=${token}`;

    return NextResponse.json({ url: publicUrl });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: error.message || "Failed to upload file" }, { status: 500 });
  }
}
