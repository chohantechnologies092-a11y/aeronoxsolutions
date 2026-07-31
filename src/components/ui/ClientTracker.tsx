"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export function ClientTracker() {
  const pathname = usePathname();
  const hasTracked = useRef<Set<string>>(new Set());

  useEffect(() => {
    // Basic deduplication for React strict mode / multiple mounts
    const key = `${pathname}-${Date.now()}`;
    
    // We only track once per path change in this session
    if (pathname && !pathname.startsWith("/admin")) {
      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          path: pathname,
          referrer: document.referrer,
        }),
      }).catch(err => console.error("Tracking error:", err));
    }
  }, [pathname]);

  return null;
}
