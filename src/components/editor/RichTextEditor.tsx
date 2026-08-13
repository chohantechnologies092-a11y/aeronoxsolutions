/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import { AlignLeft, AlignCenter, AlignRight, Trash2, Maximize2, Minimize2 } from "lucide-react";

// ReactQuill needs to be dynamically imported because it uses the DOM
const ReactQuill = dynamic(() => import("react-quill-new"), { 
  ssr: false, 
  loading: () => (
    <div className="h-64 w-full animate-pulse bg-white/5 rounded-xl flex items-center justify-center text-[#dcd7e3]/40">
      Loading Editor...
    </div>
  )
});

interface RichTextEditorProps {
  name: string;
  defaultValue?: string;
  placeholder?: string;
}

export function RichTextEditor({ name, defaultValue = "", placeholder }: RichTextEditorProps) {
  const quillRef = useRef<any>(null);
  const [selectedImg, setSelectedImg] = useState<HTMLImageElement | null>(null);
  // Track whether the editor has been initialized to prevent content loss
  const initializedRef = useRef(false);

  // On mount: pre-populate the hidden input with defaultValue
  // This ensures data is captured even if user never types in the editor
  useEffect(() => {
    if (!initializedRef.current) {
      const hiddenInput = document.getElementById(`${name}-hidden`) as HTMLInputElement;
      if (hiddenInput && defaultValue) {
        hiddenInput.value = defaultValue;
      }
      initializedRef.current = true;
    }
  }, [name, defaultValue]);

  // Sync content to hidden input whenever Quill updates
  const syncToHiddenInput = (html: string) => {
    const hiddenInput = document.getElementById(`${name}-hidden`) as HTMLInputElement;
    if (hiddenInput) {
      hiddenInput.value = html;
    }
  };

  // Image Upload Handler
  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files ? input.files[0] : null;
      if (!file) return;

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
        const url = data.url;

        const quill = quillRef.current?.getEditor();
        if (quill) {
          const range = quill.getSelection(true);
          quill.insertEmbed(range.index, "image", url);
          quill.setSelection(range.index + 1);
        }
      } catch (error: any) {
        console.error("Image upload failed:", error);
        alert(error.message || "Failed to upload image. Please try again.");
      }
    };
  };

  // Attach click listener on Quill editor images to show resize & alignment toolbar
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && target.tagName === "IMG" && target.closest(".ql-editor")) {
        setSelectedImg(target as HTMLImageElement);
      } else if (!target.closest(".img-controls-bar")) {
        setSelectedImg(null);
      }
    };

    document.addEventListener("click", handleGlobalClick);
    return () => document.removeEventListener("click", handleGlobalClick);
  }, []);

  // Image Helper Functions
  const setImgWidth = (widthPercent: string) => {
    if (!selectedImg) return;
    selectedImg.style.width = widthPercent;
    selectedImg.style.height = "auto";
    const quill = quillRef.current?.getEditor();
    if (quill) {
      syncToHiddenInput(quill.root.innerHTML);
    }
  };

  const setImgAlign = (align: "left" | "center" | "right") => {
    if (!selectedImg) return;
    selectedImg.style.display = "block";
    if (align === "left") {
      selectedImg.style.marginLeft = "0";
      selectedImg.style.marginRight = "auto";
    } else if (align === "center") {
      selectedImg.style.marginLeft = "auto";
      selectedImg.style.marginRight = "auto";
    } else if (align === "right") {
      selectedImg.style.marginLeft = "auto";
      selectedImg.style.marginRight = "0";
    }
    const quill = quillRef.current?.getEditor();
    if (quill) {
      syncToHiddenInput(quill.root.innerHTML);
    }
  };

  const removeImg = () => {
    if (!selectedImg) return;
    selectedImg.remove();
    setSelectedImg(null);
    const quill = quillRef.current?.getEditor();
    if (quill) {
      syncToHiddenInput(quill.root.innerHTML);
    }
  };

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': [] }, { 'background': [] }],
        ['blockquote', 'code-block'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'indent': '-1'}, { 'indent': '+1' }],
        [{ 'align': [] }],
        ['link', 'image', 'video'],
        ['clean']
      ],
      handlers: {
        image: imageHandler
      }
    },
    // CRITICAL: matchVisual:false prevents Quill's clipboard module from stripping
    // links and other HTML attributes when loading initial content.
    clipboard: {
      matchVisual: false,
    },
  }), []);

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'color', 'background',
    'blockquote', 'code-block',
    'list', 'indent',
    'align',
    'link', 'image', 'video'
  ];

  return (
    <div className="rich-text-editor-container bg-[#120c1f] border border-white/20 rounded-2xl overflow-hidden shadow-2xl relative">
      {/* Floating Image Resize & Alignment Control Bar */}
      {selectedImg && (
        <div className="img-controls-bar absolute top-3 right-4 z-40 bg-[#24182e] border border-[#ffbe00]/40 rounded-2xl px-4 py-2 shadow-2xl flex items-center gap-3 text-xs animate-in fade-in slide-in-from-top-2">
          <span className="text-[#ffbe00] font-bold uppercase tracking-wider text-[10px]">
            Image Options:
          </span>

          {/* Width Presets */}
          <div className="flex items-center gap-1 bg-black/30 p-1 rounded-xl border border-white/10">
            <button
              type="button"
              onClick={() => setImgWidth("25%")}
              className="px-2 py-1 rounded-lg text-white hover:bg-[#ffbe00] hover:text-[#24182e] transition-colors font-bold"
              title="25% Width"
            >
              25%
            </button>
            <button
              type="button"
              onClick={() => setImgWidth("50%")}
              className="px-2 py-1 rounded-lg text-white hover:bg-[#ffbe00] hover:text-[#24182e] transition-colors font-bold"
              title="50% Width"
            >
              50%
            </button>
            <button
              type="button"
              onClick={() => setImgWidth("75%")}
              className="px-2 py-1 rounded-lg text-white hover:bg-[#ffbe00] hover:text-[#24182e] transition-colors font-bold"
              title="75% Width"
            >
              75%
            </button>
            <button
              type="button"
              onClick={() => setImgWidth("100%")}
              className="px-2 py-1 rounded-lg text-white hover:bg-[#ffbe00] hover:text-[#24182e] transition-colors font-bold flex items-center gap-1"
              title="100% Full Width"
            >
              <Maximize2 size={12} /> 100%
            </button>
          </div>

          <div className="w-px h-4 bg-white/20" />

          {/* Alignment Presets */}
          <div className="flex items-center gap-1 bg-black/30 p-1 rounded-xl border border-white/10">
            <button
              type="button"
              onClick={() => setImgAlign("left")}
              className="p-1.5 rounded-lg text-white hover:bg-[#ffbe00] hover:text-[#24182e] transition-colors"
              title="Align Left"
            >
              <AlignLeft size={14} />
            </button>
            <button
              type="button"
              onClick={() => setImgAlign("center")}
              className="p-1.5 rounded-lg text-white hover:bg-[#ffbe00] hover:text-[#24182e] transition-colors"
              title="Align Center"
            >
              <AlignCenter size={14} />
            </button>
            <button
              type="button"
              onClick={() => setImgAlign("right")}
              className="p-1.5 rounded-lg text-white hover:bg-[#ffbe00] hover:text-[#24182e] transition-colors"
              title="Align Right"
            >
              <AlignRight size={14} />
            </button>
          </div>

          <div className="w-px h-4 bg-white/20" />

          {/* Delete Image */}
          <button
            type="button"
            onClick={removeImg}
            className="p-1.5 rounded-lg text-red-400 hover:bg-red-500/20 transition-colors"
            title="Delete Image"
          >
            <Trash2 size={14} />
          </button>
        </div>
      )}

      {/* High-specificity custom CSS wrapper for Quill toolbar and editor */}
      <style dangerouslySetInnerHTML={{__html: `
        div.rich-text-editor-container {
          background-color: #120c1f !important;
          border: 1px solid rgba(255, 255, 255, 0.2) !important;
          border-radius: 1rem !important;
          position: relative !important;
        }

        div.rich-text-editor-container .ql-toolbar.ql-snow {
          position: sticky !important;
          top: 0 !important;
          z-index: 40 !important;
          background-color: #24182e !important;
          border: none !important;
          border-bottom: 1px solid rgba(255, 255, 255, 0.2) !important;
          border-top-left-radius: 1rem !important;
          border-top-right-radius: 1rem !important;
          padding: 10px 14px !important;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5) !important;
        }

        div.rich-text-editor-container .ql-container.ql-snow {
          background-color: #120c1f !important;
          border: none !important;
          min-height: 350px !important;
          max-height: 550px !important;
          overflow-y: auto !important;
          color: #ffffff !important;
        }

        div.rich-text-editor-container .ql-editor {
          min-height: 350px !important;
          max-height: 550px !important;
          overflow-y: auto !important;
          color: #ffffff !important;
          font-size: 15px !important;
        }

        div.rich-text-editor-container .ql-editor img {
          cursor: pointer !important;
          transition: border-color 0.2s, transform 0.2s;
          border-radius: 12px;
          display: block;
          max-width: 100%;
        }

        div.rich-text-editor-container .ql-editor img:hover {
          outline: 3px solid #ffbe00 !important;
        }

        div.rich-text-editor-container .ql-editor.ql-blank::before {
          color: rgba(255, 255, 255, 0.5) !important;
          font-style: normal !important;
        }

        /* SVG Icon Fill & Stroke High Contrast Fix */
        div.rich-text-editor-container .ql-snow .ql-stroke,
        div.rich-text-editor-container .ql-snow button .ql-stroke,
        div.rich-text-editor-container .ql-snow .ql-picker-label svg .ql-stroke {
          stroke: #ffffff !important;
        }

        div.rich-text-editor-container .ql-snow .ql-fill,
        div.rich-text-editor-container .ql-snow button .ql-fill,
        div.rich-text-editor-container .ql-snow .ql-stroke.ql-fill,
        div.rich-text-editor-container .ql-snow .ql-picker-label svg .ql-fill {
          fill: #ffffff !important;
        }

        div.rich-text-editor-container .ql-snow .ql-picker {
          color: #ffffff !important;
        }

        div.rich-text-editor-container .ql-snow .ql-picker-label {
          color: #ffffff !important;
        }

        /* Hover & Active States */
        div.rich-text-editor-container .ql-snow button:hover .ql-stroke,
        div.rich-text-editor-container .ql-snow .ql-picker-label:hover .ql-stroke,
        div.rich-text-editor-container .ql-snow button.ql-active .ql-stroke,
        div.rich-text-editor-container .ql-snow .ql-picker-label.ql-active .ql-stroke {
          stroke: #ffbe00 !important;
        }

        div.rich-text-editor-container .ql-snow button:hover .ql-fill,
        div.rich-text-editor-container .ql-snow .ql-picker-label:hover .ql-fill,
        div.rich-text-editor-container .ql-snow button.ql-active .ql-fill,
        div.rich-text-editor-container .ql-snow .ql-picker-label.ql-active .ql-fill {
          fill: #ffbe00 !important;
        }

        div.rich-text-editor-container .ql-snow .ql-picker-label:hover,
        div.rich-text-editor-container .ql-snow .ql-picker-label.ql-active {
          color: #ffbe00 !important;
        }

        /* Dropdowns & Tooltips */
        div.rich-text-editor-container .ql-snow .ql-picker-options {
          background-color: #24182e !important;
          border: 1px solid rgba(255, 255, 255, 0.2) !important;
          box-shadow: 0 10px 30px rgba(0,0,0,0.7) !important;
          border-radius: 12px !important;
          padding: 6px !important;
        }

        div.rich-text-editor-container .ql-snow .ql-picker-item {
          color: #ffffff !important;
          padding: 4px 8px !important;
          border-radius: 6px !important;
        }

        div.rich-text-editor-container .ql-snow .ql-picker-item:hover {
          color: #ffbe00 !important;
          background-color: rgba(255, 190, 0, 0.15) !important;
        }

        div.rich-text-editor-container .ql-snow .ql-tooltip {
          background-color: #24182e !important;
          border: 1px solid rgba(255, 255, 255, 0.25) !important;
          color: #ffffff !important;
          box-shadow: 0 10px 30px rgba(0,0,0,0.8) !important;
          border-radius: 12px !important;
          z-index: 50 !important;
        }

        div.rich-text-editor-container .ql-snow .ql-tooltip input[type=text] {
          background-color: rgba(0,0,0,0.5) !important;
          border: 1px solid rgba(255, 255, 255, 0.25) !important;
          color: #ffffff !important;
          border-radius: 8px !important;
          padding: 6px 10px !important;
        }
      `}} />
      
      {/* Hidden input to store the HTML content for the form action */}
      <input type="hidden" name={name} id={`${name}-hidden`} defaultValue={defaultValue} />
      
      <ReactQuill
        // @ts-expect-error - ReactQuill types are outdated and don't include ref
        ref={quillRef}
        theme="snow"
        defaultValue={defaultValue}
        onChange={(content) => {
          if (content.length > 500000) {
            alert("⚠️ Warning: Your content is very large, likely because you pasted an image directly. This might fail to save. Please delete the pasted image and use the Image Upload button in the toolbar instead.");
          }
          syncToHiddenInput(content);
        }}
        modules={modules}
        formats={formats}
        placeholder={placeholder || "Start writing..."}
      />
    </div>
  );
}
