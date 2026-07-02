import { getServiceBySlug } from "@/lib/data";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import * as LucideIcons from "lucide-react";
import Image from "next/image";

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  // Dynamically resolve the icon component
  const IconComponent = (LucideIcons as any)[
    service.icon.charAt(0).toUpperCase() + service.icon.slice(1)
  ] || LucideIcons.Search;

  return (
    <article className="min-h-screen bg-background font-sans pb-24">
      {/* Banner Section */}
      <div className="w-full h-[450px] relative">
        <Image 
          src={service.image || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"} 
          alt={`${service.title} Banner`} 
          fill 
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full pt-16">
            <Link 
              href="/#services" 
              className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-8 uppercase tracking-widest text-xs font-bold"
            >
              <ArrowLeft size={16} />
              Back to Services
            </Link>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                <IconComponent size={24} style={{ color: service.color }} strokeWidth={2.5} />
              </div>
              <span className="text-white/90 font-bold uppercase tracking-widest text-sm">Service Details</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-[1.1] mb-6 max-w-4xl">
              {service.title}
            </h1>
            <p className="text-xl text-white/80 leading-relaxed max-w-2xl font-medium">
              {service.shortDescription}
            </p>
          </div>
        </div>
      </div>
      
      {/* Managed Content Section */}
      <div className="max-w-7xl mx-auto px-6 mt-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Main Content (Left) */}
          <div className="lg:col-span-8 min-h-[400px]">
            <div 
              className="prose prose-lg md:prose-xl dark:prose-invert prose-headings:font-black prose-headings:tracking-tight max-w-none prose-a:text-accent prose-a:no-underline hover:prose-a:underline marker:text-accent prose-p:leading-relaxed"
              dangerouslySetInnerHTML={{ __html: service.content }}
            />
          </div>

          {/* Sidebar (Right) */}
          <div className="lg:col-span-4">
            <div className="sticky top-32">
              <div className="bg-card border border-border p-8 rounded-3xl shadow-sm mb-8">
                <h3 className="text-2xl font-black text-foreground mb-4">Start Your Journey</h3>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  Ready to implement {service.title} for your business? Connect with our experts to discuss your goals and get a custom roadmap.
                </p>
                <Link 
                  href="/contact" 
                  className="w-full flex items-center justify-center py-4 bg-foreground text-background font-black uppercase tracking-widest rounded-xl hover:opacity-90 transition-opacity"
                >
                  Contact Us
                </Link>
              </div>

              <div className="bg-accent/5 border border-accent/20 p-8 rounded-3xl">
                <h4 className="text-accent font-bold uppercase tracking-widest text-sm mb-4">Why Choose Us?</h4>
                <ul className="space-y-4">
                  {[
                    "Data-Driven Strategies",
                    "Dedicated Account Managers",
                    "Transparent Reporting",
                    "Proven Track Record"
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-foreground font-medium">
                      <div className="w-2 h-2 rounded-full bg-accent" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </article>
  );
}
