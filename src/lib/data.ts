/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "@/lib/firebase-admin";
import { ALL_PROJECTS } from "@/lib/projects-data";

export async function getServices(): Promise<any[]> {
  try {
    const snapshot = await db.collection("services").get();
    const docs = snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }));
    
    if (docs.length > 0) {
      return docs.sort((a: any, b: any) => {
        const orderA = typeof a.order === 'number' ? a.order : 9999;
        const orderB = typeof b.order === 'number' ? b.order : 9999;
        
        if (orderA !== orderB) return orderA - orderB;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
    }
  } catch (err) {
    console.error("Error fetching services from DB:", err);
  }

  return [];
}

export async function getServiceBySlug(slug: string): Promise<any> {
  try {
    const snapshot = await db.collection("services").where("slug", "==", slug).limit(1).get();
    if (!snapshot.empty) {
      return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
    }
  } catch (err) {
    console.error("Error fetching service by slug:", err);
  }
  return null;
}

export async function getProjects(): Promise<any[]> {
  try {
    const snapshot = await db.collection("projects").get();
    const dbDocs = snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }));

    const deletedIds = new Set(dbDocs.filter((d: any) => d.deleted).map((d: any) => d.id));
    const activeDbDocs = dbDocs.filter((d: any) => !d.deleted);

    const activeDbSlugs = new Set(activeDbDocs.map((d: any) => d.slug || d.id));
    const merged = [...activeDbDocs];

    for (const p of ALL_PROJECTS) {
      if (!deletedIds.has(p.id) && !activeDbSlugs.has(p.slug) && !activeDbSlugs.has(p.id)) {
        merged.push(p);
      }
    }

    return merged.sort((a, b) => {
      const orderA = typeof a.order === 'number' ? a.order : 9999;
      const orderB = typeof b.order === 'number' ? b.order : 9999;
      if (orderA !== orderB) return orderA - orderB;
      return (a.title || "").localeCompare(b.title || "");
    });
  } catch (err) {
    console.error("Error fetching projects from DB:", err);
  }

  return ALL_PROJECTS;
}

export async function getProjectBySlug(slug: string): Promise<any> {
  try {
    const snapshot = await db.collection("projects").where("slug", "==", slug).limit(1).get();
    if (!snapshot.empty) {
      return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
    }
  } catch (err) {
    console.error("Error fetching project by slug:", err);
  }

  return ALL_PROJECTS.find((p) => p.slug === slug) || null;
}

export async function getClients(): Promise<any[]> {
  const snapshot = await db.collection("clients").orderBy("createdAt", "desc").get();
  return snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }));
}

export async function getBlogs(): Promise<any[]> {
  const snapshot = await db.collection("blogs").orderBy("createdAt", "desc").get();
  return snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }));
}

export async function getBlogBySlug(slug: string): Promise<any> {
  const snapshot = await db.collection("blogs").where("slug", "==", slug).limit(1).get();
  if (snapshot.empty) return null;
  return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
}

export async function getBlogById(id: string): Promise<any> {
  const doc = await db.collection("blogs").doc(id).get();
  if (!doc.exists) return null;
  return { id: doc.id, ...doc.data() };
}

export async function getSEO(): Promise<any> {
  const doc = await db.collection("seo").doc("global").get();
  if (!doc.exists) return null;
  return { id: doc.id, ...doc.data() };
}

export async function getSettings(): Promise<any> {
  const doc = await db.collection("settings").doc("global").get();
  if (!doc.exists) return null;
  return { id: doc.id, ...doc.data() };
}

export async function getMessages(): Promise<any[]> {
  const snapshot = await db.collection("messages").orderBy("createdAt", "desc").get();
  return snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }));
}

export async function getLeads(): Promise<any[]> {
  const snapshot = await db.collection("leads").orderBy("createdAt", "desc").get();
  return snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }));
}

// Additional Helpers for Admin 
export async function getLeadById(id: string): Promise<any> {
  const doc = await db.collection("leads").doc(id).get();
  if (!doc.exists) return null;
  return { id: doc.id, ...doc.data() };
}

export async function getServiceById(id: string): Promise<any> {
  const doc = await db.collection("services").doc(id).get();
  if (!doc.exists) return null;
  return { id: doc.id, ...doc.data() };
}

export async function getProjectById(id: string): Promise<any> {
  const doc = await db.collection("projects").doc(id).get();
  if (!doc.exists) return null;
  return { id: doc.id, ...doc.data() };
}

export async function getClientById(id: string): Promise<any> {
  const doc = await db.collection("clients").doc(id).get();
  if (!doc.exists) return null;
  return { id: doc.id, ...doc.data() };
}

export async function getCount(collection: string) {
  const snapshot = await db.collection(collection).count().get();
  return snapshot.data().count;
}

export async function getCompanyProfile(): Promise<any> {
  const doc = await db.collection("company").doc("profile").get();
  if (!doc.exists) return null;
  return { id: doc.id, ...doc.data() };
}

export async function getTeamMembers(): Promise<any[]> {
  const snapshot = await db.collection("team").get();
  const docs = snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }));

  // Sort by order ascending, then by createdAt descending
  return docs.sort((a: any, b: any) => {
    const orderA = typeof a.order === 'number' ? a.order : 9999;
    const orderB = typeof b.order === 'number' ? b.order : 9999;
    
    if (orderA !== orderB) return orderA - orderB;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
}
