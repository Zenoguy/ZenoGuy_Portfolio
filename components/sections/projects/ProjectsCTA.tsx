"use client";

import { motion } from 'framer-motion';

export default function ProjectsCTA() {
  return (
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
  );
}
