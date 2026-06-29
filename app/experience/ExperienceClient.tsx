"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay },
  viewport: { once: true },
});

// Per-card accent colours for the module cards (all using a matching blue tone)
const MODULE_ACCENTS = [
  { border: "hover:border-blue-500/40",   num: "text-blue-500/10",   dot: "bg-blue-500",   hover: "group-hover:text-blue-400"   },
  { border: "hover:border-blue-500/40",   num: "text-blue-500/10",   dot: "bg-blue-500",   hover: "group-hover:text-blue-400"   },
  { border: "hover:border-blue-500/40",   num: "text-blue-500/10",   dot: "bg-blue-500",   hover: "group-hover:text-blue-400"   },
  { border: "hover:border-blue-500/40",   num: "text-blue-500/10",   dot: "bg-blue-500",   hover: "group-hover:text-blue-400"   },
];

export default function ExperienceClient() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  return (
    <div className="relative min-h-screen">

      {/* ================================================================ */}
      {/* 1. HERO — "THE HOOK"                                             */}
      {/* ================================================================ */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">

        {/* Grid background */}
        <div className="absolute inset-0 opacity-[0.02] text-foreground pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(to right, currentColor 1px, transparent 1px),
              linear-gradient(to bottom, currentColor 1px, transparent 1px)
            `,
            backgroundSize: "100px 100px"
          }} />
        </div>

        {/* Gradient blob */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.15, 0.08] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl pointer-events-none"
        />

        <motion.div style={{ y, opacity, scale }} className="relative z-10 px-6 text-center">
          {/* Badge — tighter, more tension */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-blue-500/30 bg-blue-500/5 mb-10"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-xs font-bold tracking-[0.25em] text-blue-400 uppercase">
              Internship → Production ERP
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-6xl sm:text-8xl md:text-9xl font-black leading-[0.85] tracking-tighter"
          >
            <span className="block text-foreground">FROM</span>
            <span className="block text-foreground">CLASSROOMS</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-gradient">
              TO PRODUCTION.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-10 text-xl md:text-2xl text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed"
          >
            Building enterprise ERP software — before graduating.
          </motion.p>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-8 md:left-14 text-muted-foreground"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex items-center gap-4"
          >
            <span className="text-xs uppercase tracking-widest rotate-180" style={{ writingMode: "vertical-rl" }}>
              Scroll to explore
            </span>
            <div className="w-px h-16 bg-gradient-to-b from-muted-foreground to-transparent" />
          </motion.div>
        </motion.div>
      </section>

      {/* ================================================================ */}
      {/* 2. CONTEXT — "WHERE?" + THE MISSION merged                       */}
      {/* ================================================================ */}
      <section className="relative py-40 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

            {/* Left */}
            <motion.div {...fadeUp(0)}>
              <span className="inline-block text-xs tracking-[0.3em] text-blue-500 font-semibold mb-8 px-4 py-2 rounded-full border border-blue-500/20 bg-blue-500/5">
                WHERE I WORKED
              </span>
              <h2 className="text-5xl md:text-7xl font-black leading-[0.85] tracking-tighter">
                <span className="block text-foreground">THE</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                  COMPANY.
                </span>
              </h2>
            </motion.div>

            {/* Right: context + mission merged */}
            <motion.div {...fadeUp(0.2)} className="space-y-8">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-bold mb-2">Role</p>
                <p className="text-2xl font-bold text-foreground">Software Development Intern</p>
                <p className="text-lg text-muted-foreground">Development Team Lead (Module Owner)</p>
              </div>

              <div className="h-px bg-border" />

              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-bold mb-2">Company</p>
                <p className="text-2xl font-bold text-foreground">S.N. Polymers Pvt. Ltd.</p>
                <p className="text-base text-muted-foreground mt-2 leading-relaxed">
                  An infrastructure and manufacturing company building an internal ERP platform to digitize engineering, project, and financial workflows across multiple departments.
                </p>
              </div>

              <div className="h-px bg-border" />

              {/* Mission absorbed here — no separate section */}
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-bold mb-2">The Mission</p>
                <p className="text-base text-muted-foreground leading-relaxed">
                  I joined the engineering team to help build the company's{" "}
                  <span className="text-foreground font-medium">Integrated Digital Business Platform</span>
                  {" "}— replacing fragmented paper workflows with production-grade software. Approval workflows on paper. Budget estimates crossing desks. Material orders untracked. The goal: change all of that.
                </p>
              </div>

              <div className="h-px bg-border" />

              <div className="flex gap-10">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-bold mb-2">Duration</p>
                  <p className="text-lg font-bold text-foreground">June 2026 — Present</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-bold mb-2">Location</p>
                  <p className="text-lg font-bold text-foreground">Kolkata, India</p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 3. WHAT I BUILT — colour-differentiated module cards              */}
      {/* ================================================================ */}
      <section className="relative py-40 px-6">
        <div className="max-w-7xl mx-auto">

          <motion.div {...fadeUp(0)} className="mb-24">
            <h2 className="text-6xl md:text-8xl font-black leading-[0.85] tracking-tighter mb-8">
              <span className="block text-foreground">WHAT I</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">BUILT.</span>
            </h2>
            <div className="flex items-center gap-8">
              <div className="h-1 w-32 bg-foreground" />
              <p className="text-xl text-muted-foreground">Each module solved a real operational problem.</p>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                num: "01",
                title: "Authentication & Security",
                problem: "Sessions were stored client-side, exposing tokens to script attacks.",
                what: "Rebuilt auth with HttpOnly cookies, JWT rotation, Telegram OTP, and rate-limited login routes.",
                tech: ["JWT", "Cookies", "OTP", "Rate Limiting"],
              },
              {
                num: "02",
                title: "Project Cost Estimates",
                problem: "Paper estimates moved across offices manually — no tracking, no accountability.",
                what: "Engineered a Maker-Checker state machine: draft → submit → zonal review → HO approval, with row-level DB locks preventing race conditions.",
                tech: ["Node.js", "PostgreSQL", "Express"],
              },
              {
                num: "03",
                title: "Daily Progress Reports",
                problem: "Field engineers reported progress verbally — no visual evidence, no audit trail.",
                what: "Built photo-upload APIs with Supabase Storage, validated quantities against approved estimate limits before accepting submissions.",
                tech: ["Supabase Storage", "express-validator"],
              },
              {
                num: "04",
                title: "Material Requisitions",
                problem: "Subcontractors ordered materials freely, leading to budget overruns.",
                what: "Designed SQL constraint triggers that reject orders exceeding the cost estimate scope — enforced at the database level, not just the API.",
                tech: ["PostgreSQL Triggers", "SQL Constraints"],
              },
            ].map((mod, i) => {
              const accent = MODULE_ACCENTS[i];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className={`group relative p-8 rounded-2xl border-2 border-border ${accent.border} bg-card transition-all duration-300`}
                >
                  {/* Accent dot strip on left edge */}
                  <div className={`absolute left-0 top-8 bottom-8 w-1 rounded-full ${accent.dot} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                  <div className={`absolute top-6 right-8 text-5xl font-black ${accent.num} select-none`}>{mod.num}</div>

                  <h3 className={`text-2xl font-black text-foreground mb-4 transition-colors ${accent.hover}`}>
                    {mod.title}
                  </h3>

                  <p className="text-sm text-muted-foreground mb-2">
                    <span className="text-foreground font-semibold">Problem: </span>{mod.problem}
                  </p>
                  <p className="text-sm text-muted-foreground mb-6">
                    <span className="text-blue-400 font-semibold">Solution: </span>{mod.what}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {mod.tech.map((t) => (
                      <span key={t} className="text-xs px-3 py-1 rounded-full bg-muted text-foreground border border-border">
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ================================================================ */}
      {/* 4. FULL-BLEED QUOTE — replaces the generic "How I Think" section */}
      {/* ================================================================ */}
      <section className="relative py-40 px-6 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-blue-500/8 to-purple-500/8 rounded-full blur-3xl pointer-events-none"
        />

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="relative max-w-5xl mx-auto text-center"
        >
          {/* Large opening quote mark */}
          <p className="text-[10rem] leading-none font-black text-blue-500/15 select-none -mb-10">"</p>

          <blockquote className="text-3xl md:text-4xl lg:text-5xl font-black leading-[1.1] tracking-tight text-foreground">
            Before this internship, I thought good software was about writing clean code.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Afterwards, I understood it's about people, processes, and decisions that outlive you.
            </span>
          </blockquote>
        </motion.div>
      </section>

      {/* ================================================================ */}
      {/* 5. THE STACK                                                      */}
      {/* ================================================================ */}
      <section className="relative py-40 px-6">
        <div className="max-w-7xl mx-auto">

          <motion.div {...fadeUp(0)} className="mb-24">
            <h2 className="text-6xl md:text-8xl font-black leading-[0.85] tracking-tighter">
              <span className="block text-foreground">THE</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">STACK.</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10">
            {[
              { group: "Backend",        tags: ["Node.js", "Express.js", "JavaScript"] },
              { group: "Database",       tags: ["PostgreSQL", "Supabase", "SQL Triggers", "Migrations"] },
              { group: "Frontend",       tags: ["React", "Vite", "Tailwind CSS"] },
              { group: "Infrastructure", tags: ["Render", "Vercel", "GitHub"] },
              { group: "Security",       tags: ["JWT", "HttpOnly Cookies", "Rate Limiting", "CORS"] },
            ].map((col, i) => (
              <motion.div key={i} {...fadeUp(i * 0.08)} className="space-y-4">
                <p className="text-xs uppercase tracking-[0.3em] text-blue-500 font-bold">{col.group}</p>
                <div className="flex flex-col gap-2">
                  {col.tags.map((tag) => (
                    <span key={tag} className="text-sm px-4 py-2 rounded-full bg-muted text-foreground border border-border text-center font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ================================================================ */}
      {/* 6. THE RESULT — metrics only, no duplicate prose cards            */}
      {/* ================================================================ */}
      <section className="relative py-40 px-6 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, -90, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 right-0 translate-x-1/3 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-bl from-blue-500/10 to-purple-500/10 rounded-full blur-3xl pointer-events-none"
        />
        <div className="relative max-w-7xl mx-auto">

          <motion.div {...fadeUp(0)} className="mb-24">
            <span className="inline-block text-xs tracking-[0.3em] text-blue-500 font-semibold mb-8 px-4 py-2 rounded-full border border-blue-500/20 bg-blue-500/5">
              OUTCOMES
            </span>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.85] tracking-tighter">
              <span className="block text-foreground">THE</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">RESULT.</span>
            </h2>
          </motion.div>

          {/* Numbers only — clean, no prose duplication */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-border rounded-2xl overflow-hidden">
            {[
              { num: "6+",  label: "ERP Modules",    sub: "shipped to production" },
              { num: "40+", label: "REST APIs",       sub: "designed & implemented" },
              { num: "20+", label: "DB Migrations",   sub: "schema decisions" },
              { num: "1",   label: "Production ERP",  sub: "end to end delivered" },
            ].map((metric, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-10 border-r border-b border-border last:border-r-0 md:[&:nth-child(4)]:border-r-0 text-center group hover:bg-muted/30 transition-colors"
              >
                <p className="text-5xl md:text-6xl font-black text-foreground group-hover:text-blue-400 transition-colors">{metric.num}</p>
                <p className="text-base font-bold text-foreground mt-2">{metric.label}</p>
                <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">{metric.sub}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ================================================================ */}
      {/* 7. WHAT CHANGED — emotional payoff                               */}
      {/* ================================================================ */}
      <section className="relative py-40 px-6">
        <div className="max-w-7xl mx-auto">

          <motion.div {...fadeUp(0)} className="mb-20">
            <span className="inline-block text-xs tracking-[0.3em] text-blue-500 font-semibold mb-8 px-4 py-2 rounded-full border border-blue-500/20 bg-blue-500/5">
              REFLECTION
            </span>
            <h2 className="text-5xl md:text-7xl font-black leading-[0.85] tracking-tighter">
              <span className="block text-foreground">WHAT</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">CHANGED.</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                heading: "Beyond the Code",
                body: "Understanding the business problem is half the work. The best architecture decision I made wasn't a technical one — it was asking why a workflow existed before I tried to digitize it.",
              },
              {
                heading: "Scale from Day One",
                body: "Enterprise systems can't be refactored easily. Every schema decision, every API contract, every index I designed had to account for growth I wouldn't personally see.",
              },
              {
                heading: "Real Ownership",
                body: "Owning a module means caring about what happens after you ship. When your code runs in production, the user isn't a persona in a spec document anymore.",
              },
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: i * 0.12 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="group relative p-8 rounded-2xl border border-border bg-card/30 backdrop-blur-sm transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300" />
                <div className="relative">
                  <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-blue-400 transition-colors">{card.heading}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{card.body}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ================================================================ */}
      {/* 8. CTA — specific close tied to the experience story              */}
      {/* ================================================================ */}
      <section className="relative py-60 px-6 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl pointer-events-none"
        />

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="relative max-w-6xl mx-auto text-center"
        >
          <h2 className="text-6xl md:text-9xl lg:text-[10rem] font-black leading-[0.85] mb-16 tracking-tighter">
            <span className="block text-foreground">LET'S</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient">
              BUILD.
            </span>
          </h2>

          {/* Specific close — tied to experience, not generic */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-16 max-w-2xl mx-auto font-light">
            If you need an engineer who has shipped production software before their final year — let's talk.
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            <motion.a
              href="/projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-12 py-5 border-2 border-foreground text-foreground text-lg font-black rounded-full hover:bg-foreground hover:text-background transition-all"
            >
              VIEW PROJECTS
            </motion.a>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-12 py-5 bg-foreground text-background text-lg font-black rounded-full hover:opacity-90 transition-opacity"
            >
              GET IN TOUCH
            </motion.a>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
