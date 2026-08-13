import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Calendar, ChevronRight, Tag as TagIcon, User } from "lucide-react";
import { getBlogBySlug } from "@/lib/data";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = decodeURIComponent(resolvedParams.slug);
  const post = await getBlogBySlug(slug);
  if (!post) return {};

  const cleanDescription = post.metaDescription || post.excerpt || post.content.replace(/<[^>]*>/g, "").substring(0, 160);

  return {
    title: post.metaTitle || post.title,
    description: cleanDescription,
    keywords: post.keywords ? post.keywords.split(",").map((k: string) => k.trim()) : undefined,
    alternates: post.canonicalUrl ? { canonical: post.canonicalUrl } : undefined,
    openGraph: {
      title: post.metaTitle || post.title,
      description: cleanDescription,
      type: "article",
      publishedTime: post.createdAt,
      images: post.coverImage ? [{ url: post.coverImage }] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const resolvedParams = await params;
  const slug = decodeURIComponent(resolvedParams.slug);
  const post = await getBlogBySlug(slug);

  if (!post || !post.published) {
    notFound();
  }

  const isHtml = post.content.includes("<p>") || post.content.includes("<h") || post.content.includes("<div>");

  return (
    <article className="mesh-bg pt-32 pb-24 relative min-h-screen">
      <div className="absolute inset-0 grid-overlay opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#ffbe00]/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-muted font-medium mb-6">
          <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
          <ChevronRight size={12} />
          <span className="text-[#ffbe00] font-semibold">{post.category || "General"}</span>
          <ChevronRight size={12} />
          <span className="text-muted/60 truncate max-w-[180px]">{post.title}</span>
        </nav>

        <Link href="/blog" className="group inline-flex items-center gap-1.5 text-sm font-semibold text-[#ffbe00] transition-colors hover:text-white mb-8">
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-0.5" />
          Back to all articles
        </Link>

        {/* Article Header */}
        <header className="mb-10 p-8 sm:p-10 rounded-[2rem] bg-[#1a1122]/80 border border-white/10 shadow-2xl backdrop-blur-sm">
          <div className="flex items-center gap-2 flex-wrap mb-5 text-xs font-semibold">
            <span className="rounded-full bg-[#ffbe00]/15 border border-[#ffbe00]/30 px-3 py-1 text-[#ffbe00]">{post.category || "General"}</span>
            <span className="flex items-center gap-1.5 text-muted"><Calendar size={12} />{new Date(post.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
            <span className="text-muted/30">•</span>
            <span className="flex items-center gap-1.5 text-muted"><Clock size={12} />{post.readingTime || 5} min read</span>
            <span className="text-muted/30">•</span>
            <span className="flex items-center gap-1.5 text-white">
              <User size={12} className="text-[#ffbe00]" />{post.author || "Aeronox Team"}
              {post.authorRole && <span className="text-muted font-normal ml-1">({post.authorRole})</span>}
            </span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight mb-4">{post.title}</h1>
          {post.excerpt && <p className="text-base sm:text-lg text-[#dcd7e3]/70 leading-relaxed border-t border-white/10 pt-4 mt-4">{post.excerpt}</p>}
        </header>

        {/* Cover Image */}
        {post.coverImage && (
          <div className="mb-10 rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative aspect-[16/9] w-full">
            <Image src={post.coverImage} alt={post.imageAltText || post.title} fill className="object-cover" priority />
          </div>
        )}

        {/* Article Body */}
        <div className="rounded-[2rem] bg-[#1a1122]/80 border border-white/10 shadow-2xl backdrop-blur-sm p-6 sm:p-10 overflow-hidden">
          {isHtml ? (
            <div className="blog-content" dangerouslySetInnerHTML={{ __html: post.content }} />
          ) : (
            <div className="space-y-6">
              {post.content.split("\n\n").map((paragraph: string, index: number) => {
                if (paragraph.startsWith("## ")) return <h2 key={index} className="font-display text-xl sm:text-2xl font-bold text-white pt-4">{paragraph.replace("## ", "")}</h2>;
                return <p key={index} className="text-[#dcd7e3]/80 leading-relaxed">{paragraph}</p>;
              })}
            </div>
          )}
        </div>

        {/* Tags */}
        {Array.isArray(post.tags) && post.tags.length > 0 && (
          <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-muted uppercase flex items-center gap-1"><TagIcon size={12} /> Tags:</span>
            {post.tags.map((t: string) => <span key={t} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-[#ffbe00] font-semibold">#{t}</span>)}
          </div>
        )}
      </div>

      {/* Scoped typography for blog content rendered from Quill HTML */}
      <style>{`
        .blog-content {
          color: #c8c2d4;
          font-size: 1.0625rem;
          line-height: 1.85;
          word-break: break-word;
          overflow-wrap: break-word;
          max-width: 100%;
        }
        .blog-content > * + * { margin-top: 1.2em; }
        .blog-content h1, .blog-content h2, .blog-content h3,
        .blog-content h4, .blog-content h5, .blog-content h6 {
          font-weight: 800; color: #fff; line-height: 1.3;
          margin-top: 2em; margin-bottom: .5em;
        }
        .blog-content h1 { font-size: 1.875rem; }
        .blog-content h2 { font-size: 1.5rem; padding-bottom: .4em; border-bottom: 1px solid rgba(255,255,255,.08); }
        .blog-content h3 { font-size: 1.25rem; color: #ffbe00; }
        .blog-content h4 { font-size: 1.075rem; }
        .blog-content p { margin-bottom: 1em; }
        .blog-content a {
          color: #ffbe00; text-decoration: underline;
          text-underline-offset: 3px; font-weight: 600;
          word-break: break-all; transition: color .2s;
        }
        .blog-content a:hover { color: #fff; }
        .blog-content strong { color: #fff; font-weight: 700; }
        .blog-content em { color: #dcd7e3; font-style: italic; }
        .blog-content ul, .blog-content ol { padding-left: 1.6em; margin-bottom: 1em; }
        .blog-content li { margin-bottom: .4em; }
        .blog-content ul > li { list-style-type: disc; }
        .blog-content ol > li { list-style-type: decimal; }
        .blog-content blockquote {
          border-left: 4px solid #ffbe00;
          background: rgba(255,190,0,.06);
          padding: 1rem 1.25rem;
          border-radius: 0 .75rem .75rem 0;
          font-style: italic; color: #dcd7e3; margin: 1.5em 0;
        }
        .blog-content pre {
          background: rgba(0,0,0,.45);
          border: 1px solid rgba(255,255,255,.1);
          border-radius: .75rem;
          padding: 1.1rem 1.25rem;
          overflow-x: auto; white-space: pre; word-break: normal;
          max-width: 100%;
          font-family: 'Fira Code','Courier New',monospace;
          font-size: .875rem; margin: 1.5em 0;
        }
        .blog-content code {
          background: rgba(0,0,0,.35);
          border: 1px solid rgba(255,255,255,.1);
          border-radius: .375rem; padding: .15em .45em;
          font-family: 'Fira Code','Courier New',monospace;
          font-size: .875em; color: #ffbe00;
        }
        .blog-content pre code { background: none; border: none; padding: 0; color: inherit; font-size: inherit; }
        .blog-content img {
          max-width: 100%; height: auto;
          border-radius: .875rem;
          border: 1px solid rgba(255,255,255,.1);
          margin: 1.5em auto; display: block;
        }
        .blog-content table { width: 100%; border-collapse: collapse; font-size: .9rem; margin: 1.5em 0; overflow-x: auto; display: block; }
        .blog-content th, .blog-content td { border: 1px solid rgba(255,255,255,.1); padding: .6em .9em; text-align: left; }
        .blog-content th { background: rgba(255,190,0,.1); color: #ffbe00; font-weight: 700; }
        .blog-content tr:nth-child(even) td { background: rgba(255,255,255,.02); }
        .blog-content hr { border: none; border-top: 1px solid rgba(255,255,255,.1); margin: 2em 0; }
        .blog-content iframe, .blog-content video { max-width: 100%; border-radius: .75rem; margin: 1.5em auto; display: block; }
      `}</style>
    </article>
  );
}
