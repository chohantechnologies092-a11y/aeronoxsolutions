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
    
  const faqs = getServiceFAQs(service.slug);

  return (
    <article className="min-h-screen bg-background font-sans selection:bg-foreground selection:text-background pb-20">
      
      {/* 1. Split Layout Hero */}
      <section className="pt-32 pb-16 px-6 max-w-7xl mx-auto border-b border-border">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Hero Content */}
          <div className="flex flex-col items-start">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-muted/50 border border-border text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              <IconComponent size={16} style={{ color: service.color }} />
              Service Overview
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight tracking-tight mb-6">
              {service.title}
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
              {service.shortDescription}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link 
                href="/contact" 
                className="inline-flex items-center justify-center px-8 py-4 text-white font-bold rounded-lg hover:opacity-90 transition-opacity shadow-md"
                style={{ backgroundColor: service.color || "#3b82f6" }}
              >
                Request a Proposal
              </Link>
              <Link 
                href="/portfolio" 
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-border text-foreground font-bold rounded-lg hover:bg-muted transition-colors"
              >
                View Portfolio
              </Link>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative w-full aspect-video lg:aspect-[4/3] rounded-2xl overflow-hidden bg-muted border border-border shadow-lg">
            {service.image ? (
              <img 
                src={service.image} 
                alt={service.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-card">
                <IconComponent size={80} style={{ color: service.color }} className="opacity-20" />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 2. Main Content & Sidebar Layout */}
      <section className="pt-16 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Main Content Area */}
          <div className="lg:col-span-8 flex flex-col gap-16 min-w-0 break-words">
            
            {/* Overview (Rich Text) */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Overview</h2>
              <div 
                className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground leading-relaxed prose-headings:text-foreground prose-a:text-primary hover:prose-a:underline break-words"
                dangerouslySetInnerHTML={{ __html: service.content }}
              />
            </div>

            <hr className="border-border" />

            {/* Structured Capabilities */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4">Core Capabilities</h2>
              <p className="text-muted-foreground mb-8">We leverage industry-leading tools and methodologies to deliver exceptional results.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {capabilities.map((cap, idx) => {
                  const brandData = getBrandIcon(cap);
                  const colorHex = service.color.replace('#', '');
                  
                  return (
                    <div 
                      key={idx}
                      className="p-6 rounded-xl border border-border bg-card/50 flex items-start gap-4 hover:border-border/80 hover:bg-card transition-all"
                    >
                      <div 
                        className="w-12 h-12 rounded-lg bg-background border border-border flex items-center justify-center flex-shrink-0"
                      >
                        {brandData ? (
                          <img 
                            src={brandData.type === 'simple' 
                              ? `https://cdn.simpleicons.org/${brandData.id}/${colorHex}`
                              : `https://www.google.com/s2/favicons?domain=${brandData.id}&sz=128`
                            } 
                            alt={`${brandData.id} icon`} 
                            className="w-5 h-5 object-contain" 
                            style={brandData.type === 'domain' ? { filter: 'grayscale(100%) opacity(60%)' } : { opacity: 0.9 }}
                          />
                        ) : (
                          <CheckCircle2 size={20} style={{ color: service.color }} />
                        )}
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground text-lg mb-1">{cap}</h4>
                        <p className="text-sm text-muted-foreground">Expert execution and strategic implementation tailored for {cap}.</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <hr className="border-border" />

            {/* Structured Process */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-8">Our Process</h2>
              <div className="space-y-6">
                {processSteps.map((step, idx) => (
                  <div key={step.id} className="flex gap-6 relative">
                    {/* Vertical Line */}
                    {idx !== processSteps.length - 1 && (
                      <div className="absolute top-12 left-6 bottom-[-24px] w-px bg-border z-0" />
                    )}
                    
                    <div 
                      className="w-12 h-12 rounded-full border-2 border-background flex items-center justify-center flex-shrink-0 text-white font-bold relative z-10"
                      style={{ backgroundColor: service.color }}
                    >
                      {step.id}
                    </div>
                    <div className="pt-2 pb-4">
                      <h3 className="text-xl font-bold text-foreground mb-2">{step.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <hr className="border-border" />

            {/* Clean FAQs */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-8">Frequently Asked Questions</h2>
              <div className="flex flex-col gap-3">
                {faqs.map((faq, idx) => {
                  const isActive = activeFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="border border-border rounded-lg overflow-hidden bg-card/50"
                    >
                      <button
                        onClick={() => setActiveFaq(isActive ? null : idx)}
                        className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/50 transition-colors"
                      >
                        <span className="text-lg font-semibold text-foreground">
                          {faq.question}
                        </span>
                        {isActive ? (
                          <ChevronUp size={20} className="text-muted-foreground flex-shrink-0" />
                        ) : (
                          <ChevronDown size={20} className="text-muted-foreground flex-shrink-0" />
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
                            <div className="p-5 pt-0 text-muted-foreground border-t border-border/50 leading-relaxed">
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
            <div className="sticky top-24 flex flex-col gap-6">
              
              {/* Contact Card */}
              <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                  <span className="text-sm font-semibold text-foreground uppercase tracking-wider">Available for new projects</span>
                </div>
                
                <h3 className="text-2xl font-bold text-foreground mb-4">Need Expert Consultation?</h3>
                <p className="text-muted-foreground mb-8">
                  Discuss your requirements with our technical team and get a tailored execution plan.
                </p>
                
                <div className="flex flex-col gap-4">
                  <Link 
                    href="/contact" 
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 text-white font-bold rounded-lg hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: service.color || "#3b82f6" }}
                  >
                    Schedule a Call
                    <ArrowRight size={18} />
                  </Link>
                  <a 
                    href="mailto:contact@aeronoxsolutions.com" 
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-transparent border-2 border-border text-foreground font-semibold rounded-lg hover:bg-muted transition-colors"
                  >
                    <Mail size={18} className="text-muted-foreground" />
                    Send an Email
                  </a>
                </div>
              </div>

              {/* Quick Info Card */}
              <div className="bg-muted/30 border border-border rounded-xl p-6">
                <h4 className="font-bold text-foreground mb-4">Why choose us?</h4>
                <ul className="space-y-3">
                  {["Dedicated project manager", "Transparent communication", "Agile methodology", "Long-term support"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <CheckCircle2 size={16} style={{ color: service.color }} />
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
