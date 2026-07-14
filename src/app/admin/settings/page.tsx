import { getSettings } from "@/lib/data";
import { upsertSettings } from "@/lib/actions";

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
      <h1 className="text-3xl font-bold text-white mb-8">Global Settings</h1>
      
      <div className="bg-[#24182e] p-8 rounded-2xl border border-white/10">
        <form action={upsertSettings} className="flex flex-col gap-6">
          <h2 className="text-xl font-bold text-[#ffbe00] mb-4">Social Media Links</h2>
          
          <div className="flex flex-col gap-2">
            <label htmlFor="linkedin" className="text-sm font-medium text-white">LinkedIn URL</label>
            <input 
              type="url" id="linkedin" name="linkedin" defaultValue={settings.socials?.linkedin}
              placeholder="https://linkedin.com/company/yourbrand"
              className="bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-accent outline-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="twitter" className="text-sm font-medium text-white">Twitter (X) URL</label>
            <input 
              type="url" id="twitter" name="twitter" defaultValue={settings.socials?.twitter}
              placeholder="https://twitter.com/yourbrand"
              className="bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-accent outline-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="facebook" className="text-sm font-medium text-white">Facebook URL</label>
            <input 
              type="url" id="facebook" name="facebook" defaultValue={settings.socials?.facebook}
              placeholder="https://facebook.com/yourbrand"
              className="bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-accent outline-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="instagram" className="text-sm font-medium text-white">Instagram URL</label>
            <input 
              type="url" id="instagram" name="instagram" defaultValue={settings.socials?.instagram}
              placeholder="https://instagram.com/yourbrand"
              className="bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-accent outline-none"
            />
          </div>

          <div className="pt-4 border-t border-white/10 flex justify-end">
            <button type="submit" className="px-5 py-2.5 rounded-lg bg-accent text-[#24182e] font-bold hover:bg-white transition-colors">
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
