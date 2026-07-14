"use server";

import { db } from "@/lib/firebase-admin";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Helper for dates
const getNow = () => new Date().toISOString();

// ────────────────────────────────────────────────────────────────────────────
// Projects
// ────────────────────────────────────────────────────────────────────────────

export async function createProject(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const content = formData.get("content") as string;
  const client = formData.get("client") as string | null;
  const tags = formData.get("tags") as string;
  const image = formData.get("image") as string | null;
  const rawSlug = formData.get("slug") as string;

  if (!title || !description || !tags) {
    throw new Error("Title, description and tags are required.");
  }

  const slug = (rawSlug || title).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  await db.collection("projects").add({
    title,
    slug,
    content: content || "",
    description,
    client: client || null,
    tags,
    image: image || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2000",
    createdAt: getNow(),
    updatedAt: getNow(),
  });

  revalidatePath("/portfolio");
  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

export async function deleteProject(id: string) {
  await db.collection("projects").doc(id).delete();
  revalidatePath("/portfolio");
  revalidatePath("/admin/projects");
}

export async function updateProject(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const content = formData.get("content") as string;
  const client = formData.get("client") as string | null;
  const tags = formData.get("tags") as string;
  const image = formData.get("image") as string | null;
  const rawSlug = formData.get("slug") as string;

  if (!title || !description || !tags) {
    throw new Error("Title, description and tags are required.");
  }

  const slug = (rawSlug || title).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  await db.collection("projects").doc(id).update({
    title,
    slug,
    content: content || "",
    description,
    client: client || null,
    tags,
    image: image || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2000",
    updatedAt: getNow(),
  });

  revalidatePath("/portfolio");
  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

// ────────────────────────────────────────────────────────────────────────────
// Services
// ────────────────────────────────────────────────────────────────────────────

export async function createService(formData: FormData) {
  const title = formData.get("title") as string;
  const shortDescription = formData.get("shortDescription") as string;
  const content = formData.get("content") as string;
  const icon = formData.get("icon") as string;
  const color = formData.get("color") as string;
  const bentoClass = formData.get("bentoClass") as string;
  const rawSlug = formData.get("slug") as string;
  const image = formData.get("image") as string | null;

  if (!title || !shortDescription) {
    throw new Error("Title and short description are required.");
  }

  const slug = (rawSlug || title).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  await db.collection("services").add({
    title,
    slug,
    shortDescription,
    content: content || "",
    image: image || null,
    icon: icon || "search",
    color: color || "#ffbe00",
    bentoClass: bentoClass || "md:col-span-1",
    createdAt: getNow(),
    updatedAt: getNow(),
  });

  revalidatePath("/services");
  revalidatePath("/admin/services");
  revalidatePath("/");
  redirect("/admin/services");
}

export async function updateService(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const shortDescription = formData.get("shortDescription") as string;
  const content = formData.get("content") as string;
  const icon = formData.get("icon") as string;
  const color = formData.get("color") as string;
  const bentoClass = formData.get("bentoClass") as string;
  const rawSlug = formData.get("slug") as string;
  const image = formData.get("image") as string | null;

  if (!title || !shortDescription) {
    throw new Error("Title and short description are required.");
  }

  const slug = (rawSlug || title).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  await db.collection("services").doc(id).update({
    title,
    slug,
    shortDescription,
    content: content || "",
    image: image || null,
    icon: icon || "search",
    color: color || "#ffbe00",
    bentoClass: bentoClass || "md:col-span-1",
    updatedAt: getNow(),
  });

  revalidatePath("/services");
  revalidatePath("/admin/services");
  revalidatePath("/");
  redirect("/admin/services");
}

export async function deleteService(id: string) {
  await db.collection("services").doc(id).delete();
  revalidatePath("/services");
  revalidatePath("/admin/services");
  revalidatePath("/");
}

// ────────────────────────────────────────────────────────────────────────────
// Blogs
// ────────────────────────────────────────────────────────────────────────────

export async function createBlog(formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const author = formData.get("author") as string;
  const excerpt = formData.get("excerpt") as string | null;

  if (!title || !content) {
    throw new Error("Title and content are required.");
  }

  const baseSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const suffix = Date.now().toString(36);
  const slug = `${baseSlug}-${suffix}`;

  await db.collection("blogs").add({
    title,
    slug,
    content,
    excerpt: excerpt || content.slice(0, 160),
    author: author || "Admin",
    published: true,
    createdAt: getNow(),
    updatedAt: getNow(),
  });

  revalidatePath("/blog");
  revalidatePath("/admin/blogs");
  redirect("/admin/blogs");
}

export async function deleteBlog(id: string) {
  await db.collection("blogs").doc(id).delete();
  revalidatePath("/blog");
  revalidatePath("/admin/blogs");
}

// ────────────────────────────────────────────────────────────────────────────
// SEO
// ────────────────────────────────────────────────────────────────────────────

export async function upsertSEO(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const keywords = formData.get("keywords") as string;

  const seoRef = db.collection("seo").doc("global");
  await seoRef.set({
    title,
    description,
    keywords,
    updatedAt: getNow(),
  }, { merge: true });

  revalidatePath("/");
  revalidatePath("/admin/seo");
  redirect("/admin/seo");
}

// ────────────────────────────────────────────────────────────────────────────
// Clients
// ────────────────────────────────────────────────────────────────────────────

export async function createClient(formData: FormData) {
  const name = formData.get("name") as string;
  const logo = formData.get("logo") as string;
  const link = formData.get("link") as string | null;

  if (!name || !logo) {
    throw new Error("Name and logo are required.");
  }

  await db.collection("clients").add({
    name,
    logo,
    link: link || null,
    createdAt: getNow(),
    updatedAt: getNow(),
  });

  revalidatePath("/admin/clients");
  revalidatePath("/");
  return { success: true };
}

export async function updateClient(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const logo = formData.get("logo") as string;
  const link = formData.get("link") as string | null;

  if (!name || !logo) {
    throw new Error("Name and logo are required.");
  }

  await db.collection("clients").doc(id).update({
    name,
    logo,
    link: link || null,
    updatedAt: getNow(),
  });

  revalidatePath("/admin/clients");
  revalidatePath("/");
  return { success: true };
}

export async function deleteClient(id: string) {
  await db.collection("clients").doc(id).delete();
  revalidatePath("/admin/clients");
  revalidatePath("/");
}

// ────────────────────────────────────────────────────────────────────────────
// Settings & SEO
// ────────────────────────────────────────────────────────────────────────────

export async function upsertSettings(formData: FormData) {
  const linkedin = formData.get("linkedin") as string;
  const twitter = formData.get("twitter") as string;
  const facebook = formData.get("facebook") as string;
  const instagram = formData.get("instagram") as string;

  await db.collection("settings").doc("global").set({
    socials: {
      linkedin: linkedin || "",
      twitter: twitter || "",
      facebook: facebook || "",
      instagram: instagram || ""
    },
    updatedAt: getNow()
  }, { merge: true });

  revalidatePath("/", "layout");
}

export async function fetchSettingsAction() {
  const doc = await db.collection("settings").doc("global").get();
  if (!doc.exists) return null;
  return doc.data();
}

