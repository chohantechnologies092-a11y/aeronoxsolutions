/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowRight, 
  Search, 
  Code2, 
  TrendingUp, 
  Bot, 
  PhoneCall, 
  Cpu, 
  Sparkles,
  Palette,
  Video,
  ExternalLink,
  Building2,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Play
} from "lucide-react";

// Service Metadata & Overview Cards
const SERVICE_OVERVIEWS: Record<string, {
  title: string;
  subtitle: string;
  description: string;
  icon: any;
  capabilities: string[];
  gradient: string;
}> = {
  "all": {
    title: "Proven Results Across All Capabilities",
    subtitle: "Explore our client case studies across Web Engineering, SEO, Graphic Design, Videography, and Custom Software.",
    description: "We partner with ambitious enterprises and startups to transform digital presence, scale acquisition channels, and drive measurable revenue growth.",
    icon: Sparkles,
    capabilities: ["Web Development", "Organic SEO", "Graphic & Logo Design", "Videography & Motion", "Custom Software", "AI Automation"],
    gradient: "from-[#24182e] via-[#1a1122] to-[#120b18]"
  },
  "web-dev": {
    title: "Web & E-Commerce Engineering",
    subtitle: "Blazing fast Next.js & React web applications designed for maximum conversion.",
    description: "We engineer enterprise-grade headless platforms, high-converting e-commerce web applications, and custom API integrations built to perform at global scale.",
    icon: Code2,
    capabilities: ["Next.js 16 App Router & React 19", "Headless E-Commerce Solutions", "Custom REST & GraphQL APIs", "Sub-Second Page Load Optimization"],
    gradient: "from-[#1a1122] via-[#24182e] to-[#0f0a16]"
  },
  "seo": {
    title: "Search Engine Optimization & Organic Growth",
    subtitle: "High-intent organic traffic acquisition, technical SEO audits, and content authority scaling.",
    description: "Our data-driven SEO frameworks engineer top 3 search rankings for competitive commercial keywords, turning organic search into your most profitable sales channel.",
    icon: Search,
    capabilities: ["Technical & Core Web Vitals Audits", "Commercial Keyword Strategy", "Programmatic SEO Architecture", "High-Authority Digital PR & Backlinks"],
    gradient: "from-[#24182e] via-[#1f142b] to-[#140c1e]"
  },
  "graphic-design": {
    title: "Graphic & Logo Design Gallery",
    subtitle: "High-impact brand logos, vector emblems, product packaging, and visual identity assets.",
    description: "We design memorable brand identities, modern enterprise logos, vector graphics, and visual design assets engineered to stand out in competitive global markets.",
    icon: Palette,
    capabilities: ["Enterprise Logo Design", "Brand Identity Systems", "Vector Emblem & Icons", "Social Media Visual Assets", "Packaging & Print Design"],
    gradient: "from-[#2e182b] via-[#241122] to-[#180b18]"
  },
  "videography": {
    title: "Videography & Motion Graphics Showcase",
    subtitle: "Commercial brand videos, motion design ads, product teasers, and 4K video productions.",
    description: "High-converting commercial videos, motion design advertisements, and corporate video stories engineered to captivate audiences and boost ad ROAS.",
    icon: Video,
    capabilities: ["Brand Commercial Videos", "Motion Graphics & 2D/3D Ads", "Product Showcase Teasers", "Corporate Storytelling Video"],
    gradient: "from-[#2e1818] via-[#241111] to-[#180b0b]"
  },
  "marketing": {
    title: "Social Media Marketing",
    subtitle: "Full-funnel customer acquisition, paid media strategy, and conversion rate optimization (CRO).",
    description: "We execute aggressive multi-channel marketing campaigns that lower CAC, increase LTV, and scale monthly recurring revenue (MRR).",
    icon: TrendingUp,
    capabilities: ["Multi-Channel Paid Ads (Google & Meta)", "High-Converting Landing Page Design", "Funnel A/B Testing & CRO", "Customer Retention Email Workflows"],
    gradient: "from-[#24182e] via-[#2d1b3b] to-[#160d1d]"
  },
  "ai-automation": {
    title: "AI Systems & Workflow Automation",
    subtitle: "Custom AI agents, automated CRM pipelines, and intelligent business process engines.",
    description: "Eliminate manual bottlenecks with custom AI subagents, automated data extractors, and intelligent customer support pipelines that operate 24/7.",
    icon: Bot,
    capabilities: ["Custom LLM Integration & Prompting", "Automated Lead Processing Pipelines", "AI Support & Sales Chatbots", "Internal Tooling Automation"],
    gradient: "from-[#1a0f24] via-[#24182e] to-[#120a1a]"
  },
  "telemarketing": {
    title: "Outbound Telemarketing & B2B Lead Gen",
    subtitle: "High-converting outbound call campaigns, appointment setting, and qualified lead pipelines.",
    description: "Our dedicated outbound teams connect directly with decision-makers, qualifying target accounts and booking sales calls for high-ticket services.",
    icon: PhoneCall,
    capabilities: ["B2B Outbound Cold Calling", "Dedicated Appointment Setting", "Account-Based Sales Prospecting", "CRM Integration & Live Transfer"],
    gradient: "from-[#24182e] via-[#1b1225] to-[#100a16]"
  },
  "custom-software": {
    title: "Custom Software Engineering",
    subtitle: "Tailored SaaS platforms, cloud microservices, and complex database architectures.",
    description: "From concept to deployment, we build robust, scalable software platforms that solve complex business logic with modern cloud infrastructure.",
    icon: Cpu,
    capabilities: ["SaaS Platform Development", "Database Optimization & Firestore", "Cloud Architecture & Serverless", "Role-Based Admin Dashboards"],
    gradient: "from-[#1f142b] via-[#24182e] to-[#150d1e]"
  }
};

// Smart category matching helper
function matchesCategory(project: any, catId: string): boolean {
  if (catId === "all") return true;

  const pCat = (project.serviceCategory || project.category || "").toLowerCase().trim();
  const pTags = (project.tags || "").toLowerCase();
  const pTitle = (project.title || "").toLowerCase();
  const pDesc = (project.description || "").toLowerCase();

  // 1. Direct or slugified match
  if (pCat === catId || pCat.replace(/\s+/g, "-") === catId || pCat.replace("&", "and") === catId) {
    return true;
  }

  // 2. Category specific keyword fallbacks
  if (catId === "web-dev" && (
    pCat.includes("web") || pCat.includes("dev") || pCat.includes("e-commerce") || 
    pTags.includes("next.js") || pTags.includes("react") || pTags.includes("web") || pTags.includes("tailwind") ||
    pTitle.includes("web") || pTitle.includes("site") || pTitle.includes("replatforming") || pTitle.includes("commerce")
  )) {
    return true;
  }

  if (catId === "seo" && (pCat.includes("seo") || pTags.includes("seo") || pTitle.includes("seo") || pDesc.includes("seo"))) {
    return true;
  }

  if (catId === "graphic-design" && (
    pCat.includes("graphic") || pCat.includes("logo") || pCat.includes("design") || pCat.includes("brand") ||
    pTags.includes("logo") || pTags.includes("graphic") || pTags.includes("design") || pTags.includes("branding") ||
    pTitle.includes("logo") || pTitle.includes("graphic") || pTitle.includes("design") || pTitle.includes("brand")
  )) {
    return true;
  }

  if (catId === "videography" && (
    pCat.includes("video") || pCat.includes("motion") || pCat.includes("commercial") ||
    pTags.includes("video") || pTags.includes("motion") || pTitle.includes("video") || project.videoUrl
  )) {
    return true;
  }

  if (catId === "marketing" && (
    pCat.includes("market") || pCat.includes("growth") || pCat.includes("social") ||
    pTags.includes("market") || pTags.includes("social") || pTags.includes("ad") ||
    pTitle.includes("market") || pTitle.includes("campaign") || pTitle.includes("social") || pTitle.includes("brand")
  )) {
    return true;
  }

  if (catId === "ai-automation" && (
    pCat.includes("ai") || pCat.includes("auto") || pCat.includes("bot") ||
    pTags.includes("ai") || pTags.includes("automation") || pTitle.includes("ai") || pTitle.includes("auto")
  )) {
    return true;
  }

  if (catId === "telemarketing" && (
    pCat.includes("tele") || pCat.includes("call") || pCat.includes("outbound") || pCat.includes("lead") ||
    pTags.includes("call") || pTags.includes("telemarketing") || pTitle.includes("call") || pTitle.includes("outbound")
  )) {
    return true;
  }

  if (catId === "custom-software" && (
    pCat.includes("soft") || pCat.includes("custom") || pCat.includes("app") || pCat.includes("saas") ||
    pTags.includes("software") || pTags.includes("saas") || pTitle.includes("app") || pTitle.includes("platform")
  )) {
    return true;
  }

  return false;
}

export function PortfolioList({ projects }: { projects: any[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeLightboxImage, setActiveLightboxImage] = useState<string | null>(null);
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const ITEMS_PER_PAGE = 6;

  const serviceBoxes = [
    { 
      id: "all", 
      title: "All Work", 
      subtitle: "Complete agency client portfolio", 
      icon: Sparkles, 
      color: "#ffbe00",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
    },
    { 
      id: "web-dev", 
      title: "Web Development", 
      subtitle: "Simple details, live links & Next.js sites", 
      icon: Code2, 
      color: "#6a35ff",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop"
    },
    { 
      id: "seo", 
      title: "SEO", 
      subtitle: "Before vs After metrics & ROI stats", 
      icon: Search, 
      color: "#00c2ff",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop"
    },
    { 
      id: "graphic-design", 
      title: "Graphics & Logo Design", 
      subtitle: "Pure brand logo & design image gallery", 
      icon: Palette, 
      color: "#ff007a",
      image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=2071&auto=format&fit=crop"
    },
    { 
      id: "marketing", 
      title: "Social Media Marketing", 
      subtitle: "Social campaigns & ad creatives", 
      icon: TrendingUp, 
      color: "#ff3b30",
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop"
    },
    { 
      id: "custom-software", 
      title: "Custom Software", 
      subtitle: "SaaS platforms & system screenshots", 
      icon: Cpu, 
      color: "#af52de",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop"
    },
  ];

  // Filter projects by smart matching
  let filteredProjects = projects ? projects.filter(p => matchesCategory(p, selectedCategory)) : [];

  const [selectedPlatform, setSelectedPlatform] = useState<string>("All Platforms");

  // Filter Marketing by platform if applicable
  if (selectedCategory === "marketing" && selectedPlatform !== "All Platforms") {
    filteredProjects = filteredProjects.filter(p => {
      if (!p.socialMediaStats || !Array.isArray(p.socialMediaStats)) return false;
      return p.socialMediaStats.some((stat: any) => stat.platform === selectedPlatform);
    });
  }

  // Pagination Math
  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProjects = filteredProjects.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Graphic Galleries will just use paginatedProjects natively now.

  const activeOverview = SERVICE_OVERVIEWS[selectedCategory] || SERVICE_OVERVIEWS["all"];
  const OverviewIcon = activeOverview.icon;

  const handleServiceSelect = (id: string) => {
    setSelectedCategory(id);
    setSelectedPlatform("All Platforms");
    setCurrentPage(1);
    const targetEl = document.getElementById("service-detail-section");
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Helper to format video embed URLs
  const getEmbedVideoUrl = (url: string) => {
    if (!url) return null;
    if (url.includes("youtube.com/watch?v=")) {
      return url.replace("watch?v=", "embed/");
    }
    if (url.includes("youtu.be/")) {
      return url.replace("youtu.be/", "youtube.com/embed/");
    }
    if (url.includes("vimeo.com/")) {
      const vimeoId = url.split("vimeo.com/")[1];
      return `https://player.vimeo.com/video/${vimeoId}`;
    }
    return url;
  };

  return (
    <section id="portfolio-list" className="py-16 md:py-24 bg-mesh relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Title */}
        <div className="text-center mb-12">
          <p className="text-[#ffbe00] font-bold text-xs uppercase tracking-[0.4em] mb-3">
            Select A Service To Explore Work
          </p>
          <h2 className="text-3xl md:text-5xl font-black text-foreground tracking-tight">
            Our Capability Hub
          </h2>
          <p className="text-sm md:text-base text-muted max-w-2xl mx-auto mt-3 font-medium">
            Click any service box below to view tailored portfolios for Web Dev, SEO, Logo Design, Videography & Custom Software.
          </p>
        </div>

        {/* VISUAL SERVICE BOXES GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-20 relative z-20">
          {serviceBoxes.map((box) => {
            const isActive = selectedCategory === box.id;
            const BoxIcon = box.icon;
            const matchCount = projects ? projects.filter(p => matchesCategory(p, box.id)).length : 0;
            const count = box.id === "all" ? `${projects?.length || 0}` : `${matchCount}`;

            return (
              <button
                key={box.id}
                type="button"
                onClick={() => handleServiceSelect(box.id)}
                className={`group relative h-48 sm:h-56 rounded-[2rem] overflow-hidden text-left transition-all duration-500 shadow-xl ${
                  isActive ? "ring-4 ring-[#ffbe00] scale-[1.02] shadow-[0_0_30px_rgba(255,190,0,0.3)] z-10" : "hover:scale-[1.02] hover:shadow-2xl"
                }`}
              >
                {/* Background Image */}
                <Image 
                  src={box.image || ""} 
                  alt={box.title} 
                  fill 
                  className={`object-cover transition-transform duration-700 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} 
                />
                
                {/* Overlay */}
                <div className={`absolute inset-0 transition-colors duration-500 ${
                  isActive ? "bg-[#1a1122]/70" : "bg-[#1a1122]/80 group-hover:bg-[#1a1122]/60"
                }`} />

                {/* Content */}
                <div className="absolute inset-0 p-5 flex flex-col justify-between z-10">
                  <div className="flex items-start justify-between">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center backdrop-blur-md border shadow-lg ${
                      isActive ? "bg-[#ffbe00] border-[#ffbe00] text-[#1a1122]" : "bg-white/20 border-white/30 text-white"
                    }`}>
                      <BoxIcon size={20} strokeWidth={2.5} />
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black tracking-wider shadow-lg border ${
                      isActive ? "bg-[#1a1122] text-[#ffbe00] border-[#ffbe00]/30" : "bg-black/50 text-white border-white/10 backdrop-blur-sm"
                    }`}>
                      {count}
                    </span>
                  </div>

                  <div>
                    <h3 className={`text-base md:text-lg font-black leading-tight mb-1 drop-shadow-md transition-colors ${
                      isActive ? "text-[#ffbe00]" : "text-white group-hover:text-[#ffbe00]"
                    }`}>
                      {box.title}
                    </h3>
                    <p className="text-xs text-white/80 font-medium line-clamp-2 drop-shadow-sm">
                      {box.subtitle}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Dynamic Service Overview Banner & Content Grid Section */}
        <div id="service-detail-section" className="scroll-mt-28">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -25 }}
              transition={{ duration: 0.4 }}
              className={`mb-16 p-8 md:p-12 lg:p-14 rounded-[2.5rem] bg-gradient-to-br ${activeOverview.gradient} border border-white/15 text-white shadow-2xl relative overflow-hidden group`}
            >
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#ffbe00]/15 rounded-full blur-[120px] pointer-events-none transform translate-x-1/3 -translate-y-1/3 group-hover:scale-110 transition-transform duration-700" />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ffbe00]/10 border border-[#ffbe00]/30 text-[#ffbe00] text-xs font-extrabold uppercase tracking-widest mb-4">
                    <OverviewIcon size={14} />
                    <span>Selected Service Overview</span>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight mb-4 text-white">
                    {activeOverview.title}
                  </h2>
                  <p className="text-base md:text-lg text-[#dcd7e3]/90 leading-relaxed font-medium mb-6">
                    {activeOverview.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {activeOverview.capabilities.map((cap, idx) => (
                      <span 
                        key={idx} 
                        className="px-3.5 py-1.5 bg-white/5 border border-white/10 rounded-xl text-xs font-semibold text-white/90 flex items-center gap-1.5"
                      >
                        <CheckCircle2 size={13} className="text-[#ffbe00]" /> {cap}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-4 flex justify-center">
                  <div className="w-full max-w-sm p-6 rounded-3xl bg-black/40 border border-white/15 backdrop-blur-md shadow-2xl flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-2xl bg-[#ffbe00]/20 flex items-center justify-center text-[#ffbe00] mb-4">
                      <OverviewIcon size={32} />
                    </div>
                    <h4 className="font-bold text-white text-base mb-1">{activeOverview.subtitle}</h4>
                    <p className="text-xs text-white/60 mt-2 flex items-center justify-center gap-1">
                      <span>Explore showcase below</span>
                      <ChevronDown size={14} className="text-[#ffbe00] animate-bounce" />
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* DISPLAY MODE 1: PURE LOGO GALLERY SHOWCASE */}
          {selectedCategory === "graphic-design" ? (
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-200 dark:border-white/10 pb-6">
                <div>
                  <h3 className="text-2xl md:text-3xl font-black text-foreground tracking-tight flex items-center gap-2">
                    <Palette className="text-[#ff007a]" /> Graphic Design Galleries
                  </h3>
                  <p className="text-sm text-muted mt-1 font-medium">
                    Explore our curated collections of logos and visual brand assets. Click any image for full-screen preview.
                  </p>
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#ff007a] bg-[#24182e] px-4 py-2 rounded-full border border-white/10">
                  {filteredProjects.length} Galleries
                </span>
              </div>

              {filteredProjects.length === 0 ? (
                <div className="p-16 rounded-3xl bg-[#24182e]/40 border border-white/10 text-center">
                  <Palette size={40} className="text-[#ff007a] mx-auto mb-3" />
                  <h4 className="text-xl font-bold text-white mb-2">No Galleries Created Yet</h4>
                  <p className="text-sm text-[#dcd7e3]/60 max-w-md mx-auto mb-6">
                    Create your first Graphic Design Gallery in the Admin Dashboard!
                  </p>
                </div>
              ) : (
                <div className="space-y-16">
                  {paginatedProjects.map((gallery: any, gIdx: number) => {
                    const images = gallery.galleryImages?.length > 0 ? gallery.galleryImages : (gallery.image ? [gallery.image] : []);
                    
                    return (
                      <div key={gallery.id || gIdx} className="space-y-6">
                        <div className="flex items-center gap-4">
                          <h4 className="text-2xl font-black text-foreground">{gallery.title}</h4>
                          <div className="h-[1px] flex-1 bg-gradient-to-r from-black/10 dark:from-white/20 to-transparent" />
                          <span className="text-xs text-[#ff007a] font-bold uppercase tracking-widest">{images.length} Assets</span>
                        </div>
                        
                        {images.length === 0 ? (
                          <div className="p-8 rounded-2xl bg-black/30 border border-white/10 text-center text-sm text-gray-400">
                            No images in this gallery yet.
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {images.map((imgUrl: string, idx: number) => (
                              <motion.div
                                key={`${gallery.id}-${idx}`}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: (idx % 4) * 0.05 }}
                                onClick={() => setActiveLightboxImage(imgUrl)}
                                className="group relative rounded-3xl bg-[#1d1326] border border-white/15 p-6 flex flex-col items-center justify-center cursor-pointer overflow-hidden shadow-2xl hover:border-[#ff007a] hover:shadow-[0_0_30px_rgba(255,0,122,0.3)] transition-all duration-500 h-64"
                              >
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex flex-col justify-end p-5">
                                  <span className="mt-2 text-[10px] text-white/70 flex items-center gap-1 font-bold">
                                    <Maximize2 size={12} className="text-[#ff007a]" /> Click for Lightbox Preview
                                  </span>
                                </div>

                                <div className="relative w-full h-full flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img src={imgUrl} alt={`${gallery.title} Image ${idx + 1}`} className="object-contain max-h-full max-w-full rounded-xl" />
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            /* DISPLAY MODE FOR WEB DEV, SEO, VIDEOGRAPHY & CUSTOM SOFTWARE */
            <div>
              <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-200 dark:border-white/10 pb-6">
                <div>
                  <h3 className="text-2xl md:text-3xl font-black text-foreground tracking-tight">
                    Projects Showcase ({filteredProjects.length})
                  </h3>
                  <p className="text-sm text-muted mt-1 font-medium">
                    Delivered work under {activeOverview.title}.
                  </p>
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#ffbe00] bg-[#24182e] px-4 py-2 rounded-full border border-white/10">
                  {filteredProjects.length} Projects
                </span>
              </div>

              {selectedCategory === "marketing" && (
                <div className="mb-10 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-white mr-2">Filter by Platform:</span>
                  {["All Platforms", "Facebook", "Instagram", "TikTok", "LinkedIn", "Meta Ads", "Twitter/X", "YouTube", "Pinterest"].map((platform) => (
                    <button
                      key={platform}
                      onClick={() => setSelectedPlatform(platform)}
                      className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors border ${
                        selectedPlatform === platform
                          ? "bg-[#ffbe00] text-[#1a1122] border-[#ffbe00]"
                          : "bg-white/5 border-white/10 text-white hover:bg-white/10"
                      }`}
                    >
                      {platform}
                    </button>
                  ))}
                </div>
              )}

              {filteredProjects.length === 0 ? (
                <div className="p-16 rounded-3xl bg-[#24182e]/40 border border-white/10 text-center">
                  <div className="w-16 h-16 rounded-full bg-[#ffbe00]/10 text-[#ffbe00] flex items-center justify-center mx-auto mb-4">
                    <Sparkles size={28} />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">No Projects Under This Category Yet</h4>
                  <p className="text-sm text-[#dcd7e3]/60 max-w-md mx-auto mb-6">
                    Select another service box above to explore client work!
                  </p>
                  <button
                    type="button"
                    onClick={() => handleServiceSelect("all")}
                    className="px-6 py-2.5 bg-[#ffbe00] text-[#24182e] font-bold rounded-xl text-xs uppercase tracking-wider shadow-lg"
                  >
                    View All Work
                  </button>
                </div>
              ) : (
                <div className="space-y-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 auto-rows-fr">
                    {paginatedProjects.map((project, i) => {
                      const beforeLines = (project.beforeStats || "").split("\n").filter(Boolean);
                      const afterLines = (project.afterStats || "").split("\n").filter(Boolean);
                      const isVideo = project.videoUrl || project.serviceCategory === "videography";
                      
                      // Bento Box Logic: Make specific indices span 2 columns to perfectly fill a 3-col grid with 6 items.
                      // Row 1: index 0 (2 cols), index 1 (1 col)
                      // Row 2: index 2 (1 col), index 3 (2 cols)
                      // Row 3: index 4 (2 cols), index 5 (1 col)
                      const isFeatured = i === 0 || i === 3 || i === 4;
                      const cardSpanClass = isFeatured ? "md:col-span-2 lg:col-span-2" : "col-span-1";
                      const imageContainerHeight = isFeatured ? "h-72 md:h-80" : "h-56 md:h-60";

                      return (
                        <motion.div
                          key={`${project.id || 'project'}-${i}`}
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                          className={`rounded-[2.2rem] bg-[#1a1122]/90 border border-white/10 text-white shadow-2xl overflow-hidden flex flex-col group hover:border-[#ffbe00]/50 hover:shadow-[0_0_30px_rgba(255,190,0,0.15)] transition-all duration-700 relative ${cardSpanClass}`}
                        >
                          {/* Cover Image / Video Thumbnail */}
                          <div className={`relative w-full overflow-hidden border-b border-white/10 ${imageContainerHeight}`}>
                            <Image
                              src={project.image}
                              alt={project.title}
                              fill
                              className="object-cover transition-transform duration-1000 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#1a1122] via-transparent to-transparent z-10" />
                            
                            {/* Glassmorphism Hover Reveal */}
                            <Link href={`/portfolio/${project.slug}`} className="absolute inset-0 z-40 bg-[#1a1122]/40 backdrop-blur-md flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 overflow-hidden">
                              <div className="transform translate-y-10 group-hover:translate-y-0 transition-transform duration-700 ease-out flex flex-col items-center">
                                <div className="w-16 h-16 rounded-full bg-[#ffbe00] text-[#1a1122] flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(255,190,0,0.5)]">
                                  <ArrowRight size={28} strokeWidth={3} className="-rotate-45" />
                                </div>
                                <span className="text-white font-black uppercase tracking-widest text-sm bg-black/50 px-6 py-2 rounded-full border border-white/20">
                                  View Case Study
                                </span>
                              </div>
                            </Link>

                            {/* Top Badges */}
                            <div className="absolute top-4 left-4 right-4 flex items-start justify-between z-20 pointer-events-none">
                              <div className="flex flex-wrap gap-2 max-w-[65%]">
                                {(() => {
                                  const cat = project.serviceCategory || project.category || "";
                                  if (!cat) return (
                                    <span className="px-3.5 py-1.5 rounded-full bg-[#090512]/80 backdrop-blur-md border border-white/10 text-white text-[9px] font-extrabold uppercase tracking-widest flex items-center gap-1.5 whitespace-nowrap shadow-lg">
                                      <Sparkles size={11} className="text-[#ffbe00]" /> Digital Project
                                    </span>
                                  );

                                  const map: Record<string, string> = {
                                    "web-dev": "Web Development",
                                    "seo": "SEO",
                                    "graphic-design": "Graphic Design",
                                    "videography": "Videography",
                                    "marketing": "Social Media Marketing",
                                    "ai-automation": "AI Automation",
                                    "telemarketing": "Telemarketing",
                                    "custom-software": "Custom Software"
                                  };
                                  
                                  return cat.split(',').map((c: string, idx: number) => {
                                    const cleanCat = c.trim();
                                    const label = map[cleanCat] || cleanCat.replace(/-/g, " ");
                                    return (
                                      <span key={idx} className="px-3.5 py-1.5 rounded-full bg-[#090512]/80 backdrop-blur-md border border-white/10 text-white text-[9px] font-extrabold uppercase tracking-widest flex items-center gap-1.5 whitespace-nowrap shadow-lg">
                                        <Sparkles size={11} className="text-[#ffbe00]" /> {label}
                                      </span>
                                    );
                                  });
                                })()}
                              </div>

                              {project.growthBadge && (
                                <span className="px-3.5 py-1.5 rounded-full bg-[#ffbe00] text-[#1a1122] font-black text-[10px] md:text-[11px] uppercase tracking-wider shadow-xl flex items-center gap-1.5 shrink-0 ml-2 whitespace-nowrap text-right">
                                  <TrendingUp size={12} strokeWidth={3} /> {project.growthBadge}
                                </span>
                              )}
                            </div>

                            {/* Play Button Overlay for Videography */}
                            {isVideo && project.videoUrl && (
                              <button
                                onClick={() => setActiveVideoUrl(project.videoUrl)}
                                className="absolute inset-0 flex items-center justify-center z-50 group/play"
                              >
                                <div className="w-16 h-16 rounded-full bg-[#ff3b30] text-white flex items-center justify-center shadow-[0_0_30px_rgba(255,59,48,0.6)] group-hover/play:scale-110 transition-transform">
                                  <Play size={28} className="fill-white translate-x-1" />
                                </div>
                              </button>
                            )}

                            {/* Project Title Overlay */}
                            <div className="absolute bottom-5 left-6 right-6 z-20">
                              <h3 className={`font-black text-white leading-tight tracking-tight drop-shadow-2xl line-clamp-2 ${isFeatured ? 'text-2xl md:text-4xl' : 'text-xl md:text-2xl'}`}>
                                {project.title}
                              </h3>
                            </div>
                          </div>

                          {/* Body Content */}
                          <div className="p-6 md:p-8 flex-1 flex flex-col justify-between space-y-6 bg-gradient-to-b from-[#1a1122] to-[#090512]">
                            <p className="text-[#dcd7e3]/80 text-sm leading-relaxed font-medium line-clamp-2">
                              {project.description}
                            </p>

                            {/* SYSTEM SCREENSHOTS / GALLERY IMAGES IF PRESENT (CUSTOM SOFTWARE / WEB DEV) */}
                            {project.galleryImages && project.galleryImages.length > 0 && (
                              <div className="space-y-2 pt-2">
                                <span className="text-[10px] font-extrabold text-[#af52de] uppercase tracking-wider flex items-center gap-1.5">
                                  <Cpu size={12} /> Screenshots Gallery ({project.galleryImages.length})
                                </span>
                                <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-thin">
                                  {project.galleryImages.map((gImg: string, gIdx: number) => (
                                    <div 
                                      key={gIdx} 
                                      onClick={() => setActiveLightboxImage(gImg)}
                                      className="relative w-20 h-14 rounded-xl bg-black/60 border border-white/10 p-1 flex items-center justify-center shrink-0 cursor-pointer hover:border-[#af52de] hover:scale-105 transition-all overflow-hidden shadow-md"
                                    >
                                      {/* eslint-disable-next-line @next/next/no-img-element */}
                                      <img src={gImg} alt="Screenshot" className="object-cover w-full h-full rounded-lg" />
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* BEFORE VS AFTER METRICS (SEO & MARKETING) */}
                            {(project.beforeStats || project.afterStats) && (
                              <div className="grid grid-cols-1 gap-3 bg-white/5 p-5 rounded-2xl border border-white/5">
                                {beforeLines.length > 0 && (
                                  <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-xl">
                                    <div className="flex items-center gap-2 text-red-400 font-extrabold uppercase text-[9px] md:text-[10px] tracking-widest mb-1.5">
                                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" /> BEFORE AERONOX
                                    </div>
                                    <ul className="space-y-1 text-xs text-gray-300 font-medium">
                                      {beforeLines.slice(0, 2).map((line: string, idx: number) => (
                                        <li key={idx} className="line-clamp-1">{line}</li>
                                      ))}
                                    </ul>
                                  </div>
                                )}

                                {afterLines.length > 0 && (
                                  <div className="bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-xl">
                                    <div className="flex items-center gap-2 text-emerald-400 font-extrabold uppercase text-[9px] md:text-[10px] tracking-widest mb-1.5">
                                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> AFTER AERONOX
                                    </div>
                                    <ul className="space-y-1 text-xs text-emerald-100 font-bold">
                                      {afterLines.slice(0, 2).map((line: string, idx: number) => (
                                        <li key={idx} className="line-clamp-1">{line}</li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* PAGINATION CONTROLS */}
                  {totalPages > 1 && (
                    <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-[#24182e]/80 border border-white/15 rounded-3xl shadow-xl">
                      <span className="text-xs font-medium text-[#dcd7e3]/80">
                        Showing <strong className="text-white font-bold">{startIndex + 1} – {Math.min(startIndex + ITEMS_PER_PAGE, filteredProjects.length)}</strong> of <strong className="text-[#ffbe00] font-black">{filteredProjects.length}</strong> Projects
                      </span>

                      <div className="flex items-center gap-2 flex-wrap justify-center">
                        <button
                          type="button"
                          disabled={currentPage === 1}
                          onClick={() => {
                            setCurrentPage(prev => Math.max(prev - 1, 1));
                            document.getElementById("service-detail-section")?.scrollIntoView({ behavior: "smooth" });
                          }}
                          className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-white/5 border border-white/10 text-white hover:bg-[#ffbe00] hover:text-[#24182e] disabled:opacity-30 disabled:pointer-events-none transition-colors flex items-center gap-1.5"
                        >
                          <ChevronLeft size={14} /> Previous
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                          <button
                            key={pageNum}
                            type="button"
                            onClick={() => {
                              setCurrentPage(pageNum);
                              document.getElementById("service-detail-section")?.scrollIntoView({ behavior: "smooth" });
                            }}
                            className={`w-9 h-9 rounded-xl text-xs font-black transition-all ${
                              currentPage === pageNum
                                ? "bg-[#ffbe00] text-[#24182e] shadow-lg shadow-[#ffbe00]/20 scale-105"
                                : "bg-white/5 border border-white/10 text-white hover:bg-white/15"
                            }`}
                          >
                            {pageNum}
                          </button>
                        ))}

                        <button
                          type="button"
                          disabled={currentPage === totalPages}
                          onClick={() => {
                            setCurrentPage(prev => Math.min(prev + 1, totalPages));
                            document.getElementById("service-detail-section")?.scrollIntoView({ behavior: "smooth" });
                          }}
                          className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-white/5 border border-white/10 text-white hover:bg-[#ffbe00] hover:text-[#24182e] disabled:opacity-30 disabled:pointer-events-none transition-colors flex items-center gap-1.5"
                        >
                          Next <ChevronRight size={14} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

      </div>

      {/* FULLSCREEN LIGHTBOX IMAGE MODAL */}
      <AnimatePresence>
        {activeLightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveLightboxImage(null)}
            className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[100] flex items-center justify-center p-4 md:p-10 cursor-zoom-out"
          >
            <button
              onClick={() => setActiveLightboxImage(null)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-red-600 transition-colors shadow-2xl z-10"
            >
              <X size={24} />
            </button>

            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-5xl max-h-[85vh] w-full h-full flex items-center justify-center"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activeLightboxImage}
                alt="High Res Preview"
                className="object-contain max-w-full max-h-full rounded-2xl border border-white/20 shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* VIDEO LIGHTBOX PLAYER MODAL */}
      <AnimatePresence>
        {activeVideoUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[100] flex items-center justify-center p-4 md:p-10"
          >
            <button
              onClick={() => setActiveVideoUrl(null)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-red-600 transition-colors shadow-2xl z-10"
            >
              <X size={24} />
            </button>

            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-5xl w-full aspect-video rounded-3xl overflow-hidden border border-white/20 shadow-2xl bg-black"
            >
              <iframe
                src={getEmbedVideoUrl(activeVideoUrl) || ""}
                title="Videography Showcase Player"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
