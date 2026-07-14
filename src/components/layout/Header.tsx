"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Rocket } from "lucide-react";
import { navLinks } from "@/lib/constants";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
              <Link 
                key={link.href}
                href={link.href} 
                className="text-[13px] font-bold text-gray-400 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
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
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {headerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-lg font-black text-white text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
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

