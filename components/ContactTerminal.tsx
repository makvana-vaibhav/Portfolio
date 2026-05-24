'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { personal } from '@/data/portfolio';

const terminalLines = [
  { text: '$ init-session --secure', type: 'cmd' as const, delay: 200 },
  { text: '  Establishing encrypted connection...', type: 'output' as const, delay: 500 },
  { text: '  ✓ Handshake complete · TLS 1.3 · Session ID: 9f3a7c', type: 'ok' as const, delay: 850 },
  { text: '$ whoami --remote', type: 'cmd' as const, delay: 1200 },
  { text: '  vaibhav-makvana@backend.sys', type: 'output' as const, delay: 1450 },
  { text: '  Role: Python Backend · AI Developer · DevOps Engineer', type: 'output' as const, delay: 1650 },
  { text: '$ ping vaibhav.sys', type: 'cmd' as const, delay: 2000 },
  { text: '  PONG — 3ms latency · Status: AVAILABLE · Open to roles', type: 'ok' as const, delay: 2250 },
  { text: '$ open-channel --priority high', type: 'cmd' as const, delay: 2600 },
  { text: '  ✓ Email:    vaibhav.r.makvana@gmail.com', type: 'ok' as const, delay: 2900 },
  { text: '  ✓ LinkedIn: /in/vaibhav-makvana', type: 'ok' as const, delay: 3100 },
  { text: '  ✓ GitHub:   /makvana-vaibhav', type: 'ok' as const, delay: 3300 },
  { text: '$ _', type: 'prompt' as const, delay: 3600 },
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
        <span className="text-[10px] text-[#333] ml-2 tracking-widest uppercase">open-channel.sys — secure session</span>
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
                : line.type === 'ok'
                ? 'text-[#22c55e]'
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
      icon: (
        <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="3" width="14" height="10" rx="1.5" />
          <path d="M1 4.5L8 9.5L15 4.5" />
        </svg>
      ),
      desc: 'Direct line — fastest response',
    },
    {
      label: 'LinkedIn',
      value: 'vaibhav-makvana',
      href: personal.linkedin,
      icon: (
        <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1.5" y="1.5" width="13" height="13" rx="2" />
          <circle cx="5" cy="5.5" r="0.9" fill="currentColor" stroke="none" />
          <line x1="5" y1="7.5" x2="5" y2="12" />
          <path d="M8 7.5v4.5M8 9.8a2.3 2.3 0 0 1 4.5 0V12" />
        </svg>
      ),
      desc: 'Professional network & updates',
    },
    {
      label: 'GitHub',
      value: 'makvana-vaibhav',
      href: personal.github,
      icon: (
        <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
        </svg>
      ),
      desc: 'Open source & project code',
    },
    {
      label: 'Phone',
      value: personal.phone,
      href: `tel:${personal.phone.replace(/\s/g, '')}`,
      icon: (
        <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 1.5h2.8l1.4 3.2-2 1.4c.9 2 2.7 3.7 4.7 4.7l1.4-2 3.2 1.4V12c-.1 1.5-1.2 2.5-2.5 2.5C5.8 14.2 1.8 10.2 1.5 4.5 1.5 3.2 2 2 3 1.5z" />
        </svg>
      ),
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
            <div className="font-mono text-[10px] text-[#f97316] tracking-[0.3em] uppercase">06 / Contact</div>
            <div className="flex-1 h-px bg-[#1c1c1c]" />
          </div>

          <h2 className="font-display font-bold text-white mb-3" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
            Open <span className="text-[#f97316]">Communication</span>
          </h2>
          <p className="text-[#666] text-base leading-relaxed max-w-xl font-body">
            If you're building backend systems, AI pipelines, or production infrastructure and need a passionate engineer,
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
                  <span className="text-[#f97316] opacity-60 flex items-center justify-center">{link.icon}</span>
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
