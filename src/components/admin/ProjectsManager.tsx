"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import { Edit, Trash2, GripVertical, CheckCircle2, X, Calendar, User } from "lucide-react";
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

import { updateProjectOrder, toggleProjectHomeStatus, deleteProject } from "@/lib/actions";

// --- Sortable Table Row ---
function SortableProjectRow({ project, isPending }: { project: any, isPending: boolean }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: project.id });

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
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <p className="font-semibold text-admin-text">{project.title}</p>
          {project.showOnHome && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-[#00c2ff]/20 text-[#00c2ff]">
              <CheckCircle2 size={10} /> Home
            </span>
          )}
        </div>
        <p className="text-xs text-admin-muted mt-0.5 line-clamp-1">{project.description}</p>
      </td>
      <td className="px-6 py-4">
        <span className="flex items-center gap-1.5 text-admin-muted">
          <User size={13} />
          {project.client || "—"}
        </span>
      </td>
      <td className="px-6 py-4">
        <div className="flex flex-wrap gap-1">
          {(project.tags || "").split(",").filter((tag: string) => tag.trim() !== "").slice(0, 2).map((tag: string) => (
            <span key={tag} className="px-2 py-0.5 rounded-full bg-[#ffbe00]/10 text-[#ffbe00] text-xs border border-[#ffbe00]/20">
              {tag.trim()}
            </span>
          ))}
        </div>
      </td>
      <td className="px-6 py-4">
        <span className="flex items-center gap-1.5 text-admin-muted text-xs">
          <Calendar size={13} />
          {new Date(project.createdAt).toLocaleDateString()}
        </span>
      </td>
      <td className="px-6 py-4 text-right">
        <div className="flex items-center justify-end gap-2">
          <Link
            href={`/admin/projects/${project.id}/edit`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-blue-600 dark:text-blue-400 hover:bg-blue-500/10 hover:text-blue-700 dark:hover:text-blue-300 border border-transparent hover:border-blue-500/20 transition-all"
          >
            <Edit size={13} /> Edit
          </Link>
          <button 
            disabled={isPending}
            onClick={async () => {
              if (confirm("Are you sure you want to delete this project?")) {
                await deleteProject(project.id);
              }
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-red-600 dark:text-red-400 hover:bg-red-500/10 hover:text-red-700 dark:hover:text-red-300 border border-transparent hover:border-red-500/20 transition-all disabled:opacity-50" 
            title="Delete"
          >
            <Trash2 size={13} /> Delete
          </button>
        </div>
      </td>
    </tr>
  );
}

// --- Droppable Home Zone ---
function HomeProjectsDropZone({ homeProjects, toggleHomeStatus, isPending }: { homeProjects: any[], toggleHomeStatus: (id: string, s: boolean) => void, isPending: boolean }) {
  const { isOver, setNodeRef } = useDroppable({
    id: 'home-projects-dropzone',
  });

  return (
    <div 
      ref={setNodeRef}
      className={`mt-12 mb-8 p-6 rounded-2xl border-2 border-dashed transition-all duration-300 ${isOver ? 'border-[#00c2ff] bg-[#00c2ff]/5 scale-[1.02]' : 'border-admin-border bg-admin-card/50'}`}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-xl font-bold text-admin-text">Home Page Selected Case Studies</h2>
          <p className="text-sm text-admin-muted mt-1">Drag case studies here to feature them on the home page (Max 3 shown).</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {homeProjects.map((project) => (
          <div key={project.id} className="bg-admin-card p-4 rounded-xl border border-[#00c2ff]/30 shadow-[0_0_15px_rgba(0,194,255,0.1)] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-16 h-16 bg-[#00c2ff]/10 rounded-full blur-xl"></div>
            <h3 className="font-bold text-admin-text text-lg relative z-10">{project.title}</h3>
            <p className="text-sm text-muted mt-1 truncate relative z-10">{project.description}</p>
            <div className="mt-4 flex justify-between items-center relative z-10">
              <span className="text-xs px-2 py-1 bg-[#00c2ff]/20 text-[#00c2ff] rounded-full font-medium flex items-center gap-1">
                <CheckCircle2 size={12} /> Selected
              </span>
              <button 
                onClick={() => toggleHomeStatus(project.id, false)}
                disabled={isPending}
                className="text-xs text-red-400 hover:text-red-300 transition-colors flex items-center gap-1 disabled:opacity-50"
              >
                <X size={12} /> Remove
              </button>
            </div>
          </div>
        ))}
        {homeProjects.length === 0 && (
          <div className="col-span-1 md:col-span-3 py-8 text-center text-muted border border-dashed border-admin-border rounded-xl">
            No case studies selected for home page. Drag a project here to add it.
          </div>
        )}
      </div>
    </div>
  );
}

// --- Main Manager Component ---
export function ProjectsManager({ initialProjects }: { initialProjects: any[] }) {
  const [projects, setProjects] = useState(initialProjects);
  const [isPending, startTransition] = useTransition();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const homeProjects = projects.filter(p => p.showOnHome);

  const toggleHomeStatus = (id: string, showOnHome: boolean) => {
    setProjects(items => 
      items.map(item => item.id === id ? { ...item, showOnHome } : item)
    );
    startTransition(async () => {
      await toggleProjectHomeStatus(id, showOnHome);
    });
  };

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    
    if (!over) return;

    // Check if dropped on the home page dropzone
    if (over.id === 'home-projects-dropzone') {
      const draggedProject = projects.find(p => p.id === active.id);
      if (draggedProject && !draggedProject.showOnHome) {
        toggleHomeStatus(active.id as string, true);
      }
      return; 
    }

    // Reordering within the list
    if (active.id !== over.id) {
      const oldIndex = projects.findIndex((p) => p.id === active.id);
      const newIndex = projects.findIndex((p) => p.id === over.id);
      
      const newOrder = arrayMove(projects, oldIndex, newIndex);
      setProjects(newOrder);
      
      startTransition(async () => {
        await updateProjectOrder(newOrder.map(p => p.id));
      });
    }
  }

  return (
    <DndContext 
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="bg-admin-card rounded-2xl border border-admin-border overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-admin-muted">
            <thead className="bg-black/10 dark:bg-black/20 text-xs uppercase text-admin-text/50 tracking-wider">
              <tr>
                <th className="py-4 px-4 w-10"></th>
                <th className="px-6 py-4">Project</th>
                <th className="px-6 py-4">Client</th>
                <th className="px-6 py-4">Tags</th>
                <th className="px-6 py-4">Added</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              <SortableContext 
                items={projects.map(p => p.id)}
                strategy={verticalListSortingStrategy}
              >
                {projects.map((project) => (
                  <SortableProjectRow key={project.id} project={project} isPending={isPending} />
                ))}
              </SortableContext>
            </tbody>
          </table>
        </div>
      </div>

      <HomeProjectsDropZone 
        homeProjects={homeProjects} 
        toggleHomeStatus={toggleHomeStatus} 
        isPending={isPending} 
      />
    </DndContext>
  );
}
