"use client";

import { motion } from 'framer-motion';

export default function AnimatedHeading() {
  return (
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
  );
}
