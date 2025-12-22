"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Orb from "@/components/ui/Orb";
import FloatingMusicButton from "@/components/FloatingMusicButton";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showIntro, setShowIntro] = useState(true);
  const [mountOrb, setMountOrb] = useState(false);

  useEffect(() => {
    // Let the browser paint FIRST
    requestAnimationFrame(() => {
      setMountOrb(true);
    });

    // Fade intro quickly (does NOT block content)
    const t = setTimeout(() => {
      setShowIntro(false);
    }, 600);

    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* ================= ORB (POST-PAINT) ================= */}
      {mountOrb && (
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]">
            <Orb
              hoverIntensity={0.6}
              rotateOnHover
              hue={0}
              forceHoverState={false}
            />
          </div>
        </div>
      )}

      {/* ================= INTRO OVERLAY (NON-BLOCKING) ================= */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed inset-0 z-10 pointer-events-none bg-black/40 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* ================= CONTENT ================= */}
      <div className="relative z-20">{children}</div>

      {/* ================= FLOATING MUSIC BUTTON ================= */}
      <FloatingMusicButton musicSrc="/audio/BG1.mp3" />
    </div>
  );
}