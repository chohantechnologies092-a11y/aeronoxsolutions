import { updateService } from "@/lib/actions";
import { Button } from "@/components/ui/Button";
import { RichTextEditor } from "@/components/editor/RichTextEditor";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { FaqManagerInput } from "@/components/admin/FaqManagerInput";
import { getServiceById } from "@/lib/data";
import { notFound } from "next/navigation";

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  const service = await getServiceById(id);

  if (!service) {
    notFound();
  }

  // We need to pass the ID to the server action, one way is bind
  const updateServiceWithId = updateService.bind(null, id);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-admin-text mb-8">Edit Service: {service.title}</h1>
      
      <div className="bg-admin-card p-8 rounded-2xl border border-admin-border">
        <form action={updateServiceWithId} className="flex flex-col gap-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="title" className="text-sm font-medium text-admin-text">Service Title</label>
              <input 
                type="text" 
                id="title" 
                name="title" 
                required
                defaultValue={service.title}
                className="bg-black/10 dark:bg-black/20 border border-admin-border rounded-lg px-4 py-3 text-admin-text placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
                placeholder="e.g. Technical SEO"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="slug" className="text-sm font-medium text-admin-text">Slug (Optional)</label>
              <input 
                type="text" 
                id="slug" 
                name="slug" 
                defaultValue={service.slug}
                className="bg-black/10 dark:bg-black/20 border border-admin-border rounded-lg px-4 py-3 text-admin-text placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
                placeholder="e.g. technical-seo"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="icon" className="text-sm font-medium text-admin-text">Icon Name (Lucide)</label>
              <input 
                type="text" 
                id="icon" 
                name="icon" 
                defaultValue={service.icon}
                className="bg-black/10 dark:bg-black/20 border border-admin-border rounded-lg px-4 py-3 text-admin-text placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="color" className="text-sm font-medium text-admin-text">Brand Color (Hex/Var)</label>
              <input 
                type="text" 
                id="color" 
                name="color" 
                defaultValue={service.color}
                className="bg-black/10 dark:bg-black/20 border border-admin-border rounded-lg px-4 py-3 text-admin-text placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="bentoClass" className="text-sm font-medium text-admin-text">Bento Grid Class</label>
              <input 
                type="text" 
                id="bentoClass" 
                name="bentoClass" 
                defaultValue={service.bentoClass}
                className="bg-black/10 dark:bg-black/20 border border-admin-border rounded-lg px-4 py-3 text-admin-text placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-admin-text">Card Image (Services Grid)</label>
              <ImageUpload name="cardImage" defaultValue={service.cardImage || undefined} />
              <p className="text-xs text-admin-muted">Image displayed on service card in Homepage / Services page grid.</p>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-admin-text">Portfolio Capability Card Image</label>
              <ImageUpload name="portfolioCardImage" defaultValue={service.portfolioCardImage || service.cardImage || undefined} />
              <p className="text-xs text-admin-muted">Image displayed on the service box on Portfolio page (/portfolio).</p>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-admin-text">Header Banner Image (Detail Page)</label>
              <ImageUpload name="image" defaultValue={service.bannerImage || service.image || undefined} />
              <p className="text-xs text-admin-muted">Image displayed in hero banner on service detail page.</p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="shortDescription" className="text-sm font-medium text-admin-text">Short Description</label>
            <textarea 
              id="shortDescription" 
              name="shortDescription" 
              rows={2}
              required
              defaultValue={service.shortDescription}
              className="bg-black/10 dark:bg-black/20 border border-admin-border rounded-lg px-4 py-3 text-admin-text placeholder:text-muted focus:outline-none focus:border-accent transition-colors resize-none"
              placeholder="Brief summary for the card..."
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="capabilities" className="text-sm font-medium text-admin-text">Capabilities (comma-separated, Optional)</label>
            <input 
              type="text" 
              id="capabilities" 
              name="capabilities" 
              defaultValue={service.capabilities || ""}
              className="bg-black/10 dark:bg-black/20 border border-admin-border rounded-lg px-4 py-3 text-admin-text placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
              placeholder="e.g. React, Node.js, Next.js, Figma"
            />
          </div>

          <div className="pt-4 border-t border-admin-border">
            <FaqManagerInput defaultFaqs={service.faqs || []} />
          </div>

          <div className="flex items-center gap-2">
            <input 
              type="checkbox" 
              id="showOnHome" 
              name="showOnHome" 
              defaultChecked={service.showOnHome}
              className="w-4 h-4 accent-accent"
            />
            <label htmlFor="showOnHome" className="text-sm font-medium text-admin-text">Show on Home Page</label>
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-admin-text">Overview</label>
            <RichTextEditor name="overview" defaultValue={service.overview} />
            <p className="text-xs text-admin-muted">This content appears in the Overview section of the service page.</p>
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-admin-text">Detailed Content</label>
            <RichTextEditor name="content" defaultValue={service.content} />
            <p className="text-xs text-admin-muted">This content appears below the overview or as the main detail.</p>
          </div>

          {/* SEO & ACCESSIBILITY SECTION */}
          <div className="pt-6 border-t border-admin-border space-y-4">
            <h3 className="text-lg font-bold text-admin-text">SEO & Accessibility Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="metaTitle" className="text-sm font-medium text-admin-text">Meta Title (SEO)</label>
                <input 
                  type="text" 
                  id="metaTitle"
                  name="metaTitle" 
                  defaultValue={service.metaTitle || ""}
                  className="bg-black/10 dark:bg-black/20 border border-admin-border rounded-lg px-4 py-3 text-admin-text placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
                  placeholder="Custom title for Google"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="imageAltText" className="text-sm font-medium text-admin-text">Image Alt Text (Accessibility)</label>
                <input 
                  type="text" 
                  id="imageAltText"
                  name="imageAltText" 
                  defaultValue={service.imageAltText || ""}
                  className="bg-black/10 dark:bg-black/20 border border-admin-border rounded-lg px-4 py-3 text-admin-text placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
                  placeholder="Describe banner image"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="metaDescription" className="text-sm font-medium text-admin-text">Meta Description (SEO)</label>
              <textarea 
                id="metaDescription"
                name="metaDescription" 
                rows={2}
                defaultValue={service.metaDescription || ""}
                className="bg-black/10 dark:bg-black/20 border border-admin-border rounded-lg px-4 py-3 text-admin-text placeholder:text-muted focus:outline-none focus:border-accent transition-colors resize-none"
                placeholder="Custom description for Google search results"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-admin-border flex justify-end gap-4">
            <a href="/admin/services" className="px-5 py-2.5 rounded-lg border border-admin-border text-admin-text hover:bg-black/5 dark:bg-white/5 transition-colors">
              Cancel
            </a>
            <Button type="submit">Update Service</Button>
          </div>

        </form>
      </div>
    </div>
  );
}
