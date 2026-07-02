import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { PortfolioContent } from "./PortfolioContent";

export default async function PortfolioDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await prisma.project.findUnique({
    where: { slug },
  });

  if (!project) {
    notFound();
  }

  return <PortfolioContent project={project} />;
}
