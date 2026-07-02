"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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

  const slug = rawSlug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  await prisma.project.create({
    data: {
      title,
      slug,
      content: content || "",
      description,
      client: client || null,
      tags,
      image:
        image ||
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2000",
    },
  });

  revalidatePath("/portfolio");
  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

export async function deleteProject(id: string) {
  await prisma.project.delete({ where: { id } });
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

  const slug = rawSlug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  await prisma.project.update({
    where: { id },
    data: {
      title,
      slug,
      content: content || "",
      description,
      client: client || null,
      tags,
      image:
        image ||
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2000",
    },
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

  const slug = rawSlug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  await prisma.service.create({
    data: {
      title,
      slug,
      shortDescription,
      content: content || "",
      image: image || null,
      icon: icon || "search",
      color: color || "#ffbe00",
      bentoClass: bentoClass || "md:col-span-1",
    },
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

  const slug = rawSlug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  await prisma.service.update({
    where: { id },
    data: {
      title,
      slug,
      shortDescription,
      content: content || "",
      image: image || null,
      icon: icon || "search",
      color: color || "#ffbe00",
      bentoClass: bentoClass || "md:col-span-1",
    },
  });

  revalidatePath("/services");
  revalidatePath("/admin/services");
  revalidatePath("/");
  redirect("/admin/services");
}

export async function deleteService(id: string) {
  await prisma.service.delete({ where: { id } });
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

  // Build a URL-safe slug and guarantee uniqueness
  const baseSlug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  const suffix = Date.now().toString(36);
  const slug = `${baseSlug}-${suffix}`;

  await prisma.blog.create({
    data: {
      title,
      slug,
      content,
      excerpt: excerpt || content.slice(0, 160),
      author: author || "Admin",
      published: true,
    },
  });

  revalidatePath("/blog");
  revalidatePath("/admin/blogs");
  redirect("/admin/blogs");
}

export async function deleteBlog(id: string) {
  await prisma.blog.delete({ where: { id } });
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

  const existing = await prisma.sEO.findFirst();
  if (existing) {
    await prisma.sEO.update({
      where: { id: existing.id },
      data: { title, description, keywords, updatedAt: new Date() },
    });
  } else {
    await prisma.sEO.create({ data: { title, description, keywords } });
  }

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

  await prisma.client.create({
    data: {
      name,
      logo,
      link: link || null,
    },
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

  await prisma.client.update({
    where: { id },
    data: {
      name,
      logo,
      link: link || null,
    },
  });

  revalidatePath("/admin/clients");
  revalidatePath("/");
  return { success: true };
}

export async function deleteClient(id: string) {
  await prisma.client.delete({ where: { id } });
  revalidatePath("/admin/clients");
  revalidatePath("/");
}

