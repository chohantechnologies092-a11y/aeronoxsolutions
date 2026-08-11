import { getSEO, getPageSEO } from "@/lib/data";
import { upsertPageBanner } from "@/lib/actions";
import Link from "next/link";
import { ImageUpload } from "@/components/ui/ImageUpload";

export default async function AdminBanners({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
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
    seo = await getSEO() || { bannerImage: "" };
  } else {
    seo = await getPageSEO(currentPage) || { bannerImage: "" };
  }

  const upsertAction = upsertPageBanner.bind(null, currentPage);

  return (
    <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8">
      
      {/* Sidebar for Pages */}
      <div className="w-full md:w-64 flex-shrink-0">
        <h2 className="text-xl font-bold text-admin-text mb-4">Pages</h2>
        <div className="flex flex-col gap-2">
          {staticPages.map((page) => (
            <Link 
              key={page.slug}
              href={`/admin/banners?page=${page.slug}`}
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
          {staticPages.find(p => p.slug === currentPage)?.label} Banner
        </h1>
        
        <div className="bg-admin-card p-8 rounded-2xl border border-admin-border">
          <form action={upsertAction} className="flex flex-col gap-6" key={currentPage}>
            
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-admin-text">
                {currentPage === "global" ? "Default Banner Image" : "Page Hero Banner Image"}
              </label>
              <ImageUpload name="bannerImage" defaultValue={seo.bannerImage || ""} />
            </div>

            {currentPage === "portfolio" && (
              <div className="flex flex-col gap-2 pt-4 border-t border-admin-border">
                <label className="text-sm font-medium text-admin-text">
                  Portfolio "All Work" Service Card Image
                </label>
                <ImageUpload name="portfolioAllImage" defaultValue={seo.portfolioAllImage || ""} />
                <p className="text-xs text-admin-muted">
                  Image shown on the "All Work" capability card on the Portfolio page (/portfolio).
                </p>
              </div>
            )}

            <div className="pt-4 border-t border-admin-border flex justify-end">
              <button type="submit" className="px-5 py-2.5 rounded-lg bg-accent text-[#24182e] font-bold hover:bg-white transition-colors">
                Save Banner Settings
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
