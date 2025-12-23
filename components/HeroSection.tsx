"use client";

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export default function HeroSection() {
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 3]);
  const imageRotate = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const imageOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.8], [0, -200]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const cursorX = useSpring(mousePosition.x, { stiffness: 500, damping: 28 });
  const cursorY = useSpring(mousePosition.y, { stiffness: 500, damping: 28 });

  return (
    <div ref={containerRef} className="relative h-[150vh]">
      {/* Custom cursor */}
      <motion.div
        className="fixed w-8 h-8 border-2 border-foreground rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{
          left: cursorX,
          top: cursorY,
          x: -16,
          y: -16,
        }}
        animate={{
          scale: cursorVariant === 'hover' ? 2 : 1,
        }}
      />

      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Animated grid background */}
        <motion.div 
          className="absolute inset-0 opacity-[0.02] text-foreground"
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, 100]) }}
        >
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(to right, currentColor 1px, transparent 1px),
              linear-gradient(to bottom, currentColor 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px'
          }} />
        </motion.div>

        <div className="relative z-10 w-full max-w-[1800px] mx-auto px-6 md:px-8 lg:px-12 xl:px-16">
          <div className="relative">
            
            {/* Floating image - responsive sizing */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] md:w-[320px] md:h-[320px] lg:w-[360px] lg:h-[360px] xl:w-[400px] xl:h-[400px] z-10">
              <motion.div
                style={{ 
                  scale: imageScale,
                  rotate: imageRotate,
                  opacity: imageOpacity
                }}
                onHoverStart={() => setCursorVariant('hover')}
                onHoverEnd={() => setCursorVariant('default')}
              >
                <motion.div
                  animate={{
                    y: [0, -20, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="relative"
                >
                  {/* Glowing rings */}
                  <motion.div
                    animate={{
                      scale: [1, 1.15, 1],
                      opacity: [0.3, 0, 0.3],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeOut"
                    }}
                    className="absolute inset-0 w-full h-full rounded-full border-2 border-blue-500/30 blur-sm"
                    style={{ margin: '-2px' }}
                  />
                  
                  {/* Main image */}
                  <div className="relative w-[400px] h-[400px] rounded-full overflow-hidden border-4 border-border shadow-2xl">
                    <img
                      src="/images/SG1.png"
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-purple-500/20 mix-blend-overlay" />
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Text content - overlapping layout */}
            <motion.div style={{ y: textY, opacity: textOpacity }} className="relative z-20">
              
              {/* Top line */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                className="mb-6 md:mb-8"
              >
                <span className="inline-block px-4 py-2 md:px-6 md:py-2 border-2 border-foreground text-foreground text-[10px] md:text-xs uppercase tracking-[0.3em] md:tracking-[0.5em] font-black rounded-full">
                  Developer / Designer
                </span>
              </motion.div>

              {/* Massive headline - responsive text sizes */}
              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="relative"
              >
                <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black leading-[0.8] tracking-tighter">
                  <div className="text-foreground">I BUILD</div>
                  <div className="relative inline-block">
                    <div className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-gradient">
                      WILD
                    </div>
                  </div>
                  <div className="text-foreground">IDEAS</div>
                </div>
              </motion.h1>

              {/* Bottom tagline */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="mt-8 md:mt-12 max-w-xl lg:max-w-2xl"
              >
                <p className="text-base md:text-xl lg:text-2xl text-muted-foreground font-light leading-relaxed">
                  Turning caffeine and keystrokes into digital experiences that actually work. Mostly.
                </p>
              </motion.div>

              {/* CTA Row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="flex flex-wrap gap-4 md:gap-6 mt-8 md:mt-12"
              >
                <motion.a
                  href="/projects"
                  whileHover={{ scale: 1.05, x: 10 }}
                  whileTap={{ scale: 0.95 }}
                  className="group px-8 py-4 md:px-10 md:py-5 bg-foreground text-background text-base md:text-lg font-black rounded-full flex items-center gap-3"
                  onHoverStart={() => setCursorVariant('hover')}
                  onHoverEnd={() => setCursorVariant('default')}
                >
                  <span>SEE WORK</span>
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </motion.a>

                <motion.a
                  href="/ShreyanGhosh_CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 md:px-10 md:py-5 border-2 border-foreground text-foreground text-base md:text-lg font-black rounded-full"
                  onHoverStart={() => setCursorVariant('hover')}
                  onHoverEnd={() => setCursorVariant('default')}
                >
                  VIEW RESUME
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-6 md:bottom-12 md:left-12 text-muted-foreground"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex items-center gap-4"
          >
            <span className="text-xs uppercase tracking-widest rotate-180" style={{ writingMode: 'vertical-rl' }}>
              Scroll to explore
            </span>
            <div className="w-px h-16 md:h-20 bg-gradient-to-b from-muted-foreground to-transparent" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}