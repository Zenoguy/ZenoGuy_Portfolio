"use client";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import LoadingScreen from "@/components/loading-screen";
import Orb from "@/components/ui/Orb";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
    const minLoadingTime = 2000;
    const startTime = Date.now();

    const checkLoadingComplete = () => {
      const elapsedTime = Date.now() - startTime;
      if (elapsedTime >= minLoadingTime && document.readyState === "complete") {
        setIsLoading(false);
      } else {
        setTimeout(checkLoadingComplete, 100);
      }
    };

    if (document.readyState === "complete") {
      checkLoadingComplete();
    } else {
      window.addEventListener("load", checkLoadingComplete);
      return () => window.removeEventListener("load", checkLoadingComplete);
    }
  }, []);

  if (!isHydrated) return null;

  return (
    <div className="relative min-h-screen">
      {/* ================= ORB (INTERACTIVE BACKGROUND) ================= */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[6000px]">
          <Orb
            hoverIntensity={0.9}
            rotateOnHover
            hue={0}
            forceHoverState={false}
          />
        </div>
      </div>

      {/* ================= CONTENT LAYER ================= */}
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {isLoading && (
            <LoadingScreen
              key="loading"
              onLoadingComplete={() => setIsLoading(false)}
            />
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {!isLoading && <div key="content">{children}</div>}
        </AnimatePresence>
      </div>
    </div>
  );
}