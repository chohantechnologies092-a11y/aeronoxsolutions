import { getProjects } from "@/lib/data";
import Link from "next/link";
import { Plus, Palette, ExternalLink } from "lucide-react";
import { deleteProject } from "@/lib/actions";

export default async function GraphicGalleriesPage() {
  const allProjects = await getProjects();
  
  // Filter only graphic design galleries
  const galleries = allProjects.filter(p => p.serviceCategory === "graphic-design" || (p.tags && p.tags.includes("graphic-design")));

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-admin-card p-6 md:p-8 rounded-3xl border border-admin-border shadow-lg">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-admin-text tracking-tight flex items-center gap-3">
            <Palette className="text-[#ff007a]" size={28} />
            Graphic Design Galleries
          </h1>
          <p className="text-admin-muted mt-2 text-sm md:text-base font-medium max-w-xl">
            Manage your separate graphic design galleries. Each gallery can contain multiple logos and assets.
          </p>
        </div>
        <Link 
          href="/admin/graphic-design/new" 
          className="bg-[#ff007a] hover:bg-white hover:text-black text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg flex items-center gap-2 whitespace-nowrap uppercase tracking-wider text-sm"
        >
          <Plus size={18} />
          Create New Gallery
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleries.length === 0 ? (
          <div className="col-span-full p-12 text-center bg-admin-card border border-admin-border rounded-3xl">
            <Palette size={48} className="mx-auto text-admin-muted mb-4 opacity-50" />
            <h3 className="text-xl font-bold text-admin-text mb-2">No Graphic Galleries Yet</h3>
            <p className="text-admin-muted mb-6">Create your first gallery to showcase logos and graphic assets.</p>
            <Link 
              href="/admin/graphic-design/new"
              className="inline-flex items-center gap-2 text-[#ff007a] font-bold hover:underline"
            >
              Create Gallery <Plus size={16} />
            </Link>
          </div>
        ) : (
          galleries.map((gallery) => (
            <div key={gallery.id} className="bg-admin-card border border-admin-border rounded-2xl overflow-hidden shadow-lg group flex flex-col">
              <div className="relative h-48 bg-black/50 overflow-hidden">
                {gallery.galleryImages && gallery.galleryImages.length > 0 ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img 
                    src={gallery.galleryImages[0]} 
                    alt={gallery.title} 
                    className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" 
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-admin-muted">
                    No Cover Image
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-black text-white truncate">{gallery.title}</h3>
                  <p className="text-xs text-[#ff007a] font-bold uppercase tracking-wider mt-1">
                    {gallery.galleryImages?.length || 0} Assets
                  </p>
                </div>
              </div>
              
              <div className="p-4 flex items-center justify-between bg-admin-card border-t border-admin-border mt-auto">
                <Link 
                  href={`/admin/graphic-design/${gallery.slug}`}
                  className="text-sm font-bold text-admin-text hover:text-[#ff007a] transition-colors flex items-center gap-1.5"
                >
                  Edit Gallery
                </Link>
                <div className="flex items-center gap-3">
                  <Link 
                    href={`/portfolio?category=graphic-design`}
                    target="_blank"
                    className="text-admin-muted hover:text-white transition-colors"
                  >
                    <ExternalLink size={16} />
                  </Link>
                  <form action={deleteProject}>
                    <input type="hidden" name="id" value={gallery.id} />
                    <button type="submit" className="text-red-400 hover:text-red-300 transition-colors">
                      Delete
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
