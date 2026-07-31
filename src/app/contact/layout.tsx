import { getPageSEO, getSEO } from "@/lib/data";

export async function generateMetadata() {
  const globalSeo = await getSEO();
  const pageSeo = await getPageSEO("contact");

  return {
    title: pageSeo?.title || globalSeo?.title || "Contact | Aeronox Solutions",
    description: pageSeo?.description || globalSeo?.description,
    keywords: pageSeo?.keywords || globalSeo?.keywords,
  };
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
