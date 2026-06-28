"use client";

import { motion } from 'framer-motion';

export default function ContactCTA() {
  return (
    <section className="relative py-60 px-6 overflow-hidden">
      {/* Animated background */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
      />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="relative max-w-6xl mx-auto text-center"
      >
        <h2 className="text-7xl md:text-9xl lg:text-[12rem] font-black leading-[0.8] mb-16">
          <span className="block text-foreground">LET'S</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
            TALK
          </span>
        </h2>

        <p className="text-2xl md:text-3xl text-muted-foreground mb-16 max-w-3xl mx-auto">
          Got a wild idea? Need someone who can code and design? Let's make it happen.
        </p>

        <motion.a
          href="/contact"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block px-20 py-8 bg-foreground text-background text-2xl font-black rounded-full hover:opacity-90 transition-opacity"
        >
          GET IN TOUCH
        </motion.a>
      </motion.div>
    </section>
  );
}
