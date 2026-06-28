"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function BlogHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  return (
    <div ref={containerRef} className="relative h-screen flex items-center justify-center overflow-hidden">
      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 text-center px-6"
      >
        {/* Overline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <span className="text-sm md:text-base text-muted-foreground uppercase tracking-[0.5em] font-bold">
            Writing & Insights
          </span>
        </motion.div>

        {/* Massive title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-6 text-6xl md:text-8xl lg:text-9xl font-bold text-foreground leading-none"
        >
          <span className="block text-foreground">BLOG</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500">
            STORIES
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-8 text-lg md:text-2xl text-muted-foreground max-w-3xl mx-auto font-light"
        >
          Code experiments, late-night builds, and lessons learned from breaking things in production
        </motion.p>

        {/* Dev.to link */}
        <motion.a
          href="https://dev.to/zenoguy"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-3 mt-12 px-10 py-5 bg-foreground text-background text-lg font-bold rounded-full hover:opacity-90 transition-opacity"
        >
          <span>Visit dev.to/zenoguy</span>
          <span className="text-xl">↗</span>
        </motion.a>
      </motion.div>

      {/* Animated background */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>
    </div>
  );
}
