import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import EditClientForm from "./EditClientForm";

export default async function EditClientPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const client = await prisma.client.findUnique({
    where: { id },
  });

  if (!client) {
    notFound();
  }

  return <EditClientForm client={client} />;
}
