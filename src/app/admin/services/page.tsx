import { getServices } from "@/lib/data";
import Link from "next/link";
import { Plus } from "lucide-react";
import { ServicesManager } from "@/components/admin/ServicesManager";

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

      <ServicesManager initialServices={services} />
    </div>
  );
}
