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
          <h1 className="text-3xl font-bold text-admin-text font-display">Blogs</h1>
          <p className="text-sm text-admin-muted mt-1">Manage your blog articles</p>
        </div>
        <Button href="/admin/blogs/new">
          <Plus size={16} className="mr-1.5" /> Write Post
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-admin-card p-6 rounded-2xl border border-admin-border relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#ffbe00]/5 rounded-full blur-3xl group-hover:bg-[#ffbe00]/10 transition-colors"></div>
          <h3 className="text-admin-muted text-sm font-medium mb-1 relative z-10">Total Articles</h3>
          <p className="text-3xl font-bold text-admin-text relative z-10">{blogs.length}</p>
        </div>
        <div className="bg-admin-card p-6 rounded-2xl border border-admin-border relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl group-hover:bg-purple-500/10 transition-colors"></div>
          <h3 className="text-admin-muted text-sm font-medium mb-1 relative z-10">Published</h3>
          <p className="text-3xl font-bold text-purple-600 dark:text-purple-400 relative z-10">
            {blogs.filter(b => b.published).length}
          </p>
        </div>
        <div className="bg-admin-card p-6 rounded-2xl border border-admin-border relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/20 dark:bg-emerald-500/10 transition-colors"></div>
          <h3 className="text-admin-muted text-sm font-medium mb-1 relative z-10">Articles This Month</h3>
          <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 relative z-10">
            {blogs.filter(b => new Date(b.createdAt).getMonth() === new Date().getMonth()).length}
          </p>
        </div>
      </div>

      {blogs.length === 0 ? (
        <div className="bg-admin-card rounded-2xl border border-admin-border p-16 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#ffbe00]/10 flex items-center justify-center mx-auto mb-4">
            <Plus size={28} className="text-[#ffbe00]" />
          </div>
          <h3 className="text-admin-text font-semibold text-lg mb-2">No Blog Posts Yet</h3>
          <p className="text-admin-muted text-sm mb-6">Write your first blog post to share your insights</p>
          <Button href="/admin/blogs/new">Write First Post</Button>
        </div>
      ) : (
        <div className="bg-admin-card rounded-2xl border border-admin-border overflow-hidden">
          <table className="w-full text-left text-sm text-admin-muted">
            <thead className="bg-black/10 dark:bg-black/20 text-xs uppercase text-admin-text/50 tracking-wider">
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
                <tr key={blog.id} className="border-b border-admin-border hover:bg-white/3 transition-colors">
                  <td className="px-6 py-4 max-w-xs">
                    <p className="font-semibold text-admin-text line-clamp-1">{blog.title}</p>
                    <p className="text-xs text-admin-muted mt-0.5">/{blog.slug}</p>
                  </td>
                  <td className="px-6 py-4 text-admin-muted">{blog.author}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        blog.published
                          ? "bg-green-500/15 text-green-600 dark:text-green-400 border border-green-500/20"
                          : "bg-yellow-500/15 text-yellow-400 border border-yellow-500/20"
                      }`}
                    >
                      {blog.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1.5 text-admin-muted text-xs">
                      <Calendar size={13} />
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <a
                        href={`/blog/${blog.slug}`}
                        target="_blank"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-admin-muted hover:bg-black/5 dark:bg-white/5 hover:text-admin-text border border-transparent hover:border-admin-border transition-all"
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
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-red-600 dark:text-red-400 hover:bg-red-500/10 hover:text-red-700 dark:hover:text-red-300 border border-transparent hover:border-red-500/20 transition-all"
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
