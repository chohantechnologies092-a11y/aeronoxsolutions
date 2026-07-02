import { prisma } from "@/lib/db";
import { Hero } from "@/components/sections/Hero";
import { LogoMarquee } from "@/components/sections/LogoMarquee";
import { Services } from "@/components/sections/Services";
import { Portfolio } from "@/components/sections/Portfolio";
import { AboutAgency } from "@/components/sections/AboutAgency";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";

export const revalidate = 0;

export default async function HomePage() {
  const [services, projects, clients] = await Promise.all([
    prisma.service.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.project.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.client.findMany({ orderBy: { createdAt: "desc" } }),
  ]);

  return (
    <>
      <Hero />
      <LogoMarquee clients={clients} />
      <Services services={services} />
      <Portfolio projects={projects} />
      <AboutAgency />
      <FAQ />
      <CTA />
    </>
  );
}
