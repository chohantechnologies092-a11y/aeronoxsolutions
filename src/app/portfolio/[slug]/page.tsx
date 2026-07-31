import { getProjectBySlug, getSEO } from "@/lib/data";
import { notFound } from "next/navigation";
import { PortfolioContent } from "./PortfolioContent";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug: rawSlug } = await params;
  const slug = decodeURIComponent(rawSlug);
  const project = await getProjectBySlug(slug);
  
  if (!project) {
    return { title: 'Project Not Found | Aeronox Solutions' };
  }

  const seo = await getSEO();
  
  return {
    title: project.metaTitle || `${project.title} | ${seo?.title || 'Aeronox Solutions'}`,
    description: project.metaDescription || project.description || seo?.description,
  };
}

export default async function PortfolioDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug: rawSlug } = await params;
  const slug = decodeURIComponent(rawSlug);
  const project = await getProjectBySlug(slug);


  if (!project) {
    notFound();
  }

  return <PortfolioContent project={project} />;
}
