"use client";

import { motion } from 'framer-motion';
import HeroSection from '@/components/HeroSection';
import FeaturedWork from '@/components/FeaturedWork';
import SkillsSection from '@/components/skillsSection';

function MarqueeSection() {
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

function BlogTeaser() {
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

          {/* Right: Latest article preview */}
          <motion.a
            href="https://dev.to/zenoguy"
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
                src="https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1200&q=80"
                alt="Blog post"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Dark overlay for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 mix-blend-overlay" />
            <div className="relative p-12 h-full flex flex-col justify-between">
              <div>
                <span className="inline-block px-4 py-2 bg-foreground text-background text-xs font-black uppercase tracking-widest rounded-full mb-6">
                  Latest Post
                </span>
                <h3 className="text-4xl font-black text-foreground mb-4 leading-tight">
                  My First Hackathon – 24 Hours, 1 Fintech App, 0 Sleep
                </h3>
                <p className="text-lg text-muted-foreground">
                  Built SpendSight and won a Special Mention. The full story of chaos, code, and caffeine.
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
        </div>
      </div>
    </section>
  );
}

function ContactCTA() {
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

export default function HomePage() {
  return (
    <div className="relative min-h-screen">
      <style jsx global>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
      
      <HeroSection />
      <MarqueeSection />
      <FeaturedWork />
      <SkillsSection />
      <BlogTeaser />
      <ContactCTA />
    </div>
  );
}