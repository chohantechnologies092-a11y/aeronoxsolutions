import { db } from "@/lib/firebase-admin";
import { TestimonialForm } from "@/components/admin/TestimonialForm";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  if (!resolvedParams.id || resolvedParams.id === "undefined") {
    notFound();
  }

  const doc = await db.collection("testimonials").doc(resolvedParams.id).get();
  
  if (!doc.exists) {
    notFound();
  }
  
  const testimonial = { id: doc.id, ...doc.data() };

  return (
    <div className="max-w-6xl">
      <TestimonialForm initialData={testimonial} />
    </div>
  );
}
