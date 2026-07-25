import { getServices, getProjects, getClients } from "@/lib/data";
import { Hero } from "@/components/sections/Hero";
import { LogoMarquee } from "@/components/sections/LogoMarquee";
import { Services } from "@/components/sections/Services";
import { Portfolio } from "@/components/sections/Portfolio";
import { AboutAgency } from "@/components/sections/AboutAgency";
import { FAQ } from "@/components/sections/FAQ";

export const revalidate = 0;

export default async function HomePage() {
  const [services, projects, clients] = await Promise.all([
    getServices(),
    getProjects(),
    getClients(),
  ]);

  return (
    <>
      <Hero />
      <LogoMarquee clients={clients} />
      <Services services={services} limit={3} />
      <Portfolio projects={projects} />
      <AboutAgency />
      <FAQ />
    </>
  );
}
