"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";

interface FloatingMusicButtonProps {
  musicSrc: string;
  className?: string;
}

export default function FloatingMusicButton({
  musicSrc,
  className = "",
}: FloatingMusicButtonProps) {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const mascotRef = useRef<HTMLImageElement>(null);
  const beatInterval = useRef<NodeJS.Timeout | null>(null);

  // Initialize audio
  useEffect(() => {
    // Create audio element
    const audio = new Audio();
    audio.loop = true;
    audio.volume = 0.5;
    audio.preload = "auto";
    
    // Add error handler
    audio.addEventListener("error", (e) => {
      console.error("Audio error:", e);
      console.error("Audio src:", musicSrc);
      console.error("Audio error code:", audio.error?.code);
      console.error("Audio error message:", audio.error?.message);
      setAudioError(true);
    });

    // Add loaded handler
    audio.addEventListener("canplaythrough", () => {
      console.log("Audio loaded successfully");
      setAudioError(false);
    });

    // Set source AFTER event listeners
    audio.src = musicSrc;
    audioRef.current = audio;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
        audioRef.current = null;
      }
      if (beatInterval.current) {
        clearInterval(beatInterval.current);
      }
    };
  }, [musicSrc]);

  // Auto-play music on first user interaction
  useEffect(() => {
    if (!hasInteracted && !audioError) {
      const handleFirstInteraction = () => {
        if (audioRef.current && !isMusicPlaying) {
          audioRef.current.play().then(() => {
            setIsMusicPlaying(true);
            setHasInteracted(true);
            startBeatAnimation();
          }).catch((error) => {
            console.error("Autoplay error:", error);
          });
        }
      };

      document.addEventListener('click', handleFirstInteraction, { once: true });
      document.addEventListener('keydown', handleFirstInteraction, { once: true });
      document.addEventListener('touchstart', handleFirstInteraction, { once: true });

      return () => {
        document.removeEventListener('click', handleFirstInteraction);
        document.removeEventListener('keydown', handleFirstInteraction);
        document.removeEventListener('touchstart', handleFirstInteraction);
      };
    }
  }, [hasInteracted, isMusicPlaying, audioError]);

  // Idle tilt and bob animation
  useEffect(() => {
    if (mascotRef.current && !isMusicPlaying) {
      // Kill any existing animations first
      gsap.killTweensOf(mascotRef.current);
      
      // Create a timeline for combined movements
      const tl = gsap.timeline({ repeat: -1 });
      
      tl.to(mascotRef.current, {
        rotation: 12,
        y: -8,
        duration: 1.2,
        ease: "power1.inOut",
      })
      .to(mascotRef.current, {
        rotation: -12,
        y: -8,
        duration: 2.4,
        ease: "power1.inOut",
      })
      .to(mascotRef.current, {
        rotation: 0,
        y: 0,
        duration: 1.2,
        ease: "power1.inOut",
      });
      
      return () => {
        tl.kill();
      };
    }
  }, [isMusicPlaying]);

  // Beat animation when playing
  const startBeatAnimation = () => {
    if (beatInterval.current) {
      clearInterval(beatInterval.current);
    }

    beatInterval.current = setInterval(() => {
      if (mascotRef.current && isMusicPlaying) {
        gsap.to(mascotRef.current, {
          scale: 1.1,
          rotation: -5,
          duration: 0.15,
          ease: "power2.out",
          yoyo: true,
          repeat: 1,
          onComplete: () => {
            gsap.to(mascotRef.current, {
              rotation: 5,
              duration: 0.15,
              ease: "power2.out",
              yoyo: true,
              repeat: 1,
              onComplete: () => {
                gsap.to(mascotRef.current, {
                  rotation: 0,
                  duration: 0.1,
                });
              },
            });
          },
        });
      }
    }, 600);
  };

  const toggleMusic = () => {
    if (audioRef.current && !audioError) {
      if (isMusicPlaying) {
        audioRef.current.pause();
        setIsMusicPlaying(false);
        if (beatInterval.current) {
          clearInterval(beatInterval.current);
        }
        // Reset to idle animation - will be triggered by useEffect
        gsap.killTweensOf(mascotRef.current);
        gsap.to(mascotRef.current, {
          scale: 1,
          rotation: 0,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        });
      } else {
        audioRef.current.play().catch((error) => {
          console.error("Error playing audio:", error);
          setAudioError(true);
        });
        setIsMusicPlaying(true);
        setHasInteracted(true);
        
        // Kill idle animation before starting beat
        gsap.killTweensOf(mascotRef.current);
        gsap.to(mascotRef.current, {
          rotation: 0,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
          onComplete: startBeatAnimation,
        });
      }

      // Click animation
      if (mascotRef.current) {
        gsap.to(mascotRef.current, {
          scale: 0.9,
          duration: 0.1,
          yoyo: true,
          repeat: 1,
        });
      }
    }
  };

  // Show error state if audio fails
  if (audioError) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className={`fixed bottom-8 right-8 z-50 ${className}`}
      >
        <div className="bg-red-500/20 border border-red-500 rounded-lg p-3 text-red-200 text-xs max-w-[200px]">
          <div className="font-semibold mb-1">Audio Error</div>
          <div>Check console for details</div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className={`fixed bottom-8 right-8 z-50 ${className}`}
    >
      <button
        onClick={toggleMusic}
        aria-label={isMusicPlaying ? "Pause music" : "Play music"}
        className="relative group cursor-pointer focus:outline-none"
      >
        {/* Glow effect */}
        <div
          className={`absolute inset-0 rounded-full blur-xl transition-opacity duration-300 ${
            isMusicPlaying
              ? "opacity-60 bg-cyan-400/50"
              : "opacity-30 bg-orange-400/30"
          }`}
          style={{ transform: "scale(1.2)" }}
        />

        {/* Mascot */}
        <div className="relative">
          <img
            ref={mascotRef}
            src="/audio/Zenoguy_512.png"
            alt="Zenoguy Music Mascot"
            className="w-24 h-24 drop-shadow-2xl transition-all duration-300 group-hover:drop-shadow-[0_0_25px_rgba(34,211,238,0.6)]"
            draggable={false}
          />

          {/* Music notes animation when playing */}
          {isMusicPlaying && (
            <>
              <motion.div
                initial={{ opacity: 0, y: 0, x: 0 }}
                animate={{ 
                  opacity: [0, 1, 0],
                  y: -30,
                  x: -10,
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 0.3,
                }}
                className="absolute top-0 left-4 text-2xl"
              >
                ♪
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 0, x: 0 }}
                animate={{ 
                  opacity: [0, 1, 0],
                  y: -35,
                  x: 10,
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 0.5,
                  delay: 0.4,
                }}
                className="absolute top-2 right-4 text-xl"
              >
                ♫
              </motion.div>
            </>
          )}
        </div>

        {/* Tooltip */}
        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          <div className="bg-black/80 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap backdrop-blur-sm">
            {isMusicPlaying ? "Pause Music" : "Play Music"}
          </div>
        </div>
      </button>
    </motion.div>
  );
}