import { getProjects } from "@/lib/data";
import { Button } from "@/components/ui/Button";
import { Plus } from "lucide-react";
import { ProjectsManager } from "@/components/admin/ProjectsManager";

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
        <div className="bg-admin-card rounded-2xl border border-admin-border p-16 text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-[#ffbe00]/10 flex items-center justify-center mx-auto mb-4">
            <Plus size={28} className="text-[#ffbe00]" />
          </div>
          <h3 className="text-admin-text font-semibold text-lg mb-2">No Projects Yet</h3>
          <p className="text-admin-muted text-sm mb-6">Add your first project to showcase your work</p>
          <Button href="/admin/projects/new">Add First Project</Button>
        </div>
      ) : (
        <ProjectsManager initialProjects={projects} />
      )}
    </div>
  );
}
