import { createProject } from "@/lib/actions";
import { Button } from "@/components/ui/Button";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { RichTextEditor } from "@/components/editor/RichTextEditor";

export default function NewProjectPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-admin-text mb-8">Add New Project</h1>
      
      <div className="bg-admin-card p-8 rounded-2xl border border-admin-border">
        <form action={createProject} className="flex flex-col gap-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="title" className="text-sm font-medium text-admin-text">Project Title</label>
              <input 
                type="text" 
                id="title" 
                name="title" 
                required
                className="bg-black/10 dark:bg-black/20 border border-admin-border rounded-lg px-4 py-3 text-admin-text placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
                placeholder="e.g. E-Commerce Replatforming"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="slug" className="text-sm font-medium text-admin-text">Slug (Optional, auto-generated)</label>
              <input 
                type="text" 
                id="slug" 
                name="slug" 
                className="bg-black/10 dark:bg-black/20 border border-admin-border rounded-lg px-4 py-3 text-admin-text placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
                placeholder="e.g. e-commerce-replatforming"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="client" className="text-sm font-medium text-admin-text">Client Name (Optional)</label>
              <input 
                type="text" 
                id="client" 
                name="client"
                className="bg-black/10 dark:bg-black/20 border border-admin-border rounded-lg px-4 py-3 text-admin-text placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
                placeholder="e.g. Acme Corp"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="tags" className="text-sm font-medium text-admin-text">Tags (Comma separated)</label>
              <input 
                type="text" 
                id="tags" 
                name="tags" 
                required
                className="bg-black/10 dark:bg-black/20 border border-admin-border rounded-lg px-4 py-3 text-admin-text placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
                placeholder="e.g. Next.js, Tailwind, Stripe"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-admin-text">Project Image</label>
            <ImageUpload name="image" />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="description" className="text-sm font-medium text-admin-text">Short Description</label>
            <textarea 
              id="description" 
              name="description" 
              rows={2}
              required
              className="bg-black/10 dark:bg-black/20 border border-admin-border rounded-lg px-4 py-3 text-admin-text placeholder:text-muted focus:outline-none focus:border-accent transition-colors resize-none"
              placeholder="Brief summary for the card..."
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-admin-text">Detailed Content</label>
            <RichTextEditor name="content" defaultValue="" />
          </div>

          <div className="pt-4 border-t border-admin-border flex justify-end gap-4">
            <a href="/admin/projects" className="px-5 py-2.5 rounded-lg border border-admin-border text-admin-text hover:bg-black/5 dark:bg-white/5 transition-colors">
              Cancel
            </a>
            <Button type="submit">Create Project</Button>
          </div>

        </form>
      </div>
    </div>
  );
}
