'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const blogs = [
  {
    id: 1,
    title: 'My First Hackathon – 24 Hours, 1 Fintech App, 0 Sleep',
    excerpt: 'Built SpendSight — a fintech app that turns horrendous PDF bank statements into clean, categorized insights. Won a Special Mention Award. No sleep. Worth it.',
    category: 'Hackathon',
    readTime: '3 min read',
    date: 'Jul 23, 2025',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&q=80',
    tags: ['hackathon', 'fintech', 'python', 'react'],
  },
  {
    id: 2,
    title: 'I Made a Java Chat App in One Night (Because I Had No Projects)',
    excerpt: 'So like any rational dev in a crunch, I built a full 1-on-1 chat app in Java using Sockets, JDBC, and Swing (yes, I suffered).',
    category: 'DevLog',
    readTime: '2 min read',
    date: 'Jun 26, 2025',
    image: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=1200&q=80',
    tags: ['java', 'mysql', 'networking', 'devlog'],
  },
  {
    id: 3,
    title: 'So I Decided to Learn Vim… and I Kinda Get the Hype Now?',
    excerpt: 'Around day 3 or 4, I stopped trying to fight Vim. Made a cheat sheet because tabs, splits, and buffers were bouncing around like uncompiled code.',
    category: 'Tools',
    readTime: '2 min read',
    date: 'Jun 18, 2025',
    image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=1200&q=80',
    tags: ['vim', 'beginners', 'cli', 'programming'],
  },
  {
    id: 4,
    title: 'Apple Just Buffed Dev Tools',
    excerpt: 'WWDC 2025 happened. Apple quietly fixed a bunch of stuff that actually matters to developers. Native Linux containers on macOS? Game-changer.',
    category: 'Dev Tools',
    readTime: '3 min read',
    date: 'Jun 16, 2025',
    image: 'https://images.unsplash.com/photo-1621768216002-5ac171876625?w=1200&q=80',
    tags: ['apple', 'devtool', 'linux', 'ai'],
  },
  {
    id: 5,
    title: '🛸 I tried Pygame (Build Space Shooters in a DAY)',
    excerpt: 'Made a space shooter in Python with Pygame. Collision detection, score tracking, and sound effects. It works. Kinda.',
    category: 'Game Dev',
    readTime: '7 min read',
    date: 'Jun 09, 2025',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&q=80',
    tags: ['python', 'pygame', 'gamedev', 'tutorial'],
  },
  {
    id: 6,
    title: 'Intro to Functional Programming',
    excerpt: 'From code chaos to mathematical zen. Exploring pure functions, immutability, and why WhatsApp uses Erlang to handle billions of messages.',
    category: 'Programming',
    readTime: '5 min read',
    date: 'Jun 04, 2025',
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1200&q=80',
    tags: ['functional', 'elixir', 'haskell', 'programming'],
  },
];

function FeaturedArticle({ blog }: { blog: typeof blogs[0] }) {
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
    window.open('https://dev.to/zenoguy', '_blank');
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

function ArticleCard({ blog, index }: { blog: typeof blogs[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [-2, 0, 2]);

  const handleClick = () => {
    window.open('https://dev.to/zenoguy', '_blank');
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

function Hero() {
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
          className="text-7xl md:text-9xl lg:text-[12rem] font-black leading-[0.85] mb-8"
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
          className="text-lg md:text-2xl text-muted-foreground max-w-3xl mx-auto font-light"
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

export default function BlogsPage() {
  const featuredBlog = blogs[0];
  const remainingBlogs = blogs.slice(1);

  return (
    <div className="relative min-h-screen">
      <Hero />
      
      {/* Featured article - full screen */}
      <FeaturedArticle blog={featuredBlog} />

      {/* Section divider */}
      <div className="relative py-32 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto"
        >
          <h2 className="text-5xl md:text-7xl font-black text-foreground mb-4">
            More Articles
          </h2>
          <div className="w-32 h-1 bg-foreground" />
        </motion.div>
      </div>

      {/* Grid of remaining articles */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {remainingBlogs.map((blog, index) => (
            <ArticleCard key={blog.id} blog={blog} index={index} />
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <section className="relative py-40 px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto text-center"
        >
          <h2 className="text-5xl md:text-8xl font-black text-foreground mb-8 leading-tight">
            Want More?
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Follow me on dev.to for weekly deep dives into code, tools, and tech experiments
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <motion.a
              href="https://dev.to/zenoguy"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-6 bg-foreground text-background text-lg font-bold rounded-full hover:opacity-90 transition-opacity"
            >
              Follow on dev.to
            </motion.a>
            
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-6 border-2 border-border text-foreground text-lg font-bold rounded-full hover:border-foreground transition-colors"
            >
              Subscribe
            </motion.button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}