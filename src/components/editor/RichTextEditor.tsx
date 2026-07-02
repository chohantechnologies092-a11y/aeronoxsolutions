"use client";

import { useMemo, useRef } from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

// ReactQuill needs to be dynamically imported because it uses the DOM
const ReactQuill = dynamic(() => import("react-quill-new"), { 
  ssr: false, 
  loading: () => <div className="h-64 w-full animate-pulse bg-white/5 rounded-xl flex items-center justify-center text-[#dcd7e3]/40">Loading Editor...</div>
});

interface RichTextEditorProps {
  name: string;
  defaultValue?: string;
  placeholder?: string;
}

export function RichTextEditor({ name, defaultValue = "", placeholder }: RichTextEditorProps) {
  // We use a ref to hold the current value so we can update the hidden input
  // Since ReactQuill is controlled, we maintain the state here
  const quillRef = useRef<any>(null);

  // Custom image handler to upload to our /api/upload endpoint
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

        if (!res.ok) throw new Error("Upload failed");
        
        const data = await res.json();
        const url = data.url;

        // Insert the image into the editor
        const quill = quillRef.current?.getEditor();
        if (quill) {
          const range = quill.getSelection(true);
          quill.insertEmbed(range.index, "image", url);
          quill.setSelection(range.index + 1);
        }
      } catch (error) {
        console.error("Image upload failed:", error);
        alert("Failed to upload image. Please try again.");
      }
    };
  };

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        [{ 'align': [] }],
        ['link', 'image', 'video'],
        ['clean']                                         // remove formatting button
      ],
      handlers: {
        image: imageHandler
      }
    }
  }), []);

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'blockquote', 'code-block',
    'list', 'indent',
    'align',
    'link', 'image', 'video'
  ];

  return (
    <div className="rich-text-editor-container bg-black/20 border border-white/10 rounded-xl overflow-hidden">
      {/* We need a custom CSS wrapper to style the Quill toolbar for dark mode */}
      <style dangerouslySetInnerHTML={{__html: `
        .ql-toolbar.ql-snow {
          border: none !important;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
          background: rgba(0, 0, 0, 0.2);
        }
        .ql-container.ql-snow {
          border: none !important;
          min-height: 400px;
          color: white;
          font-family: inherit;
          font-size: 15px;
        }
        .ql-editor {
          min-height: 400px;
        }
        .ql-editor.ql-blank::before {
          color: rgba(255, 255, 255, 0.3) !important;
          font-style: normal;
        }
        .ql-snow .ql-stroke {
          stroke: rgba(255, 255, 255, 0.7);
        }
        .ql-snow .ql-fill, .ql-snow .ql-stroke.ql-fill {
          fill: rgba(255, 255, 255, 0.7);
        }
        .ql-snow .ql-picker {
          color: rgba(255, 255, 255, 0.7);
        }
        .ql-snow .ql-picker-options {
          background-color: #24182e;
          border-color: rgba(255, 255, 255, 0.1);
        }
        .ql-snow .ql-tooltip {
          background-color: #24182e;
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: white;
          box-shadow: 0 4px 12px rgba(0,0,0,0.5);
        }
        .ql-snow .ql-tooltip input[type=text] {
          background-color: rgba(0,0,0,0.2);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: white;
        }
        button:hover .ql-stroke { stroke: #ffbe00 !important; }
        button:hover .ql-fill { fill: #ffbe00 !important; }
        .ql-picker-label:hover { color: #ffbe00 !important; }
        .ql-active .ql-stroke { stroke: #ffbe00 !important; }
        .ql-active .ql-fill { fill: #ffbe00 !important; }
        .ql-active { color: #ffbe00 !important; }
      `}} />
      
      {/* Hidden input to store the HTML content for the form action */}
      <input type="hidden" name={name} id={`${name}-hidden`} defaultValue={defaultValue} />
      
      <ReactQuill
        // @ts-expect-error - ReactQuill types are outdated and don't include ref
        ref={quillRef}
        theme="snow"
        defaultValue={defaultValue}
        onChange={(content) => {
          // Sync to hidden input
          const hiddenInput = document.getElementById(`${name}-hidden`) as HTMLInputElement;
          if (hiddenInput) {
            hiddenInput.value = content;
          }
        }}
        modules={modules}
        formats={formats}
        placeholder={placeholder || "Start writing..."}
      />
    </div>
  );
}
