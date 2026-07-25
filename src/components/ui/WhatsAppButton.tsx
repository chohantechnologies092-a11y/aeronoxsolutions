"use client";

import React from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { siteConfig } from "@/lib/constants";

export function WhatsAppButton() {
  const whatsappUrl = siteConfig.whatsapp || "https://wa.me/447535151621";
  const defaultMessage = encodeURIComponent("Hello Aeronox Solutions, I would like to inquire about your services.");
  const fullUrl = `${whatsappUrl}?text=${defaultMessage}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center group">
      {/* Tooltip Label */}
      <span className="mr-3 px-3 py-1.5 rounded-xl bg-card/90 backdrop-blur-md border border-card-border text-foreground text-xs font-semibold shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 whitespace-nowrap pointer-events-none hidden sm:inline-block">
        Chat with us on WhatsApp 👋
      </span>

      {/* WhatsApp Button */}
      <a
        href={fullUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact us on WhatsApp"
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:shadow-[0_6px_25px_rgba(37,211,102,0.6)] transition-all duration-300 transform hover:scale-110 active:scale-95 group"
      >
        {/* Pulsing ring animation */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-75 animate-ping pointer-events-none -z-10" />

        {/* Online Indicator Badge */}
        <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-emerald-400 border-2 border-white dark:border-black rounded-full" />

        {/* WhatsApp Icon */}
        <FaWhatsapp className="w-7 h-7 transition-transform duration-300 group-hover:rotate-12" />
      </a>
    </div>
  );
}
