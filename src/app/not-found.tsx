import { ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="mesh-bg min-h-screen flex items-center justify-center relative">
      <div className="absolute inset-0 grid-overlay opacity-20 pointer-events-none" />
      
      {/* Decorative Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[350px] w-[350px] rounded-full bg-[#00c2ff]/10 blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[250px] w-[250px] rounded-full bg-[#9b5cff]/5 blur-[80px] pointer-events-none" />

      <div className="relative z-10 text-center px-6 max-w-md">
        <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-[#00c2ff]">
          <Sparkles size={12} className="text-gold" />
          Page Not Found
        </div>

        <h1 className="font-display text-8xl font-extrabold tracking-tight bg-gradient-to-r from-[#00c2ff] to-[#9b5cff] bg-clip-text text-transparent">
          404
        </h1>
        
        <h2 className="font-display text-2xl font-bold text-white mt-4">
          Lost in digital space
        </h2>
        
        <p className="mt-4 text-sm text-muted leading-relaxed">
          The technical ecosystem or endpoint you are looking for does not exist or has been shifted. Let us get you back on course.
        </p>

        <div className="mt-8 flex justify-center">
          <Button href="/" className="py-3.5 px-6">
            <ArrowLeft size={16} />
            Back to Homepage
          </Button>
        </div>
      </div>
    </div>
  );
}
