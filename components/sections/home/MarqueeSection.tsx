"use client";

import { motion } from 'framer-motion';

export default function MarqueeSection() {
  const text = "REACT • NEXTJS • TYPESCRIPT • PYTHON • JAVA •  ";
  
  return (
    <div className="relative py-20 border-y border-border overflow-hidden flex items-center">
      <motion.div
        animate={{ x: [0, -1000] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="flex whitespace-nowrap"
      >
        {[...Array(10)].map((_, i) => (
          <span 
            key={i} 
            className="text-6xl md:text-8xl font-black text-muted-foreground/20 mx-8 leading-none"
          >
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
