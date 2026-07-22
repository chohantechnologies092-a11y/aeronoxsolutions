"use client";

import React, { useState, useTransition } from "react";
import Image from "next/image";
import { Edit, Trash2, CheckCircle2, User, Save, Plus } from "lucide-react";
import { upsertCompanyProfile, createTeamMember, updateTeamMember, deleteTeamMember } from "@/lib/actions";

export function CompanyManager({ initialProfile, initialTeam }: { initialProfile: any, initialTeam: any[] }) {
  const [ceoMessage, setCeoMessage] = useState(initialProfile?.ceoMessage || "");
  const [isPending, startTransition] = useTransition();

  // Team Form State
  const [team, setTeam] = useState(initialTeam);
  const [isEditingTeam, setIsEditingTeam] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [teamForm, setTeamForm] = useState({
    name: "",
    role: "",
    image: ""
  });

  const handleCeoMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("ceoMessage", ceoMessage);
    startTransition(async () => {
      await upsertCompanyProfile(formData);
      alert("CEO Message updated successfully!");
    });
  };

  const resetTeamForm = () => {
    setTeamForm({ name: "", role: "", image: "" });
    setEditingId(null);
    setIsEditingTeam(false);
  };

  const handleTeamSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", teamForm.name);
    formData.append("role", teamForm.role);
    formData.append("image", teamForm.image);

    startTransition(async () => {
      if (editingId) {
        await updateTeamMember(editingId, formData);
        setTeam(team.map(t => t.id === editingId ? { ...t, ...teamForm } : t));
      } else {
        // Optimistic UI for create isn't perfect without ID, but it will refresh via Server Action
        await createTeamMember(formData);
        window.location.reload(); // Simple way to refresh after create to get ID
      }
      resetTeamForm();
    });
  };

  const handleDeleteTeam = async (id: string) => {
    if (!confirm("Are you sure you want to delete this team member?")) return;
    startTransition(async () => {
      await deleteTeamMember(id);
      setTeam(team.filter(t => t.id !== id));
    });
  };

  return (
    <div className="space-y-12">
      {/* CEO Message Section */}
      <section className="bg-admin-card rounded-2xl border border-admin-border p-6 shadow-sm">
        <h2 className="text-xl font-bold text-admin-text mb-6">CEO Message</h2>
        <form onSubmit={handleCeoMessageSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-admin-muted mb-1.5">
              Message content
            </label>
            <textarea
              required
              rows={6}
              value={ceoMessage}
              onChange={(e) => setCeoMessage(e.target.value)}
              className="w-full px-4 py-3 bg-black/5 dark:bg-white/5 border border-admin-border rounded-xl text-admin-text focus:outline-none focus:ring-2 focus:ring-[#ffbe00]/50 focus:border-[#ffbe00] transition-all"
              placeholder="Enter the message from the CEO..."
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isPending}
              className="flex items-center gap-2 px-6 py-2.5 bg-[#ffbe00] text-[#24182e] text-sm font-bold rounded-xl hover:bg-[#ffbe00]/90 transition-colors disabled:opacity-50"
            >
              <Save size={16} /> Save Message
            </button>
          </div>
        </form>
      </section>

      {/* Team Section */}
      <section className="bg-admin-card rounded-2xl border border-admin-border p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold text-admin-text">Team Members</h2>
            <p className="text-sm text-admin-muted mt-1">Manage the people displayed on the Company page.</p>
          </div>
          {!isEditingTeam && (
            <button
              onClick={() => setIsEditingTeam(true)}
              className="flex items-center gap-2 px-4 py-2 bg-black/5 dark:bg-white/5 text-admin-text text-sm font-semibold rounded-xl hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
            >
              <Plus size={16} /> Add Team Member
            </button>
          )}
        </div>

        {isEditingTeam && (
          <form onSubmit={handleTeamSubmit} className="mb-8 p-6 border border-admin-border rounded-xl bg-black/5 dark:bg-white/5 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-admin-muted mb-1.5">Name</label>
                <input
                  type="text"
                  required
                  value={teamForm.name}
                  onChange={(e) => setTeamForm({ ...teamForm, name: e.target.value })}
                  className="w-full px-4 py-2.5 bg-admin-card border border-admin-border rounded-xl text-admin-text focus:outline-none focus:ring-2 focus:ring-[#ffbe00]/50"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-admin-muted mb-1.5">Role</label>
                <input
                  type="text"
                  required
                  value={teamForm.role}
                  onChange={(e) => setTeamForm({ ...teamForm, role: e.target.value })}
                  className="w-full px-4 py-2.5 bg-admin-card border border-admin-border rounded-xl text-admin-text focus:outline-none focus:ring-2 focus:ring-[#ffbe00]/50"
                  placeholder="Chief Executive Officer"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-admin-muted mb-1.5">Image URL</label>
                <input
                  type="url"
                  value={teamForm.image}
                  onChange={(e) => setTeamForm({ ...teamForm, image: e.target.value })}
                  className="w-full px-4 py-2.5 bg-admin-card border border-admin-border rounded-xl text-admin-text focus:outline-none focus:ring-2 focus:ring-[#ffbe00]/50"
                  placeholder="https://example.com/image.jpg (Optional)"
                />
                <p className="text-xs text-admin-muted mt-1.5">Leave blank to use an avatar placeholder with initials.</p>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={resetTeamForm}
                className="px-4 py-2 text-sm font-semibold text-admin-muted hover:text-admin-text transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isPending}
                className="px-6 py-2 bg-[#ffbe00] text-[#24182e] text-sm font-bold rounded-xl hover:bg-[#ffbe00]/90 transition-colors disabled:opacity-50"
              >
                {editingId ? "Update Member" : "Add Member"}
              </button>
            </div>
          </form>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {team.map((member) => (
            <div key={member.id} className="flex flex-col bg-admin-card border border-admin-border rounded-xl p-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-[#ffbe00] to-orange-500 shrink-0 flex items-center justify-center text-white font-black text-lg">
                  {member.image ? (
                    <Image src={member.image} alt={member.name} width={48} height={48} className="w-full h-full object-cover" />
                  ) : (
                    member.name.substring(0, 2).toUpperCase()
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-admin-text truncate">{member.name}</h3>
                  <p className="text-xs text-admin-muted truncate">{member.role}</p>
                </div>
              </div>
              <div className="flex items-center justify-end gap-2 mt-4 pt-4 border-t border-admin-border">
                <button
                  onClick={() => {
                    setTeamForm({ name: member.name, role: member.role, image: member.image || "" });
                    setEditingId(member.id);
                    setIsEditingTeam(true);
                  }}
                  disabled={isPending}
                  className="p-2 text-blue-500 hover:bg-blue-500/10 rounded-lg transition-colors disabled:opacity-50"
                  title="Edit"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDeleteTeam(member.id)}
                  disabled={isPending}
                  className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50"
                  title="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
          {team.length === 0 && !isEditingTeam && (
            <div className="col-span-full py-8 text-center text-admin-muted border border-dashed border-admin-border rounded-xl">
              No team members added yet.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
