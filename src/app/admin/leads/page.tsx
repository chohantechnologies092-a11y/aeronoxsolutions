import { getLeads } from "@/lib/data";
import { Magnet, Calendar, ExternalLink, Edit, Trash2, Eye } from "lucide-react";
import Link from "next/link";
import { deleteLead } from "@/lib/actions";

export default async function AdminLeads() {
  const leads = await getLeads();

  const getStatusBadge = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'contacted':
        return <span className="px-2 py-1 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-medium border border-blue-500/20">Contacted</span>;
      case 'converted':
        return <span className="px-2 py-1 rounded-md bg-emerald-500/20 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-medium border border-emerald-500/20">Converted</span>;
      case 'closed':
        return <span className="px-2 py-1 rounded-md bg-admin-border/50 text-admin-muted text-xs font-medium border border-admin-border">Closed</span>;
      default:
        return <span className="px-2 py-1 rounded-md bg-[#ffbe00]/10 text-[#ffbe00] text-xs font-medium border border-[#ffbe00]/20">New</span>;
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-admin-text font-display">Leads</h1>
          <p className="text-sm text-admin-muted mt-1">Manage your incoming audit requests</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-admin-card p-6 rounded-2xl border border-admin-border relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#ffbe00]/5 rounded-full blur-3xl group-hover:bg-[#ffbe00]/10 transition-colors"></div>
          <h3 className="text-admin-muted text-sm font-medium mb-1 relative z-10">Total Leads</h3>
          <p className="text-3xl font-bold text-admin-text relative z-10">{leads.length}</p>
        </div>
        
        <div className="bg-admin-card p-6 rounded-2xl border border-admin-border relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 rounded-full blur-3xl group-hover:bg-yellow-500/10 transition-colors"></div>
          <h3 className="text-admin-muted text-sm font-medium mb-1 relative z-10">New</h3>
          <p className="text-3xl font-bold text-yellow-500 relative z-10">
            {leads.filter(l => l.status === 'new' || !l.status).length}
          </p>
        </div>

        <div className="bg-admin-card p-6 rounded-2xl border border-admin-border relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-colors"></div>
          <h3 className="text-admin-muted text-sm font-medium mb-1 relative z-10">Contacted</h3>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 relative z-10">
            {leads.filter(l => l.status === 'contacted').length}
          </p>
        </div>

        <div className="bg-admin-card p-6 rounded-2xl border border-admin-border relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/20 dark:bg-emerald-500/10 transition-colors"></div>
          <h3 className="text-admin-muted text-sm font-medium mb-1 relative z-10">Converted</h3>
          <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 relative z-10">
            {leads.filter(l => l.status === 'converted').length}
          </p>
        </div>
      </div>

      {leads.length === 0 ? (
        <div className="bg-admin-card rounded-2xl border border-admin-border p-16 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#ffbe00]/10 flex items-center justify-center mx-auto mb-4">
            <Magnet size={28} className="text-[#ffbe00]" />
          </div>
          <h3 className="text-admin-text font-semibold text-lg mb-2">No Leads Yet</h3>
          <p className="text-admin-muted text-sm mb-6">When users request an audit from the hero section, they will appear here.</p>
        </div>
      ) : (
        <div className="bg-admin-card rounded-2xl border border-admin-border overflow-hidden">
          <table className="w-full text-left text-sm text-admin-muted">
            <thead className="bg-black/10 dark:bg-black/20 text-xs uppercase text-admin-text/50 tracking-wider">
              <tr>
                <th className="px-6 py-4">Lead Info</th>
                <th className="px-6 py-4">Target Website</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 whitespace-nowrap">Date Received</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-b border-admin-border hover:bg-white/3 transition-colors">
                  <td className="px-6 py-4 align-top">
                    <p className="font-semibold text-admin-text whitespace-nowrap">{lead.name}</p>
                    <a href={`mailto:${lead.email}`} className="text-xs text-[#ffbe00] hover:underline block whitespace-nowrap">{lead.email}</a>
                    <a href={`tel:${lead.phone}`} className="text-xs text-admin-text/80 hover:underline block whitespace-nowrap mt-1">{lead.phone}</a>
                  </td>
                  <td className="px-6 py-4 align-top">
                    {lead.websiteUrl ? (
                      <a href={lead.websiteUrl.startsWith('http') ? lead.websiteUrl : `https://${lead.websiteUrl}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-admin-text hover:text-[#ffbe00] transition-colors break-all line-clamp-2">
                        {lead.websiteUrl}
                        <ExternalLink size={14} className="shrink-0" />
                      </a>
                    ) : (
                      <span className="text-admin-text/30 italic">Not provided</span>
                    )}
                  </td>
                  <td className="px-6 py-4 align-top">
                    {getStatusBadge(lead.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap align-top">
                    <span className="flex items-center gap-1.5 text-admin-muted text-xs">
                      <Calendar size={13} />
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right align-top">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/leads/${lead.id}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-admin-text hover:bg-black/10 dark:bg-white/10 border border-transparent hover:border-white/20 transition-all"
                      >
                        <Eye size={13} /> View
                      </Link>
                      <Link
                        href={`/admin/leads/${lead.id}/edit`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-blue-600 dark:text-blue-400 hover:bg-blue-500/10 hover:text-blue-700 dark:hover:text-blue-300 border border-transparent hover:border-blue-500/20 transition-all"
                      >
                        <Edit size={13} /> Edit
                      </Link>
                      <form
                        action={async () => {
                          "use server";
                          await deleteLead(lead.id);
                        }}
                      >
                        <button
                          type="submit"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-red-600 dark:text-red-400 hover:bg-red-500/10 hover:text-red-700 dark:hover:text-red-300 border border-transparent hover:border-red-500/20 transition-all"
                        >
                          <Trash2 size={13} /> Delete
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
