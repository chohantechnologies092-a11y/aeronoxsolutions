import { getLeadById } from "@/lib/data";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, User, Mail, Phone, Globe, Calendar, CheckCircle2, MessageSquare } from "lucide-react";

export default async function ViewLead({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lead = await getLeadById(id);

  if (!lead) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Button href="/admin/leads" variant="outline" className="px-3">
          <ArrowLeft size={16} />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-admin-text font-display">Lead Details</h1>
          <p className="text-sm text-admin-muted mt-1">Review the audit request</p>
        </div>
      </div>

      <div className="bg-admin-card rounded-3xl border border-admin-border overflow-hidden shadow-2xl">
        <div className="p-8 border-b border-admin-border bg-white/[0.02]">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-admin-text">{lead.name}</h2>
              <span className="inline-block mt-2 px-3 py-1 rounded-full bg-[#ffbe00]/10 text-[#ffbe00] text-xs font-bold border border-[#ffbe00]/20 uppercase tracking-widest">
                Status: {lead.status || 'New'}
              </span>
            </div>
            <div className="text-right">
              <p className="text-sm text-admin-muted flex items-center justify-end gap-2">
                <Calendar size={14} /> Received On
              </p>
              <p className="font-medium text-admin-text mt-1">{new Date(lead.createdAt).toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-xs font-bold text-admin-text/40 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Mail size={14} /> Email Address
              </h3>
              <a href={`mailto:${lead.email}`} className="text-lg font-medium text-cyan-600 dark:text-[#00c2ff] hover:underline">
                {lead.email}
              </a>
            </div>
            
            <div>
              <h3 className="text-xs font-bold text-admin-text/40 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Phone size={14} /> Phone Number
              </h3>
              <a href={`tel:${lead.phone}`} className="text-lg font-medium text-admin-text hover:text-[#ffbe00] transition-colors">
                {lead.phone}
              </a>
            </div>
            
            <div>
              <h3 className="text-xs font-bold text-admin-text/40 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Globe size={14} /> Target Website
              </h3>
              {lead.websiteUrl ? (
                <a href={lead.websiteUrl.startsWith('http') ? lead.websiteUrl : `https://${lead.websiteUrl}`} target="_blank" rel="noopener noreferrer" className="text-lg font-medium text-[#ffbe00] hover:underline flex items-center gap-2 break-all">
                  {lead.websiteUrl}
                </a>
              ) : (
                <span className="text-admin-text/30 italic">Not provided</span>
              )}
            </div>
          </div>

          <div className="bg-black/10 dark:bg-black/20 rounded-2xl p-6 border border-admin-border h-full">
            <h3 className="text-xs font-bold text-admin-text/40 uppercase tracking-wider mb-4 flex items-center gap-2">
              <MessageSquare size={14} /> Message
            </h3>
            {lead.message ? (
              <p className="text-admin-text leading-relaxed whitespace-pre-wrap">{lead.message}</p>
            ) : (
              <p className="text-admin-text/30 italic text-center py-8">No additional message provided.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
