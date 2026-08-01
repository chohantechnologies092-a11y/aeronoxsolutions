"use client";

import { useState } from "react";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { Plus, X, ImageIcon, Search, Save } from "lucide-react";

interface GraphicGalleryFormProps {
  gallery?: any;
  action: (formData: FormData) => Promise<void>;
}

export function GraphicGalleryForm({ gallery, action }: GraphicGalleryFormProps) {
  const [galleryList, setGalleryList] = useState<string[]>(gallery?.galleryImages || []);
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
      <form action={action} className="bg-admin-card p-6 md:p-8 rounded-3xl border border-admin-border shadow-2xl space-y-8">
        {/* Hidden inputs to make this act like a normal "project" but heavily simplified */}
        <input type="hidden" name="serviceCategory" value="graphic-design" />
        <input type="hidden" name="galleryImages" value={JSON.stringify(galleryList)} />
        {/* Required fallbacks for project creation */}
        <input type="hidden" name="description" value="Brand logo and visual identity asset showcase." />
        <input type="hidden" name="showOnHome" value="true" />
        {/* If updating, we pass id and original slug */}
        {gallery && (
          <>
            <input type="hidden" name="id" value={gallery.id} />
            <input type="hidden" name="slug" value={gallery.slug} />
          </>
        )}

        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-white">Gallery Name <span className="text-[#ff007a]">*</span></label>
            <input 
              type="text" 
              name="title" 
              required
              defaultValue={gallery?.title || ""}
              className="bg-black/30 border border-white/15 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ff007a]"
              placeholder="e.g. Minimalist Tech Logos"
            />
          </div>
        </div>

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
                No images uploaded yet. Upload images above to add them to this gallery!
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

        {/* SEO & ACCESSIBILITY SECTION (Simplified) */}
        <div className="pt-6 border-t border-white/10 space-y-4">
          <label className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Search size={16} className="text-[#ff007a]" /> SEO Meta Title (Optional)
          </label>
          <input 
            type="text" 
            name="metaTitle" 
            defaultValue={gallery?.metaTitle || ""}
            className="bg-black/30 border border-white/15 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ff007a] w-full"
            placeholder="Custom title for Google (default: Gallery Name)"
          />
        </div>

        <div className="pt-6 border-t border-white/10 flex justify-end">
          <button
            type="submit"
            className="px-8 py-4 bg-[#ff007a] text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-white hover:text-black transition-all shadow-lg hover:scale-105 flex items-center gap-2"
          >
            <Save size={16} />
            {gallery ? "Save Gallery Updates" : "Publish Gallery"}
          </button>
        </div>
      </form>
    </div>
  );
}
