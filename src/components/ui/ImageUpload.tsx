"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { UploadCloud, X, Loader2, Link } from "lucide-react";

interface ImageUploadProps {
  name: string;
  defaultValue?: string;
}

export function ImageUpload({ name, defaultValue = "" }: ImageUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string>(defaultValue);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [urlInput, setUrlInput] = useState("");

  const processFile = async (file: File) => {
    // Validate type and size (e.g. max 5MB)
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5MB.");
      return;
    }

    setError(null);
    setIsUploading(true);

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
          const errorData = await res.json();
          if (errorData.error) errorMsg = errorData.error;
        } catch(e) {}
        throw new Error(errorMsg);
      }

      const data = await res.json();
      setPreviewUrl(data.url);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await processFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      await processFile(file);
    }
  };

  const handleRemove = () => {
    setPreviewUrl("");
    setError(null);
    setUrlInput("");
  };

  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      setPreviewUrl(urlInput.trim());
      setError(null);
    }
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <input type="hidden" name={name} value={previewUrl} />
      
      {previewUrl ? (
        <div className="relative w-full h-48 rounded-xl border border-white/10 bg-black/20 overflow-hidden group">
          <Image 
            src={previewUrl} 
            alt="Upload preview" 
            fill 
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
            <button
              type="button"
              onClick={handleRemove}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors font-medium text-sm"
            >
              <X size={16} /> Remove Image
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div 
            onClick={() => !isUploading && fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`relative w-full h-48 rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-3 transition-colors ${
              error ? "border-red-500/50 bg-red-500/5" : 
              isDragOver ? "border-[#ffbe00] bg-white/10" :
              "border-white/10 bg-white/5 hover:bg-white/10 hover:border-[#ffbe00]/50 cursor-pointer"
            }`}
          >
            {isUploading ? (
              <div className="flex flex-col items-center gap-2 text-[#ffbe00]">
                <Loader2 size={28} className="animate-spin" />
                <p className="text-sm font-medium">Uploading...</p>
              </div>
            ) : (
              <>
                <div className="w-12 h-12 rounded-full bg-black/40 flex items-center justify-center text-[#dcd7e3]/50">
                  <UploadCloud size={24} />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-white mb-1">Click to upload image</p>
                  <p className="text-xs text-[#dcd7e3]/40">SVG, PNG, JPG or GIF (max. 5MB)</p>
                </div>
              </>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            <div className="h-px bg-white/10 flex-1"></div>
            <span className="text-xs font-semibold text-[#dcd7e3]/40 uppercase">OR</span>
            <div className="h-px bg-white/10 flex-1"></div>
          </div>
          
          <div className="flex gap-2">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Link size={16} className="text-[#dcd7e3]/40" />
              </div>
              <input
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleUrlSubmit();
                  }
                }}
                placeholder="Paste an image URL here..."
                className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#ffbe00]/50 focus:ring-1 focus:ring-[#ffbe00]/50 transition-colors placeholder:text-[#dcd7e3]/30"
              />
            </div>
            <button
              type="button"
              onClick={handleUrlSubmit}
              disabled={!urlInput.trim()}
              className="px-4 py-2.5 bg-[#ffbe00] text-[#24182e] text-sm font-bold rounded-xl hover:bg-[#ffbe00]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Apply Link
            </button>
          </div>
        </div>
      )}

      {error && <p className="text-sm text-red-400 mt-1">{error}</p>}

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
}
