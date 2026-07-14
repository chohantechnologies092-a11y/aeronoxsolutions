import Link from "next/link";
import { redirect } from "next/navigation";
import { auth, signOut } from "@/auth";
import { siteConfig } from "@/lib/constants";
import { LayoutDashboard, FolderKanban, FileText, Search, LogOut, Globe, Layers, Users, Settings } from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/services", label: "Services", icon: Layers },
  { href: "/admin/clients", label: "Clients", icon: Users },
  { href: "/admin/blogs", label: "Blogs", icon: FileText },
  { href: "/admin/seo", label: "Global SEO", icon: Search },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // Middleware already handles unauthenticated redirect to /admin/login.
  // Here we fetch the session to decide whether to show the sidebar or just render children.
  const session = await auth();

  // If there's no session, redirect to the login page.
  if (!session) {
    redirect("/login");
  }

  async function handleSignOut() {
    "use server";
    await signOut({ redirectTo: "/login" });
  }

  return (
    <div className="flex min-h-screen bg-[#1b1223]">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 bg-[#24182e] border-r border-white/8 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-white/8">
          <Link href="/admin" className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#ffbe00] to-white text-[#24182e] text-base font-black shadow-[0_0_15px_rgba(255,190,0,0.3)] transition-transform group-hover:scale-105">
              A
            </div>
            <div>
              <p className="font-display text-sm font-bold text-white">{siteConfig.name}</p>
              <p className="text-xs text-[#dcd7e3]/50">Admin Panel</p>
            </div>
          </Link>
        </div>

        {/* User info */}
        <div className="px-4 py-3 border-b border-white/8">
          <div className="flex items-center gap-3 px-2 py-2 rounded-lg bg-white/5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ffbe00]/30 to-white/10 flex items-center justify-center text-xs font-bold text-[#ffbe00]">
              {session.user?.email?.[0]?.toUpperCase() ?? "A"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-white truncate">{session.user?.email}</p>
              <p className="text-xs text-[#dcd7e3]/40">Administrator</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 flex flex-col gap-1">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[#dcd7e3]/70 hover:text-white hover:bg-white/5 transition-all group"
            >
              <Icon
                size={18}
                className="text-[#dcd7e3]/40 group-hover:text-[#ffbe00] transition-colors"
              />
              {label}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white/8 flex flex-col gap-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[#dcd7e3]/50 hover:text-white hover:bg-white/5 transition-all group"
          >
            <Globe
              size={18}
              className="group-hover:text-[#ffbe00] transition-colors"
            />
            View Website
          </Link>
          <form action={handleSignOut}>
            <button
              type="submit"
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[#dcd7e3]/50 hover:text-red-400 hover:bg-red-500/10 transition-all group"
            >
              <LogOut
                size={18}
                className="group-hover:text-red-400 transition-colors"
              />
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  );
}
