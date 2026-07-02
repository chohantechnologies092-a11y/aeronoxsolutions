import { getServices } from "@/lib/data";
import Link from "next/link";
import { Plus, Trash2, Edit } from "lucide-react";
import { deleteService } from "@/lib/actions";

export default async function ServicesAdminPage() {
  const services = await getServices();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white">Services</h1>
        <Link 
          href="/admin/services/new" 
          className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg hover:opacity-90 transition-opacity font-medium"
        >
          <Plus size={18} />
          Add Service
        </Link>
      </div>

      <div className="bg-[#24182e] rounded-2xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-black/20">
                <th className="py-4 px-6 text-sm font-semibold text-muted">Service Title</th>
                <th className="py-4 px-6 text-sm font-semibold text-muted">Slug</th>
                <th className="py-4 px-6 text-sm font-semibold text-muted">Bento Class</th>
                <th className="py-4 px-6 text-sm font-semibold text-muted text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-4 px-6">
                    <p className="font-medium text-white">{service.title}</p>
                    <p className="text-xs text-muted mt-1 truncate max-w-xs">{service.shortDescription}</p>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm text-gray-400">{service.slug}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/10 text-white">
                      {service.bentoClass}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end gap-3">
                      <Link 
                        href={`/services/${service.slug}`}
                        target="_blank"
                        className="text-muted hover:text-white transition-colors text-sm"
                      >
                        View
                      </Link>
                      <Link 
                        href={`/admin/services/${service.id}/edit`}
                        className="text-blue-400 hover:text-blue-300 transition-colors p-1" 
                        title="Edit"
                      >
                        <Edit size={18} />
                      </Link>
                      <form action={async () => {
                        "use server";
                        await deleteService(service.id);
                      }}>
                        <button type="submit" className="text-red-400 hover:text-red-300 transition-colors p-1" title="Delete">
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
