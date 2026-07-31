"use client";

import { useState } from "react";
import { createUser, updateUser, deleteUser } from "@/lib/actions";
import { User, Mail, Lock, Plus, Loader2, Edit2, Trash2, Shield, X } from "lucide-react";

export function UsersManager({ users }: { users: any[] }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Edit State
  const [editingUser, setEditingUser] = useState<any | null>(null);

  async function handleCreate(formData: FormData) {
    try {
      setIsSubmitting(true);
      setError(null);
      setSuccess(null);
      await createUser(formData);
      setSuccess("User created successfully!");
      (document.getElementById("create-user-form") as HTMLFormElement)?.reset();
    } catch (err: any) {
      setError(err.message || "Failed to create user.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleUpdate(formData: FormData) {
    try {
      setIsSubmitting(true);
      setError(null);
      setSuccess(null);
      await updateUser(formData);
      setSuccess("User updated successfully!");
      setEditingUser(null);
    } catch (err: any) {
      setError(err.message || "Failed to update user.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      setError(null);
      await deleteUser(id);
      setSuccess("User deleted successfully!");
    } catch (err: any) {
      setError(err.message || "Failed to delete user.");
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* User Form (Create / Edit) */}
      <div className="lg:col-span-1">
        <div className="p-6 bg-admin-card border border-admin-border rounded-2xl shadow-sm sticky top-24">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-black/5 dark:bg-white/5 text-[#ffbe00]">
                {editingUser ? <Edit2 size={20} /> : <Plus size={20} />}
              </div>
              <div>
                <h2 className="text-lg font-bold text-admin-text">
                  {editingUser ? "Edit User" : "Create User"}
                </h2>
                <p className="text-sm text-admin-muted">
                  {editingUser ? "Update credentials & role" : "Add a new administrator"}
                </p>
              </div>
            </div>
            {editingUser && (
              <button 
                onClick={() => setEditingUser(null)}
                className="p-1.5 text-admin-muted hover:text-admin-text bg-black/5 dark:bg-white/5 rounded-lg"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <form 
            id={editingUser ? "edit-user-form" : "create-user-form"} 
            action={editingUser ? handleUpdate : handleCreate} 
            className="space-y-4"
          >
            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 text-red-500 text-sm font-medium border border-red-500/20">
                {error}
              </div>
            )}
            {success && (
              <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-500 text-sm font-medium border border-emerald-500/20">
                {success}
              </div>
            )}

            {editingUser && (
              <input type="hidden" name="id" value={editingUser.id} />
            )}

            <div>
              <label className="block text-sm font-medium text-admin-text mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-admin-muted" size={18} />
                <input
                  type="email"
                  name="email"
                  required
                  defaultValue={editingUser?.email || ""}
                  placeholder="admin@example.com"
                  className="w-full bg-black/5 dark:bg-white/5 border border-admin-border rounded-xl py-2.5 pl-10 pr-4 text-admin-text placeholder:text-admin-muted focus:outline-none focus:ring-2 focus:ring-[#ffbe00]/50 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-admin-text mb-1.5">
                {editingUser ? "New Password (Optional)" : "Password"}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-admin-muted" size={18} />
                <input
                  type="password"
                  name="password"
                  required={!editingUser}
                  minLength={6}
                  placeholder={editingUser ? "Leave blank to keep current" : "••••••••"}
                  className="w-full bg-black/5 dark:bg-white/5 border border-admin-border rounded-xl py-2.5 pl-10 pr-4 text-admin-text placeholder:text-admin-muted focus:outline-none focus:ring-2 focus:ring-[#ffbe00]/50 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-admin-text mb-1.5">
                Role
              </label>
              <div className="relative">
                <Shield className="absolute left-3 top-1/2 -translate-y-1/2 text-admin-muted" size={18} />
                <select
                  name="role"
                  defaultValue={editingUser?.role || "admin"}
                  className="w-full bg-black/5 dark:bg-white/5 border border-admin-border rounded-xl py-2.5 pl-10 pr-4 text-admin-text placeholder:text-admin-muted focus:outline-none focus:ring-2 focus:ring-[#ffbe00]/50 transition-all appearance-none"
                >
                  <option value="admin">Admin (Full Access)</option>
                  <option value="editor">Editor (Limited Access)</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 bg-[#ffbe00] hover:bg-[#ffbe00]/90 text-[#24182e] py-2.5 rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-6"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  {editingUser ? "Updating..." : "Creating..."}
                </>
              ) : (
                <>
                  {editingUser ? <Edit2 size={18} /> : <User size={18} />}
                  {editingUser ? "Update User" : "Create User"}
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Users List */}
      <div className="lg:col-span-2">
        <div className="p-6 bg-admin-card border border-admin-border rounded-2xl shadow-sm h-full">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-black/5 dark:bg-white/5 text-[#ffbe00]">
              <User size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-admin-text">Existing Users</h2>
              <p className="text-sm text-admin-muted">Manage administrators access</p>
            </div>
          </div>

          <div className="space-y-3">
            {users.length === 0 ? (
              <div className="p-8 text-center text-admin-muted bg-black/5 dark:bg-white/5 rounded-xl border border-admin-border border-dashed">
                No users found.
              </div>
            ) : (
              users.map((user) => (
                <div 
                  key={user.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 gap-4 rounded-xl bg-black/5 dark:bg-white/5 border border-admin-border hover:border-[#ffbe00]/30 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ffbe00]/20 to-[#ffbe00]/5 flex items-center justify-center text-[#ffbe00] font-bold shadow-inner">
                      {user.email[0].toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-admin-text">{user.email}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${user.role === 'admin' ? 'bg-[#ffbe00]/10 text-[#ffbe00] border border-[#ffbe00]/20' : 'bg-blue-500/10 text-blue-500 border border-blue-500/20'}`}>
                          {user.role}
                        </span>
                        <span className="text-xs text-admin-muted hidden sm:inline-block">ID: {user.id}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <button 
                      onClick={() => setEditingUser(user)}
                      className="p-2 text-admin-muted hover:text-[#ffbe00] bg-black/5 dark:bg-white/5 hover:bg-[#ffbe00]/10 rounded-lg transition-colors border border-transparent hover:border-[#ffbe00]/20"
                      title="Edit User"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(user.id)}
                      className="p-2 text-admin-muted hover:text-red-500 bg-black/5 dark:bg-white/5 hover:bg-red-500/10 rounded-lg transition-colors border border-transparent hover:border-red-500/20"
                      title="Delete User"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
