"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Upload, Loader2 } from "lucide-react";
import { createClient } from "@/lib/actions";

export default function NewClientPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        let errorMsg = "Upload failed";
        try {
          const errData = await res.json();
          if (errData.error) errorMsg = errData.error;
        } catch(e) {}
        throw new Error(errorMsg);
      }
      const data = await res.json();
      setLogoPreview(data.url);
    } catch (error: any) {
      alert(error.message || "Failed to upload image.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    if (logoPreview) {
      formData.set("logo", logoPreview);
    } else {
      alert("Please upload a logo.");
      setLoading(false);
      return;
    }

    try {
      const res = await createClient(formData);
      if (res && res.success) {
        router.push("/admin/clients");
      }
    } catch (error) {
      console.error("Create error:", error);
      alert("Failed to create client.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl">
      <Link 
        href="/admin/clients" 
        className="inline-flex items-center gap-2 text-muted hover:text-white mb-8 transition-colors"
      >
        <ArrowLeft size={16} />
        Back to Clients
      </Link>

      <h1 className="text-3xl font-bold text-white mb-8">Add New Client</h1>

      <div className="bg-[#24182e] rounded-2xl border border-white/10 p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
              Client Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
              placeholder="Company Name"
            />
          </div>

          <div>
            <label htmlFor="link" className="block text-sm font-medium text-gray-300 mb-2">
              Website URL (Optional)
            </label>
            <input
              type="url"
              id="link"
              name="link"
              className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
              placeholder="https://example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Client Logo <span className="text-red-400">*</span>
            </label>
            <div className="flex items-center gap-6">
              {logoPreview && (
                <div className="w-24 h-24 relative rounded-lg overflow-hidden border border-white/10 bg-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={logoPreview} alt="Logo preview" className="w-full h-full object-contain p-2" />
                </div>
              )}
              
              <div className="flex-1">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/20 rounded-lg cursor-pointer bg-black/20 hover:bg-black/40 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    {uploading ? (
                      <Loader2 className="h-8 w-8 text-muted animate-spin mb-2" />
                    ) : (
                      <Upload className="w-8 h-8 text-muted mb-2" />
                    )}
                    <p className="text-sm text-gray-400">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-muted mt-1">SVG, PNG, JPG (max 2MB)</p>
                  </div>
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
                {/* Hidden input to ensure it gets submitted if needed, but we intercept onSubmit */}
                <input type="hidden" name="logo" value={logoPreview || ""} />
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 flex justify-end gap-4">
            <Link 
              href="/admin/clients"
              className="px-6 py-3 text-sm font-medium text-gray-300 hover:text-white transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading || !logoPreview}
              className="px-8 py-3 bg-accent text-white rounded-lg hover:opacity-90 transition-opacity font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading && <Loader2 size={16} className="animate-spin" />}
              {loading ? "Saving..." : "Save Client"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
