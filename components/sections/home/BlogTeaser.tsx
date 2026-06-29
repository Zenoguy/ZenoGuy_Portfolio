"use client";

import { motion } from 'framer-motion';
import { Blog } from '@/lib/data/blogs';

interface BlogTeaserProps {
  topBlog: Blog;
}

export default function BlogTeaser({ topBlog }: BlogTeaserProps) {
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
              href="/blog"
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

          {/* Right: Top article preview */}
          {topBlog && (
            <motion.a
              href={topBlog.url}
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
                  src={topBlog.image}
                  alt={topBlog.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Dark overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 mix-blend-overlay" />
              <div className="relative p-12 h-full flex flex-col justify-between">
                <div>
                  <span className="inline-block px-4 py-2 bg-foreground text-background text-xs font-black uppercase tracking-widest rounded-full mb-6">
                    Top Article
                  </span>
                  <h3 className="text-4xl font-black text-foreground mb-4 leading-tight line-clamp-3">
                    {topBlog.title}
                  </h3>
                  <p className="text-lg text-muted-foreground line-clamp-3">
                    {topBlog.excerpt}
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
          )}
        </div>
      </div>
    </section>
  );
}
