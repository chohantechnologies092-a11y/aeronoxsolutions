import { getBlogs } from "@/lib/data";
import { Button } from "@/components/ui/Button";
import { deleteBlog } from "@/lib/actions";
import { Plus, Trash2, Calendar, Eye, Edit, Tag, Star } from "lucide-react";

export default async function AdminBlogs() {
  const blogs = await getBlogs();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-admin-text font-display">Blog Articles</h1>
          <p className="text-sm text-admin-muted mt-1">Manage articles, rich content, SEO metadata, and tags</p>
        </div>
        <Button href="/admin/blogs/new">
          <Plus size={16} className="mr-1.5" /> Write New Article
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
            {blogs.filter((b) => b.published).length}
          </p>
        </div>
        <div className="bg-admin-card p-6 rounded-2xl border border-admin-border relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/20 dark:bg-emerald-500/10 transition-colors"></div>
          <h3 className="text-admin-muted text-sm font-medium mb-1 relative z-10">Featured Posts</h3>
          <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 relative z-10">
            {blogs.filter((b) => b.featured).length}
          </p>
        </div>
      </div>

      {blogs.length === 0 ? (
        <div className="bg-admin-card rounded-2xl border border-admin-border p-16 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#ffbe00]/10 flex items-center justify-center mx-auto mb-4">
            <Plus size={28} className="text-[#ffbe00]" />
          </div>
          <h3 className="text-admin-text font-semibold text-lg mb-2">No Blog Posts Yet</h3>
          <p className="text-admin-muted text-sm mb-6">Write your first blog post with rich content & SEO tags</p>
          <Button href="/admin/blogs/new">Write First Article</Button>
        </div>
      ) : (
        <div className="bg-admin-card rounded-2xl border border-admin-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-admin-muted">
              <thead className="bg-black/10 dark:bg-black/20 text-xs uppercase text-admin-text/50 tracking-wider">
                <tr>
                  <th className="px-6 py-4">Article</th>
                  <th className="px-6 py-4">Category & Tags</th>
                  <th className="px-6 py-4">Author</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-admin-border">
                {blogs.map((blog) => (
                  <tr key={blog.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 max-w-xs">
                      <div className="flex items-center gap-2">
                        {blog.featured && (
                          <span title="Featured Post">
                            <Star size={14} className="text-[#ffbe00] fill-[#ffbe00] shrink-0" />
                          </span>
                        )}
                        <p className="font-bold text-admin-text line-clamp-1">{blog.title}</p>
                      </div>
                      <p className="text-xs text-admin-muted font-mono mt-0.5">/blog/{blog.slug}</p>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-semibold text-[#ffbe00]">
                          {blog.category || "General"}
                        </span>
                        {Array.isArray(blog.tags) && blog.tags.length > 0 && (
                          <div className="flex items-center gap-1 flex-wrap">
                            {blog.tags.slice(0, 2).map((t: string) => (
                              <span key={t} className="px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10 text-[10px] text-admin-muted">
                                #{t}
                              </span>
                            ))}
                            {blog.tags.length > 2 && (
                              <span className="text-[10px] text-admin-muted">+{blog.tags.length - 2}</span>
                            )}
                          </div>
                        )}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <p className="text-xs font-semibold text-admin-text">{blog.author || "Admin"}</p>
                      {blog.authorRole && (
                        <p className="text-[10px] text-admin-muted">{blog.authorRole}</p>
                      )}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                          blog.published
                            ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20"
                            : "bg-amber-500/15 text-amber-400 border border-amber-500/20"
                        }`}
                      >
                        {blog.published ? "Published" : "Draft"}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="flex items-center gap-1.5 text-admin-muted text-xs">
                        <Calendar size={13} />
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={`/blog/${blog.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-admin-muted hover:text-admin-text hover:bg-black/5 dark:hover:bg-white/10 rounded-xl transition-colors"
                          title="Preview Post"
                        >
                          <Eye size={16} />
                        </a>

                        <a
                          href={`/admin/blogs/${blog.id}/edit`}
                          className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-xl transition-colors"
                          title="Edit Post & SEO"
                        >
                          <Edit size={16} />
                        </a>

                        <form
                          action={async () => {
                            "use server";
                            await deleteBlog(blog.id);
                          }}
                        >
                          <button
                            type="submit"
                            className="p-2 text-red-500 hover:bg-red-500/10 rounded-xl transition-colors"
                            title="Delete Post"
                          >
                            <Trash2 size={16} />
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
