import { getTestimonials } from "@/lib/data";
import { TestimonialsManager } from "@/components/admin/TestimonialsManager";
import Link from "next/link";
import { Plus } from "lucide-react";

export const revalidate = 0;

export default async function TestimonialsAdminPage() {
  const testimonials = await getTestimonials();

  return (
    <div className="max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-admin-text tracking-tight">Client Reviews</h1>
          <p className="text-admin-muted mt-1">Manage what your clients say about you.</p>
        </div>
        <Link 
          href="/admin/testimonials/new"
          className="flex items-center gap-2 px-4 py-2.5 bg-[#ffbe00] text-[#120b18] font-bold rounded-xl hover:bg-[#ffbe00]/90 transition-colors shadow-lg shadow-[#ffbe00]/20"
        >
          <Plus size={18} />
          New Testimonial
        </Link>
      </div>

      <TestimonialsManager initialTestimonials={testimonials} />
    </div>
  );
}
