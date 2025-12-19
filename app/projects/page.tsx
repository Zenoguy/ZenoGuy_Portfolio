'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const projects = [
  {
    id: 1,
    title: 'Ethereal',
    category: 'E-commerce Platform',
    year: '2024',
    description: 'A luxury fashion platform merging AI personalization with immersive 3D visualization.',
    services: ['Creative Direction', 'Development', '3D Design'],
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1920&q=80',
    color: '#4F46E5'
  },
  {
    id: 2,
    title: 'Neural Canvas',
    category: 'AI Art Platform',
    year: '2024',
    description: 'Where human creativity meets machine learning in real-time artistic collaboration.',
    services: ['AI Integration', 'UX Design', 'Frontend'],
    image: 'https://images.unsplash.com/photo-1618172193622-ae2d025f4032?w=1920&q=80',
    color: '#EC4899'
  },
  {
    id: 3,
    title: 'Kinetic',
    category: 'Motion Studio',
    year: '2024',
    description: 'Physics-based interactions and generative art responding to user movement.',
    services: ['Motion Design', 'WebGL', 'Interactive'],
    image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=1920&q=80',
    color: '#10B981'
  },
  {
    id: 4,
    title: 'Apex Finance',
    category: 'FinTech Dashboard',
    year: '2024',
    description: 'A sophisticated trading terminal with real-time data visualization.',
    services: ['Data Viz', 'Real-time', 'Dashboard'],
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1920&q=80',
    color: '#F59E0B'
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
                  Services
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

              <motion.button
                whileHover={{ x: 10 }}
                className="group flex items-center gap-3 text-foreground text-lg font-medium"
              >
                <span>View Project</span>
                <motion.span
                  className="text-2xl"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  →
                </motion.span>
              </motion.button>
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
            Portfolio 2024
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
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
        >
          Crafting digital experiences that push boundaries and inspire innovation
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
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-5 bg-foreground text-background text-lg font-semibold rounded-full hover:opacity-90 transition-opacity"
          >
            Get in Touch
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
}