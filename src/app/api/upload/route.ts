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
    
    await fileRef.save(buffer, {
      metadata: { contentType: file.type },
    });
    
    await fileRef.makePublic();
    
    const publicUrl = fileRef.publicUrl();

    return NextResponse.json({ url: publicUrl });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
}
