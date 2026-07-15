import { getLeadById } from "@/lib/data";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Save } from "lucide-react";
import { updateLeadStatus } from "@/lib/actions";

export default async function EditLead({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lead = await getLeadById(id);

  if (!lead) {
    notFound();
  }

  // We bind the server action with the lead ID.
  const updateStatusAction = updateLeadStatus.bind(null, lead.id);

  return (
    <div className="max-w-xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Button href="/admin/leads" variant="secondary" className="px-3">
          <ArrowLeft size={16} />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-admin-text font-display">Edit Lead Status</h1>
          <p className="text-sm text-admin-muted mt-1">Update status for {lead.name}</p>
        </div>
      </div>

      <div className="bg-admin-card rounded-3xl border border-admin-border p-8 shadow-2xl">
        <form action={updateStatusAction} className="flex flex-col gap-6">
          <div>
            <label className="text-xs font-bold text-admin-text/40 uppercase tracking-wider mb-2 block">
              Lead Status
            </label>
            <div className="relative">
              <select
                name="status"
                defaultValue={lead.status || "new"}
                className="w-full bg-black/5 dark:bg-white/5 border border-admin-border rounded-xl px-4 py-3 text-admin-text outline-none focus:border-[#ffbe00]/50 focus:bg-black/10 dark:bg-white/10 transition-all appearance-none"
              >
                <option value="new" className="bg-admin-bg">New</option>
                <option value="contacted" className="bg-admin-bg">Contacted</option>
                <option value="converted" className="bg-admin-bg">Converted</option>
                <option value="closed" className="bg-admin-bg">Closed</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-admin-text/50">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>
          
          <button 
            type="submit"
            className="w-full bg-[#ffbe00] hover:bg-[#ffbe00]/90 text-black font-bold py-4 rounded-xl mt-4 transition-all flex items-center justify-center gap-2"
          >
            <Save size={18} /> Update Status
          </button>
        </form>
      </div>
    </div>
  );
}
