"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Code2 as Github, MessageCircle as Twitter, Briefcase as Linkedin, Mail, ArrowUp } from 'lucide-react';
import { navLinks, APP_NAME, APP_TAGLINE, APP_EMAIL } from "@/lib/data";
import { fadeInUp, staggerContainer } from "@/lib/motion";

const socials = [
  { icon: Github, label: "GitHub", href: "https://github.com" },
  { icon: Twitter, label: "Twitter", href: "https://twitter.com" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
  { icon: Mail, label: "Email", href: `mailto:${APP_EMAIL}` },
];

export default function Footer() {
  const pathname = usePathname();

  function handleAnchorClick(
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) {
    if (pathname === "/" && href.startsWith("#")) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }

  function getHref(href: string) {
    if (href.startsWith("#") && pathname !== "/") {
      return "/" + href;
    }
    return href;
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <footer className="relative border-t border-white/5 bg-[#0a0a0a]">
      {/* Subtle glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 py-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12"
        >
          {/* Brand */}
          <motion.div variants={fadeInUp} className="space-y-4">
            <Link
              href="/"
              className="font-syne font-bold text-xl tracking-tight text-white hover:text-purple-400 transition-colors duration-200 inline-block"
            >
              <span className="text-purple-400">{"{"}</span>
              {APP_NAME}
              <span className="text-purple-400">{"}"}</span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              {APP_TAGLINE}. Building thoughtful digital experiences with clean code and creative vision.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-white/10 text-white/50 hover:text-purple-400 hover:border-purple-500/50 hover:bg-purple-500/10 transition-all duration-200"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Nav links */}
          <motion.div variants={fadeInUp} className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/30">
              Navigation
            </h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={getHref(link.href)}
                    onClick={(e) => handleAnchorClick(e, link.href)}
                    className="text-sm text-white/50 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={fadeInUp} className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/30">
              Get in Touch
            </h3>
            <p className="text-sm text-white/50 leading-relaxed">
              Open to new opportunities and interesting collaborations. Let&apos;s build something great together.
            </p>
            <a
              href={`mailto:${APP_EMAIL}`}
              className="inline-flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 transition-colors duration-200 group"
            >
              <Mail size={14} />
              <span className="group-hover:underline underline-offset-2">{APP_EMAIL}</span>
            </a>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} {APP_NAME}. Crafted with care.
          </p>
          <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="w-9 h-9 flex items-center justify-center rounded-full border border-white/10 text-white/40 hover:text-purple-400 hover:border-purple-500/50 hover:bg-purple-500/10 transition-all duration-200"
          >
            <ArrowUp size={14} />
          </button>
        </motion.div>
      </div>
    </footer>
  );
}