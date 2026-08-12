import { getPageSEO } from "@/lib/data";
import { ContactClient } from "./ContactClient";

export default async function ContactPage() {
  const pageSeo = await getPageSEO("contact");

  return <ContactClient pageSeo={pageSeo} />;
}
