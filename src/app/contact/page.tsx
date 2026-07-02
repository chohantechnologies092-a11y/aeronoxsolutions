"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, MessageCircle, Phone, Loader2, ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { Toast } from "@/components/ui/Toast";

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
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Toast States
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      setToastMessage("Please fill out all fields.");
      setToastType("error");
      setShowToast(true);
      return;
    }

    // Basic email regex
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
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json();

      if (res.ok) {
        setToastMessage("Message sent successfully! We'll get back to you shortly.");
        setToastType("success");
        setShowToast(true);
        setName("");
        setEmail("");
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
              <span className="inline-flex items-center rounded-full px-4 py-1 text-sm font-medium bg-[#ffbe00]/10 text-[#24182e] ring-1 ring-inset ring-[#ffbe00]/30 mb-6 shadow-[0_0_15px_rgba(255,190,0,0.2)]">
                Get in Touch
              </span>
              <h1 className="font-display max-w-2xl text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-foreground leading-[1.1]">
                Let's build your <br className="hidden lg:block"/> next big <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffbe00] to-[#24182e]">idea</span>
              </h1>
              <p className="mt-6 max-w-xl text-base sm:text-lg text-muted leading-relaxed">
                Whether you have a general inquiry, need a technical blueprint, or are ready to scale operations, our engineering team is here to help. Reach out below.
              </p>
              
              <div className="mt-10 flex items-center gap-4 border border-card-border bg-white/50 backdrop-blur-sm p-4 rounded-2xl shadow-sm">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#ffbe00]/20 text-[#24182e]">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted uppercase tracking-wider">Fastest Response</p>
                  <p className="text-sm font-bold text-foreground">Usually within 2-4 hours</p>
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
                  <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-xl flex items-center gap-3"
                  >
                    <div className="bg-[#ffbe00] p-2 rounded-xl">
                      <MapPin size={16} className="text-[#24182e]" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase">Global HQ</p>
                      <p className="text-sm font-black text-[#24182e]">San Francisco, CA</p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
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
                  label: "Global HQ",
                  value: siteConfig.address,
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
                <Button href={siteConfig.whatsapp} variant="secondary" className="w-full sm:w-auto py-4 px-8 group bg-white hover:bg-gray-50 border border-gray-200">
                  <MessageCircle size={18} className="text-[#24182e] group-hover:scale-110 transition-transform" />
                  <span className="font-semibold text-[#24182e]">Chat on WhatsApp</span>
                  <ArrowRight size={16} className="ml-2 text-[#24182e] group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            </motion.div>

            <motion.form 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              onSubmit={handleSubmit} 
              className="bento-card p-8 sm:p-10 bg-card/60 backdrop-blur-xl border border-card-border relative shadow-2xl shadow-[#24182e]/5 mt-4 lg:mt-0"
            >
              {/* Form Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#ffbe00]/5 to-transparent rounded-[2rem] pointer-events-none" />
              
              <h2 className="font-display text-2xl font-bold text-foreground relative z-10">Send a message</h2>
              <p className="text-sm text-muted mt-2 relative z-10">Fill out the form below and we'll get back to you.</p>
              
              <div className="mt-8 space-y-5 relative z-10">
                <div>
                  <label htmlFor="name" className="text-sm font-medium text-foreground mb-1.5 block">Your name</label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    disabled={loading}
                    className="w-full rounded-xl border border-card-border bg-background/50 px-4 py-3.5 text-sm text-foreground placeholder:text-muted/50 focus:border-[#ffbe00] focus:ring-1 focus:ring-[#ffbe00] focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="text-sm font-medium text-foreground mb-1.5 block">Email address</label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@company.com"
                    disabled={loading}
                    className="w-full rounded-xl border border-card-border bg-background/50 px-4 py-3.5 text-sm text-foreground placeholder:text-muted/50 focus:border-[#ffbe00] focus:ring-1 focus:ring-[#ffbe00] focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="text-sm font-medium text-foreground mb-1.5 block">Project details</label>
                  <textarea
                    id="message"
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your project or goals..."
                    disabled={loading}
                    className="w-full resize-none rounded-xl border border-card-border bg-background/50 px-4 py-3.5 text-sm text-foreground placeholder:text-muted/50 focus:border-[#ffbe00] focus:ring-1 focus:ring-[#ffbe00] focus:outline-none transition-all"
                  />
                </div>

                <Button type="submit" className="w-full py-4 text-center justify-center font-bold text-base mt-2 bg-[#24182e] hover:bg-[#ffbe00] text-white hover:text-[#24182e] transition-colors" onClick={() => {}}>
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin h-5 w-5 mr-2" />
                      Sending Message...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </div>
            </motion.form>
          </div>
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

