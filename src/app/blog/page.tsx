import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { BlogContent } from "./BlogContent";

export const metadata: Metadata = {
  title: "Insights & Technical Blog",
  description: "Read technical articles on SEO indexing, React architectures, Next.js setups, and dynamic workflow automations.",
};

export const revalidate = 0; // Disable caching

export default async function BlogPage() {
  const blogPosts = await prisma.blog.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" }
  });

  return <BlogContent blogPosts={blogPosts} />;
}
