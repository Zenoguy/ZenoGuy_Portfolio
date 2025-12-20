"use client";

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

// Import CardSwap component (adjust path as needed)
// import CardSwap, { Card } from '@/components/ui/CardSwap';

// Placeholder CardSwap components for this example
function Card({ children }) {
  return <div className="w-full h-full">{children}</div>;
}

function CardSwap({ children, cardDistance = 60, verticalDistance = 70, delay = 3000, pauseOnHover = false }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const childrenArray = Array.isArray(children) ? children : [children];

  useEffect(() => {
    if (isPaused && pauseOnHover) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % childrenArray.length);
    }, delay);

    return () => clearInterval(interval);
  }, [isPaused, pauseOnHover, delay, childrenArray.length]);

  return (
    <div 
      className="relative w-full h-full"
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      {childrenArray.map((child, index) => {
        const offset = (index - currentIndex + childrenArray.length) % childrenArray.length;
        return (
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={false}
            animate={{
              x: offset * cardDistance,
              y: offset * verticalDistance,
              scale: 1 - offset * 0.05,
              opacity: offset === 0 ? 1 : 0.7,
              zIndex: childrenArray.length - offset,
            }}
            transition={{
              duration: 0.5,
              ease: "easeInOut"
            }}
          >
            {child}
          </motion.div>
        );
      })}
    </div>
  );
}

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
                  href="#about"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 md:px-10 md:py-5 border-2 border-foreground text-foreground text-base md:text-lg font-black rounded-full"
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
  
  const works = [
    {
      title: "SpendSight",
      subtitle: "FINTECH • AI PIPELINE • HACKATHON WINNER",
      desc: "Hybrid AI pipeline that parses financial PDFs, classifies transactions through Regex → MiniLM → LLM stages, and generates RAG-powered insights. Multi-bank support, secure storage, and real-time analytics dashboard.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
      color: "from-blue-500 to-cyan-500",
      link: "https://github.com/Zenoguy/SpendSight_"
    },
    {
      title: "E2X",
      subtitle: "LINUX • SECURITY • CRYPTOGRAPHY",
      desc: "Enterprise-grade secure drive sanitization toolkit with zero-fill and AES-128 encryption wipes. Features partition backup, verification system, and compliance certificate generation for forensic-proof data destruction.",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80",
      color: "from-purple-500 to-pink-500",
      link: "https://github.com/Zenoguy/data_wiping_linux"
    },
    {
      title: "Leaf Disease Segmenter",
      subtitle: "COMPUTER VISION • CONVNEXT • RESEARCH",
      desc: "Hierarchical panoptic segmentation model using ConvNeXt-Tiny for plant health monitoring. Dual-headed architecture detects leaf regions and disease lesions with custom loss functions, achieving 0.72 F1 score on multi-dataset fusion.",
      image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=1200&q=80",
      color: "from-green-500 to-emerald-500",
      link: "https://github.com/Zenoguy/Panoptic_Segmentation"
    },
  ];

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 lg:py-40 px-4 md:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-[1600px] mx-auto">
        
        {/* Section layout - side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 xl:gap-20 items-start mb-20 md:mb-28 lg:mb-32">
          
          {/* Left: Section header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="
              pt-6 lg:pt-10
              lg:col-span-2
              max-w-none
              lg:pr-8
            "
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.8] tracking-tighter mb-6 md:mb-8">
              <span className="block text-foreground">FEATURED</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                WORK
              </span>
            </h2>

            <div className="flex items-center gap-6 md:gap-8 mb-6 md:mb-8">
              <div className="h-1 w-20 md:w-32 bg-foreground" />
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
                Systems forged under constraints, not concepts
              </p>
            </div>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4 md:mb-6 max-w-xl">
              A selection of backend-heavy products where architecture, performance,
              and trade-offs mattered more than surface polish.
            </p>

            <p className="text-sm md:text-base text-muted-foreground/70 leading-relaxed max-w-lg">
              Built to scale, fail gracefully, and survive real users, deadlines,
              and production traffic.
            </p>
          </motion.div>

          {/* Right: CardSwap container */}
          <div
            className="
              relative 
              h-[600px] md:h-[650px] lg:h-[700px]
              lg:col-span-3
              w-full
              lg:pl-4 xl:pl-8
            "
          >
            <CardSwap
              cardDistance={40}
              verticalDistance={50}
              delay={3000}
              pauseOnHover={true}
            >
              {works.map((work, i) => (
                <Card key={work.title}>
                  <a
                    href="/projects"
                    className="group block h-full"
                  >
                    <div className="relative h-full rounded-2xl lg:rounded-3xl overflow-hidden border-2 border-border hover:border-foreground transition-all duration-300 bg-background shadow-2xl">
                      
                      {/* Background image */}
                      <div className="absolute inset-0">
                        <div 
                          className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                          style={{ backgroundImage: `url(${work.image})` }}
                        />
                        <div className={`absolute inset-0 bg-gradient-to-br ${work.color} opacity-30 group-hover:opacity-40 transition-opacity`} />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
                      </div>

                      {/* Content */}
                      <div className="relative h-full p-6 md:p-8 lg:p-10 xl:p-12 flex flex-col justify-end">
                        
                        {/* Floating number */}
                        <div className="absolute top-4 right-4 md:top-6 md:right-6 lg:top-8 lg:right-8 text-foreground/10 text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black leading-none">
                          {String(i + 1).padStart(2, '0')}
                        </div>

                        {/* Text content */}
                        <div>
                          <div className="text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.3em] text-muted-foreground font-bold mb-3 md:mb-4">
                            {work.subtitle}
                          </div>
                          <h3 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-foreground mb-4 md:mb-6 leading-none">
                            {work.title}
                          </h3>
                          <p className="text-base md:text-lg lg:text-xl text-muted-foreground mb-6 md:mb-8 leading-relaxed max-w-2xl">
                            {work.desc}
                          </p>
                          <motion.div
                            className="flex items-center gap-2 md:gap-3 text-foreground font-black text-lg md:text-xl"
                            whileHover={{ x: 5 }}
                          >
                            <span>VIEW PROJECT</span>
                            <span>→</span>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </a>
                </Card>
              ))}
            </CardSwap>
          </div>
        </div>

        {/* View all CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.a
            href="/projects"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-10 py-4 md:px-14 md:py-5 lg:px-16 lg:py-6 border-3 md:border-4 border-foreground text-foreground text-lg md:text-xl lg:text-2xl font-black rounded-full hover:bg-foreground hover:text-background transition-all"
          >
            ALL PROJECTS
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

function SkillsSection() {
  const [activeSkill, setActiveSkill] = useState(null);

  const skills = [
    {
      id: 'ai-ml',
      category: "AI & Machine Learning",
      icon: "/images/ai-svgrepo-com.svg",
      tags: ['AI/ML', 'OCR', 'RAG', 'PyTorch', 'CNN', 'Research'],
      capabilities: [
        "Deep Learning & Neural Networks",
        "Computer Vision (ConvNeXt, Segmentation)",
        "NLP & RAG Pipelines",
        "Model Training & Optimization"
      ],
      projectIds: [1, 3]
    },
    {
      id: 'backend',
      category: "Backend & Systems",
      icon: "/images/coding-terminal-svgrepo-com.svg",
      tags: ['Python', 'Java', 'Database', 'MySQL', 'Sockets'],
      capabilities: [
        "Python & Java Backend Systems",
        "Database Design & Management",
        "Real-time Communication (Sockets)",
        "API Design & Integration"
      ],
      projectIds: [1, 2, 4]
    },
    {
      id: 'linux',
      category: "Security & Linux",
      icon: "/images/linux-svgrepo-com.svg",
      tags: ['Linux', 'Cryptography', 'Security'],
      capabilities: [
        "Linux System Administration",
        "Cryptography & Data Security",
        "Secure Data Handling",
        "Compliance & Verification Systems"
      ],
      projectIds: [2]
    },
    {
      id: 'frontend',
      category: "Frontend Development",
      icon: "/images/coding-website-svgrepo-com.svg",
      tags: ['React', 'Next.js', 'UI/UX', 'Java Swing'],
      capabilities: [
        "Modern Frontend Frameworks",
        "Responsive Web Design",
        "Desktop Application Design",
        "Animation & User Experience"
      ],
      projectIds: [4]
    },
    {
      id: 'gamedev',
      category: "Game Development",
      icon: "/images/game-controller-round-799-svgrepo-com.svg",
      tags: ['Pygame', 'Game Dev', 'Physics'],
      capabilities: [
        "Game Mechanics & Physics",
        "Interactive Gameplay Systems",
        "Animation & Visual Effects",
        "Audio Integration"
      ],
      projectIds: [5]
    }
  ];

  const projects = [
    {
      id: 1,
      title: 'SpendSight',
      category: 'FinTech AI Pipeline',
      description: 'Hybrid AI pipeline parsing financial PDFs with Regex → MiniLM → LLM stages',
      tags: ['AI/ML', 'OCR', 'RAG', 'Database'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
      color: '#4F46E5',
      github: 'https://github.com/Zenoguy/SpendSight_',
      live: 'https://spendsight.netlify.app/'
    },
    {
      id: 2,
      title: 'Data Wiper',
      category: 'Security Toolkit',
      description: 'Enterprise-grade secure drive sanitization with AES-128 encryption',
      tags: ['Linux', 'Cryptography', 'Security'],
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
      color: '#EC4899',
      github: 'https://github.com/Zenoguy/data_wiping_linux',
      live: 'https://e2-x-fontend-paql.vercel.app/'
    },
    {
      id: 3,
      title: 'Leaf Disease Segmenter',
      category: 'Computer Vision',
      description: 'ConvNeXt-Tiny panoptic segmentation achieving 0.72 F1 score',
      tags: ['PyTorch', 'CNN', 'Research'],
      image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800&q=80',
      color: '#10B981',
      github: 'https://github.com/Zenoguy/Panoptic_Segmentation',
      live: null
    },
    {
      id: 4,
      title: 'ChatApp',
      category: 'Desktop Messaging',
      description: 'Real-time chat with Java Swing, Sockets, and MySQL persistence',
      tags: ['Java', 'Sockets', 'MySQL'],
      image: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=800&q=80',
      color: '#F59E0B',
      github: 'https://github.com/Zenoguy/ChatApp-Java',
      live: null
    },
    {
      id: 5,
      title: 'Space Shooters',
      category: 'Arcade Game',
      description: 'Classic space shooter with progressive difficulty and power-ups',
      tags: ['Python', 'Pygame', 'Game Dev'],
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80',
      color: '#8B5CF6',
      github: 'https://github.com/Zenoguy/Space_Shooters',
      live: 'https://zenoguy.itch.io/space-shooters-concept-game'
    },
  ];

  const filteredProjects = activeSkill
    ? projects.filter(p => activeSkill.projectIds.includes(p.id))
    : projects;

  return (
    <section className="relative py-40 px-6 overflow-hidden">
      
      <div className="relative max-w-7xl mx-auto">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <h2 className="text-6xl md:text-7xl lg:text-8xl font-black leading-[0.85] mb-8">
            <span className="block text-foreground">SKILLS</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">IN ACTION</span>
          </h2>
          <div className="flex items-center gap-8">
            <div className="h-1 w-32 bg-foreground" />
            <p className="text-xl text-muted-foreground">
              {activeSkill ? `Showing projects using ${activeSkill.category}` : 'Click on skills to see related projects'}
            </p>
          </div>
        </motion.div>

        {/* Split Layout */}
        <div className="grid lg:grid-cols-5 gap-8">
          
          {/* LEFT: Skills Column */}
          <div className="lg:col-span-2 space-y-4">
            {skills.map((skill, i) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                onClick={() => setActiveSkill(activeSkill?.id === skill.id ? null : skill)}
                className={`group relative p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
                  activeSkill?.id === skill.id
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-border hover:border-blue-500/30 bg-card'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12">
                    <img 
                      src={skill.icon}
                      alt={skill.category}
                      className="w-full h-full transition-all duration-300"
                      style={{ 
                        filter: activeSkill?.id === skill.id 
                          ? 'brightness(0) saturate(100%) invert(47%) sepia(96%) saturate(1229%) hue-rotate(192deg) brightness(103%) contrast(101%)'
                          : 'brightness(0) saturate(100%) invert(47%) sepia(96%) saturate(1229%) hue-rotate(192deg) brightness(103%) contrast(101%)'
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-xl font-bold mb-2 transition-colors ${
                      activeSkill?.id === skill.id ? 'text-blue-400' : 'text-foreground'
                    }`}>
                      {skill.category}
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {skill.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {skill.capabilities.slice(0, 2).map((cap, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-blue-500 mt-0.5">→</span>
                          <span>{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Active indicator */}
                {activeSkill?.id === skill.id && (
                  <motion.div
                    layoutId="activeSkill"
                    className="absolute inset-0 border-2 border-blue-500 rounded-2xl pointer-events-none"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.div>
            ))}
          </div>

          {/* RIGHT: Projects Column */}
          <div className="lg:col-span-3">
            <div className="sticky top-8">
              <motion.div
                key={activeSkill?.id || 'all'}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                {filteredProjects.map((project, i) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    whileHover={{ x: 5, transition: { duration: 0.2 } }}
                    className="group relative p-6 rounded-2xl border-2 border-border hover:border-blue-500/50 bg-card backdrop-blur-sm transition-all duration-300 overflow-hidden"
                  >
                    {/* Background gradient on hover */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                      style={{ background: `linear-gradient(135deg, ${project.color}00, ${project.color})` }}
                    />

                    <div className="relative flex gap-4">
                      {/* Project thumbnail */}
                      <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 border border-border">
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>

                      {/* Project info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="text-2xl font-black text-foreground group-hover:text-blue-400 transition-colors">
                            {project.title}
                          </h4>
                          <span className="text-muted-foreground text-sm flex-shrink-0 ml-2">
                            #{project.id}
                          </span>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {project.tags.map(tag => (
                            <span 
                              key={tag} 
                              className="text-xs px-3 py-1 rounded-full bg-muted text-foreground border border-border"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Links */}
                        <div className="flex gap-4 mt-4">
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-400 font-bold flex items-center gap-1 hover:text-blue-300"
                          >
                            VIEW CODE →
                          </a>
                          {project.live && (
                            <a 
                              href={project.live}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-purple-400 font-bold flex items-center gap-1 hover:text-purple-300"
                            >
                              LIVE DEMO →
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <motion.a
            href="/projects"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-12 py-5 border-2 border-foreground text-foreground text-lg font-black rounded-full hover:bg-foreground hover:text-background transition-all"
          >
            VIEW ALL PROJECTS
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
            {/* Background image */}
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1200&q=80"
                alt="Blog post"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Dark overlay for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 mix-blend-overlay" />
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
      <SkillsSection />
      <BlogTeaser />
      <ContactCTA />
    </div>
  );
}