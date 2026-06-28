"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Scale } from "lucide-react";
import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="min-h-screen py-32 px-4 sm:px-6 lg:px-8 bg-background text-foreground">
      <div className="max-w-4xl mx-auto">
        {/* Back navigation */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 border-b border-border pb-10"
        >
          <div className="flex items-center gap-3 text-primary mb-4">
            <Scale className="w-8 h-8" />
            <span className="text-sm font-semibold uppercase tracking-wider">Agreement</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black mb-6">
            Terms of Service
          </h1>
          <p className="text-muted-foreground">
            Last Updated: June 29, 2026
          </p>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="prose prose-neutral dark:prose-invert max-w-none space-y-12 text-muted-foreground leading-relaxed"
        >
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">1. Agreement to Terms</h2>
            <p>
              By accessing and using this portfolio website, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these terms, you should not access or use this site.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">2. Permitted Use</h2>
            <p>
              This website serves as a professional portfolio to display work, writeups, and projects, and to facilitate inquiries regarding development services. You agree to use this site only for lawful purposes, such as contacting me for employment, project collaborations, or networking. You must not use the contact form to distribute promotional materials, spam, malware, or harassing content.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">3. Intellectual Property</h2>
            <p>
              All code, text, layouts, designs, illustrations, brand names, and visual materials displayed on this site are my original creations (unless otherwise credited) and are protected by applicable copyright and trademark laws. You may not copy, reproduce, distribute, or modify any part of this website without my prior written consent.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">4. Limitation of Liability</h2>
            <p>
              This website is provided on an &quot;as-is&quot; and &quot;as-available&quot; basis. I make no warranties, expressed or implied, regarding the continuous operation of this site, the absolute safety of contact form transmissions, or the complete correctness of its content. Under no circumstances shall I be liable for any damages, errors, data losses, or reliance arising from your use of this site.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">5. Governing Law</h2>
            <p>
              These Terms of Service are governed by and construed in accordance with the laws of **India**, and you submit to the exclusive jurisdiction of the courts located in **West Bengal** for the resolution of any disputes.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">6. Modifications to Terms</h2>
            <p>
              I reserve the right to modify these terms at any time without prior notice. Any changes will be posted directly to this page with an updated &quot;Last Updated&quot; date. Your continued use of the website following any changes constitutes acceptance of the new terms.
            </p>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
