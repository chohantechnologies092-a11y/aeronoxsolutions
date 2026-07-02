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
          className="flex items-center gap-2 text-sm text-[#dcd7e3]/60 hover:text-white transition-colors"
        >
          <ArrowLeft size={16} /> Back
        </Link>
        <div className="w-px h-4 bg-white/10" />
        <h1 className="text-2xl font-bold text-white font-display">Write New Blog Post</h1>
      </div>

      <div className="bg-[#24182e] p-8 rounded-2xl border border-white/10">
        <form action={createBlog} className="flex flex-col gap-6">
          {/* Title */}
          <div className="flex flex-col gap-2">
            <label htmlFor="blog-title" className="text-sm font-medium text-white">
              Blog Title <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              id="blog-title"
              name="title"
              required
              className="bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#ffbe00]/50 focus:ring-1 focus:ring-[#ffbe00]/20 transition-all"
              placeholder="e.g. The Future of AI in Web Development"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Author */}
            <div className="flex flex-col gap-2">
              <label htmlFor="blog-author" className="text-sm font-medium text-white">Author</label>
              <input
                type="text"
                id="blog-author"
                name="author"
                defaultValue="Admin"
                className="bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#ffbe00]/50 focus:ring-1 focus:ring-[#ffbe00]/20 transition-all"
              />
            </div>
            
            {/* Cover Image */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-white">Cover Image</label>
              <ImageUpload name="coverImage" />
            </div>
          </div>

          {/* Excerpt */}
          <div className="flex flex-col gap-2">
            <label htmlFor="blog-excerpt" className="text-sm font-medium text-white">
              Short Excerpt{" "}
              <span className="text-[#dcd7e3]/40 font-normal">(optional — auto-generated if empty)</span>
            </label>
            <textarea
              id="blog-excerpt"
              name="excerpt"
              rows={2}
              className="bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#ffbe00]/50 focus:ring-1 focus:ring-[#ffbe00]/20 transition-all resize-none text-sm"
              placeholder="A brief summary shown in the blog listing..."
            />
          </div>

          {/* Content */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-white">
              Content <span className="text-red-400">*</span>
            </label>
            <RichTextEditor name="content" />
          </div>

          <div className="pt-4 border-t border-white/8 flex justify-end gap-4">
            <Link
              href="/admin/blogs"
              className="px-5 py-2.5 rounded-xl border border-white/10 text-white text-sm hover:bg-white/5 transition-colors"
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
