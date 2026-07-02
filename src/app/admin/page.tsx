import { prisma } from "@/lib/db";

export default async function AdminDashboard() {
  const projectsCount = await prisma.project.count();
  const blogsCount = await prisma.blog.count();

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#24182e] p-6 rounded-2xl border border-white/10">
          <h3 className="text-muted text-sm font-medium">Total Projects</h3>
          <p className="text-4xl font-bold text-[#ffbe00] mt-2">{projectsCount}</p>
        </div>
        <div className="bg-[#24182e] p-6 rounded-2xl border border-white/10">
          <h3 className="text-muted text-sm font-medium">Total Blogs</h3>
          <p className="text-4xl font-bold text-[#ffbe00] mt-2">{blogsCount}</p>
        </div>
        <div className="bg-[#24182e] p-6 rounded-2xl border border-white/10">
          <h3 className="text-muted text-sm font-medium">SEO Status</h3>
          <p className="text-xl font-bold text-[#00ff94] mt-2">Active</p>
        </div>
      </div>
    </div>
  );
}
