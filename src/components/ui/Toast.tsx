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
          className="fixed bottom-6 right-6 z-[100] flex max-w-sm items-center gap-3 rounded-2xl border border-white/10 bg-[#080c14]/90 p-4 shadow-2xl backdrop-blur-xl"
        >
          {type === "success" ? (
            <CheckCircle2 className="h-5 w-5 shrink-0 text-[#00ff94]" />
          ) : (
            <AlertCircle className="h-5 w-5 shrink-0 text-red-500" />
          )}
          <p className="text-sm font-medium text-foreground">{message}</p>
          <button
            type="button"
            onClick={onClose}
            className="ml-auto rounded-lg p-1 text-muted transition-colors hover:text-white"
            aria-label="Dismiss notification"
          >
            <X className="h-4 w-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
