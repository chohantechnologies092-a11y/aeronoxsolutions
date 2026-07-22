"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { siteConfig } from "@/lib/constants";
import { 
  LayoutDashboard, FolderKanban, FileText, Search, LogOut, Globe, 
  Layers, Users, Settings, Magnet, BarChart3, Menu, X, ChevronLeft, 
  ChevronRight, Sun, Moon, Building2
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/company", label: "Company Profile", icon: Building2 },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/services", label: "Services", icon: Layers },
  { href: "/admin/clients", label: "Clients", icon: Users },
  { href: "/admin/blogs", label: "Blogs", icon: FileText },
  { href: "/admin/seo", label: "Global SEO", icon: Search },
  { href: "/admin/leads", label: "Leads", icon: Magnet },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function Sidebar({ 
  userEmail, 
  onSignOut 
}: { 
  userEmail: string | null; 
  onSignOut: () => void;
}) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const navContent = (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className={`p-6 border-b border-admin-border flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
        <Link href="/admin" className={`flex items-center gap-3 group ${isCollapsed ? 'justify-center' : ''}`}>
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#ffbe00] to-white text-[#24182e] text-base font-black shadow-[0_0_15px_rgba(255,190,0,0.3)] transition-transform group-hover:scale-105">
            A
          </div>
          {!isCollapsed && (
            <div>
              <p className="font-display text-sm font-bold text-admin-text">{siteConfig.name}</p>
              <p className="text-xs text-admin-muted">Admin Panel</p>
            </div>
          )}
        </Link>
        {/* Desktop Collapse Toggle */}
        {!isCollapsed && (
          <button 
            onClick={() => setIsCollapsed(true)} 
            className="hidden md:flex p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-admin-muted transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
        )}
      </div>

      {isCollapsed && (
        <div className="hidden md:flex justify-center p-2 border-b border-admin-border">
          <button 
            onClick={() => setIsCollapsed(false)} 
            className="p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-admin-muted transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}

      {/* User info */}
      <div className={`px-4 py-3 border-b border-admin-border ${isCollapsed ? 'hidden' : 'block'}`}>
        <div className="flex items-center gap-3 px-2 py-2 rounded-lg bg-black/5 dark:bg-white/5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ffbe00]/30 to-white/10 flex items-center justify-center text-xs font-bold text-[#ffbe00]">
            {userEmail?.[0]?.toUpperCase() ?? "A"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-admin-text truncate">{userEmail}</p>
            <p className="text-xs text-admin-muted">Administrator</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 flex flex-col gap-1 overflow-y-auto custom-scrollbar">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || (href !== "/admin" && pathname?.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              title={isCollapsed ? label : undefined}
              className={`flex items-center ${isCollapsed ? 'justify-center px-0' : 'gap-3 px-3'} py-2.5 rounded-xl text-sm font-medium transition-all group ${
                isActive 
                  ? "bg-black/5 dark:bg-white/5 text-admin-text" 
                  : "text-admin-muted hover:text-admin-text hover:bg-black/5 dark:hover:bg-white/5"
              }`}
            >
              <Icon
                size={18}
                className={`${isActive ? "text-[#ffbe00]" : "text-admin-muted group-hover:text-[#ffbe00]"} transition-colors`}
              />
              {!isCollapsed && label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-admin-border flex flex-col gap-2">
        <button
          onClick={toggleTheme}
          title={isCollapsed ? "Toggle Theme" : undefined}
          className={`flex items-center ${isCollapsed ? 'justify-center px-0' : 'gap-3 px-3'} py-2.5 rounded-xl text-sm font-medium text-admin-muted hover:text-admin-text hover:bg-black/5 dark:hover:bg-white/5 transition-all group`}
        >
          {mounted ? (
            theme === 'dark' ? (
              <Sun size={18} className="group-hover:text-[#ffbe00] transition-colors" />
            ) : (
              <Moon size={18} className="group-hover:text-[#ffbe00] transition-colors" />
            )
          ) : (
            <Sun size={18} className="opacity-0" />
          )}
          {!isCollapsed && (mounted ? (theme === 'dark' ? "Light Mode" : "Dark Mode") : "Toggle Theme")}
        </button>

        <Link
          href="/"
          target="_blank"
          title={isCollapsed ? "View Website" : undefined}
          className={`flex items-center ${isCollapsed ? 'justify-center px-0' : 'gap-3 px-3'} py-2.5 rounded-xl text-sm font-medium text-admin-muted hover:text-admin-text hover:bg-black/5 dark:hover:bg-white/5 transition-all group`}
        >
          <Globe
            size={18}
            className="group-hover:text-[#ffbe00] transition-colors"
          />
          {!isCollapsed && "View Website"}
        </Link>
        
        <form action={onSignOut}>
          <button
            type="submit"
            title={isCollapsed ? "Sign Out" : undefined}
            className={`w-full flex items-center ${isCollapsed ? 'justify-center px-0' : 'gap-3 px-3'} py-2.5 rounded-xl text-sm font-medium text-admin-muted hover:text-red-500 hover:bg-red-500/10 transition-all group`}
          >
            <LogOut
              size={18}
              className="group-hover:text-red-500 transition-colors"
            />
            {!isCollapsed && "Sign Out"}
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-admin-card border-b border-admin-border sticky top-0 z-40">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#ffbe00] to-white text-[#24182e] text-sm font-black">
            A
          </div>
          <p className="font-display text-sm font-bold text-admin-text">{siteConfig.name}</p>
        </Link>
        <button 
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2 -mr-2 text-admin-text"
        >
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Desktop Sidebar */}
      <aside className={`hidden md:flex flex-col bg-admin-card border-r border-admin-border sticky top-0 h-screen transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'} shrink-0`}>
        {navContent}
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-admin-card border-r border-admin-border transform transition-transform duration-300 md:hidden ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {navContent}
      </aside>
    </>
  );
}
