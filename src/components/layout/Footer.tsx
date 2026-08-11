"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone, ArrowUp, ArrowUpRight, Sparkles, ShieldCheck, Clock } from "lucide-react";
import { FaLinkedin, FaXTwitter, FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa6";
import { navLinks, siteConfig } from "@/lib/constants";
import { fetchSettingsAction } from "@/lib/actions";

export function Footer() {
  const [socials, setSocials] = useState(siteConfig.socials);

  useEffect(() => {
    async function loadSettings() {
      const settings = await fetchSettingsAction();
      if (settings?.socials) {
        setSocials(settings.socials);
      }
    }
    loadSettings();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#120b18] border-t border-white/10 pt-20 pb-12 text-white font-sans overflow-hidden">
      {/* Ambient Radial Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#ffbe00]/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#24182e]/20 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 z-10">

        {/* Top CTA Banner inside Footer */}
        <div className="mb-20 p-8 md:p-12 rounded-[2.5rem] bg-gradient-to-r from-[#24182e] via-[#1a1122] to-[#140c1e] border border-white/15 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#ffbe00]/15 rounded-full blur-[100px] pointer-events-none transform translate-x-1/3 -translate-y-1/3 group-hover:scale-110 transition-transform duration-700" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
            <div>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ffbe00]/10 border border-[#ffbe00]/30 text-[#ffbe00] text-xs font-black uppercase tracking-widest mb-3">
                <Sparkles size={14} /> Ready To Scale Your Business?
              </span>
              <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                Let's engineer your next digital breakthrough.
              </h3>
              <p className="text-sm md:text-base text-[#dcd7e3]/80 mt-2 max-w-xl">
                Get a free technical audit and custom growth proposal from our senior engineering team.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 shrink-0">
              <Link
                href="/contact"
                className="px-8 py-4 bg-[#ffbe00] text-[#24182e] font-black text-xs uppercase tracking-widest rounded-full hover:bg-white transition-all shadow-[0_0_25px_rgba(255,190,0,0.3)] hover:scale-105"
              >
                Schedule Consultation
              </Link>
              <a
                href="https://wa.me/447535151621"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-4 bg-[#25D366]/10 border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366] hover:text-white font-bold text-xs uppercase tracking-wider rounded-full transition-all flex items-center gap-2"
              >
                <FaWhatsapp size={16} /> Instant WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Main Footer Links Grid */}
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8 pb-16 border-b border-white/10">

          {/* Column 1: Brand Info & Registration */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block group mb-6">
              <Image
                src="/logo_wht2.png"
                alt="Aeronox Logo"
                width={190}
                height={45}
                className="object-contain h-11 w-auto group-hover:opacity-80 transition-opacity"
              />
            </Link>

            <p className="text-sm leading-relaxed text-[#dcd7e3]/70 max-w-sm mb-6 font-medium">
              {siteConfig.description}
            </p>

            {/* Official Registration & Trust Badge */}
            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 text-xs space-y-2 mb-6">
              <div className="flex items-center gap-2 text-white font-bold">
                <ShieldCheck size={16} className="text-[#ffbe00]" /> Registered UK Company
              </div>
              <p className="text-[#dcd7e3]/60 text-[11px]">
                Company Number: <span className="text-white font-mono font-bold">16277420</span> (Incorporated Feb 2025)
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socials.linkedin && (
                <a
                  href={socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-300 transition-all hover:border-[#0A66C2] hover:bg-[#0A66C2] hover:text-white shadow-md"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin size={18} />
                </a>
              )}
              {socials.twitter && (
                <a
                  href={socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-300 transition-all hover:border-white hover:bg-white hover:text-black shadow-md"
                  aria-label="Twitter"
                >
                  <FaXTwitter size={18} />
                </a>
              )}
              {socials.facebook && (
                <a
                  href={socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-300 transition-all hover:border-[#1877F2] hover:bg-[#1877F2] hover:text-white shadow-md"
                  aria-label="Facebook"
                >
                  <FaFacebook size={18} />
                </a>
              )}
              {socials.instagram && (
                <a
                  href={socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-300 transition-all hover:border-[#E1306C] hover:bg-[#E1306C] hover:text-white shadow-md"
                  aria-label="Instagram"
                >
                  <FaInstagram size={18} />
                </a>
              )}
            </div>
          </div>

          {/* Column 2: Core Capabilities */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#ffbe00] mb-6">
              Our Capabilities
            </h4>
            <ul className="space-y-3.5 text-sm font-medium text-[#dcd7e3]/80">
              <li>
                <Link href="/portfolio" className="hover:text-[#ffbe00] transition-colors flex items-center gap-1.5 group">
                  <ArrowUpRight size={14} className="opacity-40 group-hover:opacity-100 transition-opacity" />
                  SEO & Search Engine Optimization
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-[#ffbe00] transition-colors flex items-center gap-1.5 group">
                  <ArrowUpRight size={14} className="opacity-40 group-hover:opacity-100 transition-opacity" />
                  Web & E-Commerce Engineering
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-[#ffbe00] transition-colors flex items-center gap-1.5 group">
                  <ArrowUpRight size={14} className="opacity-40 group-hover:opacity-100 transition-opacity" />
                  Growth & Performance Marketing
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-[#ffbe00] transition-colors flex items-center gap-1.5 group">
                  <ArrowUpRight size={14} className="opacity-40 group-hover:opacity-100 transition-opacity" />
                  AI & Workflow Automation
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-[#ffbe00] transition-colors flex items-center gap-1.5 group">
                  <ArrowUpRight size={14} className="opacity-40 group-hover:opacity-100 transition-opacity" />
                  Outbound B2B Lead Generation
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Navigation */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#ffbe00] mb-6">
              Navigation
            </h4>
            <ul className="space-y-3.5 text-sm font-medium text-[#dcd7e3]/80">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-[#ffbe00] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}

            </ul>
          </div>

          {/* Column 4: Contact Info & Support */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#ffbe00] mb-6">
              Global Contact & Support
            </h4>
            <ul className="space-y-4 text-sm font-medium text-[#dcd7e3]/80">
              <li className="flex items-start gap-3">
                <Phone size={18} className="mt-0.5 shrink-0 text-[#ffbe00]" />
                <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="hover:text-white transition-colors">
                  {siteConfig.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={18} className="mt-0.5 shrink-0 text-[#ffbe00]" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-white transition-colors">
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 shrink-0 text-[#ffbe00]" />
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.address)}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-[#ffbe00] transition-colors leading-relaxed"
                >
                  {siteConfig.address}
                </a>
              </li>
              <li className="pt-2">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                  <Clock size={14} /> 2-4 Hour Response Time SLA
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Back-to-Top */}
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-[#dcd7e3]/50 font-medium">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved. Registered in England & Wales.
          </p>

          <div className="flex items-center gap-6">
            <p className="text-xs text-[#dcd7e3]/50 uppercase tracking-widest font-bold flex gap-3">
              <span>Accessible</span>
              <span>•</span>
              <span>Inclusive</span>
              <span>•</span>
              <span>Secure</span>
            </p>

            <button
              onClick={scrollToTop}
              className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-[#ffbe00] hover:text-[#24182e] transition-all shadow-md group"
              title="Scroll to Top"
            >
              <ArrowUp size={16} className="group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
