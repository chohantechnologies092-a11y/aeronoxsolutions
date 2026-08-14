import { getPageSEO, getSEO, getServices, getProjects, getClients, getTestimonials } from "@/lib/data";
import { Hero } from "@/components/sections/Hero";
import { LogoMarquee } from "@/components/sections/LogoMarquee";
import { Services } from "@/components/sections/Services";
import { Portfolio } from "@/components/sections/Portfolio";
import { AboutAgency } from "@/components/sections/AboutAgency";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";

export async function generateMetadata() {
  const globalSeo = await getSEO();
  const pageSeo = await getPageSEO("home");

  return {
    title: pageSeo?.title || globalSeo?.title || "Aeronox Solutions",
    description: pageSeo?.description || globalSeo?.description,
    keywords: pageSeo?.keywords || globalSeo?.keywords,
  };
}

export const revalidate = 0;

export default async function HomePage() {
  const [services, projects, clients, testimonials] = await Promise.all([
    getServices(),
    getProjects(),
    getClients(),
    getTestimonials(),
  ]);

  return (
    <>
      <Hero />
      <LogoMarquee clients={clients} />
      <Services services={services} limit={3} />
      <Portfolio projects={projects} />
      <AboutAgency />
      <FAQ />
      <Testimonials testimonials={testimonials} />
    </>
  );
}

// Force Turbopack recompile to clear hydration mismatch
