"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { navLinks } from "@/lib/constants";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerLinks = navLinks.filter(link => link.label !== "Contact");

  return (
    <>
      <header className="fixed top-0 w-full z-50 pt-6 px-4 md:px-6 pointer-events-none flex justify-center">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={`pointer-events-auto flex items-center justify-between w-full max-w-4xl rounded-full transition-all duration-300 ${isScrolled
            ? "bg-[#24182e]/95 backdrop-blur-xl border border-gray-800 shadow-2xl py-3 px-6"
            : "bg-[#24182e] border border-gray-800 shadow-xl py-4 px-8"
            }`}
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center justify-center group"
          >
            <Image
              src="/logo_wht2.png"
              alt="Aeronox Logo"
              width={180}
              height={40}
              className="object-contain h-8 md:h-10 w-auto group-hover:opacity-80 transition-opacity"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {headerLinks.map((link) => (
              <div 
                key={link.href} 
                className="relative group"
                onMouseEnter={() => setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link 
                  href={link.href} 
                  className="flex items-center gap-1 text-[13px] font-bold text-gray-400 hover:text-white transition-colors py-2"
                >
                  {link.label}
                  {link.subLinks && <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === link.label ? "rotate-180 text-[#ffbe00]" : ""}`} />}
                </Link>
                
                {/* Dropdown Menu */}
                {link.subLinks && (
                  <AnimatePresence>
                    {activeDropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-48 bg-[#24182e] border border-gray-800 rounded-2xl shadow-xl overflow-hidden z-50 py-2"
                      >
                        {link.subLinks.map((subLink) => (
                          <Link
                            key={subLink.href}
                            href={subLink.href}
                            className="block px-4 py-2.5 text-sm font-bold text-gray-400 hover:text-white hover:bg-white/5 transition-colors text-center"
                            onClick={() => setActiveDropdown(null)}
                          >
                            {subLink.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center">
            <Link
              href="/contact"
              className="px-6 py-2.5 bg-white text-gray-950 text-[11px] font-black uppercase tracking-widest rounded-full hover:bg-gray-200 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.2)]"
            >
              Get Proposal
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </motion.div>
      </header>

      {/* Mobile Navigation Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 left-4 right-4 z-40 md:hidden bg-[#24182e] border border-gray-800 rounded-3xl shadow-2xl overflow-hidden"
            style={{ maxHeight: "calc(100vh - 120px)", overflowY: "auto" }}
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {headerLinks.map((link) => (
                <div key={link.href} className="flex flex-col">
                  {link.subLinks ? (
                    <div className="flex flex-col gap-4 bg-white/5 p-4 rounded-2xl">
                      <div className="text-sm font-black text-[#ffbe00] text-center uppercase tracking-widest">{link.label}</div>
                      {link.subLinks.map((subLink) => (
                        <Link
                          key={subLink.href}
                          href={subLink.href}
                          className="text-lg font-bold text-white text-center"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {subLink.label}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-lg font-black text-white text-center"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-4 px-6 py-4 bg-white text-gray-950 text-center text-xs font-black uppercase tracking-widest rounded-full"
              >
                Get Proposal
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
