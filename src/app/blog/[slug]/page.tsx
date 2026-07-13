import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Calendar, ChevronRight } from "lucide-react";
import { getBlogBySlug } from "@/lib/data";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = decodeURIComponent(resolvedParams.slug);
  const post = await getBlogBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.content.substring(0, 160),
  };
}

export default async function BlogPostPage({ params }: Props) {
  const resolvedParams = await params;
  const slug = decodeURIComponent(resolvedParams.slug);
  const post = await getBlogBySlug(slug);

  if (!post || !post.published) {
    notFound();
  }

  return (
    <article className="mesh-bg pt-36 pb-24 relative min-h-screen">
      <div className="absolute inset-0 grid-overlay opacity-20 pointer-events-none" />
      
      <div className="mx-auto max-w-3xl px-6 lg:px-8 relative z-10">
        {/* Breadcrumb / Back button */}
        <div className="flex items-center gap-2 text-xs text-muted font-medium mb-8">
          <Link href="/blog" className="hover:text-white transition-colors">
            Blog
          </Link>
          <ChevronRight size={12} />
          <span className="text-muted/60 truncate max-w-[200px]">
            {post.title}
          </span>
        </div>

        <Link
          href="/blog"
          className="group inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-white mb-6"
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-0.5" />
          Back to all articles
        </Link>

        <header className="border-b border-white/5 pb-8">
          <div className="flex items-center gap-3 text-xs text-muted mb-4">
            <span className="rounded-full bg-white/5 border border-white/5 px-2.5 py-1 font-semibold uppercase text-white/80">
              Blog
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={12} />
              {new Date(post.createdAt).toLocaleDateString()}
            </span>
            <span className="text-white/10">•</span>
            <span className="flex items-center gap-1.5">
              <Clock size={12} />
              5 min read
            </span>
            <span className="text-white/10">•</span>
            <span className="flex items-center gap-1.5 font-medium">
              By {post.author}
            </span>
          </div>

          <h1 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl leading-tight">
            {post.title}
          </h1>
        </header>

        {/* Blog Post Content Body */}
        <div className="mt-8 prose prose-invert max-w-none text-muted leading-relaxed text-sm sm:text-base space-y-6">
          {post.content.split("\n\n").map((paragraph: string, index: number) => {
            // Very simple rendering of markdown-like formats
            if (paragraph.startsWith("## ")) {
              return (
                <h2 key={index} className="font-display text-xl sm:text-2xl font-bold text-white pt-4">
                  {paragraph.replace("## ", "")}
                </h2>
              );
            }
            if (paragraph.startsWith("### ")) {
              return (
                <h3 key={index} className="font-display text-lg sm:text-xl font-bold text-white pt-2">
                  {paragraph.replace("### ", "")}
                </h3>
              );
            }
            if (paragraph.startsWith("* ") || paragraph.startsWith("- ")) {
              const items = paragraph.split("\n");
              return (
                <ul key={index} className="list-disc pl-5 space-y-2">
                  {items.map((item, i) => (
                    <li key={i}>{item.replace(/^[*-\s]+/, "")}</li>
                  ))}
                </ul>
              );
            }
            if (paragraph.startsWith("1. ") || paragraph.startsWith("2. ") || paragraph.startsWith("3. ")) {
              const items = paragraph.split("\n");
              return (
                <ol key={index} className="list-decimal pl-5 space-y-2">
                  {items.map((item, i) => (
                    <li key={i}>{item.replace(/^\d+\.\s+/, "")}</li>
                  ))}
                </ol>
              );
            }
            if (paragraph.startsWith("---")) {
              return <hr key={index} className="border-white/5 my-8" />;
            }
            return <p key={index}>{paragraph}</p>;
          })}
        </div>
      </div>
    </article>
  );
}
