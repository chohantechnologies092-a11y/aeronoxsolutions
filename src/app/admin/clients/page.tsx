import { prisma } from "@/lib/db";
import Link from "next/link";
import { Plus, Trash2, Edit } from "lucide-react";
import { deleteClient } from "@/lib/actions";
import Image from "next/image";

export default async function ClientsAdminPage() {
  const clients = await prisma.client.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white">Clients & Partners</h1>
        <Link 
          href="/admin/clients/new" 
          className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg hover:opacity-90 transition-opacity font-medium"
        >
          <Plus size={18} />
          Add Client
        </Link>
      </div>

      <div className="bg-[#24182e] rounded-2xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-black/20">
                <th className="py-4 px-6 text-sm font-semibold text-muted">Logo</th>
                <th className="py-4 px-6 text-sm font-semibold text-muted">Name</th>
                <th className="py-4 px-6 text-sm font-semibold text-muted">Link</th>
                <th className="py-4 px-6 text-sm font-semibold text-muted text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-4 px-6">
                    <div className="w-12 h-12 relative rounded-md overflow-hidden bg-white flex items-center justify-center p-1">
                      <Image 
                        src={client.logo} 
                        alt={client.name} 
                        fill 
                        className="object-contain"
                      />
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <p className="font-medium text-white">{client.name}</p>
                  </td>
                  <td className="py-4 px-6">
                    {client.link ? (
                      <a href={client.link} target="_blank" rel="noreferrer" className="text-accent hover:underline text-sm">
                        {client.link}
                      </a>
                    ) : (
                      <span className="text-sm text-gray-500">-</span>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end gap-3">
                      <Link 
                        href={`/admin/clients/${client.id}/edit`}
                        className="text-blue-400 hover:text-blue-300 transition-colors p-1" 
                        title="Edit"
                      >
                        <Edit size={18} />
                      </Link>
                      <form action={async () => {
                        "use server";
                        await deleteClient(client.id);
                      }}>
                        <button type="submit" className="text-red-400 hover:text-red-300 transition-colors p-1" title="Delete">
                          <Trash2 size={18} />
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
              {clients.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-muted">
                    No clients found. Add one to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
