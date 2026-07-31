import { getUsers } from "@/lib/actions";
import { UsersManager } from "@/components/admin/UsersManager";
import { Users } from "lucide-react";

export const metadata = {
  title: "Users | Admin Dashboard",
  description: "Manage admin users",
};

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-admin-text flex items-center gap-3">
            <Users className="text-[#ffbe00]" size={32} />
            Users
          </h1>
          <p className="text-admin-muted mt-1">Manage system administrators and user access.</p>
        </div>
      </div>

      <UsersManager users={users} />
    </div>
  );
}
