import { updateProject } from "@/lib/actions";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { getProjectById } from "@/lib/data";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  const project = await getProjectById(id);

  if (!project) {
    notFound();
  }

  const updateProjectWithId = updateProject.bind(null, id);

  return (
    <div className="max-w-5xl mx-auto pb-12">
      <div className="flex items-center gap-4 mb-6">
        <Link 
          href="/admin/projects" 
          className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-admin-text transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-admin-text">Edit Case Study: {project.title}</h1>
          <p className="text-xs text-admin-muted mt-1">Update service category, client details, and before vs after impact metrics.</p>
        </div>
      </div>
      
      <ProjectForm project={project} action={updateProjectWithId} />
    </div>
  );
}
