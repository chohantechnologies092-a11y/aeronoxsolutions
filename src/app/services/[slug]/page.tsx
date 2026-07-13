import { getServiceBySlug } from "@/lib/data";
import { notFound } from "next/navigation";
import { ServiceDetailClient } from "./ServiceDetailClient";

// Generate metadata dynamically
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  
  if (!service) {
    return { title: 'Service Not Found | Aeronox Solutions' };
  }

  return {
    title: `${service.title} | Aeronox Solutions`,
    description: service.shortDescription,
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  // Pass down the fetched data to the rich, animated client component
  return <ServiceDetailClient service={service} />;
}
