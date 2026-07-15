import { getServices } from "@/lib/data";
import Link from "next/link";
import { Plus, Trash2, Edit } from "lucide-react";
import { deleteService } from "@/lib/actions";

export default async function ServicesAdminPage() {
  const services = await getServices();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-admin-text font-display">Services</h1>
          <p className="text-sm text-admin-muted mt-1">Manage what you offer to clients</p>
        </div>
        <Link 
          href="/admin/services/new" 
          className="flex items-center gap-2 px-4 py-2 bg-[#ffbe00] text-black rounded-xl hover:bg-[#ffbe00]/90 transition-colors font-bold"
        >
          <Plus size={18} />
          Add Service
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-admin-card p-6 rounded-2xl border border-admin-border relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#ffbe00]/5 rounded-full blur-3xl group-hover:bg-[#ffbe00]/10 transition-colors"></div>
          <h3 className="text-admin-muted text-sm font-medium mb-1 relative z-10">Total Services</h3>
          <p className="text-3xl font-bold text-admin-text relative z-10">{services.length}</p>
        </div>
        <div className="bg-admin-card p-6 rounded-2xl border border-admin-border relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#00c2ff]/5 rounded-full blur-3xl group-hover:bg-cyan-500/20 dark:bg-[#00c2ff]/10 transition-colors"></div>
          <h3 className="text-admin-muted text-sm font-medium mb-1 relative z-10">Services Added This Month</h3>
          <p className="text-3xl font-bold text-cyan-600 dark:text-[#00c2ff] relative z-10">
            {services.filter(s => new Date(s.createdAt).getMonth() === new Date().getMonth()).length}
          </p>
        </div>
      </div>

      <div className="bg-admin-card rounded-2xl border border-admin-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-admin-border bg-black/10 dark:bg-black/20">
                <th className="py-4 px-6 text-sm font-semibold text-muted">Service Title</th>
                <th className="py-4 px-6 text-sm font-semibold text-muted">Slug</th>
                <th className="py-4 px-6 text-sm font-semibold text-muted">Bento Class</th>
                <th className="py-4 px-6 text-sm font-semibold text-muted text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service.id} className="border-b border-admin-border hover:bg-black/5 dark:bg-white/5 transition-colors">
                  <td className="py-4 px-6">
                    <p className="font-medium text-admin-text">{service.title}</p>
                    <p className="text-xs text-muted mt-1 truncate max-w-xs">{service.shortDescription}</p>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm text-admin-muted">{service.slug}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-black/10 dark:bg-white/10 text-admin-text">
                      {service.bentoClass}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end gap-3">
                      <Link 
                        href={`/services/${service.slug}`}
                        target="_blank"
                        className="text-muted hover:text-admin-text transition-colors text-sm"
                      >
                        View
                      </Link>
                      <Link 
                        href={`/admin/services/${service.id}/edit`}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors p-1" 
                        title="Edit"
                      >
                        <Edit size={18} />
                      </Link>
                      <form action={async () => {
                        "use server";
                        await deleteService(service.id);
                      }}>
                        <button type="submit" className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors p-1" title="Delete">
                          <Trash2 size={18} />
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
              {services.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-muted">
                    No services found. Create one to get started.
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
