"use client";

import { motion } from 'framer-motion';

export default function BlogCTA() {
  return (
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
  );
}
