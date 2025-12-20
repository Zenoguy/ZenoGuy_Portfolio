"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  MapPin,
  Clock,
  Phone,
  Github,
  Linkedin,
  Twitter,
  ArrowUpRight,
  Sparkles,
  Zap,
} from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "shreyanghosh.dev@gmail.com",
    link: "mailto:shreyanghosh.dev@gmail.com",
  },
  { icon: MapPin, label: "Location", value: "Kolkata, India" },
  { icon: Clock, label: "Response", value: "< 24 hours" },
  { icon: Phone, label: "Available", value: "Mon–Fri, 9AM–7PM IST" },
];

const socialLinks = [
  { name: "GitHub", href: "https://github.com/Zenoguy", icon: Github },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/shreyan-ghosh/",
    icon: Linkedin,
  },
  { name: "Twitter", href: "https://x.com/IdekXeno", icon: Twitter },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    company: "", // honeypot
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [activeField, setActiveField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = () => {
    const nextErrors: Record<string, string> = {};

    if (formData.name.trim().length < 2)
      nextErrors.name = "Name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      nextErrors.email = "Invalid email";
    if (formData.subject.trim().length < 5)
      nextErrors.subject = "Subject is required";
    if (formData.message.trim().length < 10)
      nextErrors.message = "Message too short";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Send failed");

      setIsSuccess(true);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        company: "",
      });

      setTimeout(() => setIsSuccess(false), 4000);
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-32"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 mb-8">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">
              Available for new projects
            </span>
          </div>

          <h1 className="text-7xl sm:text-8xl lg:text-9xl font-black mb-8">
            <span className="block">Let&apos;s work</span>
            <span className="block text-primary">together</span>
          </h1>

          <p className="text-2xl text-muted-foreground max-w-2xl">
            Got a project in mind? Let’s build something exceptional.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-16">
          {/* FORM */}
          <div className="lg:col-span-7 space-y-12">
            {/* Honeypot */}
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            {/* Name / Email */}
            <div className="grid sm:grid-cols-2 gap-12">
              {["name", "email"].map((field) => (
                <div key={field} className="relative">
                  <label className="block text-xs uppercase tracking-widest mb-4">
                    {field === "name" ? "Your Name" : "Your Email"}
                  </label>
                  <input
                    type={field === "email" ? "email" : "text"}
                    name={field}
                    value={(formData as any)[field]}
                    onChange={handleChange}
                    onFocus={() => setActiveField(field)}
                    onBlur={() => setActiveField(null)}
                    className="w-full bg-transparent border-b-2 pb-4 text-2xl outline-none"
                  />
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-primary"
                    animate={{ width: activeField === field ? "100%" : 0 }}
                  />
                  {errors[field] && (
                    <p className="text-red-500 text-sm mt-2">
                      {errors[field]}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Subject */}
            <div className="relative">
              <label className="block text-xs uppercase tracking-widest mb-4">
                Subject
              </label>
              <input
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                onFocus={() => setActiveField("subject")}
                onBlur={() => setActiveField(null)}
                className="w-full bg-transparent border-b-2 pb-4 text-2xl outline-none"
              />
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-primary"
                animate={{ width: activeField === "subject" ? "100%" : 0 }}
              />
              {errors.subject && (
                <p className="text-red-500 text-sm mt-2">{errors.subject}</p>
              )}
            </div>

            {/* Message */}
            <div className="relative">
              <label className="block text-xs uppercase tracking-widest mb-4">
                Message
              </label>
              <textarea
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                onFocus={() => setActiveField("message")}
                onBlur={() => setActiveField(null)}
                className="w-full bg-transparent border-b-2 pb-4 text-2xl outline-none resize-none"
              />
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-primary"
                animate={{ width: activeField === "message" ? "100%" : 0 }}
              />
              {errors.message && (
                <p className="text-red-500 text-sm mt-2">{errors.message}</p>
              )}
            </div>

            {/* Submit */}
            <div className="relative h-20">
              <AnimatePresence>
                {!isSuccess ? (
                  <motion.button
                    key="send"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="px-12 py-6 bg-primary text-primary-foreground rounded-full text-lg font-semibold"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </motion.button>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-3 text-green-500 text-lg font-semibold"
                  >
                    <Sparkles className="w-6 h-6" />
                    Message sent successfully
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="lg:col-span-5 space-y-16">
            <div className="space-y-6">
              {contactInfo.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex gap-4">
                    <div className="p-3 rounded-full bg-primary/10">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {item.label}
                      </p>
                      {item.link ? (
                        <a href={item.link} className="text-lg font-medium">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-lg font-medium">{item.value}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    className="p-4 rounded-full border hover:border-primary"
                  >
                    <Icon className="w-6 h-6" />
                  </a>
                );
              })}
            </div>

            <div className="p-8 rounded-2xl border bg-primary/5">
              <Zap className="w-8 h-8 text-primary mb-4" />
              <h4 className="text-xl font-bold mb-2">Quick Response</h4>
              <p className="text-sm text-muted-foreground mb-6">
                I usually respond within 24 hours.
              </p>
              <a
                href="mailto:shreyanghosh.dev@gmail.com"
                className="inline-flex items-center gap-2 text-primary"
              >
                Email directly
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
