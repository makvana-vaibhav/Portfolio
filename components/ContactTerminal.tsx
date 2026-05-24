'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { personal } from '@/data/portfolio';

const terminalLines = [
  { text: '$ whoami', type: 'cmd' as const, delay: 200 },
  { text: '  vaibhav-makvana — AI Backend & Infrastructure Engineer', type: 'output' as const, delay: 500 },
  { text: '$ status', type: 'cmd' as const, delay: 900 },
  { text: '  ● Available for backend engineering, AI systems, infrastructure', type: 'output' as const, delay: 1200 },
  { text: '  ● Open to production engineering roles and freelance projects', type: 'output' as const, delay: 1450 },
  { text: '$ contact --method preferred', type: 'cmd' as const, delay: 1800 },
  { text: '  → Email: vaibhav.r.makvana@gmail.com', type: 'output' as const, delay: 2100 },
  { text: '  → LinkedIn: linkedin.com/in/vaibhav-makvana', type: 'output' as const, delay: 2300 },
  { text: '  → GitHub: github.com/makvana-vaibhav', type: 'output' as const, delay: 2500 },
  { text: '$ _', type: 'prompt' as const, delay: 2800 },
];

function TerminalDisplay() {
  const [visible, setVisible] = useState<number[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;

    terminalLines.forEach((line, i) => {
      setTimeout(() => {
        setVisible(prev => [...prev, i]);
      }, line.delay);
    });
  }, [inView]);

  return (
    <div
      ref={ref}
      className="border border-[#1c1c1c] bg-[#060606] rounded-sm overflow-hidden font-mono"
    >
      {/* Terminal title bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-[#0a0a0a] border-b border-[#111]">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ef4444] opacity-40" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#f59e0b] opacity-40" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#22c55e] opacity-40" />
        </div>
        <span className="text-[10px] text-[#333] ml-2 tracking-widest uppercase">vaibhav.sys — contact</span>
        <span className="ml-auto flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] status-dot" />
          <span className="text-[10px] text-[#22c55e]">SESSION ACTIVE</span>
        </span>
      </div>

      {/* Terminal body */}
      <div className="p-5 space-y-0.5 min-h-[260px]">
        {terminalLines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={visible.includes(i) ? { opacity: 1 } : {}}
            transition={{ duration: 0.2 }}
            className={`text-xs leading-relaxed ${
              line.type === 'cmd'
                ? 'text-[#f97316]'
                : line.type === 'prompt'
                ? 'text-[#f97316]'
                : 'text-[#777]'
            }`}
          >
            {line.text}
            {line.type === 'prompt' && visible.includes(i) && (
              <span className="cursor-blink text-[#f97316]">█</span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function ContactTerminal() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });

  const contactLinks = [
    {
      label: 'Email',
      value: personal.email,
      href: `mailto:${personal.email}`,
      icon: '✉',
      desc: 'Direct line — fastest response',
    },
    {
      label: 'LinkedIn',
      value: 'vaibhav-makvana',
      href: personal.linkedin,
      icon: '⬡',
      desc: 'Professional network & updates',
    },
    {
      label: 'GitHub',
      value: 'makvana-vaibhav',
      href: personal.github,
      icon: '◈',
      desc: 'Open source & project code',
    },
    {
      label: 'Phone',
      value: personal.phone,
      href: `tel:${personal.phone.replace(/\s/g, '')}`,
      icon: '◎',
      desc: 'Available in IST business hours',
    },
  ];

  return (
    <section id="contact" className="relative py-28" style={{ background: '#070707' }}>
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'linear-gradient(to right, #0e0e0e 1px, transparent 1px), linear-gradient(to bottom, #0e0e0e 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full opacity-[0.04] bg-[#f97316] blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="font-mono text-[10px] text-[#f97316] tracking-[0.3em] uppercase">05 / Contact</div>
            <div className="flex-1 h-px bg-[#1c1c1c]" />
          </div>

          <h2 className="font-display font-bold text-white mb-3" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
            Open <span className="text-[#f97316]">Channel</span>
          </h2>
          <p className="text-[#666] text-base leading-relaxed max-w-xl font-body">
            If you're building backend systems, AI pipelines, or production infrastructure —
            let's talk. Available for engineering roles and collaborative projects.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_360px] gap-8 items-start">
          {/* Left: Terminal */}
          <TerminalDisplay />

          {/* Right: Contact links + location */}
          <div className="space-y-3">
            {contactLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
                className="flex items-center gap-4 p-4 border border-[#1c1c1c] bg-[#080808] rounded-sm hover:border-[#f97316]/30 hover:bg-[#0a0a0a] transition-all duration-200 group"
              >
                <div
                  className="w-8 h-8 rounded-sm border border-[#1c1c1c] group-hover:border-[#f97316]/30 flex items-center justify-center flex-shrink-0 transition-colors duration-200"
                  style={{ background: '#0d0d0d' }}
                >
                  <span className="text-[#f97316] opacity-60 text-sm font-mono">{link.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-mono text-[9px] text-[#444] tracking-widest uppercase mb-0.5">{link.label}</div>
                  <div className="font-mono text-[11px] text-[#aaa] group-hover:text-white transition-colors truncate">
                    {link.value}
                  </div>
                  <div className="font-mono text-[9px] text-[#333] mt-0.5">{link.desc}</div>
                </div>
                <span className="text-[#333] group-hover:text-[#f97316] transition-colors font-mono text-xs">↗</span>
              </motion.a>
            ))}

            {/* Location block */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="border border-[#1c1c1c] bg-[#080808] rounded-sm p-4"
            >
              <div className="font-mono text-[10px] text-[#444] tracking-widest uppercase mb-2">Location</div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-mono text-sm text-white">Rajkot, Gujarat</div>
                  <div className="font-mono text-[10px] text-[#555] mt-0.5">India · IST (UTC+5:30)</div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] status-dot" />
                  <span className="font-mono text-[10px] text-[#22c55e]">Remote-ready</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
