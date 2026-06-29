"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Blog } from "@/lib/data/blogs";

interface BentoGridProps {
  blogs: Blog[];
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ─── Individual Bento Cell ──────────────────────────────────────────────── */
function BentoCell({
  blog,
  variant,
}: {
  blog: Blog;
  variant: "wide" | "tall" | "small" | "text-only";
}) {
  const [hovered, setHovered] = useState(false);

  const handleClick = () => window.open(blog.url, "_blank");

  /* text-only variant: no image, pure typography panel */
  if (variant === "text-only") {
    return (
      <motion.article
        variants={itemVariants}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        onClick={handleClick}
        className="relative rounded-3xl border border-border bg-secondary cursor-pointer overflow-hidden flex flex-col justify-between p-8 md:p-10 group"
      >
        {/* Animated gradient shimmer on hover */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background:
              "radial-gradient(ellipse at top left, hsl(var(--foreground) / 0.06) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10">
          <span className="inline-block px-3 py-1 rounded-full border border-border text-xs uppercase tracking-widest text-muted-foreground mb-6">
            {blog.category}
          </span>
          <h3 className="text-2xl md:text-3xl font-black text-foreground leading-tight mb-4">
            {blog.title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
            {blog.excerpt}
          </p>
        </div>

        <div className="relative z-10 flex items-center justify-between mt-6 pt-6 border-t border-border">
          <div className="flex gap-4 text-xs text-muted-foreground">
            <span>{blog.date}</span>
            <span>·</span>
            <span>{blog.readTime}</span>
          </div>
          <motion.span
            className="text-foreground font-bold text-lg"
            animate={{ x: hovered ? 6 : 0 }}
            transition={{ duration: 0.3 }}
          >
            →
          </motion.span>
        </div>
      </motion.article>
    );
  }

  /* image-backed variants */
  return (
    <motion.article
      variants={itemVariants}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={handleClick}
      className="relative rounded-3xl overflow-hidden cursor-pointer group"
      style={{
        aspectRatio:
          variant === "wide"
            ? "16/9"
            : variant === "tall"
            ? "3/4"
            : "1/1",
      }}
    >
      {/* Background image with parallax scale */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center will-change-transform"
        style={{ backgroundImage: `url(${blog.image})` }}
        animate={{ scale: hovered ? 1.07 : 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Gradient scrim */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-7 md:p-9">
        {/* Category pill */}
        <motion.span
          className="self-start px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-white text-xs uppercase tracking-widest font-semibold mb-4"
          animate={{ y: hovered ? -2 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {blog.category}
        </motion.span>

        <h3
          className={`font-black text-white leading-tight mb-3 ${
            variant === "wide"
              ? "text-3xl md:text-4xl"
              : variant === "tall"
              ? "text-2xl md:text-3xl"
              : "text-xl md:text-2xl"
          }`}
        >
          {blog.title}
        </h3>

        {variant !== "small" && (
          <p className="text-white/70 text-sm leading-relaxed mb-4 line-clamp-2">
            {blog.excerpt}
          </p>
        )}

        <div className="flex items-center justify-between">
          <div className="flex gap-3 text-xs text-white/50">
            <span>{blog.date}</span>
            <span>·</span>
            <span>{blog.readTime}</span>
          </div>
          <motion.div
            className="flex items-center gap-2 text-white font-bold text-sm"
            animate={{ x: hovered ? 5 : 0 }}
            transition={{ duration: 0.3 }}
          >
            Read
            <span className="text-base">→</span>
          </motion.div>
        </div>
      </div>
    </motion.article>
  );
}

/* ─── Tag cloud cell (decorative filler) ───────────────────────────────── */
function TagCloud({ blogs }: { blogs: Blog[] }) {
  const allTags = Array.from(
    new Set(blogs.flatMap((b) => b.tags))
  ).slice(0, 12);

  return (
    <motion.div
      variants={itemVariants}
      className="rounded-3xl border border-border bg-background p-8 flex flex-col justify-center overflow-hidden relative"
    >
      <span className="text-xs uppercase tracking-widest text-muted-foreground mb-5">
        Topics I Write About
      </span>
      <div className="flex flex-wrap gap-2">
        {allTags.map((tag, i) => (
          <motion.span
            key={tag}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05, duration: 0.3 }}
            viewport={{ once: true }}
            className="px-3 py-1.5 rounded-full border border-border text-xs text-muted-foreground hover:border-foreground hover:text-foreground transition-colors duration-200 cursor-default"
          >
            #{tag}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

/* ─── Main Bento Grid ────────────────────────────────────────────────────── */
export default function BentoGrid({ blogs }: BentoGridProps) {
  if (!blogs.length) return null;

  // Assign layout slots — repeating pattern for any number of articles
  const getVariant = (index: number): "wide" | "tall" | "small" | "text-only" => {
    const pattern = index % 5;
    if (pattern === 0) return "wide";
    if (pattern === 1) return "tall";
    if (pattern === 2) return "small";
    if (pattern === 3) return "text-only";
    return "small";
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5"
    >
      {blogs.map((blog, index) => {
        const variant = getVariant(index);

        // Responsive grid column spans per variant
        const colSpan =
          variant === "wide"
            ? "md:col-span-8"
            : variant === "tall"
            ? "md:col-span-4"
            : variant === "text-only"
            ? "md:col-span-5"
            : "md:col-span-4";

        // Insert tag cloud after every 5th blog (between rows)
        const showTagCloud = index === 4 && blogs.length > 4;

        return (
          <>
            <motion.div key={blog.id} className={`col-span-1 ${colSpan}`}>
              <BentoCell blog={blog} variant={variant} />
            </motion.div>

            {showTagCloud && (
              <motion.div
                key="tag-cloud"
                className="col-span-1 md:col-span-3"
              >
                <TagCloud blogs={blogs} />
              </motion.div>
            )}
          </>
        );
      })}
    </motion.div>
  );
}
