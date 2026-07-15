import { redirect } from "next/navigation";
import { auth, signOut } from "@/auth";
import { Sidebar } from "@/components/admin/Sidebar";

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
    <div className="flex flex-col md:flex-row min-h-screen bg-admin-bg">
      <Sidebar userEmail={session.user?.email || null} onSignOut={handleSignOut} />
      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">{children}</main>
    </div>
  );
}
