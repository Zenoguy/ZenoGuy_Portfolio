"use client";

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Blog } from '@/lib/data/blogs';

interface FeaturedArticleProps {
  blog: Blog;
}

export default function FeaturedArticle({ blog }: FeaturedArticleProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['-20%', '20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [1.2, 1, 1, 1.2]);

  const handleClick = () => {
    window.open(blog.url, '_blank');
  };

  return (
    <motion.section
      ref={sectionRef}
      style={{ opacity }}
      className="relative h-screen flex items-center cursor-pointer"
      onClick={handleClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Full-screen image background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0 w-full h-[120%]"
          style={{ y: imageY, scale }}
        >
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${blog.image})` }}
          />
        </motion.div>
        
        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* Category badge */}
          <motion.div
            className="inline-block mb-6"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <span className="px-4 py-2 bg-foreground text-background text-xs uppercase tracking-widest font-bold rounded-full">
              {blog.category}
            </span>
          </motion.div>

          {/* Title - MASSIVE */}
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-foreground mb-6 leading-[0.95] max-w-5xl">
            {blog.title}
          </h2>

          {/* Excerpt */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl leading-relaxed">
            {blog.excerpt}
          </p>

          {/* Meta + CTA */}
          <div className="flex flex-wrap items-center gap-6 md:gap-8">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>{blog.date}</span>
              <span className="w-1 h-1 rounded-full bg-muted-foreground" />
              <span>{blog.readTime}</span>
            </div>
            
            <motion.div
              className="flex items-center gap-3 text-foreground font-bold text-lg"
              animate={{ x: isHovered ? 10 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <span>Read Article</span>
              <motion.span
                className="text-2xl"
                animate={{ x: isHovered ? 5 : 0 }}
                transition={{ duration: 0.3 }}
              >
                →
              </motion.span>
            </motion.div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-3 mt-8">
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 border border-border text-xs text-muted-foreground rounded-full uppercase tracking-wider"
              >
                #{tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
