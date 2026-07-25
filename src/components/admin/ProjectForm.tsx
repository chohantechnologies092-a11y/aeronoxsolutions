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
  Search
} from "lucide-react";

interface ProjectFormProps {
  project?: any;
  action: (formData: FormData) => Promise<void>;
}

export function ProjectForm({ project, action }: ProjectFormProps) {
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

  const serviceCategories = [
    { 
      id: "web-dev", 
      title: "Web Development", 
      subtitle: "Simple company details, live site link & cover image", 
      icon: Code2, 
      color: "#6a35ff" 
    },
    { 
      id: "seo", 
      title: "SEO & Marketing", 
      subtitle: "Before vs After metrics, keyword rankings & ROI stats", 
      icon: Search, 
      color: "#00c2ff" 
    },
    { 
      id: "graphic-design", 
      title: "Graphics & Logo Design", 
      subtitle: "Pure logo & graphic asset image gallery showcase", 
      icon: Palette, 
      color: "#ff007a" 
    },
    { 
      id: "videography", 
      title: "Videography & Motion", 
      subtitle: "Video URL link (YouTube/Vimeo/MP4) & thumbnail", 
      icon: Video, 
      color: "#ff3b30" 
    },
    { 
      id: "custom-software", 
      title: "Custom Software", 
      subtitle: "SaaS details, system screenshots & architecture", 
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
            Step 1: Select Service Category
          </span>
          <h2 className="text-2xl font-black text-white mt-2">What service are you adding this project for?</h2>
          <p className="text-xs text-[#dcd7e3]/70 mt-1">
            The form fields below will automatically adapt to show only what's required for this service!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {serviceCategories.map((cat) => {
            const isSelected = selectedServiceCategory === cat.id;
            const CatIcon = cat.icon;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedServiceCategory(cat.id)}
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

      {/* STEP 2: DYNAMICALLY ADAPTED FORM */}
      <form action={action} className="bg-[#1a1122] p-6 md:p-8 rounded-3xl border border-white/15 shadow-2xl space-y-8">
        <input type="hidden" name="serviceCategory" value={selectedServiceCategory} />
        <input type="hidden" name="galleryImages" value={JSON.stringify(galleryList)} />

        {/* Form Mode Header Banner */}
        <div className="p-4 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#ffbe00]/20 text-[#ffbe00] flex items-center justify-center font-black">
              {selectedServiceCategory === "web-dev" && <Code2 size={20} />}
              {selectedServiceCategory === "seo" && <Search size={20} />}
              {selectedServiceCategory === "graphic-design" && <Palette size={20} />}
              {selectedServiceCategory === "videography" && <Video size={20} />}
              {selectedServiceCategory === "custom-software" && <Cpu size={20} />}
            </div>
            <div>
              <h3 className="text-base font-bold text-white uppercase tracking-wider">
                {selectedServiceCategory === "web-dev" && "Web Development Form Mode"}
                {selectedServiceCategory === "seo" && "SEO & Marketing Form Mode"}
                {selectedServiceCategory === "graphic-design" && "Graphics & Logo Design Form Mode"}
                {selectedServiceCategory === "videography" && "Videography & Motion Form Mode"}
                {selectedServiceCategory === "custom-software" && "Custom Software Form Mode"}
              </h3>
              <p className="text-xs text-[#dcd7e3]/70 font-medium">
                Fill in the tailored fields below.
              </p>
            </div>
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* MODE 1: WEB DEVELOPMENT (SIMPLE DETAILS + LIVE LINK) */}
        {/* ---------------------------------------------------- */}
        {selectedServiceCategory === "web-dev" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-white">Project Title <span className="text-[#ffbe00]">*</span></label>
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
                <label className="text-sm font-semibold text-white">Company / Client Name</label>
                <input 
                  type="text" 
                  name="client" 
                  defaultValue={project?.client || ""}
                  className="bg-black/30 border border-white/15 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ffbe00]"
                  placeholder="e.g. Luxora Retail UK"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-white flex items-center gap-1.5">
                  <Globe size={16} className="text-[#ffbe00]" /> Live Website URL
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
                <label className="text-sm font-semibold text-white">Tech Stack / Tags</label>
                <input 
                  type="text" 
                  name="tags" 
                  defaultValue={project?.tags || "Next.js, Tailwind CSS, React"}
                  className="bg-black/30 border border-white/15 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ffbe00]"
                  placeholder="e.g. Next.js, React, Tailwind, Stripe"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-white">Short Description <span className="text-[#ffbe00]">*</span></label>
              <textarea 
                name="description" 
                rows={3}
                required
                defaultValue={project?.description || ""}
                className="bg-black/30 border border-white/15 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ffbe00] text-sm resize-none"
                placeholder="Brief summary of the web development project..."
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-white">Cover Image <span className="text-[#ffbe00]">*</span></label>
              <ImageUpload name="image" defaultValue={project?.image || ""} />
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* MODE 2: SEO & MARKETING (BEFORE vs AFTER + STATS) */}
        {/* ---------------------------------------------------- */}
        {(selectedServiceCategory === "seo" || selectedServiceCategory === "marketing" || selectedServiceCategory === "telemarketing") && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-white">Campaign Title <span className="text-[#ffbe00]">*</span></label>
                <input 
                  type="text" 
                  name="title" 
                  required
                  defaultValue={project?.title || ""}
                  className="bg-black/30 border border-white/15 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ffbe00]"
                  placeholder="e.g. 4.5x Organic Search Traffic Scaling"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-white">Company / Client Name</label>
                <input 
                  type="text" 
                  name="client" 
                  defaultValue={project?.client || ""}
                  className="bg-black/30 border border-white/15 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ffbe00]"
                  placeholder="e.g. Apex Health UK"
                />
              </div>
            </div>

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
                <label className="text-xs font-bold text-red-400 uppercase">🛑 BEFORE AERONOX (Initial State)</label>
                <textarea 
                  name="beforeStats" 
                  rows={4}
                  defaultValue={project?.beforeStats || ""}
                  className="bg-black/30 border border-red-500/30 rounded-xl px-4 py-3 text-white text-sm resize-none"
                  placeholder="e.g.&#10;• 1,200 Monthly Organic Visitors&#10;• Rank #45 for core keywords"
                />
                <label className="text-xs text-red-300 font-semibold mt-2">Before Image (Optional)</label>
                <ImageUpload name="beforeImage" defaultValue={project?.beforeImage || ""} />
              </div>

              <div className="flex flex-col gap-3 bg-emerald-500/10 border border-emerald-500/20 p-5 rounded-2xl">
                <label className="text-xs font-bold text-emerald-400 uppercase">🚀 AFTER AERONOX (Results Delivered)</label>
                <textarea 
                  name="afterStats" 
                  rows={4}
                  defaultValue={project?.afterStats || ""}
                  className="bg-black/30 border border-emerald-500/30 rounded-xl px-4 py-3 text-white text-sm resize-none"
                  placeholder="e.g.&#10;• 48,500 Monthly Organic Visitors&#10;• Rank #1 for commercial keywords"
                />
                <label className="text-xs text-emerald-300 font-semibold mt-2">After Image (Optional)</label>
                <ImageUpload name="afterImage" defaultValue={project?.afterImage || ""} />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-white">Short Summary <span className="text-[#ffbe00]">*</span></label>
              <textarea 
                name="description" 
                rows={3}
                required
                defaultValue={project?.description || ""}
                className="bg-black/30 border border-white/15 rounded-xl px-4 py-3 text-white text-sm resize-none"
                placeholder="Brief SEO strategy summary..."
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-white">Campaign Cover Image <span className="text-[#ffbe00]">*</span></label>
              <ImageUpload name="image" defaultValue={project?.image || ""} />
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* MODE 3: GRAPHICS & LOGO DESIGN (PURE IMAGE GALLERY)  */}
        {/* ---------------------------------------------------- */}
        {selectedServiceCategory === "graphic-design" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-white">Brand / Project Name</label>
                <input 
                  type="text" 
                  name="title" 
                  defaultValue={project?.title || "Brand Logo & Visual Identity Showcase"}
                  className="bg-black/30 border border-white/15 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ff007a]"
                  placeholder="e.g. Luxora Brand Identity & Logo Suite"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-white">Client / Company Name</label>
                <input 
                  type="text" 
                  name="client" 
                  defaultValue={project?.client || ""}
                  className="bg-black/30 border border-white/15 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ff007a]"
                  placeholder="e.g. Luxora Haus"
                />
              </div>
            </div>

            {/* MULTI-LOGO GALLERY UPLOADER */}
            <div className="p-6 rounded-2xl bg-[#ff007a]/10 border border-[#ff007a]/30 space-y-4">
              <label className="text-sm font-bold text-[#ff007a] flex items-center gap-2 uppercase tracking-wider">
                <ImageIcon size={18} /> Upload Logos & Graphic Design Images
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
                    <Plus size={14} /> Add Logo To Showcase Gallery
                  </button>
                </div>
              )}
            </div>

            {/* Uploaded Gallery Grid */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                Uploaded Logos ({galleryList.length})
              </h4>
              
              {galleryList.length === 0 ? (
                <div className="p-8 rounded-2xl bg-black/30 border border-white/10 text-center text-xs text-gray-400">
                  No logo images uploaded yet. Upload images above to add to this logo gallery!
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
                  {galleryList.map((imgUrl, idx) => (
                    <div key={idx} className="relative group rounded-2xl bg-black/60 border border-white/15 aspect-square flex items-center justify-center p-2">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={imgUrl} alt={`Logo ${idx}`} className="object-contain max-h-full max-w-full rounded-lg" />
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

        {/* ---------------------------------------------------- */}
        {/* MODE 4: VIDEOGRAPHY & MOTION (VIDEO LINK + THUMBNAIL) */}
        {/* ---------------------------------------------------- */}
        {selectedServiceCategory === "videography" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-white">Video Commercial Title <span className="text-[#ffbe00]">*</span></label>
                <input 
                  type="text" 
                  name="title" 
                  required
                  defaultValue={project?.title || ""}
                  className="bg-black/30 border border-white/15 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ffbe00]"
                  placeholder="e.g. Brand Commercial & Motion Graphics Ad"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-white">Client / Company Name</label>
                <input 
                  type="text" 
                  name="client" 
                  defaultValue={project?.client || ""}
                  className="bg-black/30 border border-white/15 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ffbe00]"
                  placeholder="e.g. Velocity Fitness"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 bg-[#ff3b30]/10 border border-[#ff3b30]/30 p-5 rounded-2xl">
              <label className="text-sm font-bold text-[#ff3b30] flex items-center gap-1.5 uppercase tracking-wider">
                <Video size={16} /> Video URL / Embed Link (YouTube, Vimeo, MP4) <span className="text-white">*</span>
              </label>
              <input 
                type="url" 
                name="videoUrl" 
                required
                defaultValue={project?.videoUrl || ""}
                className="bg-black/40 border border-[#ff3b30]/40 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ff3b30]"
                placeholder="https://www.youtube.com/watch?v=... OR https://vimeo.com/..."
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-white">Video Description <span className="text-[#ffbe00]">*</span></label>
              <textarea 
                name="description" 
                rows={3}
                required
                defaultValue={project?.description || ""}
                className="bg-black/30 border border-white/15 rounded-xl px-4 py-3 text-white text-sm resize-none"
                placeholder="Brief summary of the video production..."
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-white">Video Cover Thumbnail Image <span className="text-[#ffbe00]">*</span></label>
              <ImageUpload name="image" defaultValue={project?.image || ""} />
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* MODE 5: CUSTOM SOFTWARE (SCREENSHOTS + DETAILS)       */}
        {/* ---------------------------------------------------- */}
        {selectedServiceCategory === "custom-software" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-white">SaaS / Platform Title <span className="text-[#ffbe00]">*</span></label>
                <input 
                  type="text" 
                  name="title" 
                  required
                  defaultValue={project?.title || ""}
                  className="bg-black/30 border border-white/15 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ffbe00]"
                  placeholder="e.g. Enterprise Cloud Analytics & Microservices Platform"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-white">Client / Company Name</label>
                <input 
                  type="text" 
                  name="client" 
                  defaultValue={project?.client || ""}
                  className="bg-black/30 border border-white/15 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ffbe00]"
                  placeholder="e.g. CloudFlow SaaS"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-white flex items-center gap-1.5">
                  <Globe size={16} className="text-[#ffbe00]" /> Live SaaS App Link
                </label>
                <input 
                  type="url" 
                  name="liveUrl" 
                  defaultValue={project?.liveUrl || ""}
                  className="bg-black/30 border border-white/15 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ffbe00]"
                  placeholder="https://app.clientplatform.com"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-white">Architecture & Stack</label>
                <input 
                  type="text" 
                  name="tags" 
                  defaultValue={project?.tags || "Firestore, Node.js, Next.js, Microservices"}
                  className="bg-black/30 border border-white/15 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ffbe00]"
                  placeholder="e.g. Firestore, Docker, Next.js, Redis"
                />
              </div>
            </div>

            {/* SYSTEM SCREENSHOTS GALLERY */}
            <div className="p-6 rounded-2xl bg-[#af52de]/10 border border-[#af52de]/30 space-y-4">
              <label className="text-sm font-bold text-[#af52de] flex items-center gap-2 uppercase tracking-wider">
                <ImageIcon size={18} /> Upload System Screenshots Gallery
              </label>

              <ImageUpload onChange={(url) => setTempImage(url)} defaultValue="" />
              
              {tempImage && (
                <div className="flex items-center gap-3 pt-2">
                  <span className="text-xs text-emerald-400 font-bold">Screenshot Uploaded!</span>
                  <button
                    type="button"
                    onClick={addImageToGallery}
                    className="px-4 py-2 bg-[#af52de] text-white font-bold text-xs rounded-xl uppercase flex items-center gap-1.5 shadow-md hover:bg-white hover:text-black transition-colors"
                  >
                    <Plus size={14} /> Add System Screenshot To Gallery
                  </button>
                </div>
              )}
            </div>

            {/* Screenshots Grid */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                Uploaded System Screenshots ({galleryList.length})
              </h4>
              
              {galleryList.length === 0 ? (
                <div className="p-8 rounded-2xl bg-black/30 border border-white/10 text-center text-xs text-gray-400">
                  No system screenshots uploaded yet. Upload images above to show platform UI!
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
                  {galleryList.map((imgUrl, idx) => (
                    <div key={idx} className="relative group rounded-2xl bg-black/60 border border-white/15 aspect-video flex items-center justify-center p-2 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={imgUrl} alt={`Screenshot ${idx}`} className="object-cover w-full h-full rounded-lg" />
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

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-white">System Description <span className="text-[#ffbe00]">*</span></label>
              <textarea 
                name="description" 
                rows={3}
                required
                defaultValue={project?.description || ""}
                className="bg-black/30 border border-white/15 rounded-xl px-4 py-3 text-white text-sm resize-none"
                placeholder="Overview of the custom software platform..."
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-white">Main Platform Dashboard Cover Image <span className="text-[#ffbe00]">*</span></label>
              <ImageUpload name="image" defaultValue={project?.image || ""} />
            </div>
          </div>
        )}

        {/* SUBMIT ACTION BAR */}
        <div className="pt-6 border-t border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-[#dcd7e3]/60 font-medium">
            <CheckCircle2 size={14} className="text-emerald-400" />
            <span>Form configured for {selectedServiceCategory} mode</span>
          </div>

          <button
            type="submit"
            className="px-8 py-4 bg-[#ffbe00] text-[#24182e] font-black text-xs uppercase tracking-widest rounded-xl hover:bg-white transition-all shadow-[0_0_25px_rgba(255,190,0,0.3)] hover:scale-105"
          >
            {project ? "Update Project" : "Publish Project Live"}
          </button>
        </div>

      </form>
    </div>
  );
}
