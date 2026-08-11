"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, MessageCircle, Phone, Loader2, ArrowRight, Sparkles, ChevronDown, ShieldCheck, Clock, Star, Zap } from "lucide-react";
import { siteConfig } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { Toast } from "@/components/ui/Toast";
import { FaWhatsapp } from "react-icons/fa6";

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

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("Full-Stack Web Development");
  const [budget, setBudget] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Toast States
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");
  const [showToast, setShowToast] = useState(false);

  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const servicesList = [
    "SEO & Organic Growth",
    "Performance Marketing",
    "Full-Stack Web Development",
    "Mobile App Development",
    "UI/UX & Product Design",
    "Custom Software & Cloud",
    "General Inquiry",
  ];

  const faqsList = [
    {
      question: "How fast will your team respond after I submit a proposal request?",
      answer: "Our technical leads review all incoming requests within 2-4 business hours and reach out directly with an initial proposal blueprint and calendar link.",
    },
    {
      question: "Do you sign Non-Disclosure Agreements (NDAs) before reviewing project details?",
      answer: "Yes, 100%. We prioritize data privacy and confidentiality. We can sign a mutual NDA prior to reviewing your codebases, wireframes, or business logic.",
    },
    {
      question: "Can we start with a small pilot MVP project before full scale deployment?",
      answer: "Absolutely. We routinely execute rapid 2-to-4 week MVP sprints to validate core product features before expanding into full multi-phase enterprise builds.",
    },
    {
      question: "What technology stacks does Aeronox Solutions specialize in?",
      answer: "We engineer scalable platforms using Next.js, React, Node.js, TypeScript, Cloudflare, Firebase, Python AI subagents, and modern cloud infrastructure.",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      setToastMessage("Please fill out all required fields.");
      setToastType("error");
      setShowToast(true);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setToastMessage("Please enter a valid email address.");
      setToastType("error");
      setShowToast(true);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          service,
          budget,
          websiteUrl,
          message,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setToastMessage("Proposal request submitted! Our engineering leads will get back to you shortly.");
        setToastType("success");
        setShowToast(true);
        setName("");
        setEmail("");
        setPhone("");
        setWebsiteUrl("");
        setMessage("");
      } else {
        setToastMessage(data.error || "Failed to send message. Please try again.");
        setToastType("error");
        setShowToast(true);
      }
    } catch {
      setToastMessage("An unexpected error occurred. Please try again.");
      setToastType("error");
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-mesh pt-36 pb-24 min-h-screen relative overflow-hidden">
        {/* Ambient Gradients */}
        <div className="absolute top-0 right-0 w-1/2 h-[500px] bg-[#ffbe00]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-1/2 h-[500px] bg-[#24182e]/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">

          {/* New Hero Section with Banner Image */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center mb-24">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="flex flex-col items-start text-left"
            >
              <span className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-black bg-[#ffbe00]/10 text-[#ffbe00] ring-1 ring-inset ring-[#ffbe00]/30 mb-6 shadow-[0_0_20px_rgba(255,190,0,0.2)]">
                <Sparkles size={13} /> Global Inquiries & Strategic Partnerships
              </span>
              <h1 className="font-display max-w-2xl text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-foreground leading-[1.1]">
                Let's build your <br className="hidden lg:block" /> next big <span className="text-gradient">idea.</span>
              </h1>
              <p className="mt-6 max-w-xl text-base sm:text-lg text-muted leading-relaxed">
                Whether you have a general inquiry, need a technical blueprint, or are ready to scale operations, our engineering team is here to help. Reach out below.
              </p>

              <div className="mt-10 flex items-center gap-4 border border-card-border bg-card/60 backdrop-blur-sm p-4 rounded-2xl shadow-sm">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#ffbe00]/20 text-[#ffbe00]">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-muted uppercase tracking-wider">Fastest Response SLA</p>
                  <p className="text-sm font-black text-foreground">Usually within 2-4 hours</p>
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
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                    alt="Aeronox Solutions Office"
                    className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent mix-blend-multiply" />

                  {/* Floating map pin element */}
                  <motion.a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-xl flex items-center gap-3 hover:scale-105 transition-all group cursor-pointer border border-white/40"
                  >
                    <div className="bg-[#ffbe00] p-2 rounded-xl group-hover:bg-[#24182e] transition-colors">
                      <MapPin size={16} className="text-[#24182e] group-hover:text-[#ffbe00] transition-colors" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase">Global HQ</p>
                      <p className="text-sm font-black text-[#24182e] group-hover:text-[#ffbe00] transition-colors">Halifax, UK (Open Map ↗)</p>
                    </div>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Trust & SLA Stats Banner */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
            {[
              { icon: Clock, label: "Response SLA", value: "2-4 Business Hours", color: "text-[#ffbe00]" },
              { icon: ShieldCheck, label: "Confidentiality", value: "100% NDA Protected", color: "text-emerald-400" },
              { icon: Star, label: "Client Satisfaction", value: "4.9 / 5.0 Rating", color: "text-amber-400" },
              { icon: Zap, label: "Pilot MVP Sprint", value: "2-4 Weeks Delivery", color: "text-cyan-400" },
            ].map((stat, i) => (
              <div key={i} className="p-5 rounded-2xl bg-[#1a1122]/70 border border-white/10 backdrop-blur-md flex items-center gap-4 hover:border-[#ffbe00]/30 transition-all group">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <stat.icon size={18} className={stat.color} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-white/50 uppercase tracking-wider">{stat.label}</p>
                  <p className="text-xs sm:text-sm font-black text-white">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Methods & Form Grid */}
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-start">
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="space-y-6"
            >
              <h3 className="font-display text-2xl font-bold text-foreground mb-4">Direct Contact</h3>
              {[
                {
                  icon: Phone,
                  label: "Phone Support",
                  value: siteConfig.phone,
                  href: `tel:${siteConfig.phone.replace(/\s/g, "")}`,
                  color: "text-[#24182e]",
                  bg: "bg-[#ffbe00]/20"
                },
                {
                  icon: Mail,
                  label: "Email Direct",
                  value: siteConfig.email,
                  href: `mailto:${siteConfig.email}`,
                  color: "text-[#24182e]",
                  bg: "bg-[#24182e]/10"
                },
                {
                  icon: MapPin,
                  label: "Global HQ (View Map)",
                  value: siteConfig.address,
                  href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.address)}`,
                  target: "_blank",
                  color: "text-emerald-600",
                  bg: "bg-emerald-500/10"
                },
              ].map((item) => (
                <motion.div
                  key={item.label}
                  variants={fadeIn}
                  whileHover={{ x: 5 }}
                  className="bento-card flex items-center gap-6 p-6 bg-card/40 backdrop-blur-sm border border-card-border hover:border-[#ffbe00]/30 transition-all duration-300 group shadow-sm hover:shadow-[0_10px_30px_rgba(255,190,0,0.05)]"
                >
                  <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${item.bg} ${item.color} group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.target}
                        rel={item.target ? "noopener noreferrer" : undefined}
                        className="mt-1 block text-lg font-bold text-foreground hover:text-[#ffbe00] transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="mt-1 text-lg font-bold text-foreground">{item.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}

              <motion.div variants={fadeIn} className="pt-2">
                <a
                  href={siteConfig.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between gap-3 w-full sm:w-auto px-7 py-4 rounded-full bg-[#25D366] text-white font-extrabold text-sm shadow-xl shadow-[#25D366]/25 hover:bg-[#20bd5a] hover:shadow-[#25D366]/40 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 group cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <FaWhatsapp size={22} className="group-hover:rotate-12 transition-transform" />
                    <span>Chat on WhatsApp</span>
                  </div>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </motion.div>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              onSubmit={handleSubmit}
              className="rounded-[2.5rem] p-8 sm:p-10 bg-[#1a1122]/90 backdrop-blur-2xl border border-white/15 relative shadow-2xl shadow-black/50 overflow-hidden mt-4 lg:mt-0"
            >
              {/* Top Accent Gradient Line */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#ffbe00] via-purple-500 to-[#00c2ff]" />

              {/* Ambient Radial Glow */}
              <div className="absolute top-0 right-0 w-72 h-72 bg-[#ffbe00]/10 rounded-full blur-3xl pointer-events-none -z-10" />

              <div className="flex items-center gap-2 mb-2 relative z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#ffbe00]/10 text-[#ffbe00] border border-[#ffbe00]/20">
                  <Sparkles size={12} /> Direct Proposal Engine
                </span>
              </div>

              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight relative z-10">
                Start a Project
              </h2>
              <p className="text-sm text-[#dcd7e3]/70 mt-1.5 relative z-10">
                Provide your requirements below and our engineering leads will get back to you.
              </p>

              <div className="mt-8 space-y-6 relative z-10">
                {/* Service Dropdown & Budget Field Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="service" className="text-xs font-bold text-white/80 uppercase tracking-wider mb-2 block">
                      Service Required *
                    </label>
                    <div className="relative">
                      <select
                        id="service"
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        disabled={loading}
                        className="w-full rounded-2xl border border-white/15 bg-black/40 px-4 py-3.5 text-sm text-white focus:border-[#ffbe00] focus:ring-2 focus:ring-[#ffbe00]/20 focus:outline-none transition-all cursor-pointer appearance-none"
                      >
                        {servicesList.map((item) => (
                          <option key={item} value={item} className="bg-[#1a1122] text-white">
                            {item}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/50">
                        ▼
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="budget" className="text-xs font-bold text-white/80 uppercase tracking-wider mb-2 block">
                      Estimated Budget
                    </label>
                    <input
                      id="budget"
                      type="text"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      placeholder="e.g. $5,000 or $3k - $10k"
                      disabled={loading}
                      className="w-full rounded-2xl border border-white/15 bg-black/40 px-4 py-3.5 text-sm text-white placeholder:text-white/30 focus:border-[#ffbe00] focus:ring-2 focus:ring-[#ffbe00]/20 focus:outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Name & Email Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="text-xs font-bold text-white/80 uppercase tracking-wider mb-2 block">
                      Your Name *
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      disabled={loading}
                      className="w-full rounded-2xl border border-white/15 bg-black/40 px-4 py-3.5 text-sm text-white placeholder:text-white/30 focus:border-[#ffbe00] focus:ring-2 focus:ring-[#ffbe00]/20 focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="text-xs font-bold text-white/80 uppercase tracking-wider mb-2 block">
                      Work Email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="john@company.com"
                      disabled={loading}
                      className="w-full rounded-2xl border border-white/15 bg-black/40 px-4 py-3.5 text-sm text-white placeholder:text-white/30 focus:border-[#ffbe00] focus:ring-2 focus:ring-[#ffbe00]/20 focus:outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Phone & Website Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="phone" className="text-xs font-bold text-white/80 uppercase tracking-wider mb-2 block">
                      Phone / WhatsApp
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      disabled={loading}
                      className="w-full rounded-2xl border border-white/15 bg-black/40 px-4 py-3.5 text-sm text-white placeholder:text-white/30 focus:border-[#ffbe00] focus:ring-2 focus:ring-[#ffbe00]/20 focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="websiteUrl" className="text-xs font-bold text-white/80 uppercase tracking-wider mb-2 block">
                      Website / Company URL
                    </label>
                    <input
                      id="websiteUrl"
                      type="text"
                      value={websiteUrl}
                      onChange={(e) => setWebsiteUrl(e.target.value)}
                      placeholder="https://yourwebsite.com"
                      disabled={loading}
                      className="w-full rounded-2xl border border-white/15 bg-black/40 px-4 py-3.5 text-sm text-white placeholder:text-white/30 focus:border-[#ffbe00] focus:ring-2 focus:ring-[#ffbe00]/20 focus:outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Project Brief */}
                <div>
                  <label htmlFor="message" className="text-xs font-bold text-white/80 uppercase tracking-wider mb-2 block">
                    Project Details & Goals *
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your project, required features, or target timeline..."
                    disabled={loading}
                    className="w-full resize-none rounded-2xl border border-white/15 bg-black/40 px-4 py-3.5 text-sm text-white placeholder:text-white/30 focus:border-[#ffbe00] focus:ring-2 focus:ring-[#ffbe00]/20 focus:outline-none transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 text-center justify-center font-black text-xs uppercase tracking-widest mt-3 rounded-2xl bg-gradient-to-r from-[#ffbe00] via-amber-400 to-[#ffbe00] text-[#120b18] hover:shadow-[0_0_30px_rgba(255,190,0,0.35)] hover:scale-[1.01] active:scale-95 transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-lg disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin h-5 w-5 mr-2" />
                      Sending Proposal Request...
                    </>
                  ) : (
                    <>
                      Submit Proposal Request <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </div>
            </motion.form>
          </div>

          {/* Interactive Google Map Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mt-20 relative rounded-[2.5rem] overflow-hidden border border-white/15 bg-[#1a1122]/90 backdrop-blur-2xl shadow-2xl"
          >
            <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 bg-black/40 relative z-10">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black bg-[#ffbe00] text-[#120b18] shadow-md mb-2.5">
                  <MapPin size={12} className="text-[#120b18]" /> Global Headquarters
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-black text-white tracking-tight">
                  Find Us on Google Maps
                </h3>
                <p className="text-xs sm:text-sm text-[#dcd7e3]/80 font-medium mt-1">
                  {siteConfig.address}
                </p>
              </div>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#ffbe00] text-[#120b18] font-black text-xs uppercase tracking-wider hover:bg-white transition-all shadow-xl hover:scale-105 self-start sm:self-auto cursor-pointer"
              >
                <span>Get Directions</span>
                <ArrowRight size={14} />
              </a>
            </div>

            <div className="w-full h-[400px] relative bg-black/30">
              <iframe
                title="Aeronox Solutions Global HQ Map"
                src="https://maps.google.com/maps?q=8%20King%20Cross%20Street,%20Halifax,%20West%20Yorkshire%20HX1%202SH,%20UK&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>
          </motion.div>

          {/* Contact FAQ Accordion Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mt-20 max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black bg-[#ffbe00]/10 text-[#ffbe00] border border-[#ffbe00]/20 mb-3">
                <Sparkles size={13} /> Quick Answers
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-sm text-muted mt-2">Everything you need to know before initiating a project with Aeronox.</p>
            </div>

            <div className="space-y-4">
              {faqsList.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl border border-white/15 bg-[#1a1122]/90 backdrop-blur-xl overflow-hidden transition-all duration-300"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-white/5 transition-colors"
                    >
                      <span className="font-bold text-white text-base sm:text-lg pr-4">
                        {faq.question}
                      </span>
                      <div className={`w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 bg-[#ffbe00] text-[#120b18]" : "text-white"}`}>
                        <ChevronDown size={18} />
                      </div>
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-6 pt-0 border-t border-white/5 text-[#dcd7e3]/80 text-sm leading-relaxed">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>

      <Toast
        message={toastMessage}
        type={toastType}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </>
  );
}

