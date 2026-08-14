"use client";

import { useState, useRef } from "react";
import { UploadCloud, X, Loader2, Link, PlayCircle } from "lucide-react";

interface VideoUploadProps {
  name?: string;
  defaultValue?: string;
  onChange?: (url: string) => void;
}

export function VideoUpload({ name = "video", defaultValue = "", onChange }: VideoUploadProps) {
  const [previewUrl, setPreviewUrlState] = useState<string>(defaultValue);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [urlInput, setUrlInput] = useState("");

  const updatePreviewUrl = (url: string) => {
    setPreviewUrlState(url);
    if (onChange) {
      onChange(url);
    }
  };

  const processFile = async (file: File) => {
    // Validate type and size (e.g. max 20MB for video)
    if (!file.type.startsWith("video/")) {
      setError("Please select a video file.");
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      setError("File size must be less than 20MB.");
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
      updatePreviewUrl(data.url);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to upload video. Please try again.");
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
    updatePreviewUrl("");
    setError(null);
    setUrlInput("");
  };

  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      updatePreviewUrl(urlInput.trim());
      setError(null);
    }
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <input type="hidden" name={name} value={previewUrl} />
      
      {previewUrl ? (
        <div className="relative w-full rounded-xl border border-white/10 bg-black/20 overflow-hidden group">
          <video 
            src={previewUrl} 
            controls 
            className="w-full h-auto max-h-64 object-cover"
          />
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              type="button"
              onClick={handleRemove}
              className="flex items-center gap-2 px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium text-xs shadow-lg"
            >
              <X size={14} /> Remove
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
                <p className="text-sm font-medium">Uploading video...</p>
              </div>
            ) : (
              <>
                <div className="w-12 h-12 rounded-full bg-black/40 flex items-center justify-center text-[#dcd7e3]/50">
                  <PlayCircle size={24} />
                </div>
                <div className="text-center px-4">
                  <p className="text-sm font-medium text-white mb-1">Click to upload video</p>
                  <p className="text-xs text-[#dcd7e3]/40">MP4, WEBM, or OGG (max. 20MB)</p>
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
                placeholder="Paste a video URL here (e.g. Cloudinary)..."
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
        accept="video/*"
        className="hidden"
      />
    </div>
  );
}
