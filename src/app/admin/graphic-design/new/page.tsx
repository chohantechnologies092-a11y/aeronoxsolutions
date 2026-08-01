import { GraphicGalleryForm } from "@/components/admin/GraphicGalleryForm";
import { createProject } from "@/lib/actions";
import { Palette, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function NewGraphicGalleryPage() {
  const handleCreate = async (formData: FormData) => {
    "use server";
    await createProject(formData);
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
          <Palette className="text-[#ff007a]" /> Create New Graphic Gallery
        </h1>
        <p className="text-admin-muted mt-2 text-sm">
          Add a new gallery of logos or visual assets.
        </p>
      </div>

      <GraphicGalleryForm action={handleCreate} />
    </div>
  );
}
