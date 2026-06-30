"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, Code2 as Github, MessageCircle as Twitter, Briefcase as Linkedin, Mail, ExternalLink, Star, Code, Layers, Zap, Globe, Sparkles, CheckCircle, Terminal, Activity } from 'lucide-react';
import { APP_NAME, APP_TAGLINE, APP_EMAIL } from "@/lib/data";
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
  slideInLeft,
  slideInRight,
} from "@/lib/motion";

// ─── Inline Data ────────────────────────────────────────────────────────────

const skills = [
  { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"] },
  { category: "Backend", items: ["Node.js", "Express", "PostgreSQL", "Prisma", "Redis"] },
  { category: "Tools", items: ["Git", "Docker", "Figma", "Vercel", "AWS"] },
  { category: "Design", items: ["UI/UX Design", "Design Systems", "Prototyping", "Motion Design", "Accessibility"] },
];

const projects = [
  {
    id: 1,
    title: "Luminary Dashboard",
    description: "A real-time analytics platform for SaaS companies. Built with Next.js, Recharts, and a custom design system. Handles 50k+ daily active users.",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Recharts"],
    image: "https://i.vimeocdn.com/video/2070296830-ceeecfbc9625686542679222c41f1ccfabdc4dfc4fe6ebaa3a484e1427ba6773-d?f=webp",
    github: "https://github.com",
    live: "https://example.com",
    featured: true,
  },
  {
    id: 2,
    title: "Orbit Design System",
    description: "A comprehensive component library with 80+ accessible components, dark mode support, and full Storybook documentation. Used by 3 production apps.",
    tags: ["React", "Storybook", "Radix UI", "Tailwind"],
    image: "https://s3-alpha.figma.com/hub/file/2243587999456758553/75e4372a-8462-487a-9eef-232cbcde11ad-cover.png",
    github: "https://github.com",
    live: "https://example.com",
    featured: true,
  },
  {
    id: 3,
    title: "Pulse Commerce",
    description: "A headless e-commerce storefront with edge-rendered product pages, AI-powered search, and a sub-100ms TTFB. Increased conversions by 34%.",
    tags: ["Next.js", "Shopify", "Algolia", "Vercel Edge"],
    image: "https://media.pulse-commerce.com/wp-content/uploads/2025/09/Pulse-logo.webp",
    github: "https://github.com",
    live: "https://example.com",
    featured: false,
  },
  {
    id: 4,
    title: "Beacon CMS",
    description: "A developer-first headless CMS with a visual schema builder, live preview, and a GraphQL API. Deployed on Cloudflare Workers for global low latency.",
    tags: ["Node.js", "GraphQL", "Cloudflare", "React"],
    image: "https://raw.githubusercontent.com/BeaconCMS/beacon/main/assets/images/youtube_card.png",
    github: "https://github.com",
    live: "https://example.com",
    featured: false,
  },
];

const experience = [
  {
    id: 1,
    role: "Senior Frontend Engineer",
    company: "Vercel",
    period: "2022 — Present",
    description: "Lead the redesign of the deployment dashboard, improving perceived performance by 40%. Mentor junior engineers and drive the adoption of design tokens across the product.",
    highlights: ["Deployment Dashboard Redesign", "Design Token System", "Performance Optimization"],
  },
  {
    id: 2,
    role: "Full-Stack Developer",
    company: "Linear",
    period: "2020 — 2022",
    description: "Built core features for the issue tracking product including keyboard shortcuts, bulk actions, and a real-time collaboration layer using CRDTs.",
    highlights: ["Real-time Collaboration", "Keyboard Navigation", "Bulk Actions Engine"],
  },
  {
    id: 3,
    role: "Frontend Developer",
    company: "Stripe",
    period: "2018 — 2020",
    description: "Developed and maintained the Stripe Dashboard's reporting section. Improved chart rendering performance and built accessible data table components.",
    highlights: ["Reporting Dashboard", "Accessible Data Tables", "Chart Performance"],
  },
];

const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "CTO at Luminary",
    avatar: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Sarah_Chen_%E9%99%88%E6%B7%91%E6%A1%A6_1986_Malaysia_Concert_Live_Photo_Original_%28cropped%29.jpg",
    quote: "Alex delivered a dashboard that our entire team loves. The attention to detail in the interactions and the performance optimizations were beyond what we expected.",
  },
  {
    id: 2,
    name: "Marcus Webb",
    role: "Founder at Orbit Labs",
    avatar: "https://picsum.photos/seed/bc0e6e02942d/800/600",
    quote: "Working with Alex was a pleasure. He understood our design vision immediately and translated it into a component library that scales beautifully.",
  },
  {
    id: 3,
    name: "Priya Nair",
    role: "Product Lead at Pulse",
    avatar: "https://media.licdn.com/dms/image/v2/D5622AQE3NpM1FP01Yg/feedshare-shrink_800/B56Zf4pvKcGUAg-/0/1752223383746?e=2147483647&v=beta&t=C11dC6M36dpAKpcbBRMtusPrnkgE-cNJfHc93ZNpFoQ",
    quote: "The storefront Alex built for us cut our load times in half and the conversion rate improvement was immediate. Exceptional technical and creative work.",
  },
];

const stats = [
  { value: "6+", label: "Years of Experience" },
  { value: "40+", label: "Projects Shipped" },
  { value: "12", label: "Happy Clients" },
  { value: "3", label: "Open Source Libs" },
];

// ─── Skill Bar ───────────────────────────────────────────────────────────────

const skillLevels: Record<string, number> = {
  React: 96,
  "Next.js": 94,
  TypeScript: 92,
  "Tailwind CSS": 95,
  "Framer Motion": 88,
  "Node.js": 85,
  Express: 82,
  PostgreSQL: 78,
  Prisma: 80,
  Redis: 72,
  Git: 93,
  Docker: 75,
  Figma: 85,
  Vercel: 90,
  AWS: 68,
  "UI/UX Design": 82,
  "Design Systems": 88,
  Prototyping: 80,
  "Motion Design": 84,
  Accessibility: 90,
};

// ─── Contact Form State ──────────────────────────────────────────────────────

// ─── Component ───────────────────────────────────────────────────────────────

export default function HomePage() {
  const shouldReduceMotion = useReducedMotion();

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent">("idle");

  function handleFormChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormStatus("sending");
    setTimeout(() => {
      setFormStatus("sent");
      setFormState({ name: "", email: "", message: "" });
    }, 1400);
  }

  const motionProps = shouldReduceMotion
    ? {}
    : { variants: fadeInUp, initial: "hidden", whileInView: "visible", viewport: { once: true, margin: "-80px" } };

  return (
    <main className="bg-[#0a0a0a] text-white overflow-x-hidden">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background mesh */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-purple-600/10 blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-violet-500/8 blur-[100px]" />
          <div
            className="absolute inset-0 opacity-[0.015]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-32 grid md:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <motion.div
            variants={shouldReduceMotion ? undefined : staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <motion.div
              variants={shouldReduceMotion ? undefined : fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm font-medium"
            >
              <Sparkles size={14} />
              Available for new projects
            </motion.div>

            <motion.h1
              variants={shouldReduceMotion ? undefined : fadeInUp}
              className="font-syne text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-balance"
            >
              Hi, I&apos;m{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-violet-300">
                {APP_NAME}
              </span>
            </motion.h1>

            <motion.p
              variants={shouldReduceMotion ? undefined : fadeInUp}
              className="text-xl text-white/50 leading-relaxed max-w-lg text-pretty"
            >
              {APP_TAGLINE}. I craft fast, accessible, and beautifully designed web experiences that users love and businesses rely on.
            </motion.p>

            <motion.div
              variants={shouldReduceMotion ? undefined : fadeInUp}
              className="flex flex-wrap items-center gap-4"
            >
              <Link
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group inline-flex items-center gap-2 px-6 py-3 bg-purple-500 hover:bg-purple-400 text-white font-medium rounded-full transition-all duration-300 shadow-[0_0_24px_rgba(168,85,247,0.35)] hover:shadow-[0_0_36px_rgba(168,85,247,0.55)]"
              >
                View My Work
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <Link
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/10 hover:border-purple-500/50 text-white/70 hover:text-white font-medium rounded-full transition-all duration-300 hover:bg-white/5"
              >
                Get In Touch
              </Link>
            </motion.div>

            <motion.div
              variants={shouldReduceMotion ? undefined : fadeInUp}
              className="flex items-center gap-4 pt-2"
            >
              {[
                { icon: Github, href: "https://github.com", label: "GitHub" },
                { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
                { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
                { icon: Mail, href: `mailto:${APP_EMAIL}`, label: "Email" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 text-white/40 hover:text-purple-400 hover:border-purple-500/50 hover:bg-purple-500/10 transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Code card */}
          <motion.div
            variants={shouldReduceMotion ? undefined : slideInRight}
            initial="hidden"
            animate="visible"
            className="hidden md:block"
          >
            <div className="relative">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-purple-500/20 to-violet-600/10 blur-sm" />
              <div className="relative rounded-2xl border border-white/8 bg-[#111111] overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.6)]">
                {/* Window chrome */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-[#0d0d0d]">
                  <span className="w-3 h-3 rounded-full bg-red-500/70" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <span className="w-3 h-3 rounded-full bg-green-500/70" />
                  <span className="ml-3 text-xs text-white/30 font-mono">portfolio.tsx</span>
                </div>
                {/* Code content */}
                <div className="p-6 font-mono text-sm leading-relaxed">
                  <div className="text-purple-400">const <span className="text-white">developer</span> = {"{"}</div>
                  <div className="pl-4 text-white/60">
                    <div><span className="text-violet-300">name</span>: <span className="text-green-400">&quot;{APP_NAME}&quot;</span>,</div>
                    <div><span className="text-violet-300">role</span>: <span className="text-green-400">&quot;{APP_TAGLINE}&quot;</span>,</div>
                    <div><span className="text-violet-300">location</span>: <span className="text-green-400">&quot;San Francisco, CA&quot;</span>,</div>
                    <div><span className="text-violet-300">stack</span>: [</div>
                    <div className="pl-4">
                      <div><span className="text-green-400">&quot;Next.js&quot;</span>,</div>
                      <div><span className="text-green-400">&quot;TypeScript&quot;</span>,</div>
                      <div><span className="text-green-400">&quot;Node.js&quot;</span>,</div>
                    </div>
                    <div>],</div>
                    <div><span className="text-violet-300">available</span>: <span className="text-orange-400">true</span>,</div>
                  </div>
                  <div className="text-purple-400">{"}"}</div>
                  <div className="mt-4 text-white/30">{"// Let's build something great"}</div>
                  <div className="mt-1 flex items-center gap-1">
                    <span className="text-purple-400">developer</span>
                    <span className="text-white/40">.</span>
                    <span className="text-yellow-400">hire</span>
                    <span className="text-white/40">()</span>
                    <span className="inline-block w-2 h-4 bg-purple-400 ml-1 animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Floating stat cards */}
              <motion.div
                animate={shouldReduceMotion ? {} : { y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -left-8 flex items-center gap-3 px-4 py-3 rounded-xl border border-white/8 bg-[#111]/90 backdrop-blur-sm shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
              >
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Activity size={14} className="text-green-400" />
                </div>
                <div>
                  <div className="text-xs text-white/40">Projects Shipped</div>
                  <div className="text-sm font-bold text-white">40+</div>
                </div>
              </motion.div>

              <motion.div
                animate={shouldReduceMotion ? {} : { y: [0, 8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -top-6 -right-6 flex items-center gap-3 px-4 py-3 rounded-xl border border-white/8 bg-[#111]/90 backdrop-blur-sm shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
              >
                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <Star size={14} className="text-purple-400" />
                </div>
                <div>
                  <div className="text-xs text-white/40">Client Rating</div>
                  <div className="text-sm font-bold text-white">5.0 / 5.0</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-white/30 tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={shouldReduceMotion ? {} : { y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent"
          />
        </motion.div>
      </section>

      {/* ── ABOUT ────────────────────────────────────────────────────────── */}
      <section id="about" className="py-28 md:py-36 relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-violet-600/5 blur-[100px] pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Image side */}
            <motion.div
              variants={shouldReduceMotion ? undefined : slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] max-w-sm mx-auto md:mx-0">
                <img
                  src="https://media.licdn.com/dms/image/v2/D4E03AQGu9lpcArTPyg/profile-displayphoto-scale_200_200/B4EZtrngOMKkAY-/0/1767037076807?e=2147483647&v=beta&t=g55DujymyuQdQJW6k4Inxt2b3VY0pX_lyKk3Y3x8Aq4"
                  alt="Alex Rivera, Creative Developer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 via-transparent to-transparent" />
              </div>
              {/* Decorative border */}
              <div className="absolute -inset-3 rounded-2xl border border-purple-500/10 -z-10" />
              <div className="absolute -inset-6 rounded-2xl border border-purple-500/5 -z-10" />

              {/* Stats row */}
              <div className="absolute bottom-6 left-6 right-6 grid grid-cols-2 gap-3">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="px-4 py-3 rounded-xl border border-white/8 bg-[#0a0a0a]/80 backdrop-blur-sm"
                  >
                    <div className="text-2xl font-bold font-syne text-purple-400">{stat.value}</div>
                    <div className="text-xs text-white/40 mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Text side */}
            <motion.div
              variants={shouldReduceMotion ? undefined : staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="space-y-6"
            >
              <motion.div variants={shouldReduceMotion ? undefined : fadeInUp}>
                <span className="text-xs font-semibold uppercase tracking-widest text-purple-400">About Me</span>
                <h2 className="font-syne text-4xl md:text-5xl font-bold tracking-tight mt-3 text-balance">
                  Turning ideas into{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-violet-300">
                    digital reality
                  </span>
                </h2>
              </motion.div>

              <motion.p
                variants={shouldReduceMotion ? undefined : fadeInUp}
                className="text-white/60 leading-relaxed text-pretty"
              >
                I&apos;m a full-stack developer with 6+ years of experience building products that sit at the intersection of engineering and design. I care deeply about performance, accessibility, and the small details that make an interface feel alive.
              </motion.p>

              <motion.p
                variants={shouldReduceMotion ? undefined : fadeInUp}
                className="text-white/60 leading-relaxed text-pretty"
              >
                Previously at Stripe, Linear, and Vercel. I&apos;ve shipped features used by millions of developers and helped teams build scalable design systems from the ground up.
              </motion.p>

              <motion.ul
                variants={shouldReduceMotion ? undefined : staggerContainer}
                className="space-y-3 pt-2"
              >
                {[
                  "Performance-first development approach",
                  "Accessibility built in from day one",
                  "Design systems and component architecture",
                  "Open source contributor and maintainer",
                ].map((item) => (
                  <motion.li
                    key={item}
                    variants={shouldReduceMotion ? undefined : fadeInUp}
                    className="flex items-center gap-3 text-white/70 text-sm"
                  >
                    <CheckCircle size={16} className="text-purple-400 shrink-0" />
                    {item}
                  </motion.li>
                ))}
              </motion.ul>

              <motion.div variants={shouldReduceMotion ? undefined : fadeInUp} className="pt-2">
                <a
                  href="/resume.pdf"
                  className="inline-flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 font-medium transition-colors duration-200 group"
                >
                  Download Resume
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SKILLS ───────────────────────────────────────────────────────── */}
      <section id="skills" className="py-28 md:py-36 bg-[#0d0d0d] relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            {...(shouldReduceMotion ? {} : { variants: fadeInUp, initial: "hidden", whileInView: "visible", viewport: { once: true, margin: "-80px" } })}
            className="text-center mb-16"
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-purple-400">Expertise</span>
            <h2 className="font-syne text-4xl md:text-5xl font-bold tracking-tight mt-3 text-balance">
              Skills &amp; Technologies
            </h2>
            <p className="text-white/50 mt-4 max-w-xl mx-auto text-pretty">
              A curated set of tools and technologies I use to build modern, scalable web applications.
            </p>
          </motion.div>

          <motion.div
            variants={shouldReduceMotion ? undefined : staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid md:grid-cols-2 gap-8"
          >
            {skills.map((group) => (
              <motion.div
                key={group.category}
                variants={shouldReduceMotion ? undefined : scaleIn}
                className="p-6 rounded-2xl border border-white/5 bg-[#111] hover:border-purple-500/20 transition-all duration-300 group"
              >
                <h3 className="font-syne font-bold text-lg mb-5 text-white/90 group-hover:text-purple-300 transition-colors duration-200">
                  {group.category}
                </h3>
                <div className="space-y-4">
                  {group.items.map((skill) => {
                    const level = skillLevels[skill] ?? 75;
                    return (
                      <div key={skill}>
                        <div className="flex justify-between items-center mb-1.5">
                          <span className="text-sm text-white/60">{skill}</span>
                          <span className="text-xs text-white/30">{level}%</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                            className="h-full rounded-full bg-gradient-to-r from-purple-500 to-violet-400"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── PROJECTS ─────────────────────────────────────────────────────── */}
      <section id="projects" className="py-28 md:py-36 relative">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-purple-600/5 blur-[120px] pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            {...(shouldReduceMotion ? {} : { variants: fadeInUp, initial: "hidden", whileInView: "visible", viewport: { once: true, margin: "-80px" } })}
            className="mb-16"
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-purple-400">Portfolio</span>
            <h2 className="font-syne text-4xl md:text-5xl font-bold tracking-tight mt-3 text-balance">
              Selected Projects
            </h2>
            <p className="text-white/50 mt-4 max-w-xl text-pretty">
              A handful of projects I&apos;m proud of. Each one taught me something new.
            </p>
          </motion.div>

          {/* Featured projects — large cards */}
          <motion.div
            variants={shouldReduceMotion ? undefined : staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="space-y-8 mb-8"
          >
            {projects.filter((p) => p.featured).map((project, i) => (
              <motion.div
                key={project.id}
                variants={shouldReduceMotion ? undefined : fadeInUp}
                whileHover={shouldReduceMotion ? {} : { y: -4 }}
                transition={{ duration: 0.3 }}
                className={`grid md:grid-cols-2 gap-0 rounded-2xl border border-white/5 bg-[#111] overflow-hidden hover:border-purple-500/20 transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.3)] ${i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`}
              >
                {/* Image */}
                <div className="relative aspect-video md:aspect-auto overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-transparent" />
                </div>
                {/* Content */}
                <div className="p-8 md:p-10 flex flex-col justify-center space-y-5">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs rounded-full border border-purple-500/20 bg-purple-500/10 text-purple-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-syne text-2xl font-bold text-white">{project.title}</h3>
                  <p className="text-white/55 leading-relaxed text-pretty">{project.description}</p>
                  <div className="flex items-center gap-4 pt-2">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors duration-200"
                    >
                      <Github size={15} />
                      Source
                    </a>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 font-medium transition-colors duration-200 group"
                    >
                      <ExternalLink size={15} />
                      Live Demo
                      <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-200" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Smaller project cards */}
          <motion.div
            variants={shouldReduceMotion ? undefined : staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid md:grid-cols-2 gap-6"
          >
            {projects.filter((p) => !p.featured).map((project) => (
              <motion.div
                key={project.id}
                variants={shouldReduceMotion ? undefined : scaleIn}
                whileHover={shouldReduceMotion ? {} : { y: -4 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl border border-white/5 bg-[#111] overflow-hidden hover:border-purple-500/20 transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.3)] group"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111]/80 to-transparent" />
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 text-xs rounded-full border border-white/8 bg-white/5 text-white/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-syne text-xl font-bold text-white group-hover:text-purple-300 transition-colors duration-200">
                    {project.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed text-pretty">{project.description}</p>
                  <div className="flex items-center gap-4 pt-1">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-white/40 hover:text-white transition-colors duration-200"
                    >
                      <Github size={13} />
                      Source
                    </a>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-purple-400 hover:text-purple-300 font-medium transition-colors duration-200"
                    >
                      <ExternalLink size={13} />
                      Live Demo
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── EXPERIENCE ───────────────────────────────────────────────────── */}
      <section id="experience" className="py-28 md:py-36 bg-[#0d0d0d] relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            {...(shouldReduceMotion ? {} : { variants: fadeInUp, initial: "hidden", whileInView: "visible", viewport: { once: true, margin: "-80px" } })}
            className="mb-16"
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-purple-400">Career</span>
            <h2 className="font-syne text-4xl md:text-5xl font-bold tracking-tight mt-3 text-balance">
              Work Experience
            </h2>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-[200px] top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/30 via-purple-500/10 to-transparent hidden md:block" />

            <motion.div
              variants={shouldReduceMotion ? undefined : staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="space-y-12"
            >
              {experience.map((job) => (
                <motion.div
                  key={job.id}
                  variants={shouldReduceMotion ? undefined : fadeInUp}
                  className="md:grid md:grid-cols-[200px_1fr] gap-8 items-start"
                >
                  {/* Period */}
                  <div className="hidden md:block text-right pr-8 pt-1">
                    <span className="text-sm text-white/30 font-mono">{job.period}</span>
                  </div>

                  {/* Content */}
                  <div className="relative pl-0 md:pl-8">
                    {/* Timeline dot */}
                    <div className="hidden md:block absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-purple-500 ring-4 ring-[#0d0d0d]" />

                    <div className="p-6 rounded-2xl border border-white/5 bg-[#111] hover:border-purple-500/20 transition-all duration-300">
                      <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                        <div>
                          <h3 className="font-syne text-xl font-bold text-white">{job.role}</h3>
                          <p className="text-purple-400 font-medium mt-0.5">{job.company}</p>
                        </div>
                        <span className="md:hidden text-xs text-white/30 font-mono bg-white/5 px-3 py-1 rounded-full">
                          {job.period}
                        </span>
                      </div>
                      <p className="text-white/55 leading-relaxed text-sm text-pretty mb-4">{job.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {job.highlights.map((h) => (
                          <span
                            key={h}
                            className="px-3 py-1 text-xs rounded-full border border-white/8 bg-white/5 text-white/50"
                          >
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section className="py-28 md:py-36 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-purple-600/6 blur-[120px] pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            {...(shouldReduceMotion ? {} : { variants: fadeInUp, initial: "hidden", whileInView: "visible", viewport: { once: true, margin: "-80px" } })}
            className="text-center mb-16"
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-purple-400">Social Proof</span>
            <h2 className="font-syne text-4xl md:text-5xl font-bold tracking-tight mt-3 text-balance">
              What Clients Say
            </h2>
          </motion.div>

          <motion.div
            variants={shouldReduceMotion ? undefined : staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid md:grid-cols-3 gap-6"
          >
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                variants={shouldReduceMotion ? undefined : scaleIn}
                whileHover={shouldReduceMotion ? {} : { y: -6, scale: 1.01 }}
                transition={{ duration: 0.3 }}
                className={`p-7 rounded-2xl border border-white/5 bg-[#111] hover:border-purple-500/20 transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.3)] flex flex-col gap-5 ${i === 1 ? "md:mt-8" : ""}`}
              >
                {/* Stars */}
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={14} className="text-purple-400 fill-purple-400" />
                  ))}
                </div>
                <p className="text-white/65 leading-relaxed text-sm text-pretty flex-1">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-2 border-t border-white/5">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-purple-500/20"
                  />
                  <div>
                    <div className="text-sm font-semibold text-white">{t.name}</div>
                    <div className="text-xs text-white/40">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────────────────────── */}
      <section id="contact" className="py-28 md:py-36 bg-[#0d0d0d] relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            {/* Left: Copy */}
            <motion.div
              variants={shouldReduceMotion ? undefined : slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="space-y-8"
            >
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-purple-400">Contact</span>
                <h2 className="font-syne text-4xl md:text-5xl font-bold tracking-tight mt-3 text-balance">
                  Let&apos;s build something{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-violet-300">
                    together
                  </span>
                </h2>
              </div>
              <p className="text-white/55 leading-relaxed text-pretty">
                I&apos;m currently open to new freelance projects and full-time opportunities. Whether you have a product idea, need a technical partner, or just want to say hello — my inbox is open.
              </p>

              <div className="space-y-4">
                {[
                  { icon: Mail, label: "Email", value: APP_EMAIL, href: `mailto:${APP_EMAIL}` },
                  { icon: Github, label: "GitHub", value: "github.com/alexrivera", href: "https://github.com" },
                  { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/alexrivera", href: "https://linkedin.com" },
                ].map(({ icon: Icon, label, value, href }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-[#111] hover:border-purple-500/30 hover:bg-purple-500/5 transition-all duration-200 group"
                  >
                    <div className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center group-hover:border-purple-500/40 group-hover:bg-purple-500/10 transition-all duration-200">
                      <Icon size={16} className="text-white/50 group-hover:text-purple-400 transition-colors duration-200" />
                    </div>
                    <div>
                      <div className="text-xs text-white/30 uppercase tracking-wider">{label}</div>
                      <div className="text-sm text-white/70 group-hover:text-white transition-colors duration-200">{value}</div>
                    </div>
                    <ArrowRight size={14} className="ml-auto text-white/20 group-hover:text-purple-400 group-hover:translate-x-1 transition-all duration-200" />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Right: Form */}
            <motion.div
              variants={shouldReduceMotion ? undefined : slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              <div className="p-8 rounded-2xl border border-white/5 bg-[#111] shadow-[0_8px_40px_rgba(0,0,0,0.4)]">
                {formStatus === "sent" ? (
                  <motion.div
                    variants={shouldReduceMotion ? undefined : scaleIn}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col items-center justify-center py-12 text-center gap-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
                      <CheckCircle size={28} className="text-purple-400" />
                    </div>
                    <h3 className="font-syne text-xl font-bold text-white">Message Sent!</h3>
                    <p className="text-white/50 text-sm max-w-xs">
                      Thanks for reaching out. I&apos;ll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => setFormStatus("idle")}
                      className="mt-2 text-sm text-purple-400 hover:text-purple-300 transition-colors duration-200"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-5">
                    <h3 className="font-syne text-xl font-bold text-white mb-6">Send a Message</h3>
                    <div>
                      <label htmlFor="name" className="block text-xs text-white/40 uppercase tracking-wider mb-2">
                        Your Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formState.name}
                        onChange={handleFormChange}
                        placeholder="Jane Smith"
                        className="w-full px-4 py-3 rounded-xl border border-white/8 bg-white/5 text-white placeholder-white/20 text-sm focus:outline-none focus:border-purple-500/50 focus:bg-purple-500/5 transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-xs text-white/40 uppercase tracking-wider mb-2">
                        Email Address
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formState.email}
                        onChange={handleFormChange}
                        placeholder="jane@company.com"
                        className="w-full px-4 py-3 rounded-xl border border-white/8 bg-white/5 text-white placeholder-white/20 text-sm focus:outline-none focus:border-purple-500/50 focus:bg-purple-500/5 transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-xs text-white/40 uppercase tracking-wider mb-2">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={formState.message}
                        onChange={handleFormChange}
                        placeholder="Tell me about your project..."
                        className="w-full px-4 py-3 rounded-xl border border-white/8 bg-white/5 text-white placeholder-white/20 text-sm focus:outline-none focus:border-purple-500/50 focus:bg-purple-500/5 transition-all duration-200 resize-none"
                      />
                    </div>
                    <motion.button
                      type="submit"
                      disabled={formStatus === "sending"}
                      whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                      whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                      className="w-full py-3.5 bg-purple-500 hover:bg-purple-400 disabled:opacity-60 text-white font-medium rounded-xl transition-all duration-300 shadow-[0_0_24px_rgba(168,85,247,0.3)] hover:shadow-[0_0_36px_rgba(168,85,247,0.5)] flex items-center justify-center gap-2"
                    >
                      {formStatus === "sending" ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <ArrowRight size={16} />
                        </>
                      )}
                    </motion.button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

    </main>
  );
}