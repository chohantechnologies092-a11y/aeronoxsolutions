/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

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
  { id: "03", title: "Execution & Dev", desc: "Our experts build, design, and optimize your solution with precision, adhering to modern best practices." },
  { id: "04", title: "Delivery & Scale", desc: "Smooth launch followed by iterative improvements and data-driven adjustments for maximum growth." },
];

export function ServiceDetailClient({ service }: { service: Service }) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const scaleHeroImage = useTransform(scrollYProgress, [0, 0.5], [1, 1.05]);
  const opacityHeroText = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  
  // Resolve Icon
  const IconComponent = (LucideIcons as any)[
    service.icon.charAt(0).toUpperCase() + service.icon.slice(1)
  ] || LucideIcons.Search;

  const capabilities: string[] = service.capabilities && service.capabilities.trim() !== "" 
    ? service.capabilities.split(',').map((c: string) => c.trim()).filter(Boolean)
    : getServiceCapabilities(service.slug);
    
  const faqs = getServiceFAQs(service.slug);

  // Animation variants
  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <article className="min-h-screen bg-background font-sans relative overflow-hidden selection:bg-foreground selection:text-background">
      
      {/* Immersive Ambient Glows */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] max-w-[1200px] h-[600px] rounded-[100%] blur-[160px] opacity-[0.15] pointer-events-none -z-10"
        style={{ backgroundColor: service.color }}
      />
      
      {/* 1. Ultra-Modern Centered Hero Section */}
      <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 px-6 flex flex-col items-center justify-center text-center max-w-5xl mx-auto z-10">
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          style={{ opacity: opacityHeroText }}
          className="flex flex-col items-center w-full"
        >
          {/* Top Badge */}
          <motion.div variants={fadeIn} className="flex items-center gap-3 mb-8 bg-card/50 backdrop-blur-md rounded-full px-5 py-2 shadow-lg">
            <IconComponent size={16} style={{ color: service.color }} strokeWidth={2.5} />
            <span className="text-xs font-black uppercase tracking-[0.25em] text-foreground">
              Premium Service
            </span>
          </motion.div>

          <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl lg:text-8xl font-black text-foreground tracking-tighter leading-[0.95] mb-8">
            {service.title}
          </motion.h1>
          
          <motion.p variants={fadeIn} className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-medium mb-12 max-w-3xl">
            {service.shortDescription}
          </motion.p>
          
          <motion.div variants={fadeIn} className="flex flex-wrap items-center justify-center gap-4">
            <Link 
              href="/contact" 
              className="inline-flex items-center justify-center px-10 py-5 text-white font-black uppercase tracking-widest rounded-full hover:scale-105 transition-all duration-300 shadow-2xl relative overflow-hidden group"
              style={{ backgroundColor: service.color || "#3b82f6" }}
            >
              <span className="relative z-10">Start Project</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Hero Visual - Large Mockup Frame */}
        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ y: y1, scale: scaleHeroImage }}
          className="w-full max-w-6xl mx-auto mt-20 relative z-20"
        >
          <div className="relative aspect-video rounded-t-3xl md:rounded-t-[3rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-card/30 backdrop-blur-2xl">
            {/* Mac-style Window Header */}
            <div className="absolute top-0 left-0 right-0 h-12 bg-black/40 backdrop-blur-md flex items-center px-6 z-30">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
            </div>
            
            {/* Image Container */}
            <div className="absolute top-12 left-0 right-0 bottom-0 bg-background/50">
              {service.image ? (
                <>
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-20 pointer-events-none" />
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover opacity-90"
                  />
                </>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center">
                  <div 
                    className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-current/10 to-transparent"
                    style={{ color: service.color }}
                  />
                  <IconComponent size={120} style={{ color: service.color }} strokeWidth={1} className="opacity-40 animate-pulse" />
                </div>
              )}
            </div>
          </div>
          {/* Subtle reflection below */}
          <div className="absolute -bottom-8 left-0 right-0 h-16 bg-gradient-to-b from-black/20 to-transparent blur-md -z-10" />
        </motion.div>
      </section>
      
      {/* 2. Central Focused Content Area */}
      <section className="py-24 relative z-30 bg-background">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-foreground tracking-tight mb-6">
                Overview
              </h2>
              <div className="h-1 w-20 mx-auto rounded-full" style={{ backgroundColor: service.color }} />
            </div>

            <div 
              className="prose prose-lg md:prose-xl dark:prose-invert prose-headings:font-black prose-headings:tracking-tight max-w-none prose-a:font-bold prose-a:no-underline hover:prose-a:underline prose-p:leading-relaxed prose-p:text-muted-foreground prose-strong:text-foreground break-words
              prose-ul:space-y-4 prose-li:marker:text-current bg-card/30 p-8 md:p-16 rounded-[3rem] shadow-2xl backdrop-blur-md"
              style={{ 
                '--tw-prose-links': service.color,
                '--tw-prose-bullets': service.color,
              } as React.CSSProperties}
              dangerouslySetInnerHTML={{ __html: service.content }}
            />
          </motion.div>
        </div>
      </section>

      {/* 3. Bento Grid Capabilities */}
      <section className="py-32 relative z-20 overflow-hidden">
        <div className="absolute inset-0 bg-muted/20" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-foreground tracking-tight mb-6">
              Our Capabilities
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The technologies and methodologies we leverage to deliver exceptional results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[200px]">
            {capabilities.map((cap, idx) => {
              const brandData = getBrandIcon(cap);
              const colorHex = service.color.replace('#', '');
              
              // Asymmetric bento grid sizing logic
              const isLarge = idx === 0 || idx === 3 || idx === capabilities.length - 1;
              const spanClass = isLarge ? 'md:col-span-2' : 'md:col-span-1';

              return (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className={`${spanClass} relative rounded-[2rem] bg-card/60 backdrop-blur-xl p-8 flex flex-col justify-between group transition-colors overflow-hidden`}
                >
                  {/* Hover Gradient Glow */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                    style={{ background: `radial-gradient(circle at 100% 100%, ${service.color}, transparent 70%)` }}
                  />

                  <div 
                    className="w-14 h-14 rounded-2xl flex items-center justify-center relative z-10 bg-background shadow-sm group-hover:scale-110 transition-transform duration-300"
                  >
                    {brandData ? (
                      <img 
                        src={brandData.type === 'simple' 
                          ? `https://cdn.simpleicons.org/${brandData.id}/${colorHex}`
                          : `https://www.google.com/s2/favicons?domain=${brandData.id}&sz=128`
                        } 
                        alt={`${brandData.id} icon`} 
                        className="w-6 h-6 object-contain" 
                        style={brandData.type === 'domain' ? { filter: 'grayscale(100%) opacity(80%)' } : {}}
                      />
                    ) : (
                      <IconComponent size={24} style={{ color: service.color }} />
                    )}
                  </div>

                  <div className="relative z-10 mt-auto">
                    <h3 className="font-black text-xl text-foreground tracking-tight leading-tight uppercase">
                      {cap}
                    </h3>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Horizontal/Grid Process Section */}
      <section className="py-32 relative z-20 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-foreground tracking-tight mb-6">
              Our Proven Process
            </h2>
            <div className="h-1 w-20 rounded-full" style={{ backgroundColor: service.color }} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, idx) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="relative group"
              >
                {/* Connecting Line (Desktop) */}
                {idx !== processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-full w-full h-px bg-border -translate-x-4 z-0" />
                )}
                
                <div className="relative z-10">
                  <div 
                    className="text-6xl md:text-8xl font-black mb-6 opacity-10 group-hover:opacity-30 transition-opacity duration-500 leading-none -ml-1"
                    style={{ color: service.color }}
                  >
                    {step.id}
                  </div>
                  <h4 className="text-2xl font-bold text-foreground mb-4 leading-tight">{step.title}</h4>
                  <p className="text-base text-muted-foreground leading-relaxed font-medium">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FAQs Section */}
      <section className="py-32 relative z-20 bg-muted/10">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black text-foreground tracking-tight mb-6">
              Common Questions
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            {faqs.map((faq, idx) => {
              const isActive = activeFaq === idx;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className={`rounded-3xl overflow-hidden transition-all duration-300 ${isActive ? 'bg-card shadow-xl' : 'bg-transparent hover:bg-card/30'}`}
                >
                  <button
                    onClick={() => setActiveFaq(isActive ? null : idx)}
                    className="w-full flex items-center justify-between p-6 md:p-8 text-left group"
                  >
                    <span className={`text-lg md:text-xl font-bold transition-colors ${isActive ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'}`}>
                      {faq.question}
                    </span>
                    <div 
                      className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-500 ${isActive ? 'rotate-180' : ''}`}
                      style={{ backgroundColor: isActive ? `${service.color}20` : 'rgba(255,255,255,0.05)', color: isActive ? service.color : 'inherit' }}
                    >
                      <LucideIcons.Plus size={20} className={isActive ? 'hidden' : 'block'} />
                      <LucideIcons.Minus size={20} className={isActive ? 'block' : 'hidden'} />
                    </div>
                  </button>
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div className="p-6 md:p-8 pt-0 text-muted-foreground text-lg leading-relaxed max-w-3xl">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Massive Bottom CTA */}
      <section className="py-40 relative z-20 overflow-hidden">
        <div className="absolute inset-0 bg-background" />
        
        {/* Intense background glow for CTA */}
        <div 
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[100vw] h-[500px] rounded-[100%] blur-[200px] opacity-[0.25] pointer-events-none"
          style={{ backgroundColor: service.color }}
        />

        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-5xl md:text-8xl font-black text-foreground tracking-tighter mb-8 leading-[0.95]">
              Ready to <br className="hidden md:block" />
              scale <span style={{ color: service.color }}>faster?</span>
            </h2>
            <p className="text-xl md:text-3xl text-muted-foreground font-medium mb-12 max-w-2xl mx-auto leading-tight">
              Connect with our experts and get a custom roadmap for your business.
            </p>
            <Link 
              href="/contact" 
              className="inline-flex items-center justify-center px-12 py-6 text-xl text-background font-black uppercase tracking-[0.2em] rounded-full hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(0,0,0,0.3)] relative overflow-hidden group"
              style={{ backgroundColor: service.color }}
            >
              <span className="relative z-10 flex items-center gap-4">
                Let&apos;s Talk 
                <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            </Link>
          </motion.div>
        </div>
      </section>

    </article>
  );
}
