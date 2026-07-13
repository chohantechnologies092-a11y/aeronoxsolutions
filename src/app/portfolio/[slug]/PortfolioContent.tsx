"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Code } from "lucide-react";
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

  return (
    <article className="min-h-screen pt-36 pb-24 bg-mesh relative overflow-hidden">
      {/* Ambient Gradients */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#ffbe00]/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-[#24182e]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <Link 
            href="/portfolio" 
            className="inline-flex items-center gap-2 text-muted uppercase tracking-widest text-xs font-bold group mb-12 hover:text-[#ffbe00] transition-colors"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            Back to Portfolio
          </Link>
        </motion.div>

        <motion.header 
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="mb-16"
        >
          <motion.div variants={fadeIn} className="flex flex-wrap gap-2 mb-8">
            {tags.map((tag, idx) => (
              <span key={idx} className="px-4 py-1.5 bg-[#ffbe00]/10 text-[#24182e] rounded-full text-xs font-black uppercase tracking-[0.15em] border border-[#ffbe00]/30 shadow-sm">
                {tag}
              </span>
            ))}
          </motion.div>
          
          <motion.h1 variants={fadeIn} className="text-4xl md:text-6xl lg:text-7xl font-black text-foreground tracking-tight leading-[1.1] mb-10 max-w-4xl">
            {project.title}
          </motion.h1>
          
          <motion.div variants={fadeIn} className="flex flex-wrap items-center justify-between gap-8 text-sm font-medium border-y border-card-border py-8 bg-card/20 backdrop-blur-sm px-8 rounded-3xl">
            {project.client && (
              <div>
                <span className="block text-xs font-bold uppercase tracking-widest text-muted mb-2">Client</span>
                <span className="text-xl font-bold text-foreground">{project.client}</span>
              </div>
            )}
            
            <div className="flex flex-wrap gap-4">
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#24182e] hover:text-[#ffbe00] transition-colors bg-white px-6 py-3 rounded-full border border-gray-200 shadow-sm hover:shadow-[0_5px_15px_rgba(255,190,0,0.15)] group">
                  <ExternalLink size={18} className="group-hover:scale-110 transition-transform" />
                  <span className="font-bold tracking-wide">Live Site</span>
                </a>
              )}
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white bg-[#24182e] hover:bg-[#ffbe00] hover:text-[#24182e] transition-colors px-6 py-3 rounded-full shadow-sm hover:shadow-[0_5px_15px_rgba(255,190,0,0.2)] group">
                  <Code size={18} className="group-hover:scale-110 transition-transform" />
                  <span className="font-bold tracking-wide">Source Code</span>
                </a>
              )}
            </div>
          </motion.div>
        </motion.header>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="w-full aspect-[21/9] relative rounded-3xl overflow-hidden mb-20 shadow-2xl border border-card-border group"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-[#ffbe00]/20 to-[#24182e]/20 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          <Image 
            src={project.image} 
            alt={project.title}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
            priority
          />
        </motion.div>

        <div className="max-w-4xl mx-auto mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="mb-12"
          >
            <div className="p-8 md:p-12 bg-gradient-to-br from-[#24182e] to-[#1a1122] backdrop-blur-md rounded-[2rem] border border-white/10 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#ffbe00]/20 rounded-full blur-[80px] transform translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform duration-700" />
              
              <div className="flex flex-col md:flex-row md:items-center gap-6 relative z-10">
                <div className="w-16 h-16 shrink-0 rounded-full bg-[#ffbe00]/10 flex items-center justify-center">
                  <span className="text-[#ffbe00] font-black text-2xl">💡</span>
                </div>
                <div>
                  <h3 className="text-xl font-black uppercase tracking-widest text-white mb-2">Project Overview</h3>
                  <p className="text-lg md:text-xl font-medium leading-relaxed text-gray-300">
                    {project.description}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <div className="bg-white/80 backdrop-blur-xl p-8 md:p-12 lg:p-16 rounded-[2rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#ffbe00] to-[#24182e]" />
              
              <div 
                className="max-w-none 
                [&_h2]:text-3xl md:[&_h2]:text-4xl [&_h2]:font-display [&_h2]:font-extrabold [&_h2]:tracking-tight [&_h2]:text-[#24182e] [&_h2]:mt-12 [&_h2]:mb-6 [&_h2:first-child]:mt-0
                [&_h3]:text-2xl [&_h3]:font-display [&_h3]:font-bold [&_h3]:text-[#24182e] [&_h3]:mt-10 [&_h3]:mb-4
                [&_p]:text-gray-600 [&_p]:leading-[1.8] [&_p]:mb-8 [&_p]:text-lg
                [&_strong]:text-[#24182e] [&_strong]:font-bold
                [&_ul]:bg-gray-50/80 [&_ul]:p-6 md:[&_ul]:p-10 [&_ul]:rounded-3xl [&_ul]:border [&_ul]:border-gray-100 [&_ul]:space-y-4 [&_ul]:my-10 [&_ul]:shadow-sm [&_ul]:list-none
                [&_li]:text-gray-700 [&_li]:text-lg [&_li]:relative [&_li]:pl-6
                [&_li::before]:content-['•'] [&_li::before]:absolute [&_li::before]:left-0 [&_li::before]:text-[#ffbe00] [&_li::before]:font-black [&_li::before]:text-xl
                [&_a]:text-[#ffbe00] [&_a]:font-bold [&_a]:no-underline hover:[&_a]:underline 
                break-words overflow-hidden"
                dangerouslySetInnerHTML={{ __html: project.content.replace(/:-/g, '') }}
              />
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="pt-16 border-t border-card-border"
        >
          <div className="bg-gradient-to-br from-[#24182e] to-[#1a1122] p-12 md:p-20 rounded-[3rem] border border-white/5 text-center shadow-2xl relative overflow-hidden group">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#ffbe00]/20 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none transform translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#ffbe00]/10 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none transform -translate-x-1/2 translate-y-1/2" />
            
            <h3 className="font-display text-3xl md:text-5xl font-extrabold text-white mb-6 tracking-tight relative z-10">
              Inspired by this project?
            </h3>
            <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed relative z-10">
              Let's build something extraordinary together. Our team is ready to turn your vision into reality with the same level of excellence.
            </p>
            <Link 
              href="/contact" 
              className="inline-flex items-center justify-center px-10 py-5 bg-[#ffbe00] text-[#24182e] font-black uppercase tracking-[0.1em] rounded-full hover:bg-white hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(255,190,0,0.3)] relative z-10"
            >
              Start a Project
            </Link>
          </div>
        </motion.div>
      </div>
    </article>
  );
}
