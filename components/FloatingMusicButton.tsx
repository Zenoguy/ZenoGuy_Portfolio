"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";

interface FloatingMusicButtonProps {
  musicSrc: string;
  className?: string;
}

const NEGLECT_DELAY = 8000; // ms before mascot complains
const REPEAT_DELAY = 12000; // ms between further complaints

export default function FloatingMusicButton({
  musicSrc,
  className = "",
}: FloatingMusicButtonProps) {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(true);
  const [audioError, setAudioError] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioSourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const mascotRef = useRef<HTMLImageElement>(null);

  const beatInterval = useRef<NodeJS.Timeout | null>(null);
  const neglectTimeout = useRef<NodeJS.Timeout | null>(null);

  /* ======================================================
     Audio setup with master gain connection
  ====================================================== */

  useEffect(() => {
    const audio = new Audio(musicSrc);

    audio.loop = true;
    audio.volume = 0.75;
    audio.preload = "auto";

    const handleError = () => {
      console.error("Audio failed to load:", audio.src);
      setAudioError(true);
    };

    const handleCanPlay = () => {
      setAudioError(false);
    };

    audio.addEventListener("error", handleError);
    audio.addEventListener("canplaythrough", handleCanPlay);

    audioRef.current = audio;

    // Connect to master gain
    const connectToMasterGain = () => {
      if (typeof window === 'undefined') return false;
      
      const audioContext = (window as any).audioContext as AudioContext;
      const masterGain = (window as any).masterGain as GainNode;

      if (audioContext && masterGain && !audioSourceRef.current) {
        try {
          // Create source node from audio element
          audioSourceRef.current = audioContext.createMediaElementSource(audio);
          
          // Connect to master gain (which controls mute/unmute)
          audioSourceRef.current.connect(masterGain);
          
          console.log('Background music connected to master gain');
          return true;
        } catch (err) {
          console.error('Failed to connect audio to master gain:', err);
        }
      }
      return false;
    };

    // Try to connect immediately
    if (!connectToMasterGain()) {
      // If not available yet, keep trying
      const interval = setInterval(() => {
        if (connectToMasterGain()) {
          clearInterval(interval);
        }
      }, 100);

      // Cleanup interval after 5 seconds
      setTimeout(() => clearInterval(interval), 5000);
    }

    return () => {
      audio.pause();
      audio.removeEventListener("error", handleError);
      audio.removeEventListener("canplaythrough", handleCanPlay);
      audioRef.current = null;
      audioSourceRef.current = null;
    };
  }, [musicSrc]);

  /* ======================================================
     Neglect-based vibration system
  ====================================================== */

  const vibrateOnce = useCallback(() => {
    if (!mascotRef.current || isMusicPlaying) return;

    gsap.killTweensOf(mascotRef.current);

    gsap.fromTo(
      mascotRef.current,
      { x: -4 },
      {
        x: 4,
        duration: 0.10,
        repeat: 8,
        yoyo: true,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.to(mascotRef.current, {
            x: 0,
            duration: 0.1,
          });
        },
      }
    );

    // schedule next nag if still ignored
    neglectTimeout.current = setTimeout(vibrateOnce, REPEAT_DELAY);
  }, [isMusicPlaying]);

  const resetNeglectTimer = useCallback(() => {
    if (neglectTimeout.current) {
      clearTimeout(neglectTimeout.current);
    }

    if (!isMusicPlaying && hasInteracted) {
      neglectTimeout.current = setTimeout(vibrateOnce, NEGLECT_DELAY);
    }
  }, [isMusicPlaying, hasInteracted, vibrateOnce]);

  useEffect(() => {
    resetNeglectTimer();
    return () => {
      if (neglectTimeout.current) {
        clearTimeout(neglectTimeout.current);
      }
    };
  }, [resetNeglectTimer]);

  /* ======================================================
     Beat animation when music plays
  ====================================================== */

  const startBeatAnimation = () => {
    if (beatInterval.current) clearInterval(beatInterval.current);

    beatInterval.current = setInterval(() => {
      if (!mascotRef.current || !isMusicPlaying) return;

      gsap.to(mascotRef.current, {
        scale: 1.1,
        rotation: -5,
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
    }, 600);
  };

  /* ======================================================
     Toggle music
  ====================================================== */

  const toggleMusic = async () => {
    if (!audioRef.current || audioError) return;

    // Resume AudioContext if suspended (browser autoplay policy)
    const audioContext = (window as any).audioContext as AudioContext;
    if (audioContext && audioContext.state === 'suspended') {
      await audioContext.resume();
    }

    resetNeglectTimer();

    if (isMusicPlaying) {
      audioRef.current.pause();
      setIsMusicPlaying(false);

      if (beatInterval.current) clearInterval(beatInterval.current);

      gsap.to(mascotRef.current, {
        scale: 1,
        rotation: 0,
        x: 0,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
      });
    } else {
      audioRef.current.play().catch(() => setAudioError(true));
      setIsMusicPlaying(true);
      setHasInteracted(true);

      gsap.killTweensOf(mascotRef.current);
      startBeatAnimation();
    }

    // click feedback
    gsap.to(mascotRef.current, {
      scale: 0.9,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
    });
  };

  /* ======================================================
     Error UI
  ====================================================== */

  if (audioError) {
    return (
      <div className="fixed bottom-8 right-8 z-50 text-xs text-red-300">
        Audio failed to load
      </div>
    );
  }

  /* ======================================================
     Render
  ====================================================== */

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed bottom-8 right-8 z-50 ${className}`}
      onMouseEnter={resetNeglectTimer}
    >
      <button
        onClick={toggleMusic}
        className="relative group focus:outline-none"
        aria-label={isMusicPlaying ? "Pause music" : "Play music"}
      >
        <div
          className={`absolute inset-0 rounded-full blur-xl ${
            isMusicPlaying
              ? "bg-cyan-400/50 opacity-60"
              : "bg-orange-400/30 opacity-30"
          }`}
        />

        <img
          ref={mascotRef}
          src="/audio/Zenoguy_512.png"
          alt="Music mascot"
          className="w-24 h-24 drop-shadow-2xl select-none"
          draggable={false}
        />
      </button>
    </motion.div>
  );
}