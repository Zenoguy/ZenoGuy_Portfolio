"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function SkillsSection() {
  const [activeSkill, setActiveSkill] = useState(null);

  const skills = [
    {
      id: 'ai-ml',
      category: "AI & Machine Learning",
      icon: "/images/ai-svgrepo-com.svg",
      tags: ['AI/ML', 'OCR', 'RAG', 'PyTorch', 'CNN', 'Research'],
      capabilities: [
        "Deep Learning & Neural Networks",
        "Computer Vision (ConvNeXt, Segmentation)",
        "NLP & RAG Pipelines",
        "Model Training & Optimization"
      ],
      projectIds: [1, 3, 6]
    },
    {
      id: 'backend',
      category: "Backend & Systems",
      icon: "/images/coding-terminal-svgrepo-com.svg",
      tags: ['Python', 'Java', 'Database', 'MySQL', 'Sockets'],
      capabilities: [
        "Python & Java Backend Systems",
        "Database Design & Management",
        "Real-time Communication (Sockets)",
        "API Design & Integration"
      ],
      projectIds: [1, 2, 4, 8]
    },
    {
      id: 'linux',
      category: "Security & Linux",
      icon: "/images/linux-svgrepo-com.svg",
      tags: ['Linux', 'Cryptography', 'Security'],
      capabilities: [
        "Linux System Administration",
        "Cryptography & Data Security",
        "Secure Data Handling",
        "Compliance & Verification Systems"
      ],
      projectIds: [2, 8]
    },
    {
      id: 'frontend',
      category: "Frontend Development",
      icon: "/images/coding-website-svgrepo-com.svg",
      tags: ['React', 'Next.js', 'UI/UX', 'Java Swing'],
      capabilities: [
        "Modern Frontend Frameworks",
        "Responsive Web Design",
        "Desktop Application Design",
        "Animation & User Experience"
      ],
      projectIds: [4, 6, 7, 9, 10]
    },
    {
      id: 'gamedev',
      category: "Game Development",
      icon: "/images/game-controller-round-799-svgrepo-com.svg",
      tags: ['Pygame', 'Game Dev', 'Physics'],
      capabilities: [
        "Game Mechanics & Physics",
        "Interactive Gameplay Systems",
        "Animation & Visual Effects",
        "Audio Integration"
      ],
      projectIds: [5, 10]
    }
  ];

  const projects = [
    {
      id: 1,
      title: 'SpendSight',
      category: 'FinTech AI Pipeline',
      description: 'Hybrid AI pipeline parsing financial PDFs with Regex → MiniLM → LLM stages',
      tags: ['AI/ML', 'OCR', 'RAG', 'Database'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
      color: '#4F46E5',
      github: 'https://github.com/Zenoguy/SpendSight_',
      live: null
    },
    {
      id: 2,
      title: 'Data Wiper',
      category: 'Security Toolkit',
      description: 'Enterprise-grade secure drive sanitization with AES-128 encryption',
      tags: ['Linux', 'Cryptography', 'Security'],
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
      color: '#EC4899',
      github: 'https://github.com/Zenoguy/data_wiping_linux',
      live: null
    },
    {
      id: 3,
      title: 'Leaf Disease Segmenter',
      category: 'Computer Vision',
      description: 'ConvNeXt-Tiny panoptic segmentation achieving 0.72 F1 score',
      tags: ['PyTorch', 'CNN', 'Research'],
      image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800&q=80',
      color: '#10B981',
      github: 'https://github.com/Zenoguy/Panoptic_Segmentation',
      live: null
    },
    {
      id: 4,
      title: 'ChatApp',
      category: 'Desktop Messaging',
      description: 'Real-time chat with Java Swing, Sockets, and MySQL persistence',
      tags: ['Java', 'Sockets', 'MySQL'],
      image: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=800&q=80',
      color: '#F59E0B',
      github: 'https://github.com/Zenoguy/ChatApp-Java',
      live: null
    },
    {
      id: 5,
      title: 'Space Shooters',
      category: 'Arcade Game',
      description: 'Classic space shooter with progressive difficulty and power-ups',
      tags: ['Python', 'Pygame', 'Game Dev'],
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80',
      color: '#8B5CF6',
      github: 'https://github.com/Zenoguy/Space_Shooters',
      live: 'https://zenoguy.itch.io/space-shooters-concept-game'
    },
    {
      id: 6,
      title: 'BoldFlow',
      category: 'Browser Extension',
      description: 'Bionic reading extension with DOM manipulation and MutationObserver',
      tags: ['TypeScript', 'Chrome API', 'UI/UX'],
      image: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&q=80',
      color: '#3B82F6',
      github: 'https://github.com/Zenoguy/bionic-reader',
      live: null
    },
    {
      id: 7,
      title: 'DevGeeks',
      category: 'Marketing Website',
      description: 'Modern Next.js site with 3D animations, glassmorphism, and pricing calculators',
      tags: ['Next.js', 'React', 'UI/UX'],
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
      color: '#06B6D4',
      github: 'https://github.com/Rickyy-Sam07/devgeeks-v2',
      live: null
    },
    {
      id: 8,
      title: 'E2X ISO',
      category: 'Bootable Linux Tool',
      description: 'Secure drive wipe bootable ISO with multi-threat model support',
      tags: ['Linux', 'Python', 'Security'],
      image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&q=80',
      color: '#EF4444',
      github: 'https://github.com/Zenoguy/E2X-ISO',
      live: null
    },
    {
      id: 9,
      title: 'Hotel Booking',
      category: 'Web Application',
      description: 'React hotel booking interface with TypeScript and Tailwind',
      tags: ['React', 'TypeScript', 'Tailwind'],
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
      color: '#F59E0B',
      github: 'https://github.com/Zenoguy/Hotel-Booking',
      live: 'https://hotel-booking-navy-six.vercel.app'
    },
    {
      id: 10,
      title: 'Sudoku Game',
      category: 'Web Game',
      description: 'Interactive Sudoku with auto-solve algorithm and board generation',
      tags: ['JavaScript', 'Game Dev', 'Algorithms'],
      image: 'https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=800&q=80',
      color: '#8B5CF6',
      github: 'https://github.com/Zenoguy/Sudoku',
      live: 'https://zenoguy.github.io/Sudoku/'
    },
  ];

  const filteredProjects = activeSkill
    ? projects.filter(p => activeSkill.projectIds.includes(p.id))
    : projects;

  return (
    <section className="relative py-40 px-6 overflow-hidden">
      
      <div className="relative max-w-7xl mx-auto">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <h2 className="text-6xl md:text-7xl lg:text-8xl font-black leading-[0.85] mb-8">
            <span className="block text-foreground">SKILLS</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">IN ACTION</span>
          </h2>
          <div className="flex items-center gap-8">
            <div className="h-1 w-32 bg-foreground" />
            <p className="text-xl text-muted-foreground">
              {activeSkill ? `Showing projects using ${activeSkill.category}` : 'Click on skills to see related projects'}
            </p>
          </div>
        </motion.div>

        {/* Split Layout */}
        <div className="grid lg:grid-cols-5 gap-8">
          
          {/* LEFT: Skills Column */}
          <div className="lg:col-span-2 space-y-4">
            {skills.map((skill, i) => (
              <motion.div
                key={skill.id}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveSkill(activeSkill?.id === skill.id ? null : skill);
                  }
                }}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                onClick={() => setActiveSkill(activeSkill?.id === skill.id ? null : skill)}
                className={`group relative p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
                  activeSkill?.id === skill.id
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-border hover:border-blue-500/30 bg-card'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12">
                    <img 
                      src={skill.icon}
                      alt={skill.category}
                      className="w-full h-full transition-all duration-300"
                      style={{ 
                        filter: activeSkill?.id === skill.id 
                          ? 'brightness(0) saturate(100%) invert(47%) sepia(96%) saturate(1229%) hue-rotate(192deg) brightness(103%) contrast(101%)'
                          : 'brightness(0) saturate(100%) invert(47%) sepia(96%) saturate(1229%) hue-rotate(192deg) brightness(103%) contrast(101%)'
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-xl font-bold mb-2 transition-colors ${
                      activeSkill?.id === skill.id ? 'text-blue-400' : 'text-foreground'
                    }`}>
                      {skill.category}
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {skill.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {skill.capabilities.slice(0, 2).map((cap, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-blue-500 mt-0.5">→</span>
                          <span>{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Active indicator */}
                {activeSkill?.id === skill.id && (
                  <motion.div
                    layoutId="activeSkill"
                    className="absolute inset-0 border-2 border-blue-500 rounded-2xl pointer-events-none"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.div>
            ))}
          </div>

          {/* RIGHT: Projects Column */}
          <div className="lg:col-span-3">
            <div className="sticky top-8 max-h-[calc(100vh-4rem)] overflow-y-auto pr-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <motion.div
                key={activeSkill?.id || 'all'}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                {filteredProjects.map((project, i) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    whileHover={{ x: 5, transition: { duration: 0.2 } }}
                    className="group relative p-6 rounded-2xl border-2 border-border hover:border-blue-500/50 bg-card backdrop-blur-sm transition-all duration-300 overflow-hidden"
                  >
                    {/* Background gradient on hover */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                      style={{ background: `linear-gradient(135deg, ${project.color}00, ${project.color})` }}
                    />

                    <div className="relative flex gap-4">
                      {/* Project thumbnail */}
                      <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 border border-border">
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>

                      {/* Project info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="text-2xl font-black text-foreground group-hover:text-blue-400 transition-colors">
                            {project.title}
                          </h4>
                          <span className="text-muted-foreground text-sm flex-shrink-0 ml-2">
                            #{project.id}
                          </span>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {project.tags.map(tag => (
                            <span 
                              key={tag} 
                              className="text-xs px-3 py-1 rounded-full bg-muted text-foreground border border-border"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Links */}
                        <div className="flex gap-4 mt-4">
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-400 font-bold flex items-center gap-1 hover:text-blue-300"
                          >
                            VIEW CODE →
                          </a>
                          {project.live && (
                            <a 
                              href={project.live}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-purple-400 font-bold flex items-center gap-1 hover:text-purple-300"
                            >
                              LIVE DEMO →
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <motion.a
            href="/projects"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-12 py-5 border-2 border-foreground text-foreground text-lg font-black rounded-full hover:bg-foreground hover:text-background transition-all"
          >
            VIEW ALL PROJECTS
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}