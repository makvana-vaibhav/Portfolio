'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { personal } from '@/data/portfolio';

const navLinks = [
  { label: 'Projects', href: '#projects' },
  { label: 'Stack', href: '#stack' },
  { label: 'Experience', href: '#experience' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = navLinks.map(l => l.href.replace('#', ''));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        <div
          className={`transition-all duration-300 ${
            scrolled
              ? 'bg-[#060606]/95 backdrop-blur-xl border-b border-[#1c1c1c]'
              : 'bg-transparent border-b border-transparent'
          }`}
        >
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            {/* Logo */}
            <a
              href="#command-center"
              className="font-mono text-sm font-semibold tracking-widest text-white hover:text-[#f97316] transition-colors duration-200 flex items-center gap-2"
            >
              <span className="text-[#f97316] opacity-70">▶</span>
              <span>{personal.handle}</span>
              <span className="cursor-blink text-[#f97316] text-xs ml-0.5">_</span>
            </a>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map(link => {
                const sectionId = link.href.replace('#', '');
                const isActive = activeSection === sectionId;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className={`relative px-3 py-1.5 font-mono text-[11px] tracking-widest uppercase transition-colors duration-200 rounded-sm ${
                      isActive ? 'text-[#f97316]' : 'text-[#666] hover:text-[#ccc]'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 bg-[#f97316]/8 rounded-sm border border-[#f97316]/20"
                        transition={{ type: 'spring', stiffness: 400, damping: 40 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </a>
                );
              })}

              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-4 px-4 py-1.5 border border-[#2a2a2a] text-[#999] hover:border-[#f97316] hover:text-[#f97316] font-mono text-[11px] tracking-widest uppercase transition-all duration-200 rounded-sm"
              >
                GitHub
              </a>
            </nav>

            {/* Mobile toggle */}
            <button
              className="md:hidden text-[#666] hover:text-white transition-colors p-1"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <div className="w-5 flex flex-col gap-1">
                <span className={`h-px bg-current transition-all duration-200 ${mobileOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                <span className={`h-px bg-current transition-all duration-200 ${mobileOpen ? 'opacity-0' : ''}`} />
                <span className={`h-px bg-current transition-all duration-200 ${mobileOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
              </div>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-[#060606]/98 backdrop-blur-xl flex flex-col items-center justify-center gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="font-mono text-2xl text-[#666] hover:text-[#f97316] transition-colors tracking-widest uppercase"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.05 }}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm text-[#f97316] border border-[#f97316]/30 px-6 py-2.5 tracking-widest uppercase mt-4 hover:bg-[#f97316]/10 transition-colors"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: navLinks.length * 0.05 }}
            >
              GitHub →
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
