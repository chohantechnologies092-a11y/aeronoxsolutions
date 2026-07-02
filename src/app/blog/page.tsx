import type { Metadata } from "next";
import { getBlogs } from "@/lib/data";
import { BlogContent } from "./BlogContent";

export const metadata: Metadata = {
  title: "Insights & Technical Blog",
  description: "Read technical articles on SEO indexing, React architectures, Next.js setups, and dynamic workflow automations.",
};

export const revalidate = 0; // Disable caching

export default async function BlogPage() {
  const blogPosts = await getBlogs();

  return <BlogContent blogPosts={blogPosts} />;
}
