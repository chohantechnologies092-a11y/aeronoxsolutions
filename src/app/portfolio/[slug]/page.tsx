import { getProjectBySlug } from "@/lib/data";
import { notFound } from "next/navigation";
import { PortfolioContent } from "./PortfolioContent";

export default async function PortfolioDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);


  if (!project) {
    notFound();
  }

  return <PortfolioContent project={project} />;
}
