"use client";

import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import Link from "next/link";
import { Blog as BlogType } from "@prisma/client";

export function Blog({ blogPosts }: { blogPosts: BlogType[] }) {
  return (
    <section className="relative py-24 lg:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-accent">
              Insights
            </p>
            <h2 className="font-display mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl text-white">
              Blog &amp; technical updates
            </h2>
          </div>
          <Link
            href="/blog"
            className="group flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-white"
          >
            All articles
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5 text-accent"
            />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {blogPosts.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group glass-card block rounded-3xl p-8 transition-all duration-300 hover:border-white/15 hover:-translate-y-1 h-full"
              >
                <div className="flex items-center gap-3 text-xs text-muted">
                  <span className="rounded-full bg-white/5 border border-white/5 px-2.5 py-1 font-semibold uppercase text-white/80">
                    Blog
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    5 min read
                  </span>
                </div>

                <h3 className="font-display mt-5 text-xl font-bold leading-snug text-white transition-colors group-hover:text-accent">
                  {post.title}
                </h3>
                
                <p className="mt-3 text-sm text-muted leading-relaxed line-clamp-2">
                  {post.content}
                </p>

                <div className="mt-6 flex items-center gap-1.5 text-sm font-semibold text-accent opacity-80 group-hover:opacity-100 transition-opacity">
                  <span>Read article</span>
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
