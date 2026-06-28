"use client";

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Project } from '@/lib/data/projects';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
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
