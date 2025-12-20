'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const projects = [
  {
    id: 1,
    title: 'SpendSight',
    category: 'FinTech AI Pipeline',
    year: '2025',
    description: 'Hybrid AI pipeline that parses financial PDFs, classifies transactions through Regex → MiniLM → LLM stages, and generates RAG-powered insights with multi-bank support.',
    services: ['AI/ML', 'OCR', 'RAG', 'Database'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&q=80',
    color: '#4F46E5',
    github: 'https://github.com/Zenoguy/SpendSight_',
    live: ''
  },
  {
    id: 2,
    title: 'Data Wiper',
    category: 'Security Toolkit',
    year: '2025',
    description: 'Enterprise-grade secure drive sanitization with zero-fill and AES-128 encryption wipes. Features partition backup, verification system, and compliance certificates.',
    services: ['Linux', 'Cryptography', 'Security'],
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1920&q=80',
    color: '#EC4899',
    github: 'https://github.com/Zenoguy/data_wiping_linux',
    live: '' // Add your live demo link here
  },
  {
    id: 3,
    title: 'Leaf Disease Segmenter',
    category: 'Computer Vision Research',
    year: '2025',
    description: 'Hierarchical panoptic segmentation using ConvNeXt-Tiny for plant health monitoring. Dual-headed architecture with custom loss functions achieving 0.72 F1 score.',
    services: ['PyTorch', 'CNN', 'Research'],
    image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=1920&q=80',
    color: '#10B981',
    github: 'https://github.com/Zenoguy/Panoptic_Segmentation',
    live: '' // Add your live demo link here
  },
  {
    id: 4,
    title: 'ChatApp',
    category: 'Desktop Messaging',
    year: '2025',
    description: 'Real-time chat application built with Java Swing, Sockets, and MySQL. Features message persistence, modern GUI, and timestamped messaging with custom UI.',
    services: ['Java', 'Sockets', 'MySQL'],
    image: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=1920&q=80',
    color: '#F59E0B',
    github: 'https://github.com/Zenoguy/ChatApp-Java',
    live: '' // Add your live demo link here
  },
  {
    id: 5,
    title: 'Space Shooters',
    category: 'Arcade Game',
    year: '2025',
    description: 'Classic arcade-style space shooter with Pygame featuring multiple enemy types, progressive difficulty, power-ups, health system, and full audio integration.',
    services: ['Python', 'Pygame', 'Game Dev'],
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1920&q=80',
    color: '#8B5CF6',
    github: 'https://github.com/Zenoguy/Space_Shooters',
    live: 'https://zenoguy.itch.io/space-shooters-concept-game'
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  return (
    <motion.div
      ref={cardRef}
      style={{ opacity, scale }}
      className="min-h-screen flex items-center justify-center px-6 md:px-12 py-20 relative"
    >
      <div className="max-w-7xl w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          
          {/* Image side */}
          <motion.div
            style={{ y: index % 2 === 0 ? y : undefined }}
            className={`relative aspect-[4/5] rounded-2xl overflow-hidden ${index % 2 === 1 ? 'lg:order-2' : ''}`}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
          >
            <motion.div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${project.image})` }}
              animate={{ scale: isHovered ? 1.1 : 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
            <motion.div
              className="absolute inset-0"
              style={{ backgroundColor: project.color }}
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 0.15 : 0 }}
              transition={{ duration: 0.4 }}
            />
            
            {/* Number overlay */}
            <div className="absolute top-8 left-8 text-foreground/10 text-9xl font-bold leading-none">
              {String(index + 1).padStart(2, '0')}
            </div>
          </motion.div>

          {/* Content side */}
          <motion.div
            style={{ y: index % 2 === 1 ? y : undefined }}
            className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: false, margin: '-100px' }}
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm text-muted-foreground uppercase tracking-widest">
                  {project.category}
                </span>
                <span className="w-12 h-px bg-border" />
                <span className="text-sm text-muted-foreground">{project.year}</span>
              </div>

              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-none">
                {project.title}
              </h2>

              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                {project.description}
              </p>

              <div className="space-y-4 mb-10">
                <div className="text-sm text-muted-foreground uppercase tracking-widest mb-3">
                  Key Features
                </div>
                <div className="flex flex-wrap gap-3">
                  {project.services.map((service) => (
                    <span
                      key={service}
                      className="px-4 py-2 bg-background/50 backdrop-blur-sm border border-border rounded-full text-sm text-foreground"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 flex-wrap">
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 10 }}
                  className="group flex items-center gap-3 text-foreground text-lg font-medium"
                >
                  <span>View on GitHub</span>
                  <motion.span
                    className="text-2xl"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    →
                  </motion.span>
                </motion.a>

                <motion.a
                  href={project.live || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-3 rounded-full text-sm font-bold transition-opacity ${
                    project.live 
                      ? 'bg-foreground text-background hover:opacity-90' 
                      : 'bg-muted text-muted-foreground cursor-not-allowed opacity-50'
                  }`}
                  onClick={(e) => {
                    if (!project.live) {
                      e.preventDefault();
                    }
                  }}
                >
                  {project.live ? 'View Live Demo' : 'Live Demo Coming Soon'}
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);

  return (
    <div ref={containerRef} className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '100px 100px'
        }} />
      </div>

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 text-center px-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="mb-6"
        >
          <span className="text-sm md:text-base text-neutral-500 dark:text-neutral-400 uppercase tracking-[0.3em]">
            Projects 2k25
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
          className="mt-6 text-6xl md:text-8xl lg:text-9xl font-bold text-foreground leading-none">
          Selected
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
            Works
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
          className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
        >
          From AI pipelines to game development, explore projects that solve real problems with elegant code
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 text-muted-foreground text-sm"
        >
          <span className="uppercase tracking-widest">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-muted-foreground to-transparent" />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <div className="relative min-h-screen">
      <Hero />

      {projects.map((project, index) => (
        <ProjectCard key={project.id} project={project} index={index} />
      ))}

      {/* CTA Section */}
      <section className="relative py-32 px-6 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Have a project in mind?
          </h2>
          <p className="text-xl text-muted-foreground mb-12">
            Let's create something extraordinary together
          </p>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-12 py-5 bg-foreground text-background text-lg font-semibold rounded-full hover:opacity-90 transition-opacity"
          >
            Get in Touch
          </motion.a>
        </motion.div>
      </section>
    </div>
  );
}