import { getSEO, getPageSEO } from "@/lib/data";
import { upsertSEO, upsertPageSEO } from "@/lib/actions";
import Link from "next/link";

export default async function AdminSEO({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const params = await searchParams;
  const currentPage = params.page || "global";

  const staticPages = [
    { label: "Global Fallback", slug: "global" },
    { label: "Home Page", slug: "home" },
    { label: "About Page", slug: "about" },
    { label: "Contact Page", slug: "contact" },
    { label: "Portfolio Listing", slug: "portfolio" },
    { label: "Services Listing", slug: "services" },
    { label: "Blog Listing", slug: "blog" },
  ];

  let seo;
  if (currentPage === "global") {
    seo = await getSEO() || { title: "", description: "", keywords: "", bannerImage: "" };
  } else {
    seo = await getPageSEO(currentPage) || { title: "", description: "", keywords: "", bannerImage: "" };
  }

  const upsertAction = currentPage === "global" 
    ? upsertSEO 
    : upsertPageSEO.bind(null, currentPage);

  return (
    <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8">
      
      {/* Sidebar for Pages */}
      <div className="w-full md:w-64 flex-shrink-0">
        <h2 className="text-xl font-bold text-admin-text mb-4">Pages</h2>
        <div className="flex flex-col gap-2">
          {staticPages.map((page) => (
            <Link 
              key={page.slug}
              href={`/admin/seo?page=${page.slug}`}
              className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                currentPage === page.slug
                  ? "bg-accent text-[#24182e]"
                  : "bg-black/5 dark:bg-white/5 text-admin-text hover:bg-black/10 dark:hover:bg-white/10"
              }`}
            >
              {page.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Form Area */}
      <div className="flex-grow">
        <h1 className="text-3xl font-bold text-admin-text mb-8">
          {staticPages.find(p => p.slug === currentPage)?.label} Settings
        </h1>
        
        <div className="bg-admin-card p-8 rounded-2xl border border-admin-border">
          <form action={upsertAction} className="flex flex-col gap-6" key={currentPage}>
            <div className="flex flex-col gap-2">
              <label htmlFor="title" className="text-sm font-medium text-admin-text">
                {currentPage === "global" ? "Default Title" : "Meta Title"}
              </label>
              <input 
                type="text" id="title" name="title" required defaultValue={seo.title}
                className="bg-black/10 dark:bg-black/20 border border-admin-border rounded-lg px-4 py-3 text-admin-text focus:border-accent outline-none"
                placeholder={currentPage === "global" ? "Premium Digital Agency" : "Page Title"}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="description" className="text-sm font-medium text-admin-text">
                {currentPage === "global" ? "Default Meta Description" : "Meta Description"}
              </label>
              <textarea 
                id="description" name="description" required rows={4} defaultValue={seo.description}
                className="bg-black/10 dark:bg-black/20 border border-admin-border rounded-lg px-4 py-3 text-admin-text focus:border-accent outline-none resize-none"
                placeholder={currentPage === "global" ? "Your digital partner." : "Page description"}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="keywords" className="text-sm font-medium text-admin-text">
                Keywords (comma separated)
              </label>
              <input 
                type="text" id="keywords" name="keywords" required defaultValue={seo.keywords}
                className="bg-black/10 dark:bg-black/20 border border-admin-border rounded-lg px-4 py-3 text-admin-text focus:border-accent outline-none"
                placeholder="digital, agency, web design"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="bannerImage" className="text-sm font-medium text-admin-text">
                Banner/Hero Image URL (Optional)
              </label>
              <input 
                type="text" id="bannerImage" name="bannerImage" defaultValue={seo.bannerImage || ""}
                className="bg-black/10 dark:bg-black/20 border border-admin-border rounded-lg px-4 py-3 text-admin-text focus:border-accent outline-none"
                placeholder="https://images.unsplash.com/..."
              />
            </div>

            <div className="pt-4 border-t border-admin-border flex justify-end">
              <button type="submit" className="px-5 py-2.5 rounded-lg bg-accent text-[#24182e] font-bold hover:bg-white transition-colors">
                Save Page Settings
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
