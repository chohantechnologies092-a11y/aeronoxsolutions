import { getProjects } from "@/lib/data";
import { Button } from "@/components/ui/Button";
import { deleteProject } from "@/lib/actions";
import { Plus, Trash2, Calendar, User, Edit } from "lucide-react";
import Link from "next/link";

export default async function AdminProjects() {
  const projects = await getProjects();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-admin-text font-display">Projects</h1>
          <p className="text-sm text-admin-muted mt-1">Manage your portfolio projects</p>
        </div>
        <Button href="/admin/projects/new">
          <Plus size={16} className="mr-1.5" /> Add Project
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-admin-card p-6 rounded-2xl border border-admin-border relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#ffbe00]/5 rounded-full blur-3xl group-hover:bg-[#ffbe00]/10 transition-colors"></div>
          <h3 className="text-admin-muted text-sm font-medium mb-1 relative z-10">Total Projects</h3>
          <p className="text-3xl font-bold text-admin-text relative z-10">{projects.length}</p>
        </div>
        <div className="bg-admin-card p-6 rounded-2xl border border-admin-border relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/20 dark:bg-emerald-500/10 transition-colors"></div>
          <h3 className="text-admin-muted text-sm font-medium mb-1 relative z-10">Added This Month</h3>
          <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 relative z-10">
            {projects.filter(p => new Date(p.createdAt).getMonth() === new Date().getMonth()).length}
          </p>
        </div>
        <div className="bg-admin-card p-6 rounded-2xl border border-admin-border relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#00c2ff]/5 rounded-full blur-3xl group-hover:bg-cyan-500/20 dark:bg-[#00c2ff]/10 transition-colors"></div>
          <h3 className="text-admin-muted text-sm font-medium mb-1 relative z-10">Unique Clients</h3>
          <p className="text-3xl font-bold text-cyan-600 dark:text-[#00c2ff] relative z-10">
            {new Set(projects.map(p => p.client).filter(c => c)).size}
          </p>
        </div>
      </div>

      {projects.length === 0 ? (
        <div className="bg-admin-card rounded-2xl border border-admin-border p-16 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#ffbe00]/10 flex items-center justify-center mx-auto mb-4">
            <Plus size={28} className="text-[#ffbe00]" />
          </div>
          <h3 className="text-admin-text font-semibold text-lg mb-2">No Projects Yet</h3>
          <p className="text-admin-muted text-sm mb-6">Add your first project to showcase your work</p>
          <Button href="/admin/projects/new">Add First Project</Button>
        </div>
      ) : (
        <div className="bg-admin-card rounded-2xl border border-admin-border overflow-hidden">
          <table className="w-full text-left text-sm text-admin-muted">
            <thead className="bg-black/10 dark:bg-black/20 text-xs uppercase text-admin-text/50 tracking-wider">
              <tr>
                <th className="px-6 py-4">Project</th>
                <th className="px-6 py-4">Client</th>
                <th className="px-6 py-4">Tags</th>
                <th className="px-6 py-4">Added</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className="border-b border-admin-border hover:bg-white/3 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-semibold text-admin-text">{project.title}</p>
                    <p className="text-xs text-admin-muted mt-0.5 line-clamp-1">{project.description}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1.5 text-admin-muted">
                      <User size={13} />
                      {project.client || "—"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {(project.tags || "").split(",").filter((tag: string) => tag.trim() !== "").slice(0, 2).map((tag: string) => (
                        <span key={tag} className="px-2 py-0.5 rounded-full bg-[#ffbe00]/10 text-[#ffbe00] text-xs border border-[#ffbe00]/20">
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1.5 text-admin-muted text-xs">
                      <Calendar size={13} />
                      {new Date(project.createdAt).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/projects/${project.id}/edit`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-blue-600 dark:text-blue-400 hover:bg-blue-500/10 hover:text-blue-700 dark:hover:text-blue-300 border border-transparent hover:border-blue-500/20 transition-all"
                      >
                        <Edit size={13} /> Edit
                      </Link>
                      <form
                        action={async () => {
                          "use server";
                          await deleteProject(project.id);
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
