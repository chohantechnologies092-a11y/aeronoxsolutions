import { getCount, getLeads, getMessages } from "@/lib/data";
import { FolderKanban, FileText, Magnet, MessageCircle, BarChart3, Users, Clock } from "lucide-react";
import Link from "next/link";
import { DashboardChart } from "@/components/admin/DashboardChart";

export default async function AdminDashboard() {
  const projectsCount = await getCount("projects");
  const blogsCount = await getCount("blogs");
  const servicesCount = await getCount("services");
  
  const leads = await getLeads();
  const messages = await getMessages();

  const recentLeads = leads.slice(0, 5);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-admin-text font-display">Dashboard Overview</h1>
          <p className="text-sm text-admin-muted mt-1">Welcome back. Here is what is happening with your website.</p>
        </div>
        <Link href="/admin/analytics" className="px-4 py-2 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:bg-white/10 text-admin-text text-sm font-medium rounded-xl border border-admin-border transition-colors flex items-center gap-2">
          <BarChart3 size={16} /> Full Analytics
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-admin-card p-6 rounded-2xl border border-admin-border relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#00c2ff]/5 rounded-full blur-3xl group-hover:bg-cyan-500/20 dark:bg-[#00c2ff]/10 transition-colors"></div>
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <h3 className="text-admin-muted text-sm font-medium">Weekly Traffic</h3>
              <p className="text-4xl font-bold text-admin-text mt-1">12,450 <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">↑ 14%</span></p>
            </div>
          </div>
          <DashboardChart />
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-admin-card p-6 rounded-2xl border border-admin-border flex items-center gap-4 flex-1">
            <div className="w-14 h-14 rounded-2xl bg-[#ffbe00]/10 flex items-center justify-center text-[#ffbe00] shrink-0">
              <Magnet size={24} />
            </div>
            <div>
              <h3 className="text-admin-muted text-sm font-medium">Total Leads</h3>
              <p className="text-3xl font-bold text-admin-text">{leads.length}</p>
            </div>
          </div>
          <div className="bg-admin-card p-6 rounded-2xl border border-admin-border flex items-center gap-4 flex-1">
            <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-600 dark:text-purple-400 shrink-0">
              <MessageCircle size={24} />
            </div>
            <div>
              <h3 className="text-admin-muted text-sm font-medium">Messages</h3>
              <p className="text-3xl font-bold text-admin-text">{messages.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-admin-card p-5 rounded-2xl border border-admin-border flex items-center gap-4">
          <div className="p-3 bg-black/5 dark:bg-white/5 rounded-xl text-admin-text/50"><FolderKanban size={20} /></div>
          <div>
            <p className="text-xl font-bold text-admin-text">{projectsCount}</p>
            <h3 className="text-admin-muted text-xs font-medium uppercase tracking-wider">Projects</h3>
          </div>
        </div>
        <div className="bg-admin-card p-5 rounded-2xl border border-admin-border flex items-center gap-4">
          <div className="p-3 bg-black/5 dark:bg-white/5 rounded-xl text-admin-text/50"><FileText size={20} /></div>
          <div>
            <p className="text-xl font-bold text-admin-text">{blogsCount}</p>
            <h3 className="text-admin-muted text-xs font-medium uppercase tracking-wider">Blogs</h3>
          </div>
        </div>
        <div className="bg-admin-card p-5 rounded-2xl border border-admin-border flex items-center gap-4">
          <div className="p-3 bg-emerald-500/20 dark:bg-emerald-500/10 rounded-xl text-emerald-600 dark:text-emerald-400"><Clock size={20} /></div>
          <div>
            <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">Active</p>
            <h3 className="text-admin-muted text-xs font-medium uppercase tracking-wider">Global SEO</h3>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold text-admin-text mb-4">Recent Leads</h2>
        <div className="bg-admin-card rounded-2xl border border-admin-border overflow-hidden">
          {recentLeads.length > 0 ? (
            <table className="w-full text-left text-sm text-admin-muted">
              <thead className="bg-black/10 dark:bg-black/20 text-xs uppercase text-admin-text/50 tracking-wider">
                <tr>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentLeads.map((lead) => (
                  <tr key={lead.id} className="border-b border-admin-border">
                    <td className="px-6 py-4 font-medium text-admin-text">{lead.name}</td>
                    <td className="px-6 py-4 capitalize text-[#ffbe00]">{lead.status || 'new'}</td>
                    <td className="px-6 py-4 text-right">{new Date(lead.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-8 text-center text-admin-text/40 text-sm">No leads collected yet.</div>
          )}
        </div>
      </div>
    </div>
  );
}
