import { getClientById } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink, CheckCircle2 } from "lucide-react";

export default async function ClientCaseStudy({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const client = await getClientById(id);

  if (!client) {
    notFound();
  }

  const services = client.servicesProvided
    ? client.servicesProvided.split(",").map((s: string) => s.trim())
    : [];

  return (
    <div className="min-h-screen bg-[#020306] pt-32 pb-24 text-white font-sans selection:bg-accent/30 selection:text-white">
      <div className="max-w-4xl mx-auto px-6">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-12 transition-colors font-medium text-sm"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row gap-8 items-start md:items-center mb-16">
          <div className="w-32 h-32 relative rounded-2xl bg-white/5 border border-white/10 p-6 flex items-center justify-center shrink-0">
            <Image 
              src={client.logo} 
              alt={client.name} 
              fill 
              className="object-contain p-4" 
            />
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-black mb-4">{client.name}</h1>
            {client.link && (
              <a 
                href={client.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-accent hover:text-white transition-colors text-sm font-bold uppercase tracking-widest"
              >
                Visit Website
                <ExternalLink size={14} />
              </a>
            )}
          </div>
        </div>

        {/* Case Study Content */}
        <div className="space-y-16">
          
          {services.length > 0 && (
            <section>
              <h2 className="text-sm font-bold text-gray-500 uppercase tracking-[0.2em] mb-6">Services Provided</h2>
              <div className="flex flex-wrap gap-3">
                {services.map((service: string, i: number) => (
                  <span 
                    key={i} 
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-gray-300"
                  >
                    <CheckCircle2 size={14} className="text-accent" />
                    {service}
                  </span>
                ))}
              </div>
            </section>
          )}

          <div className="grid md:grid-cols-2 gap-8">
            {client.beforeData && (
              <section className="bg-red-500/5 border border-red-500/20 rounded-3xl p-8">
                <h2 className="text-sm font-bold text-red-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-400"></span>
                  Before
                </h2>
                <div className="prose prose-invert prose-p:text-gray-400 prose-p:leading-relaxed">
                  <p className="whitespace-pre-wrap">{client.beforeData}</p>
                </div>
              </section>
            )}

            {client.afterData && (
              <section className="bg-emerald-500/5 border border-emerald-500/20 rounded-3xl p-8">
                <h2 className="text-sm font-bold text-emerald-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  After
                </h2>
                <div className="prose prose-invert prose-p:text-gray-300 prose-p:leading-relaxed">
                  <p className="whitespace-pre-wrap">{client.afterData}</p>
                </div>
              </section>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
}
