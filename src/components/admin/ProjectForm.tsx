/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { RichTextEditor } from "@/components/editor/RichTextEditor";
import { 
  Briefcase, 
  TrendingUp, 
  FileText, 
  Settings, 
  Palette, 
  Building2, 
  Globe, 
  Sparkles,
  Layers,
  ArrowRight,
  Plus,
  X,
  ImageIcon,
  ExternalLink
} from "lucide-react";

interface ProjectFormProps {
  project?: any;
  action: (formData: FormData) => Promise<void>;
}

export function ProjectForm({ project, action }: ProjectFormProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "metrics" | "gallery" | "content" | "settings">("overview");
  const [selectedServiceCategory, setSelectedServiceCategory] = useState<string>(project?.serviceCategory || "web-dev");
  const [galleryList, setGalleryList] = useState<string[]>(project?.galleryImages || []);
  const [tempImage, setTempImage] = useState<string>("");

  const addImageToGallery = () => {
    if (tempImage && !galleryList.includes(tempImage)) {
      setGalleryList([...galleryList, tempImage]);
      setTempImage("");
    }
  };

  const removeImageFromGallery = (idx: number) => {
    setGalleryList(galleryList.filter((_, i) => i !== idx));
  };

  return (
    <div className="w-full">
      {/* Tab Header Navigation */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-[#181120] border border-white/10 rounded-2xl mb-8">
        <button
          type="button"
          onClick={() => setActiveTab("overview")}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all ${
            activeTab === "overview"
              ? "bg-[#ffbe00] text-[#24182e] shadow-lg shadow-[#ffbe00]/20"
              : "text-[#dcd7e3]/70 hover:text-white hover:bg-white/5"
          }`}
        >
          <Briefcase size={16} /> Service & Client Info
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("gallery")}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all ${
            activeTab === "gallery" || selectedServiceCategory === "graphic-design"
              ? "bg-[#ff007a] text-white shadow-lg shadow-[#ff007a]/30"
              : "text-[#dcd7e3]/70 hover:text-white hover:bg-white/5"
          }`}
        >
          <Palette size={16} /> Logo & Graphics Gallery ({galleryList.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("metrics")}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all ${
            activeTab === "metrics"
              ? "bg-[#ffbe00] text-[#24182e] shadow-lg shadow-[#ffbe00]/20"
              : "text-[#dcd7e3]/70 hover:text-white hover:bg-white/5"
          }`}
        >
          <TrendingUp size={16} /> Before vs After Metrics
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("content")}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all ${
            activeTab === "content"
              ? "bg-[#ffbe00] text-[#24182e] shadow-lg shadow-[#ffbe00]/20"
              : "text-[#dcd7e3]/70 hover:text-white hover:bg-white/5"
          }`}
        >
          <FileText size={16} /> Case Study Story
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("settings")}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all ${
            activeTab === "settings"
              ? "bg-[#ffbe00] text-[#24182e] shadow-lg shadow-[#ffbe00]/20"
              : "text-[#dcd7e3]/70 hover:text-white hover:bg-white/5"
          }`}
        >
          <Settings size={16} /> Publishing
        </button>
      </div>

      {/* Main Form Wrapper */}
      <form action={action} className="bg-admin-card p-6 md:p-8 rounded-3xl border border-admin-border shadow-2xl">
        <input type="hidden" name="galleryImages" value={JSON.stringify(galleryList)} />
        
        {/* TAB 1: Service Category & Client Overview */}
        {activeTab === "overview" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="border-b border-white/10 pb-4 mb-4">
              <h2 className="text-xl font-bold text-admin-text flex items-center gap-2">
                <Layers size={20} className="text-[#ffbe00]" /> Service & Client Information
              </h2>
              <p className="text-xs text-admin-muted mt-1">
                Assign this Case Study to a service category and add client details.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Service Category */}
              <div className="flex flex-col gap-2">
                <label htmlFor="serviceCategory" className="text-sm font-semibold text-admin-text flex items-center gap-1.5">
                  Service Category <span className="text-[#ffbe00]">*</span>
                </label>
                <select
                  id="serviceCategory"
                  name="serviceCategory"
                  value={selectedServiceCategory}
                  onChange={(e) => setSelectedServiceCategory(e.target.value)}
                  className="bg-black/20 border border-admin-border rounded-xl px-4 py-3 text-admin-text focus:outline-none focus:border-[#ffbe00] transition-colors"
                >
                  <option value="graphic-design">🎨 Graphic & Logo Design</option>
                  <option value="seo">SEO & Organic Growth</option>
                  <option value="web-dev">Web & E-Commerce Development</option>
                  <option value="marketing">Growth & Performance Marketing</option>
                  <option value="ai-automation">AI & Workflow Automation</option>
                  <option value="telemarketing">Outbound Telemarketing & Leads</option>
                  <option value="custom-software">Custom Software Engineering</option>
                </select>
              </div>

              {/* Title */}
              <div className="flex flex-col gap-2">
                <label htmlFor="title" className="text-sm font-semibold text-admin-text">
                  Project / Case Study Title <span className="text-[#ffbe00]">*</span>
                </label>
                <input 
                  type="text" 
                  id="title" 
                  name="title" 
                  required
                  defaultValue={project?.title || ""}
                  className="bg-black/20 border border-admin-border rounded-xl px-4 py-3 text-admin-text placeholder:text-muted focus:outline-none focus:border-[#ffbe00] transition-colors"
                  placeholder="e.g. E-Commerce Replatforming & 4x Revenue Growth"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Slug */}
              <div className="flex flex-col gap-2">
                <label htmlFor="slug" className="text-sm font-semibold text-admin-text">
                  URL Slug (Optional)
                </label>
                <input 
                  type="text" 
                  id="slug" 
                  name="slug" 
                  defaultValue={project?.slug || ""}
                  className="bg-black/20 border border-admin-border rounded-xl px-4 py-3 text-admin-text placeholder:text-muted focus:outline-none focus:border-[#ffbe00] transition-colors"
                  placeholder="e.g. e-commerce-replatforming-case-study"
                />
              </div>

              {/* Client Name */}
              <div className="flex flex-col gap-2">
                <label htmlFor="client" className="text-sm font-semibold text-admin-text flex items-center gap-1.5">
                  <Building2 size={16} className="text-[#ffbe00]" /> Company / Client Name
                </label>
                <input 
                  type="text" 
                  id="client" 
                  name="client" 
                  defaultValue={project?.client || ""}
                  className="bg-black/20 border border-admin-border rounded-xl px-4 py-3 text-admin-text placeholder:text-muted focus:outline-none focus:border-[#ffbe00] transition-colors"
                  placeholder="e.g. Apex Retail UK"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Live URL */}
              <div className="flex flex-col gap-2">
                <label htmlFor="liveUrl" className="text-sm font-semibold text-admin-text flex items-center gap-1.5">
                  <Globe size={16} className="text-[#ffbe00]" /> Live Website URL
                </label>
                <input 
                  type="url" 
                  id="liveUrl" 
                  name="liveUrl" 
                  defaultValue={project?.liveUrl || ""}
                  className="bg-black/20 border border-admin-border rounded-xl px-4 py-3 text-admin-text placeholder:text-muted focus:outline-none focus:border-[#ffbe00] transition-colors"
                  placeholder="https://clientwebsite.com"
                />
              </div>

              {/* GitHub / Tech Spec URL */}
              <div className="flex flex-col gap-2">
                <label htmlFor="githubUrl" className="text-sm font-semibold text-admin-text flex items-center gap-1.5">
                  <ExternalLink size={16} className="text-[#ffbe00]" /> GitHub / Specs Link (Optional)
                </label>
                <input 
                  type="url" 
                  id="githubUrl" 
                  name="githubUrl" 
                  defaultValue={project?.githubUrl || ""}
                  className="bg-black/20 border border-admin-border rounded-xl px-4 py-3 text-admin-text placeholder:text-muted focus:outline-none focus:border-[#ffbe00] transition-colors"
                  placeholder="https://github.com/..."
                />
              </div>
            </div>

            {/* Tags / Tech Stack */}
            <div className="flex flex-col gap-2">
              <label htmlFor="tags" className="text-sm font-semibold text-admin-text">
                Tech Stack & Tags (Comma separated)
              </label>
              <input 
                type="text" 
                id="tags" 
                name="tags" 
                defaultValue={project?.tags || ""}
                className="bg-black/20 border border-admin-border rounded-xl px-4 py-3 text-admin-text placeholder:text-muted focus:outline-none focus:border-[#ffbe00] transition-colors"
                placeholder="e.g. Next.js, SEO Audit, Tailwind CSS, Stripe, Firebase"
              />
            </div>

            {/* Cover Image Upload */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-admin-text">
                Main Project Cover Image <span className="text-[#ffbe00]">*</span>
              </label>
              <ImageUpload name="image" defaultValue={project?.image || ""} />
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={() => setActiveTab("gallery")}
                className="px-6 py-3 bg-[#ffbe00] text-[#24182e] font-bold rounded-xl hover:bg-white transition-colors flex items-center gap-2 shadow-md"
              >
                Next: Logo & Graphics Gallery <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* TAB: Logo & Graphics Gallery */}
        {activeTab === "gallery" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="border-b border-white/10 pb-4 mb-4">
              <h2 className="text-xl font-bold text-admin-text flex items-center gap-2">
                <Palette size={20} className="text-[#ffbe00]" /> Logo & Graphic Design Gallery Showcase
              </h2>
              <p className="text-xs text-admin-muted mt-1">
                Upload logos, brand identity assets, and graphics to display in the dedicated public portfolio gallery.
              </p>
            </div>

            {/* Single Image Upload to add to gallery */}
            <div className="p-6 rounded-2xl bg-black/30 border border-white/10 space-y-4">
              <label className="text-sm font-bold text-[#ffbe00] flex items-center gap-2 uppercase tracking-wider">
                <ImageIcon size={16} /> Upload Logo / Graphic Image
              </label>
              
              <ImageUpload onChange={(url) => setTempImage(url)} defaultValue="" />
              
              {tempImage && (
                <div className="flex items-center gap-3 pt-2">
                  <span className="text-xs text-emerald-400 font-bold">Image Uploaded Ready to Add!</span>
                  <button
                    type="button"
                    onClick={addImageToGallery}
                    className="px-4 py-2 bg-emerald-500 text-black font-bold text-xs rounded-xl uppercase flex items-center gap-1.5 shadow-md"
                  >
                    <Plus size={14} /> Add Logo To Gallery
                  </button>
                </div>
              )}
            </div>

            {/* Uploaded Gallery Thumbnails Grid */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center justify-between">
                <span>Gallery Images Showcase ({galleryList.length})</span>
                {galleryList.length > 0 && (
                  <span className="text-xs text-[#ffbe00] font-normal">Click X to remove logo</span>
                )}
              </h3>

              {galleryList.length === 0 ? (
                <div className="p-8 rounded-2xl bg-black/20 border border-white/10 text-center">
                  <Palette size={32} className="text-gray-500 mx-auto mb-2" />
                  <p className="text-xs text-gray-400 font-medium">No gallery logos uploaded yet. Upload images above to add to this case study showcase!</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {galleryList.map((imgUrl, idx) => (
                    <div key={idx} className="relative group rounded-2xl overflow-hidden bg-black/50 border border-white/15 aspect-square flex items-center justify-center p-2">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={imgUrl} alt={`Gallery ${idx}`} className="object-contain max-h-full max-w-full rounded-lg" />
                      <button
                        type="button"
                        onClick={() => removeImageFromGallery(idx)}
                        className="absolute top-1.5 right-1.5 p-1.5 rounded-full bg-red-600 text-white opacity-90 hover:opacity-100 hover:scale-110 transition-all shadow-lg"
                        title="Remove Logo"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setActiveTab("overview")}
                className="px-6 py-3 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-colors"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("metrics")}
                className="px-6 py-3 bg-[#ffbe00] text-[#24182e] font-bold rounded-xl hover:bg-white transition-colors flex items-center gap-2 shadow-md"
              >
                Next: Before vs After Metrics <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: Before vs After Data & Metrics */}
        {activeTab === "metrics" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="border-b border-white/10 pb-4 mb-4">
              <h2 className="text-xl font-bold text-admin-text flex items-center gap-2">
                <TrendingUp size={20} className="text-[#ffbe00]" /> "Before vs After" Impact Comparison
              </h2>
              <p className="text-xs text-admin-muted mt-1">
                Provide client performance metrics before and after working with Aeronox Solutions to show real ROI.
              </p>
            </div>

            {/* Growth Badge */}
            <div className="flex flex-col gap-2 bg-[#ffbe00]/10 border border-[#ffbe00]/30 p-5 rounded-2xl">
              <label htmlFor="growthBadge" className="text-sm font-bold text-[#ffbe00] flex items-center gap-1.5 uppercase tracking-wider">
                <Sparkles size={16} /> Growth Highlight Badge
              </label>
              <input 
                type="text" 
                id="growthBadge" 
                name="growthBadge" 
                defaultValue={project?.growthBadge || ""}
                className="bg-black/30 border border-[#ffbe00]/40 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-[#ffbe00] transition-colors font-bold"
                placeholder="e.g. +3,940% Traffic Increase  OR  4.5x Lead Volume"
              />
              <p className="text-xs text-white/60">
                This badge is displayed prominently on portfolio cards and search results.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* BEFORE STATS & IMAGE */}
              <div className="flex flex-col gap-4 bg-red-500/10 border border-red-500/20 p-6 rounded-2xl">
                <div className="flex items-center gap-2 text-red-400 font-bold uppercase tracking-wider text-xs">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" /> 🛑 Before Aeronox (Initial State)
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="beforeStats" className="text-xs font-semibold text-gray-300">Before Metrics / Points</label>
                  <textarea 
                    id="beforeStats" 
                    name="beforeStats" 
                    rows={4}
                    defaultValue={project?.beforeStats || ""}
                    className="bg-black/30 border border-red-500/30 rounded-xl px-4 py-3 text-white placeholder:text-gray-400 focus:outline-none focus:border-red-400 transition-colors text-sm resize-none"
                    placeholder="e.g.&#10;• 1,200 Monthly Visitors&#10;• 0.8% E-Commerce Conversion&#10;• Google Rank #45 for core keywords"
                  />
                </div>
                <div className="flex flex-col gap-1.5 pt-2 border-t border-red-500/20">
                  <label className="text-xs font-semibold text-red-300">Before Image / Screenshot (Optional)</label>
                  <ImageUpload name="beforeImage" defaultValue={project?.beforeImage || ""} />
                </div>
              </div>

              {/* AFTER STATS & IMAGE */}
              <div className="flex flex-col gap-4 bg-emerald-500/10 border border-emerald-500/20 p-6 rounded-2xl">
                <div className="flex items-center gap-2 text-emerald-400 font-bold uppercase tracking-wider text-xs">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" /> 🚀 After Aeronox (Results Delivered)
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="afterStats" className="text-xs font-semibold text-gray-300">After Metrics / Points</label>
                  <textarea 
                    id="afterStats" 
                    name="afterStats" 
                    rows={4}
                    defaultValue={project?.afterStats || ""}
                    className="bg-black/30 border border-emerald-500/30 rounded-xl px-4 py-3 text-white placeholder:text-gray-400 focus:outline-none focus:border-emerald-400 transition-colors text-sm resize-none"
                    placeholder="e.g.&#10;• 48,500 Monthly Visitors&#10;• 3.6% E-Commerce Conversion&#10;• Google Rank #1 & Featured Snippet"
                  />
                </div>
                <div className="flex flex-col gap-1.5 pt-2 border-t border-emerald-500/20">
                  <label className="text-xs font-semibold text-emerald-300">After Image / Screenshot (Optional)</label>
                  <ImageUpload name="afterImage" defaultValue={project?.afterImage || ""} />
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setActiveTab("overview")}
                className="px-6 py-3 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-colors"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("content")}
                className="px-6 py-3 bg-[#ffbe00] text-[#24182e] font-bold rounded-xl hover:bg-white transition-colors flex items-center gap-2 shadow-md"
              >
                Next: Case Study Story <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: Case Study Breakdown & Content */}
        {activeTab === "content" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="border-b border-white/10 pb-4 mb-4">
              <h2 className="text-xl font-bold text-admin-text flex items-center gap-2">
                <FileText size={20} className="text-[#ffbe00]" /> Challenge, Solution & Story
              </h2>
              <p className="text-xs text-admin-muted mt-1">
                Detail the problem statement, technical strategy, and overall case study content.
              </p>
            </div>

            {/* Short Description */}
            <div className="flex flex-col gap-2">
              <label htmlFor="description" className="text-sm font-semibold text-admin-text">
                Executive Summary / Short Description <span className="text-[#ffbe00]">*</span>
              </label>
              <textarea 
                id="description" 
                name="description" 
                rows={2}
                required
                defaultValue={project?.description || ""}
                className="bg-black/20 border border-admin-border rounded-xl px-4 py-3 text-admin-text placeholder:text-muted focus:outline-none focus:border-[#ffbe00] transition-colors resize-none"
                placeholder="Brief high-impact summary for cards..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Challenge */}
              <div className="flex flex-col gap-2">
                <label htmlFor="challenge" className="text-sm font-semibold text-admin-text">
                  The Client's Challenge / Problem
                </label>
                <textarea 
                  id="challenge" 
                  name="challenge" 
                  rows={3}
                  defaultValue={project?.challenge || ""}
                  className="bg-black/20 border border-admin-border rounded-xl px-4 py-3 text-admin-text placeholder:text-muted focus:outline-none focus:border-[#ffbe00] transition-colors resize-none text-sm"
                  placeholder="What was holding the client back before hiring us?"
                />
              </div>

              {/* Solution */}
              <div className="flex flex-col gap-2">
                <label htmlFor="solution" className="text-sm font-semibold text-admin-text">
                  The Solution & Engineering Strategy
                </label>
                <textarea 
                  id="solution" 
                  name="solution" 
                  rows={3}
                  defaultValue={project?.solution || ""}
                  className="bg-black/20 border border-admin-border rounded-xl px-4 py-3 text-admin-text placeholder:text-muted focus:outline-none focus:border-[#ffbe00] transition-colors resize-none text-sm"
                  placeholder="What custom architecture, API, or strategy did Aeronox build?"
                />
              </div>
            </div>

            {/* Full Rich Text Content */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-admin-text">
                Detailed Case Study Body (Rich Text & Images)
              </label>
              <RichTextEditor name="content" defaultValue={project?.content || ""} />
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setActiveTab("metrics")}
                className="px-6 py-3 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-colors"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("settings")}
                className="px-6 py-3 bg-[#ffbe00] text-[#24182e] font-bold rounded-xl hover:bg-white transition-colors flex items-center gap-2 shadow-md"
              >
                Next: Options & Save <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* TAB 4: Options & Settings */}
        {activeTab === "settings" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="border-b border-white/10 pb-4 mb-4">
              <h2 className="text-xl font-bold text-admin-text flex items-center gap-2">
                <Settings size={20} className="text-[#ffbe00]" /> Settings & Publishing Options
              </h2>
            </div>

            {/* Show on Home Toggle */}
            <div className="flex items-center justify-between p-6 bg-black/20 border border-admin-border rounded-2xl">
              <div>
                <h3 className="font-bold text-admin-text">Feature on Home Landing Page</h3>
                <p className="text-xs text-admin-muted mt-1">
                  Display this Case Study on the homepage portfolio section.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  name="showOnHome" 
                  value="true" 
                  defaultChecked={project?.showOnHome ?? true}
                  className="sr-only peer"
                />
                <div className="w-14 h-7 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#ffbe00]"></div>
              </label>
            </div>

            {/* Submit Action Bar */}
            <div className="pt-6 border-t border-admin-border flex justify-end gap-4">
              <a 
                href="/admin/projects" 
                className="px-6 py-3 rounded-xl border border-admin-border text-admin-text hover:bg-white/5 transition-colors font-bold"
              >
                Cancel
              </a>
              <Button type="submit">
                {project ? "Update Case Study" : "Publish Case Study"}
              </Button>
            </div>
          </div>
        )}

      </form>
    </div>
  );
}
