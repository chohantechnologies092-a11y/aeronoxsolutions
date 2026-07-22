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

export async function updateProjectOrder(orderedIds: string[]) {
  const batch = db.batch();
  orderedIds.forEach((id, index) => {
    const ref = db.collection("projects").doc(id);
    batch.update(ref, { order: index, updatedAt: getNow() });
  });
  await batch.commit();
  revalidatePath("/portfolio");
  revalidatePath("/admin/projects");
  revalidatePath("/");
}

export async function toggleProjectHomeStatus(id: string, showOnHome: boolean) {
  await db.collection("projects").doc(id).update({
    showOnHome,
    updatedAt: getNow(),
  });
  revalidatePath("/portfolio");
  revalidatePath("/admin/projects");
  revalidatePath("/");
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
  const capabilities = formData.get("capabilities") as string | null;
  const showOnHome = formData.get("showOnHome") === "on";

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
    capabilities: capabilities || "",
    showOnHome,
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
  const capabilities = formData.get("capabilities") as string | null;
  const showOnHome = formData.get("showOnHome") === "on";

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
    capabilities: capabilities || "",
    showOnHome,
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

export async function updateServiceOrder(orderedIds: string[]) {
  const batch = db.batch();
  orderedIds.forEach((id, index) => {
    const ref = db.collection("services").doc(id);
    batch.update(ref, { order: index, updatedAt: getNow() });
  });
  await batch.commit();
  revalidatePath("/services");
  revalidatePath("/admin/services");
  revalidatePath("/");
}

export async function toggleServiceHomeStatus(id: string, showOnHome: boolean) {
  await db.collection("services").doc(id).update({
    showOnHome,
    updatedAt: getNow(),
  });
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
// Settings & SEO & Analytics
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

export async function resetAnalyticsData(formData?: FormData) {
  // In a real application, you would delete tracking data or reset a counter in the database.
  // For now, since we're using mock analytics data, we can just pretend it succeeded or log it.
  console.log("Analytics data reset initiated by admin.");
  // Add a small delay to simulate backend work
  await new Promise(resolve => setTimeout(resolve, 500));
  
  revalidatePath("/admin/analytics");
  revalidatePath("/admin");
}

// ────────────────────────────────────────────────────────────────────────────
// Leads
// ────────────────────────────────────────────────────────────────────────────

export async function submitLead(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const message = formData.get("message") as string;
  const websiteUrl = formData.get("websiteUrl") as string;

  if (!name || !email || !phone) {
    throw new Error("Name, email, and phone are required.");
  }

  await db.collection("leads").add({
    name,
    email,
    phone,
    message: message || "",
    websiteUrl: websiteUrl || "",
    status: "new",
    createdAt: getNow(),
    updatedAt: getNow(),
  });

  return { success: true };
}

export async function deleteLead(id: string) {
  await db.collection("leads").doc(id).delete();
  revalidatePath("/admin/leads");
}

export async function updateLeadStatus(id: string, formData: FormData) {
  const status = formData.get("status") as string;

  if (!status) {
    throw new Error("Status is required.");
  }

  await db.collection("leads").doc(id).update({
    status,
    updatedAt: getNow(),
  });

  revalidatePath("/admin/leads");
  redirect("/admin/leads");
}

// ────────────────────────────────────────────────────────────────────────────
// Company Profile & Team
// ────────────────────────────────────────────────────────────────────────────

export async function upsertCompanyProfile(formData: FormData) {
  const ceoMessage = formData.get("ceoMessage") as string;

  const profileRef = db.collection("company").doc("profile");
  await profileRef.set({
    ceoMessage: ceoMessage || "",
    updatedAt: getNow(),
  }, { merge: true });

  revalidatePath("/about/company");
  revalidatePath("/admin/company");
  redirect("/admin/company");
}

export async function createTeamMember(formData: FormData) {
  const name = formData.get("name") as string;
  const role = formData.get("role") as string;
  const image = formData.get("image") as string | null;

  if (!name || !role) {
    throw new Error("Name and role are required.");
  }

  await db.collection("team").add({
    name,
    role,
    image: image || null,
    createdAt: getNow(),
    updatedAt: getNow(),
  });

  revalidatePath("/about/company");
  revalidatePath("/admin/company");
  redirect("/admin/company");
}

export async function updateTeamMember(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const role = formData.get("role") as string;
  const image = formData.get("image") as string | null;

  if (!name || !role) {
    throw new Error("Name and role are required.");
  }

  await db.collection("team").doc(id).update({
    name,
    role,
    image: image || null,
    updatedAt: getNow(),
  });

  revalidatePath("/about/company");
  revalidatePath("/admin/company");
  redirect("/admin/company");
}

export async function deleteTeamMember(id: string) {
  await db.collection("team").doc(id).delete();
  revalidatePath("/about/company");
  revalidatePath("/admin/company");
}

export async function updateTeamMemberOrder(orderedIds: string[]) {
  const batch = db.batch();
  orderedIds.forEach((id, index) => {
    const ref = db.collection("team").doc(id);
    batch.update(ref, { order: index, updatedAt: getNow() });
  });
  await batch.commit();
  revalidatePath("/about/company");
  revalidatePath("/admin/company");
}

