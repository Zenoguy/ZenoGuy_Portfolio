"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function PrivacyPage() {
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
            <ShieldCheck className="w-8 h-8" />
            <span className="text-sm font-semibold uppercase tracking-wider">Compliance</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black mb-6">
            Privacy Policy
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
            <h2 className="text-2xl font-bold text-foreground">1. Introduction</h2>
            <p>
              Welcome to my portfolio site. I respect your privacy and am committed to protecting the personal information you share with me. This Privacy Policy describes how your personal information is collected, used, and protected when you visit this website or use the contact form.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">2. Information I Collect</h2>
            <p>
              When you submit an inquiry through the contact form, I collect the following details:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Name:</strong> To address you properly in communications.</li>
              <li><strong>Email Address:</strong> To reply to your message.</li>
              <li><strong>Subject & Message content:</strong> To understand and address your inquiry.</li>
            </ul>
            <p>
              Additionally, this site may automatically collect standard log files and analytics data (such as page views, duration of visit, and device/browser details) through hosting and analytics providers.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">3. How I Use Your Information</h2>
            <p>
              The information you provide is used exclusively for the following purposes:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Responding to your contact requests, project proposals, or hiring inquiries.</li>
              <li>Maintaining communication regarding collaborations or services you request.</li>
              <li>Improving website performance and design layout.</li>
            </ul>
            <p>
              I do not sell, trade, lease, or rent your personal information to third parties.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">4. Third-Party Services</h2>
            <p>
              I use third-party tools to handle site functionality, hosting, and email delivery. These services may process your data in accordance with their privacy policies:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Hosting & Analytics:</strong> Vercel (or equivalent hosting platform) to deliver the site files and compile anonymous user metrics.</li>
              <li><strong>Email Delivery APIs:</strong> Resend (or equivalent email handler) to route your form submissions safely to my inbox.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">5. Data Security</h2>
            <p>
              I employ secure transmission protocols (HTTPS) and implement anti-spam validation measures (such as honeypot checks) to protect form submissions. However, no method of transmission over the internet or electronic storage is 100% secure, and absolute security cannot be guaranteed.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">6. Your Rights</h2>
            <p>
              Depending on your location, you may have rights under the General Data Protection Regulation (GDPR), the California Consumer Privacy Act (CCPA), or India&apos;s Digital Personal Data Protection (DPDP) Act, including:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>The right to request access to the data I hold about you.</li>
              <li>The right to request corrections to any inaccurate data.</li>
              <li>The right to request deletion of your information from my records.</li>
            </ul>
            <p>
              To exercise these rights, please reach out to me directly at <a href="mailto:shreyanghosh.dev@gmail.com" className="text-primary hover:underline">shreyanghosh.dev@gmail.com</a>.
            </p>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
