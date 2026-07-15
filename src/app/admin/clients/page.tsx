import { getClients } from "@/lib/data";
import Link from "next/link";
import { Plus, Trash2, Edit } from "lucide-react";
import { deleteClient } from "@/lib/actions";
import Image from "next/image";

export default async function ClientsAdminPage() {
  const clients = await getClients();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-admin-text font-display">Clients & Partners</h1>
          <p className="text-sm text-admin-muted mt-1">Manage your trusted partners</p>
        </div>
        <Link 
          href="/admin/clients/new" 
          className="flex items-center gap-2 px-4 py-2 bg-[#ffbe00] text-black rounded-xl hover:bg-[#ffbe00]/90 transition-colors font-bold"
        >
          <Plus size={18} />
          Add Client
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-admin-card p-6 rounded-2xl border border-admin-border relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#ffbe00]/5 rounded-full blur-3xl group-hover:bg-[#ffbe00]/10 transition-colors"></div>
          <h3 className="text-admin-muted text-sm font-medium mb-1 relative z-10">Total Clients</h3>
          <p className="text-3xl font-bold text-admin-text relative z-10">{clients.length}</p>
        </div>
        <div className="bg-admin-card p-6 rounded-2xl border border-admin-border relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#00c2ff]/5 rounded-full blur-3xl group-hover:bg-cyan-500/20 dark:bg-[#00c2ff]/10 transition-colors"></div>
          <h3 className="text-admin-muted text-sm font-medium mb-1 relative z-10">Clients Added This Month</h3>
          <p className="text-3xl font-bold text-cyan-600 dark:text-[#00c2ff] relative z-10">
            {clients.filter(c => new Date(c.createdAt).getMonth() === new Date().getMonth()).length}
          </p>
        </div>
      </div>

      <div className="bg-admin-card rounded-2xl border border-admin-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-admin-border bg-black/10 dark:bg-black/20">
                <th className="py-4 px-6 text-sm font-semibold text-muted">Logo</th>
                <th className="py-4 px-6 text-sm font-semibold text-muted">Name</th>
                <th className="py-4 px-6 text-sm font-semibold text-muted">Link</th>
                <th className="py-4 px-6 text-sm font-semibold text-muted text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.id} className="border-b border-admin-border hover:bg-black/5 dark:bg-white/5 transition-colors">
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
                    <p className="font-medium text-admin-text">{client.name}</p>
                  </td>
                  <td className="py-4 px-6">
                    {client.link ? (
                      <a href={client.link} target="_blank" rel="noreferrer" className="text-accent hover:underline text-sm">
                        {client.link}
                      </a>
                    ) : (
                      <span className="text-sm text-admin-muted">-</span>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end gap-3">
                      <Link 
                        href={`/admin/clients/${client.id}/edit`}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors p-1" 
                        title="Edit"
                      >
                        <Edit size={18} />
                      </Link>
                      <form action={async () => {
                        "use server";
                        await deleteClient(client.id);
                      }}>
                        <button type="submit" className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors p-1" title="Delete">
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
