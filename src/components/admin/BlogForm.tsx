"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save, Globe, FileText, Tag, Sparkles, User, Image as ImageIcon, Eye, Clock } from "lucide-react";
import { RichTextEditor } from "@/components/editor/RichTextEditor";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { Button } from "@/components/ui/Button";

interface BlogFormProps {
  initialData?: any;
  action: (formData: FormData) => Promise<void>;
  isEdit?: boolean;
}

const DEFAULT_CATEGORIES = [
  "Web Development",
  "SEO & Growth",
  "AI & Automation",
  "Software Engineering",
  "UI/UX Design",
  "Company News"
];

export function BlogForm({ initialData, action, isEdit = false }: BlogFormProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [autoSlug, setAutoSlug] = useState(!isEdit);
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || "");
  const [metaTitle, setMetaTitle] = useState(initialData?.metaTitle || initialData?.title || "");
  const [metaDescription, setMetaDescription] = useState(initialData?.metaDescription || initialData?.excerpt || "");
  const [category, setCategory] = useState(initialData?.category || "Web Development");
  const [tags, setTags] = useState(Array.isArray(initialData?.tags) ? initialData.tags.join(", ") : initialData?.tags || "");
  const [author, setAuthor] = useState(initialData?.author || "Aeronox Team");
  const [authorRole, setAuthorRole] = useState(initialData?.authorRole || "Editorial Team");
  const [keywords, setKeywords] = useState(initialData?.keywords || "");
  const [canonicalUrl, setCanonicalUrl] = useState(initialData?.canonicalUrl || "");
  const [published, setPublished] = useState(initialData?.published !== undefined ? initialData.published : true);
  const [featured, setFeatured] = useState(initialData?.featured || false);
  
  // Active Tab State for sleek organization
  const [activeTab, setActiveTab] = useState<"content" | "seo" | "publishing">("content");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    if (autoSlug) {
      const generatedSlug = newTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setSlug(generatedSlug);
    }
    if (!metaTitle || metaTitle === title) {
      setMetaTitle(newTitle);
    }
  };

  const handleExcerptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setExcerpt(val);
    if (!metaDescription || metaDescription === excerpt) {
      setMetaDescription(val);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-admin-border">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/blogs"
            className="flex items-center gap-2 text-sm text-admin-muted hover:text-admin-text transition-colors p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5"
          >
            <ArrowLeft size={16} /> Back to Blogs
          </Link>
          <div className="w-px h-5 bg-admin-border" />
          <h1 className="text-2xl font-bold text-admin-text font-display">
            {isEdit ? "Edit Blog Article" : "Write New Blog Article"}
          </h1>
        </div>
      </div>

      {/* Main Form */}
      <form action={action} className="space-y-8">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 p-1.5 bg-black/5 dark:bg-white/5 rounded-2xl border border-admin-border w-fit">
          <button
            type="button"
            onClick={() => setActiveTab("content")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "content"
                ? "bg-[#ffbe00] text-[#24182e] shadow-sm"
                : "text-admin-muted hover:text-admin-text"
            }`}
          >
            <FileText size={14} /> Article Content
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("seo")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "seo"
                ? "bg-[#ffbe00] text-[#24182e] shadow-sm"
                : "text-admin-muted hover:text-admin-text"
            }`}
          >
            <Globe size={14} /> SEO & Meta Tags
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("publishing")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "publishing"
                ? "bg-[#ffbe00] text-[#24182e] shadow-sm"
                : "text-admin-muted hover:text-admin-text"
            }`}
          >
            <Tag size={14} /> Publishing & Category
          </button>
        </div>

        {/* Tab 1: Content & Basic Info */}
        <div className={activeTab === "content" ? "space-y-6" : "hidden"}>
          <div className="bg-admin-card p-6 rounded-2xl border border-admin-border space-y-5">
            {/* Article Title */}
            <div>
              <label htmlFor="blog-title" className="block text-xs font-semibold uppercase tracking-wider text-admin-muted mb-2">
                Article Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="blog-title"
                name="title"
                required
                value={title}
                onChange={handleTitleChange}
                placeholder="e.g. 10 Essential Practices for Scalable Web Applications"
                className="w-full bg-black/5 dark:bg-black/20 border border-admin-border rounded-xl px-4 py-3.5 text-lg font-bold text-admin-text placeholder:text-admin-muted/40 focus:outline-none focus:ring-2 focus:ring-[#ffbe00]/50"
              />
            </div>

            {/* Custom Slug */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="blog-slug" className="block text-xs font-semibold uppercase tracking-wider text-admin-muted">
                  URL Slug
                </label>
                <button
                  type="button"
                  onClick={() => setAutoSlug(!autoSlug)}
                  className="text-xs text-[#ffbe00] hover:underline"
                >
                  {autoSlug ? "Custom Slug" : "Auto-generate from Title"}
                </button>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-admin-muted font-mono bg-black/10 dark:bg-white/10 px-3 py-3 rounded-xl border border-admin-border">
                  /blog/
                </span>
                <input
                  type="text"
                  id="blog-slug"
                  name="slug"
                  required
                  value={slug}
                  onChange={(e) => {
                    setAutoSlug(false);
                    setSlug(e.target.value);
                  }}
                  placeholder="article-url-slug"
                  className="flex-1 bg-black/5 dark:bg-black/20 border border-admin-border rounded-xl px-4 py-3 text-sm font-mono text-admin-text focus:outline-none focus:ring-2 focus:ring-[#ffbe00]/50"
                />
              </div>
            </div>

            {/* Short Excerpt */}
            <div>
              <label htmlFor="blog-excerpt" className="block text-xs font-semibold uppercase tracking-wider text-admin-muted mb-2">
                Short Summary / Excerpt
              </label>
              <textarea
                id="blog-excerpt"
                name="excerpt"
                rows={3}
                value={excerpt}
                onChange={handleExcerptChange}
                placeholder="A compelling 1-2 sentence summary displayed on card previews..."
                className="w-full bg-black/5 dark:bg-black/20 border border-admin-border rounded-xl px-4 py-3 text-sm text-admin-text placeholder:text-admin-muted/40 focus:outline-none focus:ring-2 focus:ring-[#ffbe00]/50 resize-none"
              />
            </div>

            {/* Cover Image Upload */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-admin-muted mb-2">
                Header Cover Image
              </label>
              <ImageUpload name="coverImage" defaultValue={initialData?.coverImage} />

              <div className="mt-4">
                <label htmlFor="imageAltText" className="block text-xs font-semibold uppercase tracking-wider text-admin-muted mb-2">
                  Image Alt Text (Accessibility)
                </label>
                <input
                  type="text"
                  id="imageAltText"
                  name="imageAltText"
                  defaultValue={initialData?.imageAltText || ""}
                  placeholder="Describe the cover image for screen readers"
                  className="w-full bg-black/5 dark:bg-black/20 border border-admin-border rounded-xl px-4 py-3 text-sm text-admin-text focus:outline-none focus:ring-2 focus:ring-[#ffbe00]/50"
                />
              </div>
            </div>

            {/* Rich Editor */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-admin-muted mb-2">
                Article Body Content <span className="text-red-500">*</span>
              </label>
              <RichTextEditor name="content" defaultValue={initialData?.content || ""} />
            </div>
          </div>
        </div>

        {/* Tab 2: SEO & Meta Tags */}
        <div className={activeTab === "seo" ? "space-y-6" : "hidden"}>
          <div className="bg-admin-card p-6 rounded-2xl border border-admin-border space-y-6">
            <div>
              <h3 className="text-base font-bold text-admin-text flex items-center gap-2">
                <Globe className="text-[#ffbe00]" size={18} /> Search Engine Optimization (SEO)
              </h3>
              <p className="text-xs text-admin-muted mt-1">
                Configure meta titles, meta descriptions, and keywords for optimal search rankings.
              </p>
            </div>

            {/* Meta Title */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="metaTitle" className="text-xs font-semibold uppercase tracking-wider text-admin-muted">
                  Meta Title
                </label>
                <span className={`text-xs font-mono ${metaTitle.length > 60 ? "text-red-400" : "text-admin-muted"}`}>
                  {metaTitle.length} / 60 chars
                </span>
              </div>
              <input
                type="text"
                id="metaTitle"
                name="metaTitle"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                placeholder="Primary Title Tag shown in search engine results"
                className="w-full bg-black/5 dark:bg-black/20 border border-admin-border rounded-xl px-4 py-3 text-sm text-admin-text focus:outline-none focus:ring-2 focus:ring-[#ffbe00]/50"
              />
            </div>

            {/* Meta Description */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="metaDescription" className="text-xs font-semibold uppercase tracking-wider text-admin-muted">
                  Meta Description
                </label>
                <span className={`text-xs font-mono ${metaDescription.length > 160 ? "text-red-400" : "text-admin-muted"}`}>
                  {metaDescription.length} / 160 chars
                </span>
              </div>
              <textarea
                id="metaDescription"
                name="metaDescription"
                rows={3}
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                placeholder="Snippets displayed below the title in search engine results..."
                className="w-full bg-black/5 dark:bg-black/20 border border-admin-border rounded-xl px-4 py-3 text-sm text-admin-text focus:outline-none focus:ring-2 focus:ring-[#ffbe00]/50 resize-none"
              />
            </div>

            {/* Focus Keywords */}
            <div>
              <label htmlFor="keywords" className="block text-xs font-semibold uppercase tracking-wider text-admin-muted mb-1.5">
                Focus Keywords (Comma Separated)
              </label>
              <input
                type="text"
                id="keywords"
                name="keywords"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="e.g. web development, nextjs 16, react engineering"
                className="w-full bg-black/5 dark:bg-black/20 border border-admin-border rounded-xl px-4 py-3 text-sm text-admin-text focus:outline-none focus:ring-2 focus:ring-[#ffbe00]/50"
              />
            </div>

            {/* Canonical URL */}
            <div>
              <label htmlFor="canonicalUrl" className="block text-xs font-semibold uppercase tracking-wider text-admin-muted mb-1.5">
                Canonical URL (Optional)
              </label>
              <input
                type="url"
                id="canonicalUrl"
                name="canonicalUrl"
                value={canonicalUrl}
                onChange={(e) => setCanonicalUrl(e.target.value)}
                placeholder="https://aeronoxsolutions.com/blog/custom-canonical-slug"
                className="w-full bg-black/5 dark:bg-black/20 border border-admin-border rounded-xl px-4 py-3 text-sm text-admin-text focus:outline-none focus:ring-2 focus:ring-[#ffbe00]/50"
              />
            </div>

            {/* SERP Google Preview Card */}
            <div className="p-4 rounded-xl border border-admin-border bg-black/10 dark:bg-white/5 space-y-1">
              <span className="text-[10px] uppercase font-bold text-admin-muted">Google Search Result Preview</span>
              <p className="text-blue-500 font-medium text-base truncate">{metaTitle || title || "Blog Title"}</p>
              <p className="text-emerald-500 text-xs font-mono truncate">https://aeronoxsolutions.com/blog/{slug || "slug"}</p>
              <p className="text-xs text-admin-muted line-clamp-2">{metaDescription || excerpt || "Meta description snippet will appear here."}</p>
            </div>
          </div>
        </div>

        {/* Tab 3: Publishing & Category */}
        <div className={activeTab === "publishing" ? "space-y-6" : "hidden"}>
          <div className="bg-admin-card p-6 rounded-2xl border border-admin-border space-y-6">
            {/* Category & Tags */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="category" className="block text-xs font-semibold uppercase tracking-wider text-admin-muted mb-1.5">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-black/5 dark:bg-black/20 border border-admin-border rounded-xl px-4 py-3 text-sm text-admin-text focus:outline-none focus:ring-2 focus:ring-[#ffbe00]/50"
                >
                  {DEFAULT_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat} className="bg-[#24182e] text-white">
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="tags" className="block text-xs font-semibold uppercase tracking-wider text-admin-muted mb-1.5">
                  Tags (Comma Separated)
                </label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="e.g. Nextjs, Tailwind, Performance"
                  className="w-full bg-black/5 dark:bg-black/20 border border-admin-border rounded-xl px-4 py-3 text-sm text-admin-text focus:outline-none focus:ring-2 focus:ring-[#ffbe00]/50"
                />
              </div>
            </div>

            {/* Author Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="author" className="block text-xs font-semibold uppercase tracking-wider text-admin-muted mb-1.5">
                  Author Name
                </label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="e.g. Alex Morgan"
                  className="w-full bg-black/5 dark:bg-black/20 border border-admin-border rounded-xl px-4 py-3 text-sm text-admin-text focus:outline-none focus:ring-2 focus:ring-[#ffbe00]/50"
                />
              </div>

              <div>
                <label htmlFor="authorRole" className="block text-xs font-semibold uppercase tracking-wider text-admin-muted mb-1.5">
                  Author Role / Title
                </label>
                <input
                  type="text"
                  id="authorRole"
                  name="authorRole"
                  value={authorRole}
                  onChange={(e) => setAuthorRole(e.target.value)}
                  placeholder="e.g. Chief Technology Officer"
                  className="w-full bg-black/5 dark:bg-black/20 border border-admin-border rounded-xl px-4 py-3 text-sm text-admin-text focus:outline-none focus:ring-2 focus:ring-[#ffbe00]/50"
                />
              </div>
            </div>

            {/* Status Switches */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-admin-border">
              <label className="flex items-center justify-between p-4 rounded-xl border border-admin-border bg-black/5 dark:bg-white/5 cursor-pointer">
                <div>
                  <p className="text-sm font-bold text-admin-text">Published Status</p>
                  <p className="text-xs text-admin-muted">Publicly visible on the /blog page</p>
                </div>
                <input
                  type="checkbox"
                  name="published"
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                  className="w-5 h-5 accent-[#ffbe00] rounded cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-4 rounded-xl border border-admin-border bg-black/5 dark:bg-white/5 cursor-pointer">
                <div>
                  <p className="text-sm font-bold text-admin-text">Featured Post</p>
                  <p className="text-xs text-admin-muted">Highlight at top of blog showcase</p>
                </div>
                <input
                  type="checkbox"
                  name="featured"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="w-5 h-5 accent-[#ffbe00] rounded cursor-pointer"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Submit Actions Footer */}
        <div className="flex items-center justify-between pt-6 border-t border-admin-border">
          <Link
            href="/admin/blogs"
            className="px-6 py-2.5 rounded-xl border border-admin-border text-admin-text text-sm font-semibold hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            Cancel
          </Link>

          <button
            type="submit"
            className="px-8 py-3 bg-[#ffbe00] text-[#24182e] text-sm font-black rounded-xl hover:bg-[#ffbe00]/90 transition-colors shadow-lg shadow-[#ffbe00]/20 flex items-center gap-2"
          >
            <Save size={16} /> {isEdit ? "Update Article" : "Publish Article"}
          </button>
        </div>
      </form>
    </div>
  );
}
