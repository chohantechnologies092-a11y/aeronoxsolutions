import { GraphicGalleryForm } from "@/components/admin/GraphicGalleryForm";
import { updateProject } from "@/lib/actions";
import { getProjectBySlug } from "@/lib/data";
import { Palette, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function EditGraphicGalleryPage({ params }: { params: { id: string } }) {
  const gallery = await getProjectBySlug(params.id);

  if (!gallery) {
    redirect("/admin/graphic-design");
  }

  const handleUpdate = async (formData: FormData) => {
    "use server";
    await updateProject(gallery.id, formData);
    redirect("/admin/graphic-design");
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Link 
        href="/admin/graphic-design" 
        className="inline-flex items-center gap-2 text-admin-muted hover:text-white transition-colors text-sm font-bold"
      >
        <ArrowLeft size={16} /> Back to Galleries
      </Link>
      
      <div>
        <h1 className="text-2xl md:text-3xl font-black text-white flex items-center gap-2">
          <Palette className="text-[#ff007a]" /> Edit Graphic Gallery
        </h1>
        <p className="text-admin-muted mt-2 text-sm">
          Update the gallery name or images.
        </p>
      </div>

      <GraphicGalleryForm gallery={gallery} action={handleUpdate} />
    </div>
  );
}
