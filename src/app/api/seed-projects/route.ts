import { db } from "@/lib/firebase-admin";
import { ALL_PROJECTS } from "@/lib/projects-data";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const batch = db.batch();
    const projectsRef = db.collection("projects");

    // Optional: get existing projects count or clear
    const snapshot = await projectsRef.get();
    
    let addedCount = 0;
    for (const project of ALL_PROJECTS) {
      const docRef = projectsRef.doc(project.id);
      batch.set(docRef, {
        ...project,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }, { merge: true });
      addedCount++;
    }

    await batch.commit();

    return NextResponse.json({
      success: true,
      message: `Successfully seeded ${addedCount} portfolio projects into Firestore database!`,
      totalProjectsInDB: snapshot.size + addedCount
    });
  } catch (error: any) {
    console.error("Error seeding projects:", error);
    return NextResponse.json({
      success: false,
      error: error?.message || "Failed to seed projects to database"
    }, { status: 500 });
  }
}
