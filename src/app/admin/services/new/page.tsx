import { createService } from "@/lib/actions";
import { Button } from "@/components/ui/Button";
import { RichTextEditor } from "@/components/editor/RichTextEditor";
import { ImageUpload } from "@/components/ui/ImageUpload";

export default function NewServicePage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-admin-text mb-8">Add New Service</h1>
      
      <div className="bg-admin-card p-8 rounded-2xl border border-admin-border">
        <form action={createService} className="flex flex-col gap-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="title" className="text-sm font-medium text-admin-text">Service Title</label>
              <input 
                type="text" 
                id="title" 
                name="title" 
                required
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
                defaultValue="search"
                className="bg-black/10 dark:bg-black/20 border border-admin-border rounded-lg px-4 py-3 text-admin-text placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="color" className="text-sm font-medium text-admin-text">Brand Color (Hex/Var)</label>
              <input 
                type="text" 
                id="color" 
                name="color" 
                defaultValue="var(--accent)"
                className="bg-black/10 dark:bg-black/20 border border-admin-border rounded-lg px-4 py-3 text-admin-text placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="bentoClass" className="text-sm font-medium text-admin-text">Bento Grid Class</label>
              <input 
                type="text" 
                id="bentoClass" 
                name="bentoClass" 
                defaultValue="md:col-span-1"
                className="bg-black/10 dark:bg-black/20 border border-admin-border rounded-lg px-4 py-3 text-admin-text placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-admin-text">Banner Image (Optional)</label>
            <ImageUpload name="image" />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="shortDescription" className="text-sm font-medium text-admin-text">Short Description</label>
            <textarea 
              id="shortDescription" 
              name="shortDescription" 
              rows={2}
              required
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
              className="bg-black/10 dark:bg-black/20 border border-admin-border rounded-lg px-4 py-3 text-admin-text placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
              placeholder="e.g. React, Node.js, Next.js, Figma"
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-admin-text">Detailed Content</label>
            <RichTextEditor name="content" defaultValue="" />
          </div>

          <div className="pt-4 border-t border-admin-border flex justify-end gap-4">
            <a href="/admin/services" className="px-5 py-2.5 rounded-lg border border-admin-border text-admin-text hover:bg-black/5 dark:bg-white/5 transition-colors">
              Cancel
            </a>
            <Button type="submit">Create Service</Button>
          </div>

        </form>
      </div>
    </div>
  );
}
