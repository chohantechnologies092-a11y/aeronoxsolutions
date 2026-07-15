import { getSettings } from "@/lib/data";
import { upsertSettings, resetAnalyticsData } from "@/lib/actions";

export default async function AdminSettings() {
  const settings = await getSettings() || {
    socials: {
      linkedin: "",
      twitter: "",
      facebook: "",
      instagram: "",
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-admin-text mb-8">Global Settings</h1>
      
      <div className="bg-admin-card p-8 rounded-2xl border border-admin-border">
        <form action={upsertSettings} className="flex flex-col gap-6">
          <h2 className="text-xl font-bold text-[#ffbe00] mb-4">Social Media Links</h2>
          
          <div className="flex flex-col gap-2">
            <label htmlFor="linkedin" className="text-sm font-medium text-admin-text">LinkedIn URL</label>
            <input 
              type="url" id="linkedin" name="linkedin" defaultValue={settings.socials?.linkedin}
              placeholder="https://linkedin.com/company/yourbrand"
              className="bg-black/10 dark:bg-black/20 border border-admin-border rounded-lg px-4 py-3 text-admin-text focus:border-accent outline-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="twitter" className="text-sm font-medium text-admin-text">Twitter (X) URL</label>
            <input 
              type="url" id="twitter" name="twitter" defaultValue={settings.socials?.twitter}
              placeholder="https://twitter.com/yourbrand"
              className="bg-black/10 dark:bg-black/20 border border-admin-border rounded-lg px-4 py-3 text-admin-text focus:border-accent outline-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="facebook" className="text-sm font-medium text-admin-text">Facebook URL</label>
            <input 
              type="url" id="facebook" name="facebook" defaultValue={settings.socials?.facebook}
              placeholder="https://facebook.com/yourbrand"
              className="bg-black/10 dark:bg-black/20 border border-admin-border rounded-lg px-4 py-3 text-admin-text focus:border-accent outline-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="instagram" className="text-sm font-medium text-admin-text">Instagram URL</label>
            <input 
              type="url" id="instagram" name="instagram" defaultValue={settings.socials?.instagram}
              placeholder="https://instagram.com/yourbrand"
              className="bg-black/10 dark:bg-black/20 border border-admin-border rounded-lg px-4 py-3 text-admin-text focus:border-accent outline-none"
            />
          </div>

          <div className="pt-4 border-t border-admin-border flex justify-end">
            <button type="submit" className="px-5 py-2.5 rounded-lg bg-accent text-[#24182e] font-bold hover:bg-white transition-colors">
              Save Settings
            </button>
          </div>
        </form>
      </div>

      <div className="bg-admin-card p-8 rounded-2xl border border-admin-border mt-8">
        <h2 className="text-xl font-bold text-[#ffbe00] mb-4">Data Management</h2>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-black/10 dark:bg-black/20 rounded-xl border border-admin-border">
          <div>
            <h3 className="text-admin-text font-medium">Reset Analytics Data</h3>
            <p className="text-sm text-admin-muted mt-1">Clear all views, impressions, and click data. This action cannot be undone.</p>
          </div>
          <form action={resetAnalyticsData}>
            <button type="submit" className="px-4 py-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-admin-text transition-colors border border-red-500/20 whitespace-nowrap">
              Reset Analytics
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
