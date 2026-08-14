"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import { Edit, Trash2, CheckCircle2, XCircle } from "lucide-react";
import { deleteTestimonial, toggleTestimonialActive } from "@/lib/actions";

export function TestimonialsManager({ initialTestimonials }: { initialTestimonials: any[] }) {
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [isPending, startTransition] = useTransition();

  const [viewItem, setViewItem] = useState<any>(null);

  const toggleStatus = (id: string, isActive: boolean) => {
    setTestimonials(items => 
      items.map(item => item.id === id ? { ...item, isActive } : item)
    );
    startTransition(async () => {
      await toggleTestimonialActive(id, isActive);
    });
  };

  return (
    <>
      <div className="bg-admin-card rounded-2xl border border-admin-border overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-admin-border bg-black/5 dark:bg-white/5 text-xs uppercase tracking-wider text-admin-muted font-bold">
                <th className="py-4 px-6 font-medium">Author</th>
                <th className="py-4 px-6 font-medium">Quote</th>
                <th className="py-4 px-6 font-medium">Status</th>
                <th className="py-4 px-6 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {testimonials.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-admin-muted bg-admin-card">
                    No testimonials found. Create your first one!
                  </td>
                </tr>
              ) : (
                testimonials.map((testimonial, index) => (
                  <tr key={testimonial.id || `test-${index}`} className="border-b border-admin-border hover:bg-black/5 dark:bg-white/5 transition-colors bg-admin-card">
                    <td className="py-4 px-6">
                      <p className="font-bold text-admin-text">{testimonial.author}</p>
                      <p className="text-xs text-muted mt-1">{testimonial.role}</p>
                    </td>
                    <td className="py-4 px-6">
                      <p className="text-sm text-admin-muted truncate max-w-xs md:max-w-md">
                        {testimonial.quote}
                      </p>
                    </td>
                    <td className="py-4 px-6">
                      <button
                        disabled={isPending || !testimonial.id}
                        onClick={() => toggleStatus(testimonial.id, !testimonial.isActive)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold transition-colors disabled:opacity-50 ${
                          testimonial.isActive !== false 
                            ? "bg-green-500/10 text-green-500 hover:bg-green-500/20" 
                            : "bg-red-500/10 text-red-500 hover:bg-red-500/20"
                        }`}
                      >
                        {testimonial.isActive !== false ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                        {testimonial.isActive !== false ? "Active" : "Inactive"}
                      </button>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-end gap-3">
                        <button 
                          onClick={() => setViewItem(testimonial)}
                          className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors p-1" 
                          title="View"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                        </button>
                        {testimonial.id ? (
                          <>
                            <Link 
                              href={`/admin/testimonials/${testimonial.id}/edit`} 
                              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors p-1" 
                              title="Edit"
                            >
                              <Edit size={18} />
                            </Link>
                            <button 
                              disabled={isPending}
                              onClick={async () => {
                                if (confirm("Are you sure you want to delete this testimonial?")) {
                                  await deleteTestimonial(testimonial.id);
                                  setTestimonials(prev => prev.filter(t => t.id !== testimonial.id));
                                }
                              }}
                              className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors p-1 disabled:opacity-50" 
                              title="Delete"
                            >
                              <Trash2 size={18} />
                            </button>
                          </>
                        ) : (
                          <span className="text-xs text-admin-muted bg-black/5 dark:bg-white/5 px-2 py-1 rounded">
                            Fallback (Uneditable)
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Modal */}
      {viewItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setViewItem(null)}>
          <div className="bg-admin-card border border-admin-border rounded-3xl p-8 max-w-lg w-full shadow-2xl relative" onClick={e => e.stopPropagation()}>
            <button 
              onClick={() => setViewItem(null)}
              className="absolute top-4 right-4 p-2 text-admin-muted hover:text-admin-text transition-colors rounded-full hover:bg-black/5 dark:hover:bg-white/5"
            >
              <XCircle size={24} />
            </button>
            <div className="flex items-center gap-4 mb-6">
              {viewItem.image ? (
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#ffbe00]/30 shrink-0">
                  <img src={viewItem.image} alt={viewItem.author} className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-16 h-16 rounded-full bg-black/10 dark:bg-white/10 flex items-center justify-center border-2 border-[#ffbe00]/30 text-xl font-bold shrink-0 text-admin-text">
                  {viewItem.author.charAt(0)}
                </div>
              )}
              <div>
                <h3 className="text-xl font-bold text-admin-text">{viewItem.author}</h3>
                <p className="text-sm text-admin-muted">{viewItem.role || "Client"}</p>
              </div>
            </div>
            
            <div className="flex gap-1 text-yellow-500 mb-4">
              {Array.from({ length: viewItem.rating || 5 }).map((_, j) => (
                <svg key={j} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              ))}
            </div>

            <blockquote className="text-admin-text text-lg italic leading-relaxed border-l-4 border-[#ffbe00] pl-4 mb-6">
              "{viewItem.quote}"
            </blockquote>

            <div className="flex justify-end gap-3 mt-8">
              {viewItem.id && (
                <Link
                  href={`/admin/testimonials/${viewItem.id}/edit`}
                  className="px-4 py-2 rounded-xl bg-blue-500/10 text-blue-500 font-semibold hover:bg-blue-500/20 transition-colors"
                >
                  Edit
                </Link>
              )}
              <button 
                onClick={() => setViewItem(null)}
                className="px-4 py-2 rounded-xl bg-black/5 dark:bg-white/5 text-admin-text font-semibold hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
