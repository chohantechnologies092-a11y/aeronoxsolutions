"use client";

import React, { useState, useTransition } from "react";
import Image from "next/image";
import { Edit, Trash2, Save, Plus, ArrowUp, ArrowDown, Mail, X, User } from "lucide-react";
import { FaLinkedin } from "react-icons/fa6";
import { upsertCompanyProfile, createTeamMember, updateTeamMember, deleteTeamMember, updateTeamMemberOrder } from "@/lib/actions";
import { ImageUpload } from "@/components/ui/ImageUpload";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  image?: string | null;
  bio?: string | null;
  linkedin?: string | null;
  email?: string | null;
  order?: number;
}

export function CompanyManager({ 
  initialProfile, 
  initialTeam 
}: { 
  initialProfile: any; 
  initialTeam: TeamMember[]; 
}) {
  const [ceoMessage, setCeoMessage] = useState(initialProfile?.ceoMessage || "");
  const [ceoImage, setCeoImage] = useState(initialProfile?.ceoImage || "");
  const [isPending, startTransition] = useTransition();

  // Team Form State
  const [team, setTeam] = useState<TeamMember[]>(initialTeam || []);
  const [isEditingTeam, setIsEditingTeam] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [teamForm, setTeamForm] = useState({
    name: "",
    role: "",
    image: "",
    bio: "",
    linkedin: "",
    email: "",
  });

  const handleCeoMessageSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("ceoMessage", ceoMessage);
    const formElements = e.currentTarget.elements as any;
    formData.append("ceoImage", formElements.ceoImage?.value || "");

    startTransition(async () => {
      await upsertCompanyProfile(formData);
      alert("CEO Section updated successfully!");
    });
  };

  const resetTeamForm = () => {
    setTeamForm({ name: "", role: "", image: "", bio: "", linkedin: "", email: "" });
    setEditingId(null);
    setIsEditingTeam(false);
  };

  const openEditMember = (member: TeamMember) => {
    setTeamForm({
      name: member.name || "",
      role: member.role || "",
      image: member.image || "",
      bio: member.bio || "",
      linkedin: member.linkedin || "",
      email: member.email || "",
    });
    setEditingId(member.id);
    setIsEditingTeam(true);
  };

  const handleTeamSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formElements = e.currentTarget.elements as any;
    const imageVal = formElements.image?.value || "";

    const formData = new FormData();
    formData.append("name", teamForm.name);
    formData.append("role", teamForm.role);
    formData.append("image", imageVal);
    formData.append("bio", teamForm.bio);
    formData.append("linkedin", teamForm.linkedin);
    formData.append("email", teamForm.email);

    startTransition(async () => {
      if (editingId) {
        await updateTeamMember(editingId, formData);
        setTeam((prev) =>
          prev.map((t) => (t.id === editingId ? { ...t, ...teamForm, image: imageVal } : t))
        );
      } else {
        const result = await createTeamMember(formData);
        const newMember: TeamMember = {
          id: result?.id || Date.now().toString(),
          ...teamForm,
          image: imageVal,
          order: team.length,
        };
        setTeam((prev) => [...prev, newMember]);
      }
      resetTeamForm();
    });
  };

  const handleDeleteTeam = async (id: string) => {
    if (!confirm("Are you sure you want to delete this team member?")) return;
    startTransition(async () => {
      await deleteTeamMember(id);
      setTeam((prev) => prev.filter((t) => t.id !== id));
    });
  };

  const handleMoveMember = async (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= team.length) return;

    const newTeam = [...team];
    const [moved] = newTeam.splice(index, 1);
    newTeam.splice(targetIndex, 0, moved);

    // Update order property
    const reorderedTeam = newTeam.map((member, idx) => ({ ...member, order: idx }));
    setTeam(reorderedTeam);

    const orderedIds = reorderedTeam.map((member) => member.id);
    startTransition(async () => {
      await updateTeamMemberOrder(orderedIds);
    });
  };

  return (
    <div className="space-y-12">
      {/* CEO Message Section */}
      <section className="bg-admin-card rounded-2xl border border-admin-border p-6 shadow-sm">
        <h2 className="text-xl font-bold text-admin-text mb-6 flex items-center gap-2">
          <User className="text-[#ffbe00]" size={20} /> CEO Message
        </h2>
        <form onSubmit={handleCeoMessageSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-admin-muted mb-1.5">
              Message Content
            </label>
            <textarea
              required
              rows={5}
              value={ceoMessage}
              onChange={(e) => setCeoMessage(e.target.value)}
              className="w-full px-4 py-3 bg-black/5 dark:bg-white/5 border border-admin-border rounded-xl text-admin-text focus:outline-none focus:ring-2 focus:ring-[#ffbe00]/50 focus:border-[#ffbe00] transition-all"
              placeholder="Enter the message from the CEO..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-admin-muted mb-1.5">
              CEO Image
            </label>
            <ImageUpload name="ceoImage" defaultValue={ceoImage} />
          </div>
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={isPending}
              className="flex items-center gap-2 px-6 py-2.5 bg-[#ffbe00] text-[#24182e] text-sm font-bold rounded-xl hover:bg-[#ffbe00]/90 transition-colors disabled:opacity-50"
            >
              <Save size={16} /> Save CEO Message
            </button>
          </div>
        </form>
      </section>

      {/* Team Section */}
      <section className="bg-admin-card rounded-2xl border border-admin-border p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold text-admin-text">Team Members & Position Adjustment</h2>
            <p className="text-sm text-admin-muted mt-1">
              Add, edit, reorder, or remove team members displayed on the public About page.
            </p>
          </div>
          {!isEditingTeam && (
            <button
              onClick={() => setIsEditingTeam(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#ffbe00] text-[#24182e] text-sm font-bold rounded-xl hover:bg-[#ffbe00]/90 transition-colors shadow-sm"
            >
              <Plus size={16} /> Add Team Member
            </button>
          )}
        </div>

        {/* Team Member Add/Edit Form */}
        {isEditingTeam && (
          <form
            onSubmit={handleTeamSubmit}
            className="mb-8 p-6 border border-admin-border rounded-2xl bg-black/5 dark:bg-white/5 space-y-5 relative"
          >
            <div className="flex items-center justify-between pb-3 border-b border-admin-border">
              <h3 className="font-bold text-admin-text">
                {editingId ? "Edit Team Member" : "Create New Team Member"}
              </h3>
              <button
                type="button"
                onClick={resetTeamForm}
                className="text-admin-muted hover:text-admin-text transition-colors p-1"
              >
                <X size={18} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-admin-muted mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={teamForm.name}
                  onChange={(e) => setTeamForm({ ...teamForm, name: e.target.value })}
                  className="w-full px-4 py-2.5 bg-admin-card border border-admin-border rounded-xl text-admin-text focus:outline-none focus:ring-2 focus:ring-[#ffbe00]/50"
                  placeholder="e.g. Alex Morgan"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-admin-muted mb-1.5">
                  Role / Position *
                </label>
                <input
                  type="text"
                  required
                  value={teamForm.role}
                  onChange={(e) => setTeamForm({ ...teamForm, role: e.target.value })}
                  className="w-full px-4 py-2.5 bg-admin-card border border-admin-border rounded-xl text-admin-text focus:outline-none focus:ring-2 focus:ring-[#ffbe00]/50"
                  placeholder="e.g. Lead Technical Architect"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-admin-muted mb-1.5">
                  LinkedIn Profile URL
                </label>
                <input
                  type="url"
                  value={teamForm.linkedin}
                  onChange={(e) => setTeamForm({ ...teamForm, linkedin: e.target.value })}
                  className="w-full px-4 py-2.5 bg-admin-card border border-admin-border rounded-xl text-admin-text focus:outline-none focus:ring-2 focus:ring-[#ffbe00]/50"
                  placeholder="https://linkedin.com/in/username"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-admin-muted mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  value={teamForm.email}
                  onChange={(e) => setTeamForm({ ...teamForm, email: e.target.value })}
                  className="w-full px-4 py-2.5 bg-admin-card border border-admin-border rounded-xl text-admin-text focus:outline-none focus:ring-2 focus:ring-[#ffbe00]/50"
                  placeholder="alex@aeronoxsolutions.com"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-admin-muted mb-1.5">
                  Short Bio / Specialization Summary
                </label>
                <textarea
                  rows={2}
                  value={teamForm.bio}
                  onChange={(e) => setTeamForm({ ...teamForm, bio: e.target.value })}
                  className="w-full px-4 py-2.5 bg-admin-card border border-admin-border rounded-xl text-admin-text focus:outline-none focus:ring-2 focus:ring-[#ffbe00]/50"
                  placeholder="Briefly describe their background, tech stack, or contributions..."
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-admin-muted mb-1.5">
                  Profile Photo
                </label>
                <ImageUpload key={editingId || "new"} name="image" defaultValue={teamForm.image} />
                <p className="text-xs text-admin-muted mt-1.5">
                  Leave blank to automatically render stylized initials avatar.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-admin-border">
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
                className="px-6 py-2.5 bg-[#ffbe00] text-[#24182e] text-sm font-bold rounded-xl hover:bg-[#ffbe00]/90 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                <Save size={16} /> {editingId ? "Update Member" : "Save Team Member"}
              </button>
            </div>
          </form>
        )}

        {/* Team Members List / Cards */}
        <div className="space-y-3">
          {team.map((member, index) => (
            <div
              key={member.id}
              className="flex flex-col md:flex-row md:items-center justify-between bg-admin-card border border-admin-border rounded-2xl p-4 gap-4 transition-all hover:border-admin-border/80"
            >
              {/* Member Info */}
              <div className="flex items-center gap-4 min-w-0 flex-1">
                {/* Position Index Badge */}
                <div className="w-7 h-7 rounded-lg bg-black/10 dark:bg-white/10 text-admin-text font-mono text-xs font-bold flex items-center justify-center shrink-0">
                  #{index + 1}
                </div>

                {/* Avatar */}
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-gradient-to-br from-[#ffbe00] to-orange-500 shrink-0 flex items-center justify-center text-white font-black text-lg border border-admin-border shadow-sm">
                  {member.image ? (
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    member.name.substring(0, 2).toUpperCase()
                  )}
                </div>

                {/* Text Info */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-base font-bold text-admin-text truncate">{member.name}</h3>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#ffbe00]/10 text-[#ffbe00] border border-[#ffbe00]/20">
                      {member.role}
                    </span>
                  </div>
                  {member.bio && (
                    <p className="text-xs text-admin-muted truncate mt-0.5">{member.bio}</p>
                  )}
                  <div className="flex items-center gap-3 mt-1.5 text-xs text-admin-muted">
                    {member.linkedin && (
                      <span className="flex items-center gap-1 text-blue-400">
                        <FaLinkedin size={12} /> LinkedIn
                      </span>
                    )}
                    {member.email && (
                      <span className="flex items-center gap-1 text-amber-400">
                        <Mail size={12} /> {member.email}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Position adjustment & Actions */}
              <div className="flex items-center gap-2 self-end md:self-center shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-admin-border w-full md:w-auto justify-end">
                <div className="flex items-center bg-black/5 dark:bg-white/5 rounded-xl p-1 border border-admin-border mr-2">
                  <button
                    onClick={() => handleMoveMember(index, "up")}
                    disabled={index === 0 || isPending}
                    className="p-1.5 text-admin-muted hover:text-admin-text disabled:opacity-30 disabled:hover:text-admin-muted transition-colors rounded-lg hover:bg-black/10 dark:hover:bg-white/10"
                    title="Move Up"
                  >
                    <ArrowUp size={16} />
                  </button>
                  <button
                    onClick={() => handleMoveMember(index, "down")}
                    disabled={index === team.length - 1 || isPending}
                    className="p-1.5 text-admin-muted hover:text-admin-text disabled:opacity-30 disabled:hover:text-admin-muted transition-colors rounded-lg hover:bg-black/10 dark:hover:bg-white/10"
                    title="Move Down"
                  >
                    <ArrowDown size={16} />
                  </button>
                </div>

                <button
                  onClick={() => openEditMember(member)}
                  disabled={isPending}
                  className="p-2 text-blue-500 hover:bg-blue-500/10 rounded-xl transition-colors disabled:opacity-50"
                  title="Edit Member"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDeleteTeam(member.id)}
                  disabled={isPending}
                  className="p-2 text-red-500 hover:bg-red-500/10 rounded-xl transition-colors disabled:opacity-50"
                  title="Delete Member"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}

          {team.length === 0 && !isEditingTeam && (
            <div className="py-12 text-center text-admin-muted border border-dashed border-admin-border rounded-2xl">
              <User size={32} className="mx-auto mb-2 opacity-40 text-admin-muted" />
              <p className="font-semibold text-sm">No team members added yet.</p>
              <p className="text-xs mt-1">Click "Add Team Member" above to create your team profile.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
