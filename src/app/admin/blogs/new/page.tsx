import { createBlog } from "@/lib/actions";
import { Button } from "@/components/ui/Button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { RichTextEditor } from "@/components/editor/RichTextEditor";
import { ImageUpload } from "@/components/ui/ImageUpload";

export default function NewBlogPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <Link
          href="/admin/blogs"
          className="flex items-center gap-2 text-sm text-admin-muted hover:text-admin-text transition-colors"
        >
          <ArrowLeft size={16} /> Back
        </Link>
        <div className="w-px h-4 bg-black/10 dark:bg-white/10" />
        <h1 className="text-2xl font-bold text-admin-text font-display">Write New Blog Post</h1>
      </div>

      <div className="bg-admin-card p-8 rounded-2xl border border-admin-border">
        <form action={createBlog} className="flex flex-col gap-6">
          {/* Title */}
          <div className="flex flex-col gap-2">
            <label htmlFor="blog-title" className="text-sm font-medium text-admin-text">
              Blog Title <span className="text-red-600 dark:text-red-400">*</span>
            </label>
            <input
              type="text"
              id="blog-title"
              name="title"
              required
              className="bg-black/10 dark:bg-black/20 border border-admin-border rounded-xl px-4 py-3 text-admin-text placeholder:text-admin-text/30 focus:outline-none focus:border-[#ffbe00]/50 focus:ring-1 focus:ring-[#ffbe00]/20 transition-all"
              placeholder="e.g. The Future of AI in Web Development"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Author */}
            <div className="flex flex-col gap-2">
              <label htmlFor="blog-author" className="text-sm font-medium text-admin-text">Author</label>
              <input
                type="text"
                id="blog-author"
                name="author"
                defaultValue="Admin"
                className="bg-black/10 dark:bg-black/20 border border-admin-border rounded-xl px-4 py-3 text-admin-text placeholder:text-admin-text/30 focus:outline-none focus:border-[#ffbe00]/50 focus:ring-1 focus:ring-[#ffbe00]/20 transition-all"
              />
            </div>
            
            {/* Cover Image */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-admin-text">Cover Image</label>
              <ImageUpload name="coverImage" />
            </div>
          </div>

          {/* Excerpt */}
          <div className="flex flex-col gap-2">
            <label htmlFor="blog-excerpt" className="text-sm font-medium text-admin-text">
              Short Excerpt{" "}
              <span className="text-admin-muted font-normal">(optional — auto-generated if empty)</span>
            </label>
            <textarea
              id="blog-excerpt"
              name="excerpt"
              rows={2}
              className="bg-black/10 dark:bg-black/20 border border-admin-border rounded-xl px-4 py-3 text-admin-text placeholder:text-admin-text/30 focus:outline-none focus:border-[#ffbe00]/50 focus:ring-1 focus:ring-[#ffbe00]/20 transition-all resize-none text-sm"
              placeholder="A brief summary shown in the blog listing..."
            />
          </div>

          {/* Content */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-admin-text">
              Content <span className="text-red-600 dark:text-red-400">*</span>
            </label>
            <RichTextEditor name="content" />
          </div>

          <div className="pt-4 border-t border-admin-border flex justify-end gap-4">
            <Link
              href="/admin/blogs"
              className="px-5 py-2.5 rounded-xl border border-admin-border text-admin-text text-sm hover:bg-black/5 dark:bg-white/5 transition-colors"
            >
              Cancel
            </Link>
            <Button type="submit">Publish Post</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
