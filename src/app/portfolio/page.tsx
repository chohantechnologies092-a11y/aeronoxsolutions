import type { Metadata } from "next";
import { Portfolio } from "@/components/sections/Portfolio";
import { CTA } from "@/components/sections/CTA";
import { getProjects } from "@/lib/data";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Case Studies & Work Portfolio",
  description: "Explore our successful projects across web development, custom software engineering, SEO optimization, and social campaigns.",
};

export const revalidate = 0; // Disable caching for dynamic data

export default async function PortfolioPage() {
  const projects = await getProjects();

  return (
    <>
      {/* Banner Section */}
      <div className="w-full h-[500px] relative">
        <Image 
          src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop" 
          alt="Our Portfolio" 
          fill 
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />
        
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div className="max-w-4xl mx-auto px-6 w-full pt-16">
            <p className="text-accent font-bold text-xs uppercase tracking-[0.4em] mb-4">
              Our Case Studies
            </p>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-[1.05] mb-6">
              Work that drives real outcomes.
            </h1>
            <p className="text-xl md:text-2xl text-white/80 leading-relaxed max-w-3xl mx-auto font-medium">
              From custom API designs and structured headless e-commerce builds to automated lead acquisition models.
            </p>
          </div>
        </div>
      </div>
      <Portfolio projects={projects} />
      <CTA />
    </>
  );
}
