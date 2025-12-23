"use client";

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Placeholder CardSwap components
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

export default function FeaturedWork() {
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