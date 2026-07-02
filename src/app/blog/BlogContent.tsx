"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Clock, Calendar, BookOpen } from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: string;
  published: boolean;
  coverImage: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export function BlogContent({ blogPosts }: { blogPosts: BlogPost[] }) {
  return (
    <div className="bg-mesh pt-36 pb-24 min-h-screen relative overflow-hidden">
      {/* Ambient Gradients */}
      <div className="absolute top-0 right-0 w-1/2 h-[500px] bg-[#ffbe00]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/2 h-[500px] bg-[#24182e]/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        
        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex flex-col items-start text-left"
          >
            <span className="inline-flex items-center rounded-full px-4 py-1 text-sm font-medium bg-[#ffbe00]/10 text-[#24182e] ring-1 ring-inset ring-[#ffbe00]/30 mb-6 shadow-[0_0_15px_rgba(255,190,0,0.2)]">
              Technical Insights
            </span>
            <h1 className="font-display max-w-2xl text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-foreground leading-[1.1]">
              Explore our latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffbe00] to-[#24182e]">articles</span>
            </h1>
            <p className="mt-6 max-w-xl text-base sm:text-lg text-muted leading-relaxed">
              Sharing deep technical research, optimization guides, and workflow automations to help your engineering and marketing teams execute faster and better.
            </p>
            
            <div className="mt-10 flex items-center gap-4 border border-card-border bg-white/50 backdrop-blur-sm p-4 rounded-2xl shadow-sm">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#24182e]/10 text-[#24182e]">
                <BookOpen size={20} />
              </div>
              <div>
                <p className="text-xs font-semibold text-muted uppercase tracking-wider">Expert Authored</p>
                <p className="text-sm font-bold text-foreground">Written by our senior engineers</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-[#ffbe00]/20 to-[#24182e]/20 rounded-3xl blur-2xl transform scale-95" />
            <div className="relative rounded-3xl overflow-hidden border border-card-border shadow-2xl bento-card">
              <div className="aspect-[4/3] w-full relative">
                <img 
                  src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                  alt="Aeronox Solutions Blog Workspace" 
                  className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent mix-blend-multiply" />
                
                {/* Floating element */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-xl flex items-center gap-3"
                >
                  <div className="bg-[#24182e] p-2 rounded-xl text-white">
                    <Clock size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase">Always Fresh</p>
                    <p className="text-sm font-black text-[#24182e]">Weekly Updates</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Blog Grid */}
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {blogPosts.length === 0 ? (
            <p className="text-muted col-span-3 text-center py-12">No blog posts available.</p>
          ) : blogPosts.map((post) => (
            <motion.article key={post.slug} variants={fadeIn} className="group h-full">
              <Link
                href={`/blog/${post.slug}`}
                className="bento-card flex flex-col justify-between rounded-3xl p-8 bg-card/40 backdrop-blur-sm border border-card-border transition-all duration-300 hover:border-[#ffbe00]/30 hover:shadow-[0_10px_30px_rgba(255,190,0,0.05)] hover:-translate-y-1 h-full overflow-hidden relative"
              >
                {/* Hover gradient effect inside card */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#ffbe00]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="relative z-10">
                  <div className="flex items-center gap-3 text-xs text-muted mb-5">
                    <span className="rounded-full bg-[#ffbe00]/10 border border-[#ffbe00]/20 px-3 py-1 font-bold uppercase text-[#24182e]">
                      Blog
                    </span>
                    <span className="flex items-center gap-1.5 font-medium">
                      <Clock size={14} className="text-[#ffbe00]" />
                      5 min read
                    </span>
                  </div>

                  <h2 className="font-display text-xl font-bold leading-snug text-foreground transition-colors group-hover:text-[#ffbe00] line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted line-clamp-3">
                    {post.excerpt || post.content.slice(0, 160)}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-card-border flex items-center justify-between relative z-10">
                  <span className="flex items-center gap-1.5 text-xs text-muted font-medium">
                    <Calendar size={14} className="text-[#24182e]/60" />
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#24182e]/5 text-[#24182e] group-hover:bg-[#ffbe00] group-hover:text-white transition-all shadow-sm group-hover:shadow-md group-hover:scale-110">
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
