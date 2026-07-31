import type { Metadata } from "next";
import { getPageSEO, getSEO, getBlogs } from "@/lib/data";
import { BlogContent } from "./BlogContent";

export async function generateMetadata() {
  const globalSeo = await getSEO();
  const pageSeo = await getPageSEO("blog");

  return {
    title: pageSeo?.title || globalSeo?.title || "Insights & Technical Blog | Aeronox Solutions",
    description: pageSeo?.description || globalSeo?.description || "Read technical articles.",
    keywords: pageSeo?.keywords || globalSeo?.keywords,
  };
}

export const revalidate = 0; // Disable caching

export default async function BlogPage() {
  const blogPosts = await getBlogs();

  return <BlogContent blogPosts={blogPosts} />;
}
