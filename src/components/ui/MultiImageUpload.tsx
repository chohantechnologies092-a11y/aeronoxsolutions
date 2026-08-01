"use client";

import { useState, useRef } from "react";
import { UploadCloud, Loader2 } from "lucide-react";

interface MultiImageUploadProps {
  onUploadSuccess: (urls: string[]) => void;
}

export function MultiImageUpload({ onUploadSuccess }: MultiImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFiles = async (files: FileList | File[]) => {
    const validFiles = Array.from(files).filter(f => {
      if (!f.type.startsWith("image/")) {
        setError("Please select image files only.");
        return false;
      }
      if (f.size > 5 * 1024 * 1024) {
        setError(`File ${f.name} is larger than 5MB.`);
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    setError(null);
    setIsUploading(true);

    try {
      const uploadedUrls: string[] = [];

      for (const file of validFiles) {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          throw new Error("Upload failed for one or more files.");
        }

        const data = await res.json();
        uploadedUrls.push(data.url);
      }

      onUploadSuccess(uploadedUrls);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to upload images. Please try again.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    await processFiles(e.target.files);
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

    if (e.dataTransfer.files?.length) {
      await processFiles(e.dataTransfer.files);
    }
  };

  return (
    <div className="w-full flex flex-col gap-2">
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
            <p className="text-sm font-medium">Uploading Images...</p>
          </div>
        ) : (
          <>
            <div className="w-12 h-12 rounded-full bg-black/40 flex items-center justify-center text-[#dcd7e3]/50">
              <UploadCloud size={24} />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-white mb-1">Click to select multiple images</p>
              <p className="text-xs text-[#dcd7e3]/40">SVG, PNG, JPG or GIF (max. 5MB per file)</p>
            </div>
          </>
        )}
      </div>

      {error && <p className="text-sm text-red-400 mt-1">{error}</p>}

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        multiple
        className="hidden"
      />
    </div>
  );
}
