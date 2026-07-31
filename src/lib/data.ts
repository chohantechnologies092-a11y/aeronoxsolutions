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

    const deletedIds = new Set(dbDocs.filter((d: any) => d.deleted).map((d: any) => String(d.id).toLowerCase()));
    const activeDbDocs = dbDocs.filter((d: any) => !d.deleted);

    const merged = [...activeDbDocs];

    // Build unique tracking using lowercase values
    const seenIds = new Set<string>();
    const seenSlugs = new Set<string>();
    const seenTitles = new Set<string>();

    activeDbDocs.forEach((d: any) => {
      if (d.id) seenIds.add(String(d.id).toLowerCase());
      if (d.slug) seenSlugs.add(String(d.slug).toLowerCase());
      if (d.title) seenTitles.add(String(d.title).toLowerCase());
    });

    for (const p of ALL_PROJECTS) {
      const pId = String(p.id).toLowerCase();
      const pSlug = String(p.slug).toLowerCase();
      const pTitle = String(p.title).toLowerCase();

      if (
        !deletedIds.has(pId) &&
        !seenIds.has(pId) &&
        !seenSlugs.has(pSlug) &&
        !seenTitles.has(pTitle)
      ) {
        merged.push(p);
        // Track the newly added hardcoded project to prevent any duplicate overlaps
        seenIds.add(pId);
        seenSlugs.add(pSlug);
        seenTitles.add(pTitle);
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

export async function getPageSEO(pageSlug: string): Promise<any> {
  try {
    const doc = await db.collection("seo").doc(pageSlug).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() };
  } catch (err) {
    console.error(`Error fetching SEO for page ${pageSlug}:`, err);
    return null;
  }
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
  if (!doc.exists) {
    return ALL_PROJECTS.find((p) => p.id === id) || null;
  }
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

export async function getRolePermissions(): Promise<string[]> {
  try {
    const doc = await db.collection("settings").doc("roles").get();
    if (doc.exists) {
      const data = doc.data();
      return data?.editorPermissions || [];
    }
  } catch (err) {
    console.error("Error fetching role permissions:", err);
  }
  // Default permissions for editor if not set
  return ["/admin", "/admin/projects", "/admin/services", "/admin/blogs", "/admin/seo", "/admin/leads"];
}

export async function getAnalyticsEvents(): Promise<any[]> {
  try {
    const snapshot = await db.collection("analytics_events").orderBy("timestamp", "desc").get();
    return snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }));
  } catch (err) {
    console.error("Error fetching analytics events:", err);
    return [];
  }
}


