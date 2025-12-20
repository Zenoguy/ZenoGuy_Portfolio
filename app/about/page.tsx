"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { Code2, Database, Zap, Activity, Dumbbell, Music, Waves } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="relative">
      <Hero />
      <Systems />
      <Philosophy />
      <HobbiesSection />
      <CTA />
    </main>
  );
}

/* ------------------------------------------------------------------ */
/* HERO                                                               */
/* ------------------------------------------------------------------ */
function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section
      ref={ref}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 px-6 lg:px-24 text-center max-w-7xl"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 mb-12"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-2 h-2 rounded-full bg-primary"
          />
          <span className="text-sm font-medium tracking-wider">BACKEND ENGINEER</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-6 text-6xl md:text-8xl lg:text-9xl font-bold text-foreground leading-none"
        >
          <span className="block">I BUILD</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-pink-500">
            SYSTEMS
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 max-w-2xl mx-auto text-2xl text-muted-foreground font-light leading-relaxed"
        >
          Backend engineer obsessed with reliability, performance, and clarity.
          <br />
          <span className="text-foreground font-medium">Systems are everything.</span>
        </motion.p>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* SYSTEMS / SKILLS (BACKEND-FIRST)                                    */
/* ------------------------------------------------------------------ */
function Systems() {
  const skills = [
    { icon: Code2, label: "APIs & Service Boundaries", desc: "RESTful design, GraphQL, microservices architecture" },
    { icon: Database, label: "PostgreSQL & Optimization", desc: "Indexing strategies, query planning, performance tuning" },
    { icon: Zap, label: "Async Systems", desc: "Workers, queues, background jobs, event-driven architecture" },
    { icon: Activity, label: "Observability", desc: "Monitoring, logging, tracing, and failure recovery" },
  ];

  return (
    <section className="relative py-40 px-6 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <span className="inline-block text-xs tracking-[0.3em] text-primary font-semibold mb-6 px-4 py-2 rounded-full border border-primary/20 bg-primary/5">
            EXPERTISE
          </span>

          <h3 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
            Backend Engineering
            <br />
            <span className="text-muted-foreground font-light">as a discipline</span>
          </h3>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed font-light">
            I design and build backend systems that prioritize{" "}
            <span className="text-foreground font-medium">correctness</span>,{" "}
            <span className="text-foreground font-medium">observability</span>, and{" "}
            <span className="text-foreground font-medium">long-term maintainability</span>.
            <br />
            I care about how data moves, fails, retries, and recovers.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={skill.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="group relative p-8 rounded-2xl border border-border hover:border-primary/50 bg-card/30 backdrop-blur-sm transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300" />
                
                <div className="relative">
                  <div className="inline-flex p-4 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors mb-6">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  
                  <h4 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {skill.label}
                  </h4>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {skill.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* PHILOSOPHY                                                          */
/* ------------------------------------------------------------------ */
function Philosophy() {
  const principles = [
    "Design for failure, not just success",
    "Observability is not optional",
    "Simplicity scales better than cleverness",
    "Test what matters, not everything",
    "Performance is a feature"
  ];

  return (
    <section className="relative py-40 px-6 lg:px-24 bg-muted/20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-block text-xs tracking-[0.3em] text-primary font-semibold mb-6 px-4 py-2 rounded-full border border-primary/20 bg-primary/5">
            PRINCIPLES
          </span>
          
          <h3 className="text-5xl md:text-7xl font-black">
            How I Build
          </h3>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-6">
          {principles.map((principle, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group flex items-center gap-6 p-6 rounded-xl hover:bg-card/50 transition-colors cursor-default"
            >
              <motion.div
                className="flex-shrink-0 w-12 h-12 rounded-full border-2 border-primary/20 group-hover:border-primary flex items-center justify-center font-bold text-primary transition-colors"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.3 }}
              >
                {index + 1}
              </motion.div>
              <p className="text-2xl md:text-3xl font-semibold group-hover:text-primary transition-colors">
                {principle}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* HUMAN / HOBBIES                                                     */
/* ------------------------------------------------------------------ */

function HobbiesSection() {
  const hobbies = [
    { 
      icon: "/images/gym.svg", 
      label: "Gym Training", 
      desc: "Consistency and strength" 
    },
    { 
      icon: "/images/football-svgrepo-com.svg", 
      label: "Football", 
      desc: "Teamwork and spatial awareness" 
    },
    { 
      icon: "/images/swimming-svgrepo-com.svg", 
      label: "Swimming", 
      desc: "Control and breathing" 
    },
    { 
      icon: "/images/anime-and-manga-svgrepo-com.svg", 
      label: "Anime", 
      desc: "Stories and art that inspire" 
    },
  ];

  return (
    <section className="relative py-40 px-6 lg:px-24 bg-gradient-to-b from-background via-slate-950/20 to-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <span className="inline-block text-xs tracking-[0.3em] text-blue-500 font-semibold mb-6 px-4 py-2 rounded-full border border-blue-500/20 bg-blue-500/5">
            OUTSIDE CODE
          </span>

          <h3 className="text-5xl md:text-7xl font-black mb-8 leading-tight text-white">
            I stay human
          </h3>

          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl leading-relaxed font-light">
            Good systems are built by people who understand{" "}
            <span className="text-white font-medium">rhythm</span>,{" "}
            <span className="text-white font-medium">recovery</span>, and{" "}
            <span className="text-white font-medium">discipline</span>.
            <br />
            Outside of work, I invest in things that sharpen focus and endurance.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {hobbies.map((hobby, index) => (
            <motion.div
              key={hobby.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -12, transition: { duration: 0.2 } }}
              className="group relative p-8 rounded-2xl border border-slate-800 hover:border-blue-500/50 bg-slate-900/30 backdrop-blur-sm transition-all duration-300 text-center overflow-hidden"
            >
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-b from-blue-500/0 via-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'radial-gradient(circle at 50% 0%, rgba(59, 130, 246, 0.15), transparent 70%)'
                }}
              />
              
              <div className="relative">
                <motion.div
                  className="inline-flex p-6 rounded-2xl bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors mb-6"
                  whileHover={{ 
                    scale: 1.1,
                    rotate: [0, -5, 5, -5, 0],
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <img 
                    src={hobby.icon} 
                    alt={hobby.label}
                    className="w-12 h-12 transition-all duration-300"
                    style={{ 
                      filter: 'brightness(0) saturate(100%) invert(47%) sepia(96%) saturate(1229%) hue-rotate(192deg) brightness(103%) contrast(101%)'
                    }}
                  />
                </motion.div>
                
                <h4 className="text-xl font-bold mb-2 text-white group-hover:text-blue-400 transition-colors">
                  {hobby.label}
                </h4>
                
                <p className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                  {hobby.desc}
                </p>
              </div>

              {/* Bottom accent line */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
/* ------------------------------------------------------------------ */
/* CTA                                                                */
/* ------------------------------------------------------------------ */
function CTA() {
  return (
    <section className="relative py-40 px-6 text-center overflow-hidden">
      <motion.div
        className="absolute inset-0 -z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      </motion.div>

      <motion.h4
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight mb-8"
      >
        Let's build something
        <br />
        <span className="text-primary">that doesn't break</span>
      </motion.h4>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        viewport={{ once: true }}
        className="mt-8 text-xl md:text-2xl text-muted-foreground font-light max-w-2xl mx-auto"
      >
        If reliability matters, we&apos;ll get along.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        viewport={{ once: true }}
        className="mt-12"
      >
        <motion.a
          href="/contact"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-3 px-12 py-6 bg-primary text-primary-foreground rounded-full text-lg font-semibold group"
        >
          <span>Get in touch</span>
          <motion.svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
          >
            <path d="M4 16L16 4M16 4H8M16 4V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </motion.svg>
        </motion.a>
      </motion.div>
    </section>
  );
}