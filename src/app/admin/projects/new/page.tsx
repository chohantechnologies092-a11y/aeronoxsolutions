import { createProject } from "@/lib/actions";
import { ProjectForm } from "@/components/admin/ProjectForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewProjectPage() {
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
          <h1 className="text-3xl font-bold text-admin-text">Add New Case Study</h1>
          <p className="text-xs text-admin-muted mt-1">Create a service case study with client before & after impact metrics.</p>
        </div>
      </div>
      
      <ProjectForm action={createProject} />
    </div>
  );
}
