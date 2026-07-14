/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "@/lib/firebase-admin";

export async function getServices(): Promise<any[]> {
  const snapshot = await db.collection("services").orderBy("createdAt", "desc").get();
  return snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }));
}

export async function getServiceBySlug(slug: string): Promise<any> {
  const snapshot = await db.collection("services").where("slug", "==", slug).limit(1).get();
  if (snapshot.empty) return null;
  return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
}

export async function getProjects(): Promise<any[]> {
  const snapshot = await db.collection("projects").orderBy("createdAt", "desc").get();
  return snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }));
}

export async function getProjectBySlug(slug: string): Promise<any> {
  const snapshot = await db.collection("projects").where("slug", "==", slug).limit(1).get();
  if (snapshot.empty) return null;
  return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
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

// Additional Helpers for Admin 
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
