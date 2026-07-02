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
          <h1 className="text-3xl font-bold text-white font-display">Projects</h1>
          <p className="text-sm text-[#dcd7e3]/60 mt-1">{projects.length} total projects</p>
        </div>
        <Button href="/admin/projects/new">
          <Plus size={16} className="mr-1.5" /> Add Project
        </Button>
      </div>

      {projects.length === 0 ? (
        <div className="bg-[#24182e] rounded-2xl border border-white/10 p-16 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#ffbe00]/10 flex items-center justify-center mx-auto mb-4">
            <Plus size={28} className="text-[#ffbe00]" />
          </div>
          <h3 className="text-white font-semibold text-lg mb-2">No Projects Yet</h3>
          <p className="text-[#dcd7e3]/50 text-sm mb-6">Add your first project to showcase your work</p>
          <Button href="/admin/projects/new">Add First Project</Button>
        </div>
      ) : (
        <div className="bg-[#24182e] rounded-2xl border border-white/10 overflow-hidden">
          <table className="w-full text-left text-sm text-[#dcd7e3]/70">
            <thead className="bg-black/20 text-xs uppercase text-white/50 tracking-wider">
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
                <tr key={project.id} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-semibold text-white">{project.title}</p>
                    <p className="text-xs text-[#dcd7e3]/40 mt-0.5 line-clamp-1">{project.description}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1.5 text-[#dcd7e3]/60">
                      <User size={13} />
                      {project.client || "—"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {project.tags.split(",").slice(0, 2).map((tag: string) => (
                        <span key={tag} className="px-2 py-0.5 rounded-full bg-[#ffbe00]/10 text-[#ffbe00] text-xs border border-[#ffbe00]/20">
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1.5 text-[#dcd7e3]/50 text-xs">
                      <Calendar size={13} />
                      {new Date(project.createdAt).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/projects/${project.id}/edit`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-blue-400 hover:bg-blue-500/10 hover:text-blue-300 border border-transparent hover:border-blue-500/20 transition-all"
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
