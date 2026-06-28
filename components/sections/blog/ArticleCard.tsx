"use client";

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Blog } from '@/lib/data/blogs';

interface ArticleCardProps {
  blog: Blog;
  index: number;
}

export default function ArticleCard({ blog, index }: ArticleCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [-2, 0, 2]);

  const handleClick = () => {
    window.open(blog.url, '_blank');
  };

  return (
    <motion.article
      ref={cardRef}
      style={{ 
        y: index % 2 === 0 ? y : undefined,
        rotate: index % 2 === 0 ? rotate : undefined
      }}
      className="relative cursor-pointer group"
      onClick={handleClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
        {/* Image */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${blog.image})` }}
          animate={{ scale: isHovered ? 1.08 : 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent opacity-90" />

        {/* Content */}
        <div className="absolute inset-0 p-8 flex flex-col justify-end">
          {/* Category */}
          <span className="inline-block self-start px-3 py-1 bg-foreground text-background text-xs font-bold uppercase tracking-widest rounded-full mb-4">
            {blog.category}
          </span>

          {/* Title */}
          <h3 className="text-3xl md:text-4xl font-black text-foreground mb-3 leading-tight">
            {blog.title}
          </h3>

          {/* Meta */}
          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
            <span>{blog.date}</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground" />
            <span>{blog.readTime}</span>
          </div>

          {/* Read more */}
          <motion.div
            className="flex items-center gap-2 text-foreground font-bold"
            animate={{ x: isHovered ? 5 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <span>Read More</span>
            <span className="text-xl">→</span>
          </motion.div>
        </div>
      </div>
    </motion.article>
  );
}
