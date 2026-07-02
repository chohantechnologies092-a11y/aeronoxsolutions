import { getClientById } from "@/lib/data";
import { notFound } from "next/navigation";
import EditClientForm from "./EditClientForm";

export default async function EditClientPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const client = await getClientById(id);

  if (!client) {
    notFound();
  }

  return <EditClientForm client={client} />;
}
