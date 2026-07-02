import type { Metadata } from "next";
import { Services } from "@/components/sections/Services";
import { CTA } from "@/components/sections/CTA";
import { prisma } from "@/lib/db";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Agency Services",
  description: "Search Engine Optimization, Custom Web Engineering, Social Media Management, AI Automation workflows, and B2B Telemarketing.",
};

export const revalidate = 0;

export default async function ServicesPage() {
  const services = await prisma.service.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <>
      {/* Banner Section */}
      <div className="w-full h-[500px] relative">
        <Image 
          src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop" 
          alt="Our Services" 
          fill 
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />
        
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div className="max-w-4xl mx-auto px-6 w-full pt-16">
            <p className="text-accent font-bold text-xs uppercase tracking-[0.4em] mb-4">
              Our Offerings
            </p>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-[1.05] mb-6">
              Full-stack digital engineering.
            </h1>
            <p className="text-xl md:text-2xl text-white/80 leading-relaxed max-w-3xl mx-auto font-medium">
              We build high-performance products, drive organic index traffic, integrate custom LLM automations, and manage outbound lead generation pipelines.
            </p>
          </div>
        </div>
      </div>

      {/* Since we have a massive banner, we might want to reduce the padding top of Services component, but we will leave it to the component defaults for now */}
      <Services services={services} />
      <CTA />
    </>
  );
}
