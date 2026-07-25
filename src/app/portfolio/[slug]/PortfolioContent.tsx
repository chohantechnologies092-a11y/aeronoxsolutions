/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Code, TrendingUp, Sparkles, Building2, Layers } from "lucide-react";
import Image from "next/image";

type Project = {
  id: string;
  title: string;
  slug: string;
  content: string;
  description: string;
  image: string;
  client: string | null;
  tags: string;
  serviceCategory?: string;
  beforeStats?: string;
  afterStats?: string;
  growthBadge?: string;
  challenge?: string;
  solution?: string;
  liveUrl: string | null;
  githubUrl: string | null;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
};

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: "easeOut" }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

export function PortfolioContent({ project }: { project: Project }) {
  const tags = (project.tags || "").split(",").map((tag: string) => tag.trim()).filter(Boolean);
  const beforeLines = (project.beforeStats || "").split("\n").filter(Boolean);
  const afterLines = (project.afterStats || "").split("\n").filter(Boolean);

  return (
    <article className="pb-24 bg-mesh relative overflow-hidden">
      {/* Ambient Gradients */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#ffbe00]/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-[#24182e]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10 pt-28">
        
        {/* Navigation */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <Link 
            href="/portfolio" 
            className="inline-flex items-center gap-2 text-muted uppercase tracking-widest text-xs font-bold group mb-8 hover:text-[#ffbe00] transition-colors"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            Back to Case Studies & Portfolio
          </Link>
        </motion.div>

        {/* Hero Header */}
        <motion.header 
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="mb-12 flex flex-col"
        >
          <motion.div variants={fadeIn} className="flex flex-wrap items-center gap-3 mb-4">
            {project.serviceCategory && (
              <span className="px-4 py-1.5 bg-[#ffbe00] text-[#24182e] rounded-full text-xs font-black uppercase tracking-[0.15em] shadow-md flex items-center gap-1.5">
                <Layers size={13} /> {project.serviceCategory.replace("-", " ")}
              </span>
            )}
            {project.growthBadge && (
              <span className="px-4 py-1.5 bg-emerald-500 text-[#090512] font-black text-xs uppercase tracking-wider rounded-full shadow-md flex items-center gap-1.5">
                <TrendingUp size={14} /> {project.growthBadge}
              </span>
            )}
            {tags.map((tag, idx) => (
              <span key={idx} className="px-3.5 py-1 bg-white/10 text-foreground rounded-full text-xs font-bold uppercase tracking-wider border border-white/15">
                {tag}
              </span>
            ))}
          </motion.div>
          
          <motion.h1 variants={fadeIn} className="text-4xl md:text-6xl font-black text-foreground tracking-tight leading-[1.08] mb-6 max-w-5xl">
            {project.title}
          </motion.h1>
          
          <motion.div variants={fadeIn} className="flex flex-wrap items-center justify-between gap-6 text-sm font-medium border-y border-card-border py-6 bg-card/20 backdrop-blur-sm px-8 rounded-3xl">
            {project.client && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#ffbe00]/20 flex items-center justify-center text-[#ffbe00]">
                  <Building2 size={20} />
                </div>
                <div>
                  <span className="block text-xs font-bold uppercase tracking-widest text-muted">Client / Company</span>
                  <span className="text-xl font-black text-foreground">{project.client}</span>
                </div>
              </div>
            )}
            
            <div className="flex flex-wrap gap-4">
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#24182e] hover:text-[#ffbe00] transition-colors bg-[#ffbe00] hover:bg-[#24182e] hover:text-white px-6 py-3 rounded-2xl shadow-lg font-black tracking-wide text-xs uppercase group">
                  <ExternalLink size={16} className="group-hover:scale-110 transition-transform" />
                  <span>Visit Live Website</span>
                </a>
              )}
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white bg-[#24182e] hover:bg-[#ffbe00] hover:text-[#24182e] transition-colors px-6 py-3 rounded-2xl shadow-md font-black tracking-wide text-xs uppercase group">
                  <Code size={16} className="group-hover:scale-110 transition-transform" />
                  <span>Tech Repository</span>
                </a>
              )}
            </div>
          </motion.div>
        </motion.header>

        {/* Cover Feature Image */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full h-[400px] md:h-[500px] relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-card-border mb-16 group"
        >
          <Image 
            src={project.image} 
            alt={project.title}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
            priority
          />
        </motion.div>

        <div className="max-w-5xl mx-auto space-y-16 mb-24">
          
          {/* BEFORE VS AFTER IMPACT COMPARISON CARD */}
          {(project.beforeStats || project.afterStats) && (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="p-8 md:p-12 bg-gradient-to-br from-[#24182e] via-[#1a1122] to-[#120b18] rounded-[2.5rem] border border-white/15 shadow-2xl text-white relative overflow-hidden"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-[#ffbe00]/20 flex items-center justify-center text-[#ffbe00]">
                  <Sparkles size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-black uppercase tracking-tight text-white">Before vs After Performance Results</h3>
                  <p className="text-xs text-[#dcd7e3]/70">Verified ROI metrics before and after working with Aeronox Solutions.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* BEFORE */}
                <div className="bg-red-500/10 border border-red-500/30 p-6 md:p-8 rounded-3xl relative overflow-hidden">
                  <div className="flex items-center gap-2 text-red-400 font-black uppercase tracking-wider text-xs mb-4">
                    <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse" /> 🛑 Before Aeronox Solutions
                  </div>
                  {beforeLines.length > 0 ? (
                    <ul className="space-y-3 text-sm text-gray-200 font-medium">
                      {beforeLines.map((line: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-red-400 font-bold">•</span>
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-400">Initial client state before optimization.</p>
                  )}
                </div>

                {/* AFTER */}
                <div className="bg-emerald-500/10 border border-emerald-500/30 p-6 md:p-8 rounded-3xl relative overflow-hidden shadow-lg">
                  <div className="flex items-center justify-between gap-2 text-emerald-400 font-black uppercase tracking-wider text-xs mb-4">
                    <span className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" /> 🚀 After Aeronox (Results)
                    </span>
                    {project.growthBadge && (
                      <span className="px-3 py-1 bg-emerald-500 text-black font-black text-[10px] rounded-full uppercase">
                        {project.growthBadge}
                      </span>
                    )}
                  </div>
                  {afterLines.length > 0 ? (
                    <ul className="space-y-3 text-sm text-emerald-100 font-bold">
                      {afterLines.map((line: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-emerald-400 font-black">✓</span>
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-emerald-200 font-bold">Delivered high-converting growth outcomes.</p>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* CHALLENGE VS SOLUTION CARDS */}
          {(project.challenge || project.solution) && (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {project.challenge && (
                <div className="p-8 bg-gradient-to-br from-[#24182e] via-[#1a1122] to-[#140c1e] text-white rounded-[2rem] border border-amber-500/30 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
                  <h4 className="text-xl font-black text-amber-400 uppercase tracking-tight mb-3 flex items-center gap-2 relative z-10">
                    <span className="text-amber-400">⚠️</span> The Challenge
                  </h4>
                  <p className="text-gray-200 leading-relaxed text-sm md:text-base font-medium relative z-10">
                    {project.challenge}
                  </p>
                </div>
              )}

              {project.solution && (
                <div className="p-8 bg-gradient-to-br from-[#24182e] via-[#1a1122] to-[#120b18] text-white rounded-[2rem] border border-[#ffbe00]/30 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#ffbe00]/10 rounded-full blur-2xl pointer-events-none" />
                  <h4 className="text-xl font-black text-[#ffbe00] uppercase tracking-tight mb-3 flex items-center gap-2 relative z-10">
                    <span>💡</span> The Strategy & Solution
                  </h4>
                  <p className="text-[#dcd7e3]/95 leading-relaxed text-sm md:text-base font-medium relative z-10">
                    {project.solution}
                  </p>
                </div>
              )}
            </motion.div>
          )}

          {/* DETAILED CONTENT */}
          {project.content && (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="bg-white/90 dark:bg-[#181120]/90 backdrop-blur-xl p-8 md:p-14 rounded-[2.5rem] border border-gray-200 dark:border-white/10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#ffbe00] to-[#24182e]" />
                
                <div 
                  className="max-w-none 
                  [&_h2]:text-3xl md:[&_h2]:text-4xl [&_h2]:font-display [&_h2]:font-extrabold [&_h2]:tracking-tight [&_h2]:text-[#24182e] dark:[&_h2]:text-white [&_h2]:mt-12 [&_h2]:mb-6 [&_h2:first-child]:mt-0
                  [&_h3]:text-2xl [&_h3]:font-display [&_h3]:font-bold [&_h3]:text-[#24182e] dark:[&_h3]:text-white [&_h3]:mt-10 [&_h3]:mb-4
                  [&_p]:text-gray-700 dark:[&_p]:text-gray-300 [&_p]:leading-[1.8] [&_p]:mb-8 [&_p]:text-base md:[&_p]:text-lg
                  [&_strong]:text-[#24182e] dark:[&_strong]:text-white [&_strong]:font-bold
                  [&_ul]:bg-gray-50/80 dark:[&_ul]:bg-black/30 [&_ul]:p-6 md:[&_ul]:p-8 [&_ul]:rounded-3xl [&_ul]:border [&_ul]:border-gray-200 dark:[&_ul]:border-white/10 [&_ul]:space-y-3 [&_ul]:my-8 [&_ul]:shadow-sm [&_ul]:list-none
                  [&_li]:text-gray-700 dark:[&_li]:text-gray-300 [&_li]:text-base [&_li]:relative [&_li]:pl-6
                  [&_li::before]:content-['•'] [&_li::before]:absolute [&_li::before]:left-0 [&_li::before]:text-[#ffbe00] [&_li::before]:font-black [&_li::before]:text-xl
                  [&_a]:text-[#ffbe00] [&_a]:font-bold [&_a]:no-underline hover:[&_a]:underline 
                  break-words overflow-hidden"
                  dangerouslySetInnerHTML={{ __html: project.content }}
                />
              </div>
            </motion.div>
          )}

        </div>

        {/* CTA BANNER */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="pt-16 border-t border-card-border"
        >
          <div className="bg-gradient-to-br from-[#24182e] via-[#1a1122] to-[#120b18] p-12 md:p-20 rounded-[3rem] border border-white/15 text-center shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#ffbe00]/20 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none transform translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#ffbe00]/10 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none transform -translate-x-1/2 translate-y-1/2" />
            
            <h3 className="font-display text-3xl md:text-5xl font-extrabold text-white mb-6 tracking-tight relative z-10">
              Ready to scale your business with similar results?
            </h3>
            <p className="text-base md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed relative z-10">
              Partner with Aeronox Solutions to engineer custom software, high-converting web applications, or scalable organic acquisition channels.
            </p>
            <Link 
              href="/contact" 
              className="inline-flex items-center justify-center px-10 py-5 bg-[#ffbe00] text-[#24182e] font-black uppercase tracking-[0.1em] rounded-full hover:bg-white hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(255,190,0,0.3)] relative z-10"
            >
              Start Your Project Today
            </Link>
          </div>
        </motion.div>
      </div>
    </article>
  );
}
