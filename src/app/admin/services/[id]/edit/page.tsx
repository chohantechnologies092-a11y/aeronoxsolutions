import { updateService } from "@/lib/actions";
import { Button } from "@/components/ui/Button";
import { RichTextEditor } from "@/components/editor/RichTextEditor";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  const service = await prisma.service.findUnique({
    where: { id },
  });

  if (!service) {
    notFound();
  }

  // We need to pass the ID to the server action, one way is bind
  const updateServiceWithId = updateService.bind(null, id);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-8">Edit Service: {service.title}</h1>
      
      <div className="bg-[#24182e] p-8 rounded-2xl border border-white/10">
        <form action={updateServiceWithId} className="flex flex-col gap-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="title" className="text-sm font-medium text-white">Service Title</label>
              <input 
                type="text" 
                id="title" 
                name="title" 
                required
                defaultValue={service.title}
                className="bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
                placeholder="e.g. Technical SEO"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="slug" className="text-sm font-medium text-white">Slug (Optional)</label>
              <input 
                type="text" 
                id="slug" 
                name="slug" 
                defaultValue={service.slug}
                className="bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
                placeholder="e.g. technical-seo"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="icon" className="text-sm font-medium text-white">Icon Name (Lucide)</label>
              <input 
                type="text" 
                id="icon" 
                name="icon" 
                defaultValue={service.icon}
                className="bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="color" className="text-sm font-medium text-white">Brand Color (Hex/Var)</label>
              <input 
                type="text" 
                id="color" 
                name="color" 
                defaultValue={service.color}
                className="bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="bentoClass" className="text-sm font-medium text-white">Bento Grid Class</label>
              <input 
                type="text" 
                id="bentoClass" 
                name="bentoClass" 
                defaultValue={service.bentoClass}
                className="bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-white">Banner Image (Optional)</label>
            <ImageUpload name="image" defaultValue={service.image} />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="shortDescription" className="text-sm font-medium text-white">Short Description</label>
            <textarea 
              id="shortDescription" 
              name="shortDescription" 
              rows={2}
              required
              defaultValue={service.shortDescription}
              className="bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-muted focus:outline-none focus:border-accent transition-colors resize-none"
              placeholder="Brief summary for the card..."
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-white">Detailed Content</label>
            <RichTextEditor name="content" defaultValue={service.content} />
          </div>

          <div className="pt-4 border-t border-white/10 flex justify-end gap-4">
            <a href="/admin/services" className="px-5 py-2.5 rounded-lg border border-white/10 text-white hover:bg-white/5 transition-colors">
              Cancel
            </a>
            <Button type="submit">Update Service</Button>
          </div>

        </form>
      </div>
    </div>
  );
}
