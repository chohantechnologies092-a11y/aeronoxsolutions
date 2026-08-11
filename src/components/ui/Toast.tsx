"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, X } from "lucide-react";
import { useEffect } from "react";

type ToastProps = {
  message: string;
  type: "success" | "error";
  isVisible: boolean;
  onClose: () => void;
};

export function Toast({ message, type, isVisible, onClose }: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={`fixed bottom-6 right-6 z-[100] flex max-w-md items-center gap-3.5 rounded-2xl p-4 shadow-2xl backdrop-blur-2xl border ${
            type === "success"
              ? "bg-[#1a1122]/95 border-emerald-500/40 shadow-emerald-950/40"
              : "bg-[#1a1122]/95 border-red-500/40 shadow-red-950/40"
          }`}
        >
          {type === "success" ? (
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0 border border-emerald-500/30">
              <CheckCircle2 className="h-5 w-5 text-emerald-400" />
            </div>
          ) : (
            <div className="w-8 h-8 rounded-xl bg-red-500/20 flex items-center justify-center shrink-0 border border-red-500/30">
              <AlertCircle className="h-5 w-5 text-red-400" />
            </div>
          )}
          <p className="text-xs sm:text-sm font-bold text-white leading-snug">{message}</p>
          <button
            type="button"
            onClick={onClose}
            className="ml-auto rounded-lg p-1.5 text-white/60 transition-colors hover:text-white hover:bg-white/10"
            aria-label="Dismiss notification"
          >
            <X className="h-4 w-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
