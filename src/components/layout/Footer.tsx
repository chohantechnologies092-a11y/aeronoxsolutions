import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";
import { FaLinkedin, FaXTwitter, FaFacebook, FaInstagram } from "react-icons/fa6";
import { navLinks, siteConfig } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="relative bg-[#24182e] border-t border-gray-800 py-16 text-white font-sans">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-4 lg:gap-8">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 group">
              <Image
                src="/logo_wht2.png"
                alt="Aeronox Logo"
                width={180}
                height={40}
                className="object-contain h-10 w-auto group-hover:opacity-80 transition-opacity"
              />

            </Link>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-gray-400">
              {siteConfig.description}
            </p>
            <div className="mt-8 flex items-center gap-4">
              <a
                href={siteConfig.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-700 bg-gray-800 text-gray-400 transition-all hover:border-[#ffbe00]/50 hover:bg-[#ffbe00]/10 hover:text-[#ffbe00]"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={16} />
              </a>
              <a
                href={siteConfig.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-700 bg-gray-800 text-gray-400 transition-all hover:border-[#ffbe00]/50 hover:bg-[#ffbe00]/10 hover:text-[#ffbe00]"
                aria-label="Twitter"
              >
                <FaXTwitter size={16} />
              </a>
              <a
                href={siteConfig.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-700 bg-gray-800 text-gray-400 transition-all hover:border-[#ffbe00]/50 hover:bg-[#ffbe00]/10 hover:text-[#ffbe00]"
                aria-label="Facebook"
              >
                <FaFacebook size={16} />
              </a>
              <a
                href={siteConfig.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-700 bg-gray-800 text-gray-400 transition-all hover:border-[#ffbe00]/50 hover:bg-[#ffbe00]/10 hover:text-[#ffbe00]"
                aria-label="Instagram"
              >
                <FaInstagram size={16} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-[#ffbe00]">
              Navigation
            </h4>
            <ul className="mt-6 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-gray-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-[#ffbe00]">
              Connect
            </h4>
            <ul className="mt-6 space-y-4 text-sm font-medium text-gray-400">
              <li className="flex items-start gap-3 group">
                <Phone size={16} className="mt-0.5 shrink-0 text-[#ffbe00]" />
                <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="hover:text-white transition-colors">
                  {siteConfig.phone}
                </a>
              </li>
              <li className="flex items-start gap-3 group">
                <Mail size={16} className="mt-0.5 shrink-0 text-[#ffbe00]" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-white transition-colors">
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 shrink-0 text-[#ffbe00]" />
                <span>{siteConfig.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-gray-800 pt-8 sm:flex-row">
          <p className="text-xs font-medium text-gray-500">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-xs font-medium text-gray-500 flex gap-2 uppercase tracking-widest">
            <span>Accessible</span>
            <span className="opacity-40">•</span>
            <span>Inclusive</span>
            <span className="opacity-40">•</span>
            <span>Sustainable</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
