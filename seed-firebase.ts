import { config } from "dotenv";
config(); // Load variables from .env

import { db } from "./src/lib/firebase-admin";
import { projects } from "./seed-projects";
import { services } from "./seed-services";
import { devlyxServices } from "./seed-devlyx"; // Using this as blogs or services depending on original intent

async function clearCollection(name: string) {
  const snapshot = await db.collection(name).get();
  for (const doc of snapshot.docs) {
    await doc.ref.delete();
  }
}

async function main() {
  console.log("Seeding Firebase...");

  await clearCollection("projects");
  await clearCollection("services");
  await clearCollection("blogs");

  // Seed Projects
  for (const p of projects) {
    await db.collection("projects").add({
      ...p,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    console.log(`Added project: ${p.title}`);
  }

  // Seed Services (Marketing)
  for (const s of services) {
    await db.collection("services").add({
      ...s,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    console.log(`Added marketing service: ${s.title}`);
  }

  // Seed Services (Devlyx Engineering)
  for (const d of devlyxServices) {
    await db.collection("services").add({
      title: d.title,
      slug: d.slug,
      shortDescription: d.shortDescription,
      content: d.content,
      color: d.color || '#00c2ff',
      icon: d.icon || 'code',
      bentoClass: d.bentoClass || 'md:col-span-1',
      createdAt: d.createdAt.toISOString(),
      updatedAt: d.createdAt.toISOString()
    });
    console.log(`Added engineering service: ${d.title}`);
  }

  // Seed Dummy Blogs
  const dummyBlogs = [
    { title: "The Future of Web Development", slug: "future-of-web-dev", author: "Admin", content: "This is a dummy blog post about web development. It covers the latest trends in React, Next.js, and serverless architectures." },
    { title: "SEO Strategies for 2026", slug: "seo-strategies-2026", author: "Admin", content: "This is a dummy blog post about SEO. We explore the impact of AI search engines and technical on-page optimization techniques." },
    { title: "Scaling Your E-Commerce Store", slug: "scaling-ecommerce", author: "Admin", content: "This is a dummy blog post about E-commerce. Learn how to handle peak traffic during holiday seasons with cloud infrastructure." }
  ];

  for (const b of dummyBlogs) {
    await db.collection("blogs").add({
      title: b.title,
      slug: b.slug,
      excerpt: b.content.substring(0, 100) + "...",
      content: b.content,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2370&auto=format&fit=crop",
      author: b.author,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    console.log(`Added blog: ${b.title}`);
  }

  console.log("Seeding complete!");
  process.exit(0);
}

main().catch(console.error);
