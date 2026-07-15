import { getSEO } from "@/lib/data";
import { upsertSEO } from "@/lib/actions";

export default async function AdminSEO() {
  const seo = await getSEO() || {
    id: "new",
    title: "Premium Digital Agency",
    description: "Your digital partner.",
    keywords: "digital, agency",
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-admin-text mb-8">Global SEO Settings</h1>
      
      <div className="bg-admin-card p-8 rounded-2xl border border-admin-border">
        <form action={upsertSEO} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="text-sm font-medium text-admin-text">Default Title</label>
            <input 
              type="text" id="title" name="title" required defaultValue={seo.title}
              className="bg-black/10 dark:bg-black/20 border border-admin-border rounded-lg px-4 py-3 text-admin-text focus:border-accent outline-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="description" className="text-sm font-medium text-admin-text">Default Meta Description</label>
            <textarea 
              id="description" name="description" required rows={4} defaultValue={seo.description}
              className="bg-black/10 dark:bg-black/20 border border-admin-border rounded-lg px-4 py-3 text-admin-text focus:border-accent outline-none resize-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="keywords" className="text-sm font-medium text-admin-text">Keywords (comma separated)</label>
            <input 
              type="text" id="keywords" name="keywords" required defaultValue={seo.keywords}
              className="bg-black/10 dark:bg-black/20 border border-admin-border rounded-lg px-4 py-3 text-admin-text focus:border-accent outline-none"
            />
          </div>

          <div className="pt-4 border-t border-admin-border flex justify-end">
            <button type="submit" className="px-5 py-2.5 rounded-lg bg-accent text-[#24182e] font-bold hover:bg-white transition-colors">
              Save SEO Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
