import { getBlogs } from "@/lib/data";
import { Button } from "@/components/ui/Button";
import { deleteBlog } from "@/lib/actions";
import { Plus, Trash2, Calendar, Eye } from "lucide-react";

export default async function AdminBlogs() {
  const blogs = await getBlogs();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white font-display">Blogs</h1>
          <p className="text-sm text-[#dcd7e3]/60 mt-1">{blogs.length} total posts</p>
        </div>
        <Button href="/admin/blogs/new">
          <Plus size={16} className="mr-1.5" /> Write Post
        </Button>
      </div>

      {blogs.length === 0 ? (
        <div className="bg-[#24182e] rounded-2xl border border-white/10 p-16 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#ffbe00]/10 flex items-center justify-center mx-auto mb-4">
            <Plus size={28} className="text-[#ffbe00]" />
          </div>
          <h3 className="text-white font-semibold text-lg mb-2">No Blog Posts Yet</h3>
          <p className="text-[#dcd7e3]/50 text-sm mb-6">Write your first blog post to share your insights</p>
          <Button href="/admin/blogs/new">Write First Post</Button>
        </div>
      ) : (
        <div className="bg-[#24182e] rounded-2xl border border-white/10 overflow-hidden">
          <table className="w-full text-left text-sm text-[#dcd7e3]/70">
            <thead className="bg-black/20 text-xs uppercase text-white/50 tracking-wider">
              <tr>
                <th className="px-6 py-4">Post</th>
                <th className="px-6 py-4">Author</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog.id} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                  <td className="px-6 py-4 max-w-xs">
                    <p className="font-semibold text-white line-clamp-1">{blog.title}</p>
                    <p className="text-xs text-[#dcd7e3]/40 mt-0.5">/{blog.slug}</p>
                  </td>
                  <td className="px-6 py-4 text-[#dcd7e3]/60">{blog.author}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        blog.published
                          ? "bg-green-500/15 text-green-400 border border-green-500/20"
                          : "bg-yellow-500/15 text-yellow-400 border border-yellow-500/20"
                      }`}
                    >
                      {blog.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1.5 text-[#dcd7e3]/50 text-xs">
                      <Calendar size={13} />
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <a
                        href={`/blog/${blog.slug}`}
                        target="_blank"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-[#dcd7e3]/50 hover:bg-white/5 hover:text-white border border-transparent hover:border-white/10 transition-all"
                      >
                        <Eye size={13} /> View
                      </a>
                      <form
                        action={async () => {
                          "use server";
                          await deleteBlog(blog.id);
                        }}
                      >
                        <button
                          type="submit"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-red-400 hover:bg-red-500/10 hover:text-red-300 border border-transparent hover:border-red-500/20 transition-all"
                        >
                          <Trash2 size={13} /> Delete
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
