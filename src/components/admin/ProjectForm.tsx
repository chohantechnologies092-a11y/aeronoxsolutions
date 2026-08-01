/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
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
  Video,
  Code2,
  Cpu,
  CheckCircle2,
  Search,
  AlertTriangle,
  Lightbulb
} from "lucide-react";

interface ProjectFormProps {
  project?: any;
  action: (formData: FormData) => Promise<void>;
}

export function ProjectForm({ project, action }: ProjectFormProps) {
  // Parse existing categories ensuring backward compatibility
  const initialCategoryString = project?.serviceCategory || project?.category || "web-dev";
  const initialCategories = initialCategoryString.split(',').map((s: string) => s.trim()).filter(Boolean);
  
  const [selectedServiceCategories, setSelectedServiceCategories] = useState<string[]>(initialCategories.length > 0 ? initialCategories : ["web-dev"]);
  const [galleryList, setGalleryList] = useState<string[]>(project?.galleryImages || []);
  const [tempImage, setTempImage] = useState<string>("");
  const [socialStats, setSocialStats] = useState<any[]>(project?.socialMediaStats || []);

  const addSocialStat = () => {
    setSocialStats([...socialStats, { platform: "Facebook", description: "", beforeStats: "", afterStats: "" }]);
  };

  const removeSocialStat = (idx: number) => {
    setSocialStats(socialStats.filter((_, i) => i !== idx));
  };

  const updateSocialStat = (idx: number, field: string, value: string) => {
    const updated = [...socialStats];
    updated[idx][field] = value;
    setSocialStats(updated);
  };

  const toggleCategory = (id: string) => {
    setSelectedServiceCategories(prev => {
      if (prev.includes(id)) {
        if (prev.length === 1) return prev; // Prevent deselecting all
        return prev.filter(c => c !== id);
      }
      return [...prev, id];
    });
  };

  const addImageToGallery = () => {
    if (tempImage && !galleryList.includes(tempImage)) {
      setGalleryList([...galleryList, tempImage]);
      setTempImage("");
    }
  };

  const removeImageFromGallery = (idx: number) => {
    setGalleryList(galleryList.filter((_, i) => i !== idx));
  };

  const serviceCategories = [
    { 
      id: "web-dev", 
      title: "Web Development", 
      subtitle: "Live site link & tech stack", 
      icon: Code2, 
      color: "#6a35ff" 
    },
    { 
      id: "seo", 
      title: "SEO", 
      subtitle: "Before vs After metrics & ROI", 
      icon: Search, 
      color: "#00c2ff" 
    },
    { 
      id: "marketing", 
      title: "Social Media Marketing", 
      subtitle: "Social campaigns & ad creatives", 
      icon: TrendingUp, 
      color: "#ff3b30" 
    },
    { 
      id: "custom-software", 
      title: "Custom Software", 
      subtitle: "System screenshots & stack", 
      icon: Cpu, 
      color: "#af52de" 
    },
  ];

  return (
    <div className="w-full space-y-8">
      {/* STEP 1: SERVICE TYPE SELECTOR BOXES */}
      <div className="bg-[#1a1122] p-6 md:p-8 rounded-3xl border border-white/10 shadow-2xl">
        <div className="mb-6">
          <span className="px-3.5 py-1 rounded-full bg-[#ffbe00]/10 border border-[#ffbe00]/30 text-[#ffbe00] text-xs font-bold uppercase tracking-wider">
            Step 1: Select Service Categories
          </span>
          <h2 className="text-2xl font-black text-white mt-2">Which services apply to this project?</h2>
          <p className="text-xs text-[#dcd7e3]/70 mt-1">
            You can select MULTIPLE services. The form below will dynamically combine all necessary fields!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {serviceCategories.map((cat) => {
            const isSelected = selectedServiceCategories.includes(cat.id);
            const CatIcon = cat.icon;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => toggleCategory(cat.id)}
                className={`p-5 rounded-2xl text-left transition-all duration-300 border flex flex-col justify-between h-44 relative overflow-hidden group ${
                  isSelected
                    ? "bg-[#24182e] border-[#ffbe00] shadow-[0_0_25px_rgba(255,190,0,0.3)] scale-[1.03] ring-2 ring-[#ffbe00]/40"
                    : "bg-[#140c1e] border-white/10 hover:border-white/20 hover:bg-[#24182e]/80"
                }`}
              >
                <div className="flex items-center justify-between z-10">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/10 border border-white/15">
                    <CatIcon size={20} style={{ color: cat.color }} />
                  </div>

                  {isSelected && (
                    <CheckCircle2 size={18} className="text-[#ffbe00]" />
                  )}
                </div>

                <div className="z-10 mt-2">
                  <h3 className={`text-sm font-black leading-tight ${isSelected ? "text-[#ffbe00]" : "text-white"}`}>
                    {cat.title}
                  </h3>
                  <p className="text-[11px] text-[#dcd7e3]/60 font-medium leading-normal mt-1 line-clamp-2">
                    {cat.subtitle}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* STEP 2: DYNAMICALLY ADAPTED UNIFIED FORM */}
      <form action={action} className="bg-[#1a1122] p-6 md:p-8 rounded-3xl border border-white/15 shadow-2xl space-y-8">
        {/* Hidden inputs combining the selected categories */}
        <input type="hidden" name="serviceCategory" value={selectedServiceCategories.join(',')} />
        <input type="hidden" name="galleryImages" value={JSON.stringify(galleryList)} />
        <input type="hidden" name="socialMediaStats" value={JSON.stringify(socialStats)} />

        {/* GLOBAL CORE FIELDS (Always visible) */}
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-white">Project / Campaign Title <span className="text-[#ffbe00]">*</span></label>
              <input 
                type="text" 
                name="title" 
                required
                defaultValue={project?.title || ""}
                className="bg-black/30 border border-white/15 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ffbe00]"
                placeholder="e.g. Modern E-Commerce Platform Rebuild"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-white flex items-center gap-1.5">
                <Building2 size={16} className="text-[#ffbe00]" /> Company / Client Name
              </label>
              <input 
                type="text" 
                name="client" 
                defaultValue={project?.client || ""}
                className="bg-black/30 border border-white/15 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ffbe00]"
                placeholder="e.g. Luxora Retail UK"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-white">Short Description / Overview <span className="text-[#ffbe00]">*</span></label>
            <textarea 
              name="description" 
              rows={3}
              required
              defaultValue={project?.description || ""}
              className="bg-black/30 border border-white/15 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ffbe00] text-sm resize-none"
              placeholder="Brief summary of the project..."
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-white">Main Cover Image <span className="text-[#ffbe00]">*</span></label>
            <ImageUpload name="image" defaultValue={project?.image || ""} />
          </div>
        </div>

        {/* ---------------------------------------------------------------------- */}
        {/* DYNAMIC SECTIONS BASED ON SELECTED CATEGORIES */}
        {/* ---------------------------------------------------------------------- */}

        {/* 1. URLs & Tech Stack (Web Dev, Custom Software) */}
        {(selectedServiceCategories.includes("web-dev") || selectedServiceCategories.includes("custom-software")) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-white/10 animate-in fade-in">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-white flex items-center gap-1.5">
                <Globe size={16} className="text-[#ffbe00]" /> Live Website / Platform URL
              </label>
              <input 
                type="url" 
                name="liveUrl" 
                defaultValue={project?.liveUrl || ""}
                className="bg-black/30 border border-white/15 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ffbe00]"
                placeholder="https://companywebsite.com"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-white">Tech Stack / Capabilities</label>
              <input 
                type="text" 
                name="tags" 
                defaultValue={project?.tags || ""}
                className="bg-black/30 border border-white/15 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ffbe00]"
                placeholder="e.g. Next.js, React, Tailwind, Stripe"
              />
            </div>
          </div>
        )}

        {/* 2. SEO & Marketing (Before/After, Growth) */}
        {(selectedServiceCategories.includes("seo") || selectedServiceCategories.includes("marketing") || selectedServiceCategories.includes("telemarketing")) && (
          <div className="space-y-6 pt-6 border-t border-white/10 animate-in fade-in">
            <div className="flex flex-col gap-2 bg-[#ffbe00]/10 border border-[#ffbe00]/30 p-5 rounded-2xl">
              <label className="text-sm font-bold text-[#ffbe00] flex items-center gap-1.5 uppercase tracking-wider">
                <Sparkles size={16} /> Growth Highlight Badge
              </label>
              <input 
                type="text" 
                name="growthBadge" 
                defaultValue={project?.growthBadge || ""}
                className="bg-black/40 border border-[#ffbe00]/40 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ffbe00] font-bold"
                placeholder="e.g. +3,940% Traffic Increase  OR  4.5x Leads"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-3 bg-red-500/10 border border-red-500/20 p-5 rounded-2xl">
                <label className="text-xs font-bold text-red-400 uppercase flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" /> 🛑 BEFORE AERONOX (Initial State)
                </label>
                <textarea 
                  name="beforeStats" 
                  rows={4}
                  defaultValue={project?.beforeStats || ""}
                  className="bg-black/30 border border-red-500/30 rounded-xl px-4 py-3 text-white text-sm resize-none"
                  placeholder="e.g.&#10;• 1,200 Monthly Organic Visitors"
                />
                <label className="text-xs text-red-300 font-semibold mt-2">Before Image / Screenshot</label>
                <ImageUpload name="beforeImage" defaultValue={project?.beforeImage || ""} />
              </div>

              <div className="flex flex-col gap-3 bg-emerald-500/10 border border-emerald-500/20 p-5 rounded-2xl">
                <label className="text-xs font-bold text-emerald-400 uppercase flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" /> 🚀 AFTER AERONOX (Results Delivered)
                </label>
                <textarea 
                  name="afterStats" 
                  rows={4}
                  defaultValue={project?.afterStats || ""}
                  className="bg-black/30 border border-emerald-500/30 rounded-xl px-4 py-3 text-white text-sm resize-none"
                  placeholder="e.g.&#10;• 48,500 Monthly Organic Visitors"
                />
                <label className="text-xs text-emerald-300 font-semibold mt-2">After Image / Screenshot</label>
                <ImageUpload name="afterImage" defaultValue={project?.afterImage || ""} />
              </div>
            </div>
          </div>
        )}

        {/* Social Media Stats (Marketing Only) */}
        {selectedServiceCategories.includes("marketing") && (
          <div className="space-y-4 pt-6 border-t border-white/10 animate-in fade-in">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-[#ffbe00] flex items-center gap-1.5 uppercase tracking-wider">
                <TrendingUp size={16} /> Social Media Stats
              </label>
              <button type="button" onClick={addSocialStat} className="text-xs bg-[#ffbe00] text-[#1a1122] px-3 py-1.5 rounded-lg font-bold hover:bg-white transition-colors">
                + Add Platform
              </button>
            </div>
            {socialStats.map((stat, idx) => (
              <div key={idx} className="bg-black/20 p-5 rounded-2xl border border-white/10 space-y-4 relative">
                <button type="button" onClick={() => removeSocialStat(idx)} className="absolute top-4 right-4 text-red-400 hover:text-red-300">
                  <X size={16} />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pr-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs text-white font-semibold">Platform</label>
                    <select 
                      value={stat.platform}
                      onChange={(e) => updateSocialStat(idx, "platform", e.target.value)}
                      className="bg-black/30 border border-white/15 rounded-xl px-4 py-2.5 text-white text-sm focus:border-[#ffbe00] focus:outline-none"
                    >
                      <option value="Facebook">Facebook</option>
                      <option value="Instagram">Instagram</option>
                      <option value="LinkedIn">LinkedIn</option>
                      <option value="TikTok">TikTok</option>
                      <option value="Twitter/X">Twitter/X</option>
                      <option value="Pinterest">Pinterest</option>
                      <option value="YouTube">YouTube</option>
                      <option value="Meta Ads">Meta Ads</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs text-white font-semibold">Short Description</label>
                    <input 
                      type="text" 
                      value={stat.description}
                      onChange={(e) => updateSocialStat(idx, "description", e.target.value)}
                      className="bg-black/30 border border-white/15 rounded-xl px-4 py-2.5 text-white text-sm focus:border-[#ffbe00] focus:outline-none"
                      placeholder="e.g. Daily posting and ad management"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-red-400">Before Stats</label>
                    <textarea 
                      value={stat.beforeStats}
                      onChange={(e) => updateSocialStat(idx, "beforeStats", e.target.value)}
                      className="bg-black/30 border border-red-500/30 rounded-xl px-4 py-2.5 text-white text-xs resize-none focus:border-red-500 focus:outline-none"
                      rows={2}
                      placeholder="e.g. 500 followers, 1% engagement"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-emerald-400">After Stats</label>
                    <textarea 
                      value={stat.afterStats}
                      onChange={(e) => updateSocialStat(idx, "afterStats", e.target.value)}
                      className="bg-black/30 border border-emerald-500/30 rounded-xl px-4 py-2.5 text-white text-xs resize-none focus:border-emerald-500 focus:outline-none"
                      rows={2}
                      placeholder="e.g. 5,000 followers, 8% engagement"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-red-400">Before Image</label>
                    <ImageUpload 
                      defaultValue={stat.beforeImage || ""} 
                      onChange={(url) => updateSocialStat(idx, "beforeImage", url)} 
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-emerald-400">After Image</label>
                    <ImageUpload 
                      defaultValue={stat.afterImage || ""} 
                      onChange={(url) => updateSocialStat(idx, "afterImage", url)} 
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 3. Challenge & Strategy (Web Dev, SEO, Custom Software) */}
        {(selectedServiceCategories.includes("web-dev") || selectedServiceCategories.includes("custom-software") || selectedServiceCategories.includes("seo") || selectedServiceCategories.includes("marketing")) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-white/10 animate-in fade-in">
            <div className="flex flex-col gap-2 bg-[#24182e] p-5 rounded-2xl border border-amber-500/30">
              <label className="text-xs font-bold text-amber-400 uppercase flex items-center gap-1.5">
                <AlertTriangle size={14} /> ⚠️ The Challenge (Optional)
              </label>
              <textarea 
                name="challenge" 
                rows={3}
                defaultValue={project?.challenge || ""}
                className="bg-black/30 border border-white/15 rounded-xl px-4 py-2.5 text-white text-xs resize-none"
                placeholder="Describe the initial technical or business challenge..."
              />
            </div>

            <div className="flex flex-col gap-2 bg-[#24182e] p-5 rounded-2xl border border-[#ffbe00]/30">
              <label className="text-xs font-bold text-[#ffbe00] uppercase flex items-center gap-1.5">
                <Lightbulb size={14} /> 💡 The Strategy & Solution (Optional)
              </label>
              <textarea 
                name="solution" 
                rows={3}
                defaultValue={project?.solution || ""}
                className="bg-black/30 border border-white/15 rounded-xl px-4 py-2.5 text-white text-xs resize-none"
                placeholder="Describe the strategy implemented..."
              />
            </div>
          </div>
        )}

        {/* 4. Videography Embed URL */}
        {selectedServiceCategories.includes("videography") && (
          <div className="pt-6 border-t border-white/10 animate-in fade-in">
            <div className="flex flex-col gap-2 bg-[#ff3b30]/10 border border-[#ff3b30]/30 p-5 rounded-2xl">
              <label className="text-sm font-bold text-[#ff3b30] flex items-center gap-1.5 uppercase tracking-wider">
                <Video size={16} /> Video URL / Embed Link (YouTube, Vimeo, MP4) <span className="text-white">*</span>
              </label>
              <input 
                type="url" 
                name="videoUrl" 
                required={selectedServiceCategories.includes("videography")}
                defaultValue={project?.videoUrl || ""}
                className="bg-black/40 border border-[#ff3b30]/40 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ff3b30]"
                placeholder="https://www.youtube.com/watch?v=... OR https://vimeo.com/..."
              />
            </div>
          </div>
        )}

        {/* 5. Gallery Images (Custom Software) */}
        {(selectedServiceCategories.includes("custom-software")) && (
          <div className="pt-6 border-t border-white/10 animate-in fade-in space-y-4">
            <div className="p-6 rounded-2xl bg-[#ff007a]/10 border border-[#ff007a]/30 space-y-4">
              <label className="text-sm font-bold text-[#ff007a] flex items-center gap-2 uppercase tracking-wider">
                <ImageIcon size={18} /> Upload Image Gallery (Screenshots / Logos)
              </label>

              <ImageUpload onChange={(url) => setTempImage(url)} defaultValue="" />
              
              {tempImage && (
                <div className="flex items-center gap-3 pt-2">
                  <span className="text-xs text-emerald-400 font-bold">Image Uploaded!</span>
                  <button
                    type="button"
                    onClick={addImageToGallery}
                    className="px-4 py-2 bg-[#ff007a] text-white font-bold text-xs rounded-xl uppercase flex items-center gap-1.5 shadow-md hover:bg-white hover:text-black transition-colors"
                  >
                    <Plus size={14} /> Add Image To Showcase Gallery
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                Uploaded Gallery Images ({galleryList.length})
              </h4>
              
              {galleryList.length === 0 ? (
                <div className="p-8 rounded-2xl bg-black/30 border border-white/10 text-center text-xs text-gray-400">
                  No images uploaded yet. Upload images above to add them to this project's gallery!
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
                  {galleryList.map((imgUrl, idx) => (
                    <div key={idx} className="relative group rounded-2xl bg-black/60 border border-white/15 aspect-square flex items-center justify-center p-2">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={imgUrl} alt={`Gallery ${idx}`} className="object-contain max-h-full max-w-full rounded-lg" />
                      <button
                        type="button"
                        onClick={() => removeImageFromGallery(idx)}
                        className="absolute top-1 right-1 p-1 rounded-full bg-red-600 text-white shadow-lg"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* RICH TEXT CASE STUDY STORY (EXPANDABLE) */}
        <div className="pt-6 border-t border-white/10 space-y-4">
          <label className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <FileText size={16} className="text-[#ffbe00]" /> Full Case Study Story & Detailed Content (Optional)
          </label>
          <RichTextEditor name="content" defaultValue={project?.content || ""} />
        </div>

        {/* SEO & ACCESSIBILITY SECTION */}
        <div className="pt-6 border-t border-white/10 space-y-4">
          <label className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Search size={16} className="text-[#ffbe00]" /> SEO & Accessibility Settings
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-white">Meta Title (SEO)</label>
              <input 
                type="text" 
                name="metaTitle" 
                defaultValue={project?.metaTitle || ""}
                className="bg-black/30 border border-white/15 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ffbe00]"
                placeholder="Custom title for Google (default: Project Title)"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-white">Image Alt Text (Accessibility)</label>
              <input 
                type="text" 
                name="imageAltText" 
                defaultValue={project?.imageAltText || ""}
                className="bg-black/30 border border-white/15 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ffbe00]"
                placeholder="Describe cover image for screen readers"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-white">Meta Description (SEO)</label>
            <textarea 
              name="metaDescription" 
              rows={2}
              defaultValue={project?.metaDescription || ""}
              className="bg-black/30 border border-white/15 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ffbe00] text-sm resize-none"
              placeholder="Custom description for Google search results"
            />
          </div>
        </div>

        {/* HOME PAGE FEATURE CHECKBOX & SUBMIT ACTION BAR */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <label className="flex items-center gap-2 cursor-pointer text-white font-medium text-xs">
            <input 
              type="checkbox" 
              name="showOnHome" 
              defaultChecked={project?.showOnHome || false}
              className="w-4 h-4 rounded border-white/20 bg-black/40 text-[#ffbe00] focus:ring-[#ffbe00]" 
            />
            <span>Feature this case study on the Home Page</span>
          </label>

          <button
            type="submit"
            className="px-8 py-4 bg-[#ffbe00] text-[#24182e] font-black text-xs uppercase tracking-widest rounded-xl hover:bg-white transition-all shadow-[0_0_25px_rgba(255,190,0,0.3)] hover:scale-105"
          >
            {project ? "Save & Update Project" : "Publish Project Live"}
          </button>
        </div>

      </form>
    </div>
  );
}
