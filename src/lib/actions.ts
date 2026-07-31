"use server";

import { db } from "@/lib/firebase-admin";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
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
  const clientLogo = formData.get("clientLogo") as string | null;
  const tags = formData.get("tags") as string;
  const image = formData.get("image") as string | null;
  const rawSlug = formData.get("slug") as string;
  
  // Case Study & Service specific fields
  const serviceCategory = (formData.get("serviceCategory") as string) || "web-dev";
  const beforeStats = formData.get("beforeStats") as string | null;
  const afterStats = formData.get("afterStats") as string | null;
  const beforeImage = formData.get("beforeImage") as string | null;
  const afterImage = formData.get("afterImage") as string | null;
  const galleryImagesRaw = formData.get("galleryImages") as string | null;
  let galleryImages: string[] = [];
  try {
    if (galleryImagesRaw) {
      galleryImages = JSON.parse(galleryImagesRaw);
    }
  } catch {
    galleryImages = galleryImagesRaw ? galleryImagesRaw.split(",").map(s => s.trim()).filter(Boolean) : [];
  }

  const growthBadge = formData.get("growthBadge") as string | null;
  const challenge = formData.get("challenge") as string | null;
  const solution = formData.get("solution") as string | null;
  const liveUrl = formData.get("liveUrl") as string | null;
  const githubUrl = formData.get("githubUrl") as string | null;
  const videoUrl = formData.get("videoUrl") as string | null;
  const showOnHome = formData.get("showOnHome") === "true" || formData.get("showOnHome") === "on";

  const defaultTitleByService = serviceCategory === "graphic-design" ? "Brand & Logo Showcase" : serviceCategory === "videography" ? "Videography & Motion Showcase" : "New Portfolio Project";
  const defaultDescByService = serviceCategory === "graphic-design" ? "Brand logo and visual identity asset showcase." : serviceCategory === "videography" ? "Commercial videography and motion graphic showcase." : "Digital project overview.";

  const finalTitle = (title || "").trim() || defaultTitleByService;
  const finalDescription = (description || "").trim() || defaultDescByService;

  if (!finalTitle) {
    throw new Error("Project Title is required.");
  }

  const slug = (rawSlug || finalTitle).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  await db.collection("projects").add({
    title: finalTitle,
    slug,
    content: content || "",
    description: finalDescription,
    client: client || null,
    clientLogo: clientLogo || null,
    tags: tags || serviceCategory,
    serviceCategory,
    beforeStats: beforeStats || null,
    afterStats: afterStats || null,
    beforeImage: beforeImage || null,
    afterImage: afterImage || null,
    galleryImages: galleryImages || [],
    growthBadge: growthBadge || null,
    challenge: challenge || null,
    solution: solution || null,
    liveUrl: liveUrl || null,
    githubUrl: githubUrl || null,
    videoUrl: videoUrl || null,
    showOnHome,
    image: image || (galleryImages.length > 0 ? galleryImages[0] : "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2000"),
    createdAt: getNow(),
    updatedAt: getNow(),
  });

  revalidatePath("/portfolio");
  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

export async function deleteProject(id: string) {
  const ref = db.collection("projects").doc(id);
  await ref.set({
    deleted: true,
    updatedAt: getNow(),
  }, { merge: true });

  revalidatePath("/portfolio");
  revalidatePath("/admin/projects");
  revalidatePath("/");
}

export async function updateProject(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const content = formData.get("content") as string;
  const client = formData.get("client") as string | null;
  const clientLogo = formData.get("clientLogo") as string | null;
  const tags = formData.get("tags") as string;
  const image = formData.get("image") as string | null;
  const rawSlug = formData.get("slug") as string;

  // Case Study & Service specific fields
  const serviceCategory = (formData.get("serviceCategory") as string) || "web-dev";
  const beforeStats = formData.get("beforeStats") as string | null;
  const afterStats = formData.get("afterStats") as string | null;
  const beforeImage = formData.get("beforeImage") as string | null;
  const afterImage = formData.get("afterImage") as string | null;
  const galleryImagesRaw = formData.get("galleryImages") as string | null;
  let galleryImages: string[] = [];
  try {
    if (galleryImagesRaw) {
      galleryImages = JSON.parse(galleryImagesRaw);
    }
  } catch {
    galleryImages = galleryImagesRaw ? galleryImagesRaw.split(",").map(s => s.trim()).filter(Boolean) : [];
  }

  const growthBadge = formData.get("growthBadge") as string | null;
  const challenge = formData.get("challenge") as string | null;
  const solution = formData.get("solution") as string | null;
  const liveUrl = formData.get("liveUrl") as string | null;
  const githubUrl = formData.get("githubUrl") as string | null;
  const videoUrl = formData.get("videoUrl") as string | null;
  const showOnHome = formData.get("showOnHome") === "true" || formData.get("showOnHome") === "on";

  const defaultTitleByService = serviceCategory === "graphic-design" ? "Brand & Logo Showcase" : serviceCategory === "videography" ? "Videography & Motion Showcase" : "New Portfolio Project";
  const defaultDescByService = serviceCategory === "graphic-design" ? "Brand logo and visual identity asset showcase." : serviceCategory === "videography" ? "Commercial videography and motion graphic showcase." : "Digital project overview.";

  const finalTitle = (title || "").trim() || defaultTitleByService;
  const finalDescription = (description || "").trim() || defaultDescByService;

  if (!finalTitle) {
    throw new Error("Project Title is required.");
  }

  const slug = (rawSlug || finalTitle).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  await db.collection("projects").doc(id).set({
    title: finalTitle,
    slug,
    content: content || "",
    description: finalDescription,
    client: client || null,
    clientLogo: clientLogo || null,
    tags: tags || serviceCategory,
    serviceCategory,
    beforeStats: beforeStats || null,
    afterStats: afterStats || null,
    beforeImage: beforeImage || null,
    afterImage: afterImage || null,
    galleryImages: galleryImages || [],
    growthBadge: growthBadge || null,
    challenge: challenge || null,
    solution: solution || null,
    liveUrl: liveUrl || null,
    githubUrl: githubUrl || null,
    videoUrl: videoUrl || null,
    showOnHome,
    image: image || (galleryImages.length > 0 ? galleryImages[0] : "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2000"),
    updatedAt: getNow(),
  }, { merge: true });

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
  const authorRole = formData.get("authorRole") as string | null;
  const excerpt = formData.get("excerpt") as string | null;
  const coverImage = formData.get("coverImage") as string | null;
  const category = formData.get("category") as string | null;
  const rawTags = formData.get("tags") as string | null;
  const customSlug = formData.get("slug") as string | null;
  const metaTitle = formData.get("metaTitle") as string | null;
  const metaDescription = formData.get("metaDescription") as string | null;
  const keywords = formData.get("keywords") as string | null;
  const canonicalUrl = formData.get("canonicalUrl") as string | null;
  const published = formData.get("published") === "true" || formData.get("published") === "on";
  const featured = formData.get("featured") === "true" || formData.get("featured") === "on";

  if (!title || !content) {
    throw new Error("Title and content are required.");
  }

  // Calculate clean slug
  const baseSlug = (customSlug || title).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const suffix = Date.now().toString(36);
  const slug = customSlug ? baseSlug : `${baseSlug}-${suffix}`;

  // Parse tags
  const tags = rawTags ? rawTags.split(",").map(t => t.trim()).filter(Boolean) : [];

  // Calculate reading time based on word count
  const wordCount = content.replace(/<[^>]*>/g, "").split(/\s+/).filter(Boolean).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  await db.collection("blogs").add({
    title,
    slug,
    content,
    excerpt: excerpt || content.replace(/<[^>]*>/g, "").slice(0, 160),
    coverImage: coverImage || null,
    author: author || "Aeronox Team",
    authorRole: authorRole || "Editorial Team",
    category: category || "General",
    tags,
    metaTitle: metaTitle || title,
    metaDescription: metaDescription || excerpt || content.replace(/<[^>]*>/g, "").slice(0, 160),
    keywords: keywords || "",
    canonicalUrl: canonicalUrl || null,
    published: published ?? true,
    featured: featured ?? false,
    readingTime,
    createdAt: getNow(),
    updatedAt: getNow(),
  });

  revalidatePath("/blog");
  revalidatePath("/admin/blogs");
  redirect("/admin/blogs");
}

export async function updateBlog(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const author = formData.get("author") as string;
  const authorRole = formData.get("authorRole") as string | null;
  const excerpt = formData.get("excerpt") as string | null;
  const coverImage = formData.get("coverImage") as string | null;
  const category = formData.get("category") as string | null;
  const rawTags = formData.get("tags") as string | null;
  const customSlug = formData.get("slug") as string | null;
  const metaTitle = formData.get("metaTitle") as string | null;
  const metaDescription = formData.get("metaDescription") as string | null;
  const keywords = formData.get("keywords") as string | null;
  const canonicalUrl = formData.get("canonicalUrl") as string | null;
  const published = formData.get("published") === "true" || formData.get("published") === "on";
  const featured = formData.get("featured") === "true" || formData.get("featured") === "on";

  if (!title || !content) {
    throw new Error("Title and content are required.");
  }

  const slug = (customSlug || title).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const tags = rawTags ? rawTags.split(",").map(t => t.trim()).filter(Boolean) : [];

  const wordCount = content.replace(/<[^>]*>/g, "").split(/\s+/).filter(Boolean).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  await db.collection("blogs").doc(id).update({
    title,
    slug,
    content,
    excerpt: excerpt || content.replace(/<[^>]*>/g, "").slice(0, 160),
    coverImage: coverImage || null,
    author: author || "Aeronox Team",
    authorRole: authorRole || "Editorial Team",
    category: category || "General",
    tags,
    metaTitle: metaTitle || title,
    metaDescription: metaDescription || excerpt || content.replace(/<[^>]*>/g, "").slice(0, 160),
    keywords: keywords || "",
    canonicalUrl: canonicalUrl || null,
    published,
    featured,
    readingTime,
    updatedAt: getNow(),
  });

  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/admin/blogs");
  redirect("/admin/blogs");
}

export async function toggleBlogPublishStatus(id: string, published: boolean) {
  await db.collection("blogs").doc(id).update({
    published,
    updatedAt: getNow(),
  });
  revalidatePath("/blog");
  revalidatePath("/admin/blogs");
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
  const ceoImage = formData.get("ceoImage") as string;

  const profileRef = db.collection("company").doc("profile");
  await profileRef.set({
    ceoMessage: ceoMessage || "",
    ceoImage: ceoImage || "",
    updatedAt: getNow(),
  }, { merge: true });

  revalidatePath("/about");
  revalidatePath("/admin/company");
  redirect("/admin/company");
}

export async function createTeamMember(formData: FormData) {
  const name = formData.get("name") as string;
  const role = formData.get("role") as string;
  const image = formData.get("image") as string | null;
  const bio = formData.get("bio") as string | null;
  const linkedin = formData.get("linkedin") as string | null;
  const email = formData.get("email") as string | null;
  const orderRaw = formData.get("order") as string | null;
  const order = orderRaw ? parseInt(orderRaw, 10) : 9999;

  if (!name || !role) {
    throw new Error("Name and role are required.");
  }

  const docRef = await db.collection("team").add({
    name,
    role,
    image: image || null,
    bio: bio || null,
    linkedin: linkedin || null,
    email: email || null,
    order,
    createdAt: getNow(),
    updatedAt: getNow(),
  });

  revalidatePath("/about");
  revalidatePath("/admin/company");

  return { id: docRef.id };
}

export async function updateTeamMember(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const role = formData.get("role") as string;
  const image = formData.get("image") as string | null;
  const bio = formData.get("bio") as string | null;
  const linkedin = formData.get("linkedin") as string | null;
  const email = formData.get("email") as string | null;
  const orderRaw = formData.get("order") as string | null;
  const order = orderRaw ? parseInt(orderRaw, 10) : 9999;

  if (!name || !role) {
    throw new Error("Name and role are required.");
  }

  await db.collection("team").doc(id).update({
    name,
    role,
    image: image || null,
    bio: bio || null,
    linkedin: linkedin || null,
    email: email || null,
    order,
    updatedAt: getNow(),
  });

  revalidatePath("/about");
  revalidatePath("/admin/company");
}

export async function deleteTeamMember(id: string) {
  await db.collection("team").doc(id).delete();
  revalidatePath("/about");
  revalidatePath("/admin/company");
}

export async function updateTeamMemberOrder(orderedIds: string[]) {
  const batch = db.batch();
  orderedIds.forEach((id, index) => {
    const ref = db.collection("team").doc(id);
    batch.update(ref, { order: index, updatedAt: getNow() });
  });
  await batch.commit();
  revalidatePath("/about");
  revalidatePath("/admin/company");
}

// ────────────────────────────────────────────────────────────────────────────
// Users
// ────────────────────────────────────────────────────────────────────────────

export async function getUsers() {
  const snapshot = await db.collection("users").get();
  return snapshot.docs.map((doc: any) => {
    const data = doc.data();
    return {
      id: doc.id,
      email: data.email,
      role: data.role || "admin",
    };
  });
}

export async function createUser(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const role = (formData.get("role") as string) || "admin";

  if (!email || !password) {
    throw new Error("Email and password are required.");
  }

  // Check if user already exists
  const existingUser = await db.collection("users").where("email", "==", email).limit(1).get();
  if (!existingUser.empty) {
    throw new Error("User with this email already exists.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.collection("users").add({
    email,
    password: hashedPassword,
    role,
    createdAt: getNow(),
    updatedAt: getNow(),
  });

  revalidatePath("/admin/users");
}

export async function updateUser(formData: FormData) {
  const id = formData.get("id") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const role = formData.get("role") as string;

  if (!id || !email || !role) {
    throw new Error("Missing required fields.");
  }

  const userRef = db.collection("users").doc(id);
  const updateData: any = {
    email,
    role,
    updatedAt: getNow(),
  };

  // Only update password if provided
  if (password) {
    updateData.password = await bcrypt.hash(password, 10);
  }

  await userRef.update(updateData);
  revalidatePath("/admin/users");
}

export async function deleteUser(id: string) {
  if (!id) throw new Error("ID is required.");
  await db.collection("users").doc(id).delete();
  revalidatePath("/admin/users");
}

export async function upsertRolePermissions(formData: FormData) {
  const permissions = formData.getAll("permissions") as string[];
  
  const roleRef = db.collection("settings").doc("roles");
  await roleRef.set({
    editorPermissions: permissions,
    updatedAt: getNow(),
  }, { merge: true });

  revalidatePath("/admin");
  revalidatePath("/admin/settings");
}

export async function resetAnalyticsData() {
  const snapshot = await db.collection("analytics_events").get();
  const batch = db.batch();
  snapshot.docs.forEach((doc: any) => {
    batch.delete(doc.ref);
  });
  await batch.commit();
  
  revalidatePath("/admin/analytics");
  revalidatePath("/admin/settings");
}


