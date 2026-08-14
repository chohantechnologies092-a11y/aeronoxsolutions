"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Loader2, Quote } from "lucide-react";
import { createTestimonial, updateTestimonial } from "@/lib/actions";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { VideoUpload } from "@/components/ui/VideoUpload";

export function TestimonialForm({ initialData }: { initialData?: any }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditing = !!initialData;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const formData = new FormData(e.currentTarget);
      if (isEditing) {
        await updateTestimonial(initialData.id, formData);
      } else {
        await createTestimonial(formData);
      }
      router.push("/admin/testimonials");
    } catch (error: any) {
      console.error("Error saving testimonial:", error);
      alert(`Failed to save testimonial. Error: ${error?.message || "Unknown error"}. Check console.`);
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="p-2 rounded-xl border border-admin-border bg-admin-card hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-admin-muted hover:text-admin-text"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-admin-text tracking-tight">
              {isEditing ? "Edit Testimonial" : "New Testimonial"}
            </h1>
            <p className="text-sm text-admin-muted mt-1">
              {isEditing ? "Update client review details." : "Add a new client review."}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 cursor-pointer bg-admin-card border border-admin-border px-4 py-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
            <input 
              type="checkbox" 
              name="isActive" 
              defaultChecked={isEditing ? initialData?.isActive : true}
              className="rounded border-admin-border text-[#ffbe00] focus:ring-[#ffbe00] bg-transparent" 
            />
            <span className="text-sm font-medium text-admin-text">Active (Visible)</span>
          </label>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#ffbe00] text-[#120b18] font-bold rounded-xl hover:bg-[#ffbe00]/90 transition-colors disabled:opacity-50 shadow-lg shadow-[#ffbe00]/20"
          >
            {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            {isSubmitting ? "Saving..." : isEditing ? "Save Changes" : "Create Testimonial"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-admin-card rounded-2xl border border-admin-border p-6 shadow-sm">
            <h2 className="text-lg font-bold text-admin-text mb-4">Review Content</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-admin-muted mb-1">
                  Client Quote / Review *
                </label>
                <div className="relative">
                  <div className="absolute top-4 left-4 text-admin-muted/50 pointer-events-none">
                    <Quote size={24} />
                  </div>
                  <textarea
                    name="quote"
                    required
                    defaultValue={initialData?.quote}
                    rows={6}
                    placeholder="This team delivered beyond our expectations..."
                    className="w-full bg-black/5 dark:bg-white/5 border border-admin-border rounded-xl px-4 py-3 pl-12 text-sm text-admin-text focus:outline-none focus:border-[#ffbe00] transition-colors resize-none"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-admin-border/50">
                <label className="block text-sm font-medium text-admin-muted mb-3">
                  Video Review (Optional)
                </label>
                <VideoUpload name="video" defaultValue={initialData?.videoUrl} />
              </div>
            </div>
          </div>
        </div>
        
        <div className="md:col-span-1 space-y-6">
          <div className="bg-admin-card rounded-2xl border border-admin-border p-6 shadow-sm">
            <h2 className="text-lg font-bold text-admin-text mb-4">Client Details</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-admin-muted mb-1">
                  Author Name *
                </label>
                <input
                  type="text"
                  name="author"
                  required
                  defaultValue={initialData?.author}
                  placeholder="e.g. John Doe"
                  className="w-full bg-black/5 dark:bg-white/5 border border-admin-border rounded-xl px-4 py-2.5 text-sm text-admin-text focus:outline-none focus:border-[#ffbe00] transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-admin-muted mb-1">
                  Role / Company
                </label>
                <input
                  type="text"
                  name="role"
                  defaultValue={initialData?.role}
                  placeholder="e.g. CEO at TechCorp"
                  className="w-full bg-black/5 dark:bg-white/5 border border-admin-border rounded-xl px-4 py-2.5 text-sm text-admin-text focus:outline-none focus:border-[#ffbe00] transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-admin-muted mb-1">
                  Client Image
                </label>
                <ImageUpload name="image" defaultValue={initialData?.image} />
              </div>

              <div>
                <label className="block text-sm font-medium text-admin-muted mb-1">
                  Star Rating (1-5)
                </label>
                <input
                  type="number"
                  name="rating"
                  min="1"
                  max="5"
                  required
                  defaultValue={initialData?.rating || 5}
                  className="w-full bg-black/5 dark:bg-white/5 border border-admin-border rounded-xl px-4 py-2.5 text-sm text-admin-text focus:outline-none focus:border-[#ffbe00] transition-colors"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
