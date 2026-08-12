import { getSettings, getRolePermissions } from "@/lib/data";
import { upsertSettings, resetAnalyticsData, upsertRolePermissions } from "@/lib/actions";

export default async function AdminSettings() {
  const settings = await getSettings() || {
    socials: {
      linkedin: "",
      twitter: "",
      facebook: "",
      instagram: "",
      youtube: "",
      tiktok: "",
      pinterest: "",
    }
  };

  const editorPermissions = await getRolePermissions();

  const availableNavItems = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/analytics", label: "Analytics" },
    { href: "/admin/company", label: "Company Profile" },
    { href: "/admin/projects", label: "Projects" },
    { href: "/admin/graphic-design", label: "Graphic Galleries" },
    { href: "/admin/services", label: "Services" },
    { href: "/admin/clients", label: "Clients" },
    { href: "/admin/blogs", label: "Blogs" },
    { href: "/admin/seo", label: "Global SEO" },
    { href: "/admin/banners", label: "Page Banners" },
    { href: "/admin/leads", label: "Leads" },
    { href: "/admin/users", label: "Users" },
    { href: "/admin/settings", label: "Settings" },
  ];

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

          <div className="flex flex-col gap-2">
            <label htmlFor="youtube" className="text-sm font-medium text-admin-text">YouTube URL</label>
            <input 
              type="url" id="youtube" name="youtube" defaultValue={settings.socials?.youtube}
              placeholder="https://youtube.com/@yourbrand"
              className="bg-black/10 dark:bg-black/20 border border-admin-border rounded-lg px-4 py-3 text-admin-text focus:border-accent outline-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="tiktok" className="text-sm font-medium text-admin-text">TikTok URL</label>
            <input 
              type="url" id="tiktok" name="tiktok" defaultValue={settings.socials?.tiktok}
              placeholder="https://tiktok.com/@yourbrand"
              className="bg-black/10 dark:bg-black/20 border border-admin-border rounded-lg px-4 py-3 text-admin-text focus:border-accent outline-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="pinterest" className="text-sm font-medium text-admin-text">Pinterest URL</label>
            <input 
              type="url" id="pinterest" name="pinterest" defaultValue={settings.socials?.pinterest}
              placeholder="https://pinterest.com/yourbrand"
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
        <h2 className="text-xl font-bold text-[#ffbe00] mb-4">Editor Role Permissions</h2>
        <p className="text-sm text-admin-muted mb-6">
          Select the dashboard pages that users with the <strong>Editor</strong> role are allowed to access.
        </p>
        <form action={upsertRolePermissions} className="flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {availableNavItems.map((item) => (
              <label key={item.href} className="flex items-center gap-3 p-3 bg-black/10 dark:bg-black/20 rounded-xl border border-admin-border cursor-pointer hover:border-accent transition-colors">
                <input 
                  type="checkbox" 
                  name="permissions" 
                  value={item.href}
                  defaultChecked={editorPermissions.includes(item.href)}
                  className="w-4 h-4 text-[#ffbe00] bg-admin-bg border-admin-border rounded focus:ring-[#ffbe00]"
                />
                <span className="text-sm font-medium text-admin-text">{item.label}</span>
              </label>
            ))}
          </div>

          <div className="pt-4 border-t border-admin-border flex justify-end">
            <button type="submit" className="px-5 py-2.5 rounded-lg bg-accent text-[#24182e] font-bold hover:bg-white transition-colors">
              Save Permissions
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
