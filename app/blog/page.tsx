'use client';

import { motion } from 'framer-motion';
import { blogs } from '@/lib/data/blogs';
import BlogHero from '@/components/sections/blog/BlogHero';
import FeaturedArticle from '@/components/sections/blog/FeaturedArticle';
import ArticleCard from '@/components/sections/blog/ArticleCard';

export default function BlogsPage() {
  const featuredBlog = blogs[0];
  const remainingBlogs = blogs.slice(1);

  return (
    <div className="relative min-h-screen">
      <BlogHero />
      
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
          </div>
        </motion.div>
      </section>
    </div>
  );
}