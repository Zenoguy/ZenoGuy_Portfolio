"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Mail, MapPin, Clock, Phone, Send, Github, Linkedin, Twitter, ArrowUpRight, Sparkles, Zap } from 'lucide-react';

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'shreyanghosh.dev@gmail.com', link: 'mailto:shreyan@zenoguy.dev' },
  { icon: MapPin, label: 'Location', value: 'Kolkata, India' },
  { icon: Clock, label: 'Response', value: '< 24 hours' },
  { icon: Phone, label: 'Available', value: 'Mon-Fri, 9AM-7PM IST' }
];

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/Zenoguy', icon: Github },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/shreyan-ghosh/', icon: Linkedin },
  { name: 'Twitter', href: 'https://x.com/IdekXeno', icon: Twitter }
];

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');
  
  useEffect(() => {
    const moveCursor = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (formData.name.length < 2) newErrors.name = 'Name required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email';
    if (formData.subject.length < 5) newErrors.subject = 'Subject required';
    if (formData.message.length < 10) newErrors.message = 'Message too short';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  return (
    <div className="min-h-screen py-32 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-32 relative"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 mb-8"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Available for new projects</span>
          </motion.div>

          <h1 className="text-7xl sm:text-8xl lg:text-9xl font-black tracking-tight mb-8">
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="block"
            >
              Let's work
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="block text-primary"
            >
              together
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-2xl text-muted-foreground max-w-2xl leading-relaxed"
          >
            Got a project in mind? Let's create something extraordinary together.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="lg:col-span-7"
          >
            <div className="space-y-12">
              {/* Name & Email Row */}
              <div className="grid sm:grid-cols-2 gap-12">
                <div className="relative">
                  <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-4 font-medium">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setActiveField('name')}
                    onBlur={() => setActiveField(null)}
                    className="w-full bg-transparent border-b-2 border-border focus:border-primary pb-4 text-2xl font-light outline-none transition-colors duration-300"
                    placeholder="John Doe"
                  />
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: activeField === 'name' ? '100%' : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  {errors.name && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-2"
                    >
                      {errors.name}
                    </motion.p>
                  )}
                </div>

                <div className="relative">
                  <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-4 font-medium">
                    Your Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setActiveField('email')}
                    onBlur={() => setActiveField(null)}
                    className="w-full bg-transparent border-b-2 border-border focus:border-primary pb-4 text-2xl font-light outline-none transition-colors duration-300"
                    placeholder="john@example.com"
                  />
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: activeField === 'email' ? '100%' : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-2"
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div className="relative">
                <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-4 font-medium">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  onFocus={() => setActiveField('subject')}
                  onBlur={() => setActiveField(null)}
                  className="w-full bg-transparent border-b-2 border-border focus:border-primary pb-4 text-2xl font-light outline-none transition-colors duration-300"
                  placeholder="Let's discuss..."
                />
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: activeField === 'subject' ? '100%' : 0 }}
                  transition={{ duration: 0.3 }}
                />
                {errors.subject && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-2"
                  >
                    {errors.subject}
                  </motion.p>
                )}
              </div>

              {/* Message */}
              <div className="relative">
                <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-4 font-medium">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setActiveField('message')}
                  onBlur={() => setActiveField(null)}
                  rows="4"
                  className="w-full bg-transparent border-b-2 border-border focus:border-primary pb-4 text-2xl font-light outline-none transition-colors duration-300 resize-none"
                  placeholder="Tell me about your project..."
                />
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: activeField === 'message' ? '100%' : 0 }}
                  transition={{ duration: 0.3 }}
                />
                {errors.message && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-2"
                  >
                    {errors.message}
                  </motion.p>
                )}
              </div>

              {/* Submit Button */}
              <motion.button
                onClick={handleSubmit}
                disabled={isSubmitting}
                onMouseEnter={() => setCursorVariant('hover')}
                onMouseLeave={() => setCursorVariant('default')}
                className="group relative overflow-hidden px-12 py-6 bg-primary text-primary-foreground rounded-full text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center gap-3">
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full"
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </span>
                <motion.div
                  className="absolute inset-0 bg-primary-foreground"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </div>
          </motion.div>

          {/* Contact Info Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="lg:col-span-5 space-y-16"
          >
            {/* Contact Details */}
            <div className="space-y-8">
              <h3 className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
                Contact Details
              </h3>
              <div className="space-y-6">
                {contactInfo.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                      className="group"
                    >
                      {item.link ? (
                        <a
                          href={item.link}
                          onMouseEnter={() => setCursorVariant('hover')}
                          onMouseLeave={() => setCursorVariant('default')}
                          className="flex items-start gap-4 hover:text-primary transition-colors"
                        >
                          <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">{item.label}</p>
                            <p className="text-lg font-medium group-hover:translate-x-1 transition-transform">
                              {item.value}
                            </p>
                          </div>
                        </a>
                      ) : (
                        <div className="flex items-start gap-4">
                          <div className="p-3 rounded-full bg-primary/10">
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">{item.label}</p>
                            <p className="text-lg font-medium">{item.value}</p>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-8">
              <h3 className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
                Social
              </h3>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.2 + index * 0.1, type: "spring" }}
                      onMouseEnter={() => setCursorVariant('hover')}
                      onMouseLeave={() => setCursorVariant('default')}
                      className="group p-4 rounded-full border border-border hover:border-primary hover:bg-primary/5 transition-all"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Icon className="w-6 h-6" />
                    </motion.a>
                  );
                })}
              </div>
            </div>

            {/* CTA Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="relative overflow-hidden p-8 rounded-2xl border border-border bg-primary/5 backdrop-blur-sm"
            >
              <div className="relative z-10">
                <Zap className="w-8 h-8 text-primary mb-4" />
                <h4 className="text-xl font-bold mb-2">Quick Response</h4>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  I typically respond within 24 hours. For urgent inquiries, feel free to reach out directly via email.
                </p>
                <a
                  href="mailto:shr"
                  onMouseEnter={() => setCursorVariant('hover')}
                  onMouseLeave={() => setCursorVariant('default')}
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all"
                >
                  Email directly
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
              <motion.div
                className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}