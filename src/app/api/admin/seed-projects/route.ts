import { NextResponse } from "next/server";
import { db } from "@/lib/firebase-admin";
import { ALL_PROJECTS } from "@/lib/projects-data";

export async function GET() {
  try {
    const projectsRef = db.collection("projects");
    let addedCount = 0;

    // Fetch existing projects to check for duplicates by slug or title
    const snapshot = await projectsRef.get();
    const existingDocs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() as any }));
    
    const existingIds = new Set(existingDocs.map(d => String(d.id).toLowerCase()));
    const existingSlugs = new Set(existingDocs.map(d => String(d.slug).toLowerCase()));
    const existingTitles = new Set(existingDocs.map(d => String(d.title).toLowerCase()));

    for (const project of ALL_PROJECTS) {
      const pId = String(project.id).toLowerCase();
      const pSlug = String(project.slug).toLowerCase();
      const pTitle = String(project.title).toLowerCase();

      // Check if project already exists (by ID, slug, or title)
      if (!existingIds.has(pId) && !existingSlugs.has(pSlug) && !existingTitles.has(pTitle)) {
        // Prepare data
        const { id, ...data } = project;
        await projectsRef.doc(id).set({
          ...data,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          isFromSeed: true
        });
        
        // Add to sets to prevent duplicates within the seed array itself
        existingIds.add(pId);
        existingSlugs.add(pSlug);
        existingTitles.add(pTitle);
        
        addedCount++;
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: `Successfully seeded ${addedCount} projects into Firestore.` 
    });
  } catch (error: any) {
    console.error("Error seeding projects:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
