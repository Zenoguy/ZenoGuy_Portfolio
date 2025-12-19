"use client";

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

function HeroSection() {
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);
  const imageRotate = useTransform(scrollYProgress, [0, 1], [0, 15]);
  const imageOpacity = useTransform(scrollYProgress, [0.5, 1], [1, 0]);
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

        <div className="relative z-10 w-full max-w-[1800px] mx-auto px-6 md:px-12">
          <div className="relative">
            
            {/* Floating image - centered and smaller */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] z-10">
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
                    className="absolute inset-0 w-[400px] h-[400px] rounded-full border-2 border-blue-500/30 blur-sm"
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

                  {/* Orbiting element */}
                  <motion.div
                    animate={{
                      rotate: 360,
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    className="absolute inset-0"
                  >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full blur-xl" />
                  </motion.div>
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
                className="mb-8"
              >
                <span className="inline-block px-6 py-2 border-2 border-foreground text-foreground text-xs uppercase tracking-[0.5em] font-black rounded-full">
                  Developer / Designer
                </span>
              </motion.div>

              {/* Massive headline */}
              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="relative"
              >
                <div className="text-7xl md:text-8xl lg:text-9xl font-black leading-[0.8] tracking-tighter">
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
                className="mt-12 max-w-2xl"
              >
                <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed">
                  Turning caffeine and keystrokes into digital experiences that actually work. Sometimes.
                </p>
              </motion.div>

              {/* CTA Row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="flex flex-wrap gap-6 mt-12"
              >
                <motion.a
                  href="/projects"
                  whileHover={{ scale: 1.05, x: 10 }}
                  whileTap={{ scale: 0.95 }}
                  className="group px-10 py-5 bg-foreground text-background text-lg font-black rounded-full flex items-center gap-3"
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
                  href="#about"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-5 border-2 border-foreground text-foreground text-lg font-black rounded-full"
                  onHoverStart={() => setCursorVariant('hover')}
                  onHoverEnd={() => setCursorVariant('default')}
                >
                  ABOUT ME
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
          className="absolute bottom-12 left-12 text-muted-foreground"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex items-center gap-4"
          >
            <span className="text-xs uppercase tracking-widest rotate-180" style={{ writingMode: 'vertical-rl' }}>
              Scroll to explore
            </span>
            <div className="w-px h-20 bg-gradient-to-b from-muted-foreground to-transparent" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

function MarqueeSection() {
  const text = "REACT • NEXTJS • TYPESCRIPT • PYTHON • JAVA • DESIGN • ";
  
  return (
    <div className="relative py-20 border-y border-border overflow-hidden">
      <motion.div
        animate={{ x: [0, -1000] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="flex whitespace-nowrap"
      >
        {[...Array(10)].map((_, i) => (
          <span key={i} className="text-6xl md:text-8xl font-black text-muted-foreground/20 mx-8">
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function FeaturedWork() {
  const sectionRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const works = [
    {
      title: "SpendSight",
      subtitle: "FINTECH • HACKATHON WINNER",
      desc: "24-hour sprint. PDF chaos to clean insights. Won special mention.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Chat App",
      subtitle: "JAVA • SOCKETS • SWING",
      desc: "Built in one night because my portfolio looked empty. Worth it.",
      image: "https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=1200&q=80",
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Space Shooter",
      subtitle: "PYGAME • GAME DEV",
      desc: "Collision detection, sound effects, and surprisingly functional gameplay.",
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&q=80",
      color: "from-orange-500 to-red-500"
    },
  ];

  return (
    <section ref={sectionRef} className="relative py-40 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <h2 className="text-6xl md:text-7xl lg:text-8xl font-black leading-[0.85] mb-8">
            <span className="block text-foreground">FEATURED</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">WORK</span>
          </h2>
          <div className="flex items-center gap-8">
            <div className="h-1 w-32 bg-foreground" />
            <p className="text-xl text-muted-foreground">Projects that pushed my limits</p>
          </div>
        </motion.div>

        {/* Projects grid - staggered layout */}
        <div className="space-y-40">
          {works.map((work, i) => (
            <motion.a
              key={work.title}
              href="/projects"
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="group block"
            >
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                
                {/* Image */}
                <div className={`relative aspect-[16/10] rounded-3xl overflow-hidden ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <motion.div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${work.image})` }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${work.color} opacity-20 group-hover:opacity-30 transition-opacity`} />
                  
                  {/* Floating number */}
                  <div className="absolute top-8 right-8 text-foreground/20 text-9xl font-black leading-none">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                </div>

                {/* Content */}
                <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
                  <motion.div
                    whileHover={{ x: i % 2 === 1 ? -10 : 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-bold mb-4">
                      {work.subtitle}
                    </div>
                    <h3 className="text-4xl md:text-5xl font-black text-foreground mb-6 leading-none">
                      {work.title}
                    </h3>
                    <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                      {work.desc}
                    </p>
                    <motion.div
                      className="flex items-center gap-3 text-foreground font-black text-xl"
                      whileHover={{ x: 5 }}
                    >
                      <span>VIEW PROJECT</span>
                      <span>→</span>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* View all CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-40"
        >
          <motion.a
            href="/projects"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-16 py-6 border-4 border-foreground text-foreground text-2xl font-black rounded-full hover:bg-foreground hover:text-background transition-all"
          >
            ALL PROJECTS
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

function BlogTeaser() {
  return (
    <section className="relative py-40 px-6 overflow-hidden">
      
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-500/5 to-transparent" />
      
      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Left: Big text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[0.85] mb-8">
              <span className="block text-foreground">I ALSO</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
                WRITE
              </span>
            </h2>
            <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
              Deep dives into code, tools, and the occasional debugging nightmare turned learning opportunity.
            </p>
            <motion.a
              href="/blogs"
              whileHover={{ scale: 1.05, x: 10 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-4 text-2xl font-black text-foreground group"
            >
              <span>READ ARTICLES</span>
              <motion.span
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.a>
          </motion.div>

          {/* Right: Latest article preview */}
          <motion.a
            href="https://dev.to/zenoguy"
            target="_blank"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className="group relative aspect-[4/5] rounded-3xl overflow-hidden border-2 border-border hover:border-foreground transition-colors"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10" />
            <div className="relative p-12 h-full flex flex-col justify-between">
              <div>
                <span className="inline-block px-4 py-2 bg-foreground text-background text-xs font-black uppercase tracking-widest rounded-full mb-6">
                  Latest Post
                </span>
                <h3 className="text-4xl font-black text-foreground mb-4 leading-tight">
                  My First Hackathon – 24 Hours, 1 Fintech App, 0 Sleep
                </h3>
                <p className="text-lg text-muted-foreground">
                  Built SpendSight and won a Special Mention. The full story of chaos, code, and caffeine.
                </p>
              </div>
              <motion.div
                className="flex items-center gap-3 text-foreground font-black text-xl"
                whileHover={{ x: 5 }}
              >
                <span>READ MORE</span>
                <span>→</span>
              </motion.div>
            </div>
          </motion.a>
        </div>
      </div>
    </section>
  );
}

function ContactCTA() {
  return (
    <section className="relative py-60 px-6 overflow-hidden">
      
      {/* Animated background */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
      />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="relative max-w-6xl mx-auto text-center"
      >
        <h2 className="text-7xl md:text-9xl lg:text-[12rem] font-black leading-[0.8] mb-16">
          <span className="block text-foreground">LET'S</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
            TALK
          </span>
        </h2>

        <p className="text-2xl md:text-3xl text-muted-foreground mb-16 max-w-3xl mx-auto">
          Got a wild idea? Need someone who can code and design? Let's make it happen.
        </p>

        <motion.a
          href="/contact"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block px-20 py-8 bg-foreground text-background text-2xl font-black rounded-full hover:opacity-90 transition-opacity"
        >
          GET IN TOUCH
        </motion.a>
      </motion.div>
    </section>
  );
}

export default function HomePage() {
  return (
    <div className="relative min-h-screen">
      <style jsx global>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
      
      <HeroSection />
      <MarqueeSection />
      <FeaturedWork />
      <BlogTeaser />
      <ContactCTA />
    </div>
  );
}