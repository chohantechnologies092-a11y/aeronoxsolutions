/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
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
  { id: "01", title: "Discovery & Audit", desc: "We dive deep into your business goals, target audience, and current infrastructure." },
  { id: "02", title: "Strategy & Planning", desc: "Crafting a customized roadmap with clear milestones and deliverables." },
  { id: "03", title: "Execution & Dev", desc: "Our experts build, design, and optimize your solution with precision." },
  { id: "04", title: "Delivery & Scale", desc: "Smooth launch followed by iterative improvements for maximum growth." },
];

export function ServiceDetailClient({ service }: { service: Service }) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  
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
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  return (
    <article className="min-h-screen bg-background font-sans relative overflow-hidden">
      {/* Background Mesh/Glow */}
      <div 
        className="fixed top-0 left-1/4 w-[800px] h-[800px] rounded-full blur-[120px] opacity-10 pointer-events-none -z-10"
        style={{ backgroundColor: service.color }}
      />
      <div 
        className="fixed bottom-0 right-1/4 w-[600px] h-[600px] rounded-full blur-[150px] opacity-10 pointer-events-none -z-10"
        style={{ backgroundColor: service.color }}
      />
      <div className="absolute inset-0 bg-mesh opacity-30 pointer-events-none -z-10" />

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center pt-24 pb-12 overflow-hidden border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.5 }}
          >
            <Link 
              href="/services" 
              className="inline-flex items-center gap-2 text-muted-foreground uppercase tracking-[0.15em] text-xs font-bold group mb-6 hover:text-foreground transition-colors"
            >
              <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
              Back to Services
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
              {/* Hero Content */}
            <motion.div 
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="max-w-3xl"
            >
              <motion.div variants={fadeIn} className="flex items-center gap-4 mb-6">
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg relative group"
                  style={{ backgroundColor: `${service.color}15`, border: `1px solid ${service.color}30` }}
                >
                  <IconComponent size={28} style={{ color: service.color }} strokeWidth={2} className="relative z-10" />
                  <div 
                    className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"
                    style={{ backgroundColor: service.color }}
                  />
                </div>
                <span className="text-sm font-black uppercase tracking-[0.2em] text-muted-foreground">
                  Our Expertise
                </span>
              </motion.div>

              <motion.h1 variants={fadeIn} className="text-4xl md:text-6xl font-black text-foreground tracking-tight leading-[1.05] mb-6">
                {service.title}
              </motion.h1>
              
              <motion.p variants={fadeIn} className="text-lg md:text-xl text-muted-foreground leading-relaxed font-medium mb-8 max-w-xl">
                {service.shortDescription}
              </motion.p>
              
              <motion.div variants={fadeIn}>
                <Link 
                  href="/contact" 
                  className="inline-flex items-center justify-center px-8 py-4 text-background font-black uppercase tracking-widest rounded-full hover:scale-105 transition-all duration-300 shadow-xl relative overflow-hidden group"
                  style={{ backgroundColor: service.color }}
                >
                  <span className="relative z-10">Get a Proposal</span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                </Link>
              </motion.div>
            </motion.div>

            {/* Hero Visual */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative lg:h-[400px] w-full hidden lg:block"
              style={{ y: y1 }}
            >
              {service.image ? (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] md:w-[400px] md:h-[400px] rounded-[3rem] overflow-hidden shadow-2xl group border border-border/50">
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-transparent z-10 pointer-events-none" />
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  {/* Decorative glowing orb behind the image */}
                  <div 
                    className="absolute -top-12 -right-12 w-32 h-32 blur-3xl opacity-60 z-20"
                    style={{ backgroundColor: service.color }}
                  />
                  <div 
                    className="absolute -bottom-12 -left-12 w-32 h-32 blur-3xl opacity-60 z-20"
                    style={{ backgroundColor: service.color }}
                  />
                  
                  {/* Small floating icon badge */}
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: [0, -10, 0], opacity: 1 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-8 right-8 w-16 h-16 rounded-2xl flex items-center justify-center shadow-2xl z-30 backdrop-blur-md border border-white/20"
                    style={{ backgroundColor: `${service.color}dd` }}
                  >
                    <IconComponent size={28} color="#fff" strokeWidth={2.5} />
                  </motion.div>
                  
                  {/* Extra floating element for premium feel */}
                  <motion.div 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: [0, 10, 0], opacity: 1 }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute top-8 left-8 p-3 rounded-xl shadow-xl z-30 backdrop-blur-md border border-white/10"
                    style={{ backgroundColor: `rgba(0,0,0,0.4)` }}
                  >
                    <div className="flex gap-1 items-end h-4">
                      <div className="w-1.5 h-2 bg-white/60 rounded-full" />
                      <div className="w-1.5 h-3 bg-white/80 rounded-full" />
                      <div className="w-1.5 h-4 bg-white rounded-full" style={{ backgroundColor: service.color }} />
                    </div>
                  </motion.div>
                </div>
              ) : (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px]">
                  <div 
                    className="absolute inset-0 rounded-full border border-dashed animate-[spin_60s_linear_infinite]"
                    style={{ borderColor: `${service.color}40` }}
                  />
                  <div 
                    className="absolute inset-4 rounded-full border border-dashed animate-[spin_40s_linear_infinite_reverse]"
                    style={{ borderColor: `${service.color}40` }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div 
                      className="w-48 h-48 rounded-full blur-3xl opacity-20 animate-pulse"
                      style={{ backgroundColor: service.color }}
                    />
                    <IconComponent size={120} style={{ color: service.color }} strokeWidth={1} className="opacity-80 drop-shadow-2xl" />
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Managed Content Section */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            
            {/* Main Content (Left) */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-8 min-h-[400px] min-w-0 w-full"
            >
              <div className="bg-card/40 backdrop-blur-md p-8 md:p-12 rounded-[2rem] border border-border/60 shadow-sm relative overflow-hidden group">
                {/* Subtle top highlight */}
                <div 
                  className="absolute top-0 left-0 right-0 h-1 opacity-50"
                  style={{ background: `linear-gradient(90deg, transparent, ${service.color}, transparent)` }}
                />
                
                <div 
                  className="prose prose-lg md:prose-xl dark:prose-invert prose-headings:font-black prose-headings:tracking-tight max-w-none prose-a:font-bold prose-a:no-underline hover:prose-a:underline prose-p:leading-relaxed prose-p:text-muted-foreground break-words overflow-hidden
                  prose-ul:space-y-3 prose-li:marker:text-current"
                  style={{ 
                    '--tw-prose-links': service.color,
                    '--tw-prose-bullets': service.color,
                  } as React.CSSProperties}
                  dangerouslySetInnerHTML={{ __html: service.content }}
                />
              </div>

              {/* Technologies / Capabilities Section */}
              <div className="mt-12">
                <h3 className="text-xl font-black text-foreground mb-6 uppercase tracking-widest">
                  Our Capabilities
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {capabilities.map((cap, idx) => {
                    const brandData = getBrandIcon(cap);
                    const colorHex = service.color.replace('#', '');
                    return (
                      <motion.div 
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: idx * 0.1 }}
                        className="flex items-center gap-4 bg-card/60 backdrop-blur-sm p-5 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow group cursor-default"
                      >
                        <div 
                          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
                          style={{ backgroundColor: `${service.color}15`, color: service.color, border: `1px solid ${service.color}30` }}
                        >
                          {brandData ? (
                            <img 
                              src={brandData.type === 'simple' 
                                ? `https://cdn.simpleicons.org/${brandData.id}/${colorHex}`
                                : `https://www.google.com/s2/favicons?domain=${brandData.id}&sz=128`
                              } 
                              alt={`${brandData.id} icon`} 
                              className="w-5 h-5 object-contain" 
                              style={brandData.type === 'domain' ? { filter: 'grayscale(100%) opacity(80%)' } : {}}
                            />
                          ) : (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          )}
                        </div>
                        <span className="font-bold text-sm tracking-wide text-foreground uppercase">{cap}</span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Our Process Section */}
              <div className="mt-20">
                <h3 className="text-xl font-black text-foreground mb-8 uppercase tracking-widest flex items-center gap-4">
                  Our Process
                  <div className="h-px flex-1 bg-border/50" />
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {processSteps.map((step, idx) => (
                    <motion.div
                      key={step.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      className="relative p-6 rounded-[2rem] bg-card/40 backdrop-blur-sm border border-border group overflow-hidden"
                    >
                      <div 
                        className="absolute -top-10 -right-10 w-32 h-32 blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                        style={{ backgroundColor: service.color }}
                      />
                      <div 
                        className="text-4xl font-black mb-4 opacity-20 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ color: service.color }}
                      >
                        {step.id}
                      </div>
                      <h4 className="text-lg font-bold text-foreground mb-2">{step.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* FAQ Section */}
              <div className="mt-20">
                <h3 className="text-xl font-black text-foreground mb-8 uppercase tracking-widest flex items-center gap-4">
                  Frequently Asked Questions
                  <div className="h-px flex-1 bg-border/50" />
                </h3>
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
                        className={`border rounded-2xl overflow-hidden transition-colors ${isActive ? 'bg-card/60 border-border shadow-sm' : 'bg-card/20 border-border/50 hover:bg-card/40'}`}
                      >
                        <button
                          onClick={() => setActiveFaq(isActive ? null : idx)}
                          className="w-full flex items-center justify-between p-5 text-left"
                        >
                          <span className={`font-bold transition-colors ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {faq.question}
                          </span>
                          <div 
                            className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 ${isActive ? 'rotate-180' : ''}`}
                            style={{ backgroundColor: isActive ? `${service.color}20` : 'transparent', color: isActive ? service.color : 'inherit' }}
                          >
                            <LucideIcons.ChevronDown size={18} />
                          </div>
                        </button>
                        <AnimatePresence>
                          {isActive && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                              <div className="p-5 pt-0 text-muted-foreground text-sm leading-relaxed">
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
            </motion.div>

            {/* Sidebar (Right) */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-4"
            >
              <div className="sticky top-32 space-y-8">
                {/* Modern CTA Card */}
                <div className="relative p-8 rounded-[2rem] overflow-hidden group bg-card shadow-xl border border-border">
                  {/* Glowing background effect */}
                  <div 
                    className="absolute -top-24 -right-24 w-64 h-64 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none"
                    style={{ backgroundColor: service.color }}
                  />
                  
                  <div className="relative z-10">
                    <h3 className="text-2xl font-black text-foreground mb-4 leading-tight">
                      Ready to transform your <span style={{ color: service.color }}>business?</span>
                    </h3>
                    <p className="text-muted-foreground mb-8 leading-relaxed font-medium">
                      Connect with our experts to discuss your goals and get a custom roadmap tailored specifically for your needs.
                    </p>
                    <Link 
                      href="/contact" 
                      className="w-full flex items-center justify-between p-4 bg-foreground text-background font-black uppercase tracking-widest rounded-xl hover:opacity-90 transition-all group/btn"
                    >
                      <span>Let&apos;s Talk</span>
                      <div className="w-8 h-8 rounded-full bg-background/20 flex items-center justify-center group-hover/btn:translate-x-1 transition-transform">
                        <ArrowRight size={16} />
                      </div>
                    </Link>
                  </div>
                </div>

                {/* Features List */}
                <div className="bg-muted/30 border border-border/50 p-8 rounded-[2rem]">
                  <h4 className="font-bold uppercase tracking-[0.2em] text-xs text-muted-foreground mb-6">
                    Why Partner With Us?
                  </h4>
                  <ul className="space-y-5">
                    {[
                      "Data-Driven Strategies",
                      "Dedicated Account Managers",
                      "Transparent Reporting",
                      "Proven Track Record"
                    ].map((feature, i) => (
                      <li key={i} className="flex items-start gap-4 text-foreground font-medium">
                        <div 
                          className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ backgroundColor: `${service.color}20`, color: service.color }}
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Trust / Expert Badge */}
                <div className="bg-card p-6 rounded-[2rem] border border-border/50 shadow-sm flex items-center gap-4 group cursor-pointer hover:shadow-md transition-all">
                  <div className="relative">
                    <img 
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100" 
                      alt="Expert"
                      className="w-14 h-14 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300 border-2 border-transparent group-hover:border-current"
                      style={{ color: service.color }}
                    />
                    <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-green-500 border-2 border-card" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-foreground">Speak to an Expert</h5>
                    <p className="text-xs text-muted-foreground mt-0.5">Available for consultation</p>
                  </div>
                </div>

              </div>
            </motion.div>
            
          </div>
        </div>
      </section>
    </article>
  );
}
