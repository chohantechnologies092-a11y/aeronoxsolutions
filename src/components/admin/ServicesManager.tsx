"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import { Edit, Trash2, GripVertical, CheckCircle2, X } from "lucide-react";
import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useDroppable } from "@dnd-kit/core";

import { updateServiceOrder, toggleServiceHomeStatus, deleteService } from "@/lib/actions";

// --- Sortable Table Row ---
function SortableServiceRow({ service, isPending }: { service: any, isPending: boolean }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: service.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 10 : 1,
    position: isDragging ? "relative" : "static",
  } as React.CSSProperties;

  return (
    <tr ref={setNodeRef} style={style} className="border-b border-admin-border hover:bg-black/5 dark:bg-white/5 transition-colors bg-admin-card">
      <td className="py-4 px-4 w-10">
        <button {...attributes} {...listeners} className="cursor-grab text-muted hover:text-admin-text p-1 touch-none">
          <GripVertical size={18} />
        </button>
      </td>
      <td className="py-4 px-6">
        <div className="flex items-center gap-2">
          <p className="font-medium text-admin-text">{service.title}</p>
          {service.showOnHome && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-[#ffbe00]/20 text-[#ffbe00]">
              <CheckCircle2 size={10} /> Home
            </span>
          )}
        </div>
        <p className="text-xs text-muted mt-1 truncate max-w-xs">{service.shortDescription}</p>
      </td>
      <td className="py-4 px-6">
        <span className="text-sm text-admin-muted">{service.slug}</span>
      </td>
      <td className="py-4 px-6">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-black/10 dark:bg-white/10 text-admin-text">
          {service.bentoClass}
        </span>
      </td>
      <td className="py-4 px-6">
        <div className="flex items-center justify-end gap-3">
          <Link href={`/services/${service.slug}`} target="_blank" className="text-muted hover:text-admin-text transition-colors text-sm">
            View
          </Link>
          <Link href={`/admin/services/${service.id}/edit`} className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors p-1" title="Edit">
            <Edit size={18} />
          </Link>
          <button 
            disabled={isPending}
            onClick={async () => {
              if (confirm("Are you sure you want to delete this service?")) {
                await deleteService(service.id);
              }
            }}
            className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors p-1 disabled:opacity-50" 
            title="Delete"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
}

// --- Droppable Home Zone ---
function HomeServicesDropZone({ homeServices, toggleHomeStatus, isPending }: { homeServices: any[], toggleHomeStatus: (id: string, s: boolean) => void, isPending: boolean }) {
  const { isOver, setNodeRef } = useDroppable({
    id: 'home-dropzone',
  });

  return (
    <div 
      ref={setNodeRef}
      className={`mt-12 mb-8 p-6 rounded-2xl border-2 border-dashed transition-all duration-300 ${isOver ? 'border-[#ffbe00] bg-[#ffbe00]/5 scale-[1.02]' : 'border-admin-border bg-admin-card/50'}`}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-xl font-bold text-admin-text">Home Page Selected Services</h2>
          <p className="text-sm text-admin-muted mt-1">Drag services here to feature them on the home page (Max 3 shown).</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {homeServices.map((service) => (
          <div key={service.id} className="bg-admin-card p-4 rounded-xl border border-[#ffbe00]/30 shadow-[0_0_15px_rgba(255,190,0,0.1)] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-16 h-16 bg-[#ffbe00]/10 rounded-full blur-xl"></div>
            <h3 className="font-bold text-admin-text text-lg relative z-10">{service.title}</h3>
            <p className="text-sm text-muted mt-1 truncate relative z-10">{service.shortDescription}</p>
            <div className="mt-4 flex justify-between items-center relative z-10">
              <span className="text-xs px-2 py-1 bg-[#ffbe00]/20 text-[#ffbe00] rounded-full font-medium flex items-center gap-1">
                <CheckCircle2 size={12} /> Selected
              </span>
              <button 
                onClick={() => toggleHomeStatus(service.id, false)}
                disabled={isPending}
                className="text-xs text-red-400 hover:text-red-300 transition-colors flex items-center gap-1 disabled:opacity-50"
              >
                <X size={12} /> Remove
              </button>
            </div>
          </div>
        ))}
        {homeServices.length === 0 && (
          <div className="col-span-1 md:col-span-3 py-8 text-center text-muted border border-dashed border-admin-border rounded-xl">
            No services selected for home page. Drag a service here to add it.
          </div>
        )}
      </div>
    </div>
  );
}

// --- Main Manager Component ---
export function ServicesManager({ initialServices }: { initialServices: any[] }) {
  const [services, setServices] = useState(initialServices);
  const [isPending, startTransition] = useTransition();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // 5px movement before dragging starts (allows clicks on links/buttons)
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const homeServices = services.filter(s => s.showOnHome);

  const toggleHomeStatus = (id: string, showOnHome: boolean) => {
    setServices(items => 
      items.map(item => item.id === id ? { ...item, showOnHome } : item)
    );
    startTransition(async () => {
      await toggleServiceHomeStatus(id, showOnHome);
    });
  };

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    
    if (!over) return;

    // Check if dropped on the home page dropzone
    if (over.id === 'home-dropzone') {
      const draggedService = services.find(s => s.id === active.id);
      if (draggedService && !draggedService.showOnHome) {
        toggleHomeStatus(active.id as string, true);
      }
      return; // Dropping in zone shouldn't reorder the main list
    }

    // Reordering within the list
    if (active.id !== over.id) {
      const oldIndex = services.findIndex((s) => s.id === active.id);
      const newIndex = services.findIndex((s) => s.id === over.id);
      
      const newOrder = arrayMove(services, oldIndex, newIndex);
      setServices(newOrder);
      
      startTransition(async () => {
        await updateServiceOrder(newOrder.map(s => s.id));
      });
    }
  }

  return (
    <DndContext 
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="bg-admin-card rounded-2xl border border-admin-border overflow-hidden mb-8 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-admin-border bg-black/10 dark:bg-black/20">
                <th className="py-4 px-4 w-10"></th>
                <th className="py-4 px-6 text-sm font-semibold text-muted">Service Title</th>
                <th className="py-4 px-6 text-sm font-semibold text-muted">Slug</th>
                <th className="py-4 px-6 text-sm font-semibold text-muted">Bento Class</th>
                <th className="py-4 px-6 text-sm font-semibold text-muted text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              <SortableContext 
                items={services.map(s => s.id)}
                strategy={verticalListSortingStrategy}
              >
                {services.map((service) => (
                  <SortableServiceRow key={service.id} service={service} isPending={isPending} />
                ))}
              </SortableContext>
              {services.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-muted">
                    No services found. Create one to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <HomeServicesDropZone 
        homeServices={homeServices} 
        toggleHomeStatus={toggleHomeStatus} 
        isPending={isPending} 
      />
    </DndContext>
  );
}
