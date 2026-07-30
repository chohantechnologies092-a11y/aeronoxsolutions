import { db } from "@/lib/firebase-admin";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET() {
  try {
    const snapshot = await db.collection("projects").get();
    let deletedCount = 0;
    
    for (const doc of snapshot.docs) {
      const data = doc.data();
      if (doc.id === "ickletots" || data.slug === "ickletots" || data.id === "ickletots" || (data.title && data.title.toLowerCase().includes("ickletots"))) {
        await db.collection("projects").doc(doc.id).delete();
        deletedCount++;
      }
    }
    
    revalidatePath("/portfolio");
    revalidatePath("/admin/projects");
    revalidatePath("/");
    
    return NextResponse.json({ success: true, message: `Deleted ${deletedCount} ickletots documents from Firebase.` });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
