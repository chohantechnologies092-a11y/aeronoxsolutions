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
  ExternalLink,
  Building2,
  CheckCircle2,
  ChevronDown
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
    subtitle: "Explore our client case studies across SEO, Web Development, Growth Marketing, AI, and Telemarketing.",
    description: "We partner with ambitious enterprises and startups to transform digital presence, scale acquisition channels, and drive measurable revenue growth.",
    icon: Sparkles,
    capabilities: ["Organic SEO", "Headless Next.js Systems", "Funnel Optimization", "AI Workflow Automation", "B2B Outbound Lead Gen"],
    gradient: "from-[#24182e] via-[#1a1122] to-[#120b18]"
  },
  "seo": {
    title: "Search Engine Optimization & Organic Growth",
    subtitle: "High-intent organic traffic acquisition, technical SEO audits, and content authority scaling.",
    description: "Our data-driven SEO frameworks engineer top 3 search rankings for competitive commercial keywords, turning organic search into your most profitable sales channel.",
    icon: Search,
    capabilities: ["Technical & Core Web Vitals Audits", "Commercial Keyword Strategy", "Programmatic SEO Architecture", "High-Authority Digital PR & Backlinks"],
    gradient: "from-[#24182e] via-[#1f142b] to-[#140c1e]"
  },
  "web-dev": {
    title: "Web & E-Commerce Engineering",
    subtitle: "Blazing fast Next.js & React web applications designed for maximum conversion.",
    description: "We engineer enterprise-grade headless platforms, high-converting e-commerce web applications, and custom API integrations built to perform at global scale.",
    icon: Code2,
    capabilities: ["Next.js 16 App Router & React 19", "Headless E-Commerce Solutions", "Custom REST & GraphQL APIs", "Sub-Second Page Load Optimization"],
    gradient: "from-[#1a1122] via-[#24182e] to-[#0f0a16]"
  },
  "marketing": {
    title: "Growth & Performance Marketing",
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
  if (catId === "seo" && (pCat.includes("seo") || pTags.includes("seo") || pTitle.includes("seo") || pDesc.includes("seo"))) {
    return true;
  }

  if (catId === "web-dev" && (
    pCat.includes("web") || pCat.includes("dev") || pCat.includes("e-commerce") || 
    pTags.includes("next.js") || pTags.includes("react") || pTags.includes("web") || pTags.includes("tailwind") ||
    pTitle.includes("web") || pTitle.includes("site") || pTitle.includes("replatforming") || pTitle.includes("commerce")
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

  const serviceBoxes = [
    { 
      id: "all", 
      title: "All Services & Portfolio", 
      subtitle: "Explore complete client case studies", 
      icon: Sparkles, 
      color: "#ffbe00" 
    },
    { 
      id: "seo", 
      title: "SEO & Search Engine Growth", 
      subtitle: "Top search rankings & organic traffic", 
      icon: Search, 
      color: "#00c2ff" 
    },
    { 
      id: "web-dev", 
      title: "Web & E-Commerce Engineering", 
      subtitle: "Headless Next.js & React web applications", 
      icon: Code2, 
      color: "#6a35ff" 
    },
    { 
      id: "marketing", 
      title: "Growth & Performance Marketing", 
      subtitle: "High-converting paid ads & funnels", 
      icon: TrendingUp, 
      color: "#ff3b30" 
    },
    { 
      id: "ai-automation", 
      title: "AI Systems & Workflow Automation", 
      subtitle: "Custom AI subagents & automated pipelines", 
      icon: Bot, 
      color: "#34c759" 
    },
    { 
      id: "telemarketing", 
      title: "Outbound Lead Gen & Telemarketing", 
      subtitle: "B2B cold calling & appointment setting", 
      icon: PhoneCall, 
      color: "#ff9500" 
    },
    { 
      id: "custom-software", 
      title: "Custom Software Engineering", 
      subtitle: "Scalable SaaS platforms & microservices", 
      icon: Cpu, 
      color: "#af52de" 
    },
  ];

  // Filter projects by smart matching
  const filteredProjects = projects ? projects.filter(p => matchesCategory(p, selectedCategory)) : [];

  const activeOverview = SERVICE_OVERVIEWS[selectedCategory] || SERVICE_OVERVIEWS["all"];
  const OverviewIcon = activeOverview.icon;

  const handleServiceSelect = (id: string) => {
    setSelectedCategory(id);
    const targetEl = document.getElementById("service-detail-section");
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="portfolio-list" className="py-16 md:py-24 bg-mesh relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Title */}
        <div className="text-center mb-12">
          <p className="text-[#ffbe00] font-bold text-xs uppercase tracking-[0.4em] mb-3">
            Select A Service To Explore Company Case Studies
          </p>
          <h2 className="text-3xl md:text-5xl font-black text-foreground tracking-tight">
            Our Capability Hub
          </h2>
          <p className="text-sm md:text-base text-muted max-w-2xl mx-auto mt-3 font-medium">
            Click any service box below to view our engineering overview and client "Before vs After" results.
          </p>
        </div>

        {/* VISUAL SERVICE BOXES GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20 relative z-20">
          {serviceBoxes.map((box) => {
            const isActive = selectedCategory === box.id;
            const BoxIcon = box.icon;
            const matchCount = projects ? projects.filter(p => matchesCategory(p, box.id)).length : 0;

            return (
              <button
                key={box.id}
                type="button"
                onClick={() => handleServiceSelect(box.id)}
                className={`p-6 rounded-[2rem] text-left transition-all duration-500 relative overflow-hidden group flex flex-col justify-between h-56 border ${
                  isActive
                    ? "bg-[#24182e] border-[#ffbe00] shadow-[0_0_30px_rgba(255,190,0,0.3)] scale-[1.03] ring-2 ring-[#ffbe00]/50"
                    : "bg-[#24182e]/80 border-white/10 hover:border-white/30 hover:bg-[#24182e] hover:scale-[1.02] shadow-xl"
                }`}
              >
                {/* Background Ambient Glow */}
                <div 
                  className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none"
                  style={{ backgroundColor: box.color }}
                />

                {/* Card Top: Icon & Count Badge */}
                <div className="flex items-center justify-between z-10">
                  <div 
                    className="w-12 h-12 rounded-2xl flex items-center justify-center border border-white/15 bg-white/10 backdrop-blur-md shadow-lg transition-transform group-hover:scale-110"
                  >
                    <BoxIcon size={24} style={{ color: box.color }} strokeWidth={2.5} />
                  </div>

                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                    isActive 
                      ? "bg-[#ffbe00] text-[#24182e]" 
                      : "bg-white/10 text-white/80 border border-white/10"
                  }`}>
                    {box.id === "all" ? `${projects?.length || 0} Total` : `${matchCount} Case Studies`}
                  </span>
                </div>

                {/* Card Middle: Title & Subtitle */}
                <div className="z-10 mt-4">
                  <h3 className={`text-lg font-black leading-tight mb-1 transition-colors ${
                    isActive ? "text-[#ffbe00]" : "text-white group-hover:text-[#ffbe00]"
                  }`}>
                    {box.title}
                  </h3>
                  <p className="text-xs text-[#dcd7e3]/70 font-medium line-clamp-2">
                    {box.subtitle}
                  </p>
                </div>

                {/* Card Bottom: Click Action Indicator */}
                <div className="z-10 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-[#dcd7e3]/80 group-hover:text-white">
                  <span>{isActive ? "Currently Opened" : "Click To Open Service"}</span>
                  <ArrowRight size={14} className={`transition-transform duration-300 ${
                    isActive ? "rotate-90 text-[#ffbe00]" : "group-hover:translate-x-1"
                  }`} />
                </div>
              </button>
            );
          })}
        </div>

        {/* Dynamic Service Overview Banner & Company List Section */}
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

                  {/* Capability Badges */}
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

                {/* Service Visual Highlight Box */}
                <div className="lg:col-span-4 flex justify-center">
                  <div className="w-full max-w-sm p-6 rounded-3xl bg-black/40 border border-white/15 backdrop-blur-md shadow-2xl flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-2xl bg-[#ffbe00]/20 flex items-center justify-center text-[#ffbe00] mb-4">
                      <OverviewIcon size={32} />
                    </div>
                    <h4 className="font-bold text-white text-base mb-1">{activeOverview.subtitle}</h4>
                    <p className="text-xs text-white/60 mt-2 flex items-center justify-center gap-1">
                      <span>Companies worked for shown below</span>
                      <ChevronDown size={14} className="text-[#ffbe00] animate-bounce" />
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Section Header */}
          <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-200 dark:border-white/10 pb-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-black text-foreground tracking-tight">
                Companies Worked For & Delivered Results
              </h3>
              <p className="text-sm text-muted mt-1 font-medium">
                Verified client projects under {activeOverview.title}.
              </p>
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#ffbe00] bg-[#24182e] px-4 py-2 rounded-full border border-white/10">
              {filteredProjects.length} {filteredProjects.length === 1 ? "Company" : "Companies"} Displayed
            </span>
          </div>

          {/* Projects / Companies Grid */}
          {filteredProjects.length === 0 ? (
            <div className="p-16 rounded-3xl bg-[#24182e]/40 border border-white/10 text-center">
              <div className="w-16 h-16 rounded-full bg-[#ffbe00]/10 text-[#ffbe00] flex items-center justify-center mx-auto mb-4">
                <Sparkles size={28} />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">No Companies Listed Under This Service Yet</h4>
              <p className="text-sm text-[#dcd7e3]/60 max-w-md mx-auto mb-6">
                New company case studies are being added regularly. Select another service box above to explore more client work!
              </p>
              <button
                type="button"
                onClick={() => handleServiceSelect("all")}
                className="px-6 py-2.5 bg-[#ffbe00] text-[#24182e] font-bold rounded-xl text-xs uppercase tracking-wider shadow-lg"
              >
                View All Companies & Work
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {filteredProjects.map((project, i) => {
                const beforeLines = (project.beforeStats || "").split("\n").filter(Boolean);
                const afterLines = (project.afterStats || "").split("\n").filter(Boolean);

                return (
                  <motion.div
                    key={project.id || i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: (i % 2) * 0.1 }}
                    className="rounded-[2.5rem] bg-[#24182e] border border-white/15 text-white shadow-2xl overflow-hidden flex flex-col group hover:border-[#ffbe00]/50 transition-all duration-500"
                  >
                    {/* Cover Image & Header Badges */}
                    <div className="relative h-64 sm:h-72 w-full overflow-hidden border-b border-white/10">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#24182e] via-[#24182e]/40 to-transparent" />

                      {/* Top Badges */}
                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
                        <span className="px-3.5 py-1.5 rounded-full bg-[#24182e]/90 backdrop-blur-md border border-white/20 text-[#ffbe00] text-[10px] font-extrabold uppercase tracking-widest flex items-center gap-1.5">
                          <Building2 size={12} /> {project.client || "Client Case Study"}
                        </span>

                        {project.growthBadge && (
                          <span className="px-3.5 py-1.5 rounded-full bg-emerald-500 text-[#090512] font-black text-xs uppercase tracking-wider shadow-lg flex items-center gap-1">
                            <TrendingUp size={14} /> {project.growthBadge}
                          </span>
                        )}
                      </div>

                      {/* Project Title Overlay */}
                      <div className="absolute bottom-4 left-6 right-6 z-20">
                        <h3 className="text-2xl md:text-3xl font-black text-white leading-tight tracking-tight group-hover:text-[#ffbe00] transition-colors">
                          {project.title}
                        </h3>
                      </div>
                    </div>

                    {/* Body Content */}
                    <div className="p-6 md:p-8 flex-1 flex flex-col justify-between space-y-6">
                      {/* Short Description */}
                      <p className="text-[#dcd7e3]/90 text-sm leading-relaxed font-medium line-clamp-2">
                        {project.description}
                      </p>

                      {/* BEFORE VS AFTER DATA COMPARISON BOX */}
                      {(project.beforeStats || project.afterStats) && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-black/40 p-5 rounded-2xl border border-white/10">
                          {/* BEFORE */}
                          <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl">
                            <div className="flex items-center gap-1.5 text-red-400 font-extrabold uppercase text-[10px] tracking-wider mb-2">
                              <span className="w-2 h-2 rounded-full bg-red-500" /> BEFORE AERONOX
                            </div>
                            {beforeLines.length > 0 ? (
                              <ul className="space-y-1 text-xs text-gray-300 font-medium">
                                {beforeLines.map((line: string, idx: number) => (
                                  <li key={idx} className="line-clamp-1">{line}</li>
                                ))}
                              </ul>
                            ) : (
                              <p className="text-xs text-gray-400 font-medium">Initial state data documented in full case study.</p>
                            )}
                          </div>

                          {/* AFTER */}
                          <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl">
                            <div className="flex items-center gap-1.5 text-emerald-400 font-extrabold uppercase text-[10px] tracking-wider mb-2">
                              <span className="w-2 h-2 rounded-full bg-emerald-500" /> AFTER AERONOX (RESULTS)
                            </div>
                            {afterLines.length > 0 ? (
                              <ul className="space-y-1 text-xs text-emerald-200 font-bold">
                                {afterLines.map((line: string, idx: number) => (
                                  <li key={idx} className="line-clamp-1">{line}</li>
                                ))}
                              </ul>
                            ) : (
                              <p className="text-xs text-emerald-300 font-bold">Verified growth outcomes documented.</p>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Action Bar */}
                      <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                        {project.liveUrl ? (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#ffbe00] hover:underline"
                          >
                            <ExternalLink size={14} /> Visit Live Site
                          </a>
                        ) : (
                          <span className="text-xs text-white/40 font-medium">Verified Case Study</span>
                        )}

                        <Link
                          href={`/portfolio/${project.slug}`}
                          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#ffbe00] text-[#24182e] font-black text-xs uppercase tracking-wider rounded-xl hover:bg-white transition-colors shadow-md"
                        >
                          <span>View Case Study</span>
                          <ArrowRight size={14} />
                        </Link>
                      </div>

                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
