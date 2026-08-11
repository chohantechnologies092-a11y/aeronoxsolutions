/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ChevronDown, ChevronUp, PhoneCall, Mail } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Service = {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  content: string;
  icon: string;
  color: string;
  image?: string | null;
  cardImage?: string | null;
  bannerImage?: string | null;
  imageAltText?: string | null;
  [key: string]: any;
};

// Helper to generate relevant capabilities based on service type
const getServiceCapabilities = (slug: string) => {
  if (slug.includes('web') || slug.includes('saas') || slug.includes('app') || slug.includes('api')) {
    return ["React & Next.js", "Node.js & Express", "Cloud-Native Architecture", "REST & GraphQL APIs", "Custom ERP & CRM", "Real-Time Data Sync"];
  }
  if (slug.includes('seo') || slug.includes('ad') || slug.includes('conversion') || slug.includes('speed')) {
    return ["Google Analytics 4", "Meta Pixel & Conversions", "A/B Testing Frameworks", "Programmatic Bidding", "Technical Audit Tools", "Real-Time Dashboards"];
  }
  if (slug.includes('design') || slug.includes('video') || slug.includes('content')) {
    return ["Adobe Creative Cloud", "Figma Prototyping", "DaVinci Resolve", "AI-Powered Generation", "Motion Graphics", "Brand Identity Systems"];
  }
  if (slug.includes('amazon')) {
    return ["FBA Optimization", "A+ Content Design", "PPC Campaign Automation", "Inventory Forecasting", "Competitor Analysis", "Listing SEO"];
  }
  
  // Default fallback
  return ["Advanced Analytics", "Custom Strategy", "Dedicated Support", "Performance Tracking", "Scalable Solutions", "Rapid Execution"];
};

const getBrandIcon = (cap: string) => {
  const capLower = cap.toLowerCase();
  
  if (capLower.includes('react') || capLower.includes('next.js')) return { type: 'simple', id: "react" };
  if (capLower.includes('node') || capLower.includes('express')) return { type: 'simple', id: "nodedotjs" };
  if (capLower.includes('cloud')) return { type: 'simple', id: "googlecloud" };
  if (capLower.includes('api') || capLower.includes('graphql')) return { type: 'simple', id: "graphql" };
  if (capLower.includes('sync') || capLower.includes('real-time data')) return { type: 'simple', id: "firebase" };
  
  if (capLower.includes('google analytics') || capLower.includes('tracking')) return { type: 'simple', id: "googleanalytics" };
  if (capLower.includes('meta') || capLower.includes('pixel')) return { type: 'simple', id: "meta" };
  if (capLower.includes('testing') || capLower.includes('a/b')) return { type: 'simple', id: "testinglibrary" };
  if (capLower.includes('bidding') || capLower.includes('ppc')) return { type: 'simple', id: "googleads" };
  if (capLower.includes('audit')) return { type: 'simple', id: "lighthouse" };
  if (capLower.includes('dashboards') || capLower.includes('reporting')) return { type: 'simple', id: "grafana" };
  
  if (capLower.includes('figma') || capLower.includes('prototyping')) return { type: 'simple', id: "figma" };
  if (capLower.includes('competitor') || capLower.includes('seo')) return { type: 'simple', id: "semrush" };
  if (capLower.includes('inventory')) return { type: 'simple', id: "googlesheets" };
  
  // Domains for missing simpleicons
  if (capLower.includes('erp') || capLower.includes('crm')) return { type: 'domain', id: "salesforce.com" };
  if (capLower.includes('adobe') || capLower.includes('creative cloud')) return { type: 'domain', id: "adobe.com" };
  if (capLower.includes('davinci') || capLower.includes('video') || capLower.includes('motion') || capLower.includes('effects')) return { type: 'domain', id: "blackmagicdesign.com" };
  if (capLower.includes('ai') || capLower.includes('generation')) return { type: 'domain', id: "openai.com" };
  if (capLower.includes('identity') || capLower.includes('brand')) return { type: 'domain', id: "adobe.com" };
  if (capLower.includes('amazon') || capLower.includes('fba')) return { type: 'domain', id: "amazon.com" };
  if (capLower.includes('content design')) return { type: 'domain', id: "canva.com" };
  
  return null;
};

// Dummy FAQ Data
const getServiceFAQs = (slug: string) => {
  return [
    {
      question: "How long does a typical project take?",
      answer: "Project timelines vary based on scope and complexity. However, a standard engagement usually ranges from 4 to 12 weeks from discovery to final delivery."
    },
    {
      question: "Do you offer ongoing support and maintenance?",
      answer: "Absolutely. We provide flexible retainer and maintenance packages to ensure your solution remains optimized, secure, and up-to-date long after launch."
    },
    {
      question: "What is your pricing structure?",
      answer: "Our pricing is highly tailored to the specific needs and deliverables of your project. After our initial discovery call, we provide a transparent, customized proposal."
    },
    {
      question: "Can you integrate with our existing tools?",
      answer: "Yes! We specialize in creating seamless integrations with your existing CRM, ERP, and marketing stacks to ensure smooth data flow."
    }
  ];
};

// Dummy Process Data
const processSteps = [
  { id: "01", title: "Discovery & Audit", desc: "We dive deep into your business goals, target audience, and current infrastructure to build a solid foundation." },
  { id: "02", title: "Strategy & Planning", desc: "Crafting a customized roadmap with clear milestones, deliverables, and exact technical specifications." },
  { id: "03", title: "Execution & Development", desc: "Our experts build, design, and optimize your solution with precision, adhering to modern best practices." },
  { id: "04", title: "Delivery & Scale", desc: "Smooth launch followed by iterative improvements and data-driven adjustments for maximum growth." },
];

export function ServiceDetailClient({ service }: { service: Service }) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  
  // Resolve Icon
  const IconComponent = (LucideIcons as any)[
    service.icon.charAt(0).toUpperCase() + service.icon.slice(1)
  ] || LucideIcons.Search;

  const capabilities: string[] = service.capabilities && service.capabilities.trim() !== "" 
    ? service.capabilities.split(',').map((c: string) => c.trim()).filter(Boolean)
    : getServiceCapabilities(service.slug);
    
  const faqs = service.faqs && Array.isArray(service.faqs) && service.faqs.length > 0 
    ? service.faqs 
    : getServiceFAQs(service.slug);

  return (
    <article className="min-h-screen bg-[#090512] text-white font-sans selection:bg-[#ffbe00] selection:text-[#120b18] pb-24 relative overflow-hidden">
      {/* Ambient Radial Background Glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#ffbe00]/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-purple-950/30 rounded-full blur-[140px] pointer-events-none -z-10" />
      
      {/* 1. Split Layout Hero */}
      <section className="pt-36 pb-16 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Hero Content */}
          <div className="flex flex-col items-start">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-[#ffbe00]/10 border border-[#ffbe00]/20 text-[#ffbe00] text-xs font-bold uppercase tracking-wider shadow-sm">
              <IconComponent size={16} style={{ color: service.color || "#ffbe00" }} />
              Service Overview
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight mb-6">
              {service.title}
            </h1>
            
            <p className="text-lg md:text-xl text-[#dcd7e3]/80 font-medium leading-relaxed mb-8">
              {service.shortDescription}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link 
                href="/contact" 
                className="inline-flex items-center justify-center px-8 py-4 text-[#120b18] font-black uppercase tracking-wider text-xs rounded-2xl transition-all duration-300 hover:scale-105 shadow-[0_0_25px_rgba(255,190,0,0.3)]"
                style={{ backgroundColor: service.color || "#ffbe00" }}
              >
                Request a Proposal <ArrowRight size={16} className="ml-2" />
              </Link>
              <Link 
                href="/portfolio" 
                className="inline-flex items-center justify-center px-8 py-4 bg-white/5 border border-white/15 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider rounded-2xl transition-all"
              >
                View Portfolio
              </Link>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative w-full min-h-[320px] max-h-[500px] rounded-[2.5rem] overflow-hidden bg-[#1a1122]/90 border border-white/15 shadow-2xl flex items-center justify-center p-4">
            {(service.bannerImage || service.image) ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={(service.bannerImage || service.image) ?? undefined} 
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-20 pointer-events-none"
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={(service.bannerImage || service.image) ?? undefined} 
                  alt={service.imageAltText || service.title}
                  className="relative z-10 w-auto h-auto max-w-full max-h-[460px] object-contain rounded-2xl shadow-2xl"
                />
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-[#1a1122]">
                <IconComponent size={80} style={{ color: service.color || "#ffbe00" }} className="opacity-30" />
              </div>
            )}
          </div>

        </div>
      </section>

      {/* 2. Main Content & Sidebar Layout */}
      <section className="pt-12 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Main Content Area */}
          <div className="lg:col-span-8 flex flex-col gap-16 min-w-0 break-words">
            
            {/* Overview (Rich Text) */}
            <div className="p-8 sm:p-10 rounded-[2.5rem] bg-[#1a1122]/90 border border-white/15 shadow-2xl">
              <h2 className="text-3xl font-extrabold text-white mb-6 tracking-tight">Overview</h2>
              <div 
                className="prose prose-lg dark:prose-invert max-w-none text-[#e2e8f0] leading-relaxed prose-headings:text-[#ffbe00] prose-a:text-[#ffbe00] hover:prose-a:underline break-words rich-content"
                dangerouslySetInnerHTML={{ __html: service.content }}
              />
            </div>

            {/* Structured Capabilities */}
            <div>
              <h2 className="text-3xl font-extrabold text-white mb-3 tracking-tight">Core Capabilities</h2>
              <p className="text-[#dcd7e3]/70 font-medium mb-8">We leverage industry-leading tools and methodologies to deliver exceptional results.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {capabilities.map((cap, idx) => {
                  const brandData = getBrandIcon(cap);
                  const colorHex = (service.color || "#ffbe00").replace('#', '');
                  
                  return (
                    <div 
                      key={idx}
                      className="p-6 rounded-2xl bg-[#1a1122]/90 border border-white/15 shadow-xl hover:border-[#ffbe00]/40 flex items-start gap-4 transition-all group"
                    >
                      <div 
                        className="w-12 h-12 rounded-xl bg-black/40 border border-white/10 shadow-inner flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                      >
                        {brandData ? (
                          <img 
                            src={brandData.type === 'simple' 
                              ? `https://cdn.simpleicons.org/${brandData.id}/${colorHex}`
                              : `https://www.google.com/s2/favicons?domain=${brandData.id}&sz=128`
                            } 
                            alt={`${brandData.id} icon`} 
                            className="w-5 h-5 object-contain" 
                            style={brandData.type === 'domain' ? { filter: 'grayscale(100%) opacity(70%)' } : { opacity: 0.9 }}
                          />
                        ) : (
                          <CheckCircle2 size={20} style={{ color: service.color || "#ffbe00" }} />
                        )}
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-lg mb-1">{cap}</h4>
                        <p className="text-xs sm:text-sm text-[#dcd7e3]/70 font-medium">Expert execution and strategic implementation tailored for {cap}.</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Structured Process */}
            <div>
              <h2 className="text-3xl font-extrabold text-white mb-8 tracking-tight">Our Process</h2>
              <div className="space-y-6">
                {processSteps.map((step, idx) => (
                  <div key={step.id} className="p-6 rounded-2xl bg-[#1a1122]/90 border border-white/15 flex gap-6 relative shadow-lg">
                    <div 
                      className="w-12 h-12 rounded-2xl border border-white/20 flex items-center justify-center flex-shrink-0 text-[#120b18] font-black text-base shadow-lg"
                      style={{ backgroundColor: service.color || "#ffbe00" }}
                    >
                      {step.id}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1.5">{step.title}</h3>
                      <p className="text-xs sm:text-sm text-[#dcd7e3]/80 font-medium leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Clean FAQs */}
            <div>
              <h2 className="text-3xl font-extrabold text-white mb-8 tracking-tight">Frequently Asked Questions</h2>
              <div className="flex flex-col gap-4">
                {faqs.map((faq, idx) => {
                  const isActive = activeFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="bg-[#1a1122]/90 border border-white/15 rounded-2xl overflow-hidden shadow-lg transition-all"
                    >
                      <button
                        onClick={() => setActiveFaq(isActive ? null : idx)}
                        className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors cursor-pointer"
                      >
                        <span className="text-base sm:text-lg font-bold text-white pr-4">
                          {faq.question}
                        </span>
                        {isActive ? (
                          <ChevronUp size={20} className="text-[#ffbe00] flex-shrink-0" />
                        ) : (
                          <ChevronDown size={20} className="text-white/60 flex-shrink-0" />
                        )}
                      </button>
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="p-6 pt-0 text-[#dcd7e3]/80 font-medium text-sm border-t border-white/5 leading-relaxed">
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Sidebar Area */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 flex flex-col gap-6">
              
              {/* Contact Card */}
              <div className="bg-[#1a1122]/90 border border-white/15 rounded-[2rem] p-8 shadow-2xl backdrop-blur-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Available for new projects</span>
                </div>
                
                <h3 className="text-2xl font-extrabold text-white mb-3 tracking-tight">Need Expert Consultation?</h3>
                <p className="text-xs sm:text-sm text-[#dcd7e3]/70 font-medium mb-8 leading-relaxed">
                  Discuss your requirements with our engineering leads and receive a custom architecture proposal.
                </p>
                
                <div className="flex flex-col gap-4">
                  <Link 
                    href="/contact" 
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 text-[#120b18] font-black text-xs uppercase tracking-wider rounded-2xl hover:scale-[1.02] transition-all shadow-lg"
                    style={{ backgroundColor: service.color || "#ffbe00" }}
                  >
                    Schedule a Call
                    <ArrowRight size={16} />
                  </Link>
                  <a 
                    href={`mailto:${service.email || "info@aeronoxsolutions.com"}`}
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider rounded-2xl border border-white/15 transition-all"
                  >
                    <Mail size={16} className="text-[#ffbe00]" />
                    Send an Email
                  </a>
                </div>
              </div>

              {/* Quick Info Card */}
              <div className="bg-[#1a1122]/90 border border-white/15 rounded-[2rem] p-6 shadow-xl">
                <h4 className="font-extrabold text-white mb-4">Why choose us?</h4>
                <ul className="space-y-3.5">
                  {["Dedicated engineering leads", "Transparent 2-4 hr SLA", "Agile MVP sprints", "Long-term support"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-xs font-semibold text-[#dcd7e3]">
                      <CheckCircle2 size={16} style={{ color: service.color || "#ffbe00" }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>

        </div>
      </section>

    </article>
  );
}
