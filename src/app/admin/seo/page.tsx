import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export default async function AdminSEO() {
  const seo = await prisma.sEO.findFirst() || {
    id: "new",
    title: "Premium Digital Agency",
    description: "Your digital partner.",
    keywords: "digital, agency",
  };

  async function saveSEO(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const keywords = formData.get("keywords") as string;

    const existing = await prisma.sEO.findFirst();
    if (existing) {
      await prisma.sEO.update({
        where: { id: existing.id },
        data: { title, description, keywords }
      });
    } else {
      await prisma.sEO.create({
        data: { title, description, keywords }
      });
    }

    revalidatePath("/", "layout");
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-8">Global SEO Settings</h1>
      
      <div className="bg-[#24182e] p-8 rounded-2xl border border-white/10">
        <form action={saveSEO} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="text-sm font-medium text-white">Default Title</label>
            <input 
              type="text" id="title" name="title" required defaultValue={seo.title}
              className="bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-accent outline-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="description" className="text-sm font-medium text-white">Default Meta Description</label>
            <textarea 
              id="description" name="description" required rows={4} defaultValue={seo.description}
              className="bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-accent outline-none resize-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="keywords" className="text-sm font-medium text-white">Keywords (comma separated)</label>
            <input 
              type="text" id="keywords" name="keywords" required defaultValue={seo.keywords}
              className="bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-accent outline-none"
            />
          </div>

          <div className="pt-4 border-t border-white/10 flex justify-end">
            <button type="submit" className="px-5 py-2.5 rounded-lg bg-accent text-[#24182e] font-bold hover:bg-white transition-colors">
              Save SEO Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
