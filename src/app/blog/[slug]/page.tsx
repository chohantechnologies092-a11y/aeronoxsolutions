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
    <article className="mesh-bg pt-36 pb-24 relative min-h-screen">
      <div className="absolute inset-0 grid-overlay opacity-20 pointer-events-none" />

      <div className="mx-auto max-w-4xl px-6 lg:px-8 relative z-10">
        {/* Breadcrumb navigation */}
        <div className="flex items-center gap-2 text-xs text-muted font-medium mb-8">
          <Link href="/blog" className="hover:text-white transition-colors">
            Blog
          </Link>
          <ChevronRight size={12} />
          <span className="text-[#ffbe00] font-semibold">{post.category || "General"}</span>
          <ChevronRight size={12} />
          <span className="text-muted/60 truncate max-w-[200px]">
            {post.title}
          </span>
        </div>

        <Link
          href="/blog"
          className="group inline-flex items-center gap-1.5 text-sm font-semibold text-[#ffbe00] transition-colors hover:text-white mb-6"
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-0.5" />
          Back to all articles
        </Link>

        {/* Header Information */}
        <header className="border-b border-card-border pb-8">
          <div className="flex items-center gap-3 text-xs text-muted mb-4 flex-wrap">
            <span className="rounded-full bg-[#ffbe00]/10 border border-[#ffbe00]/30 px-3 py-1 font-bold text-[#ffbe00]">
              {post.category || "General"}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={12} />
              {new Date(post.createdAt).toLocaleDateString()}
            </span>
            <span className="text-muted/30">•</span>
            <span className="flex items-center gap-1.5">
              <Clock size={12} />
              {post.readingTime || 5} min read
            </span>
            <span className="text-muted/30">•</span>
            <span className="flex items-center gap-1.5 font-semibold text-foreground">
              <User size={12} className="text-[#ffbe00]" />
              {post.author || "Aeronox Team"}
              {post.authorRole && <span className="text-muted font-normal">({post.authorRole})</span>}
            </span>
          </div>

          <h1 className="font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl leading-tight">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="mt-4 text-base sm:text-lg text-muted leading-relaxed">
              {post.excerpt}
            </p>
          )}
        </header>

        {/* Cover Image */}
        {post.coverImage && (
          <div className="my-8 rounded-3xl overflow-hidden border border-card-border shadow-2xl relative aspect-[16/9] w-full">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Article Body Content */}
        <div className="mt-8 prose prose-invert max-w-none text-foreground leading-relaxed text-base sm:text-lg">
          {isHtml ? (
            <div
              className="ql-editor p-0 space-y-4 font-sans text-muted text-base leading-relaxed [&>h1]:text-2xl [&>h1]:font-bold [&>h1]:text-foreground [&>h2]:text-xl [&>h2]:font-bold [&>h2]:text-foreground [&>h3]:text-lg [&>h3]:font-bold [&>h3]:text-foreground [&>a]:text-[#ffbe00] [&>a]:underline [&>blockquote]:border-l-4 [&>blockquote]:border-[#ffbe00] [&>blockquote]:pl-4 [&>blockquote]:italic [&>img]:rounded-2xl [&>img]:my-6 [&>img]:border [&>img]:border-card-border"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          ) : (
            <div className="space-y-6">
              {post.content.split("\n\n").map((paragraph: string, index: number) => {
                if (paragraph.startsWith("## ")) {
                  return (
                    <h2 key={index} className="font-display text-xl sm:text-2xl font-bold text-foreground pt-4">
                      {paragraph.replace("## ", "")}
                    </h2>
                  );
                }
                return <p key={index} className="text-muted leading-relaxed">{paragraph}</p>;
              })}
            </div>
          )}
        </div>

        {/* Article Tags Footer */}
        {Array.isArray(post.tags) && post.tags.length > 0 && (
          <div className="mt-12 pt-6 border-t border-card-border flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-muted uppercase flex items-center gap-1">
              <TagIcon size={12} /> Tags:
            </span>
            {post.tags.map((t: string) => (
              <span key={t} className="px-3 py-1 rounded-full bg-card/60 border border-card-border text-xs text-[#ffbe00] font-semibold">
                #{t}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
