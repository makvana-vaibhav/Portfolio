'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { personal, systemMetrics, systemStatus } from '@/data/portfolio';

function AnimatedCounter({ target, duration = 1800 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const tick = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count}</span>;
}

function LiveMetricPanel() {
  const [ticks, setTicks] = useState([0, 0, 0, 0, 0, 0, 0, 0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTicks(prev => prev.map((v, i) => {
        const base = [72, 45, 88, 61, 55, 79, 34, 91][i];
        return Math.max(20, Math.min(99, base + Math.floor((Math.random() - 0.5) * 12)));
      }));
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="border border-[#1c1c1c] bg-[#0a0a0a] rounded-sm p-4 font-mono">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] text-[#444] tracking-widest uppercase">System Telemetry</span>
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] status-dot" />
          <span className="text-[10px] text-[#22c55e]">LIVE</span>
        </span>
      </div>
      <div className="grid grid-cols-4 gap-1.5">
        {['CPU', 'MEM', 'NET', 'I/O', 'API', 'DB', 'Q', 'GPU'].map((label, i) => (
          <div key={label} className="flex flex-col gap-1">
            <div className="text-[9px] text-[#444] tracking-wider">{label}</div>
            <div className="h-1 bg-[#111] rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: ticks[i] > 80 ? '#ef4444' : ticks[i] > 60 ? '#f59e0b' : '#22c55e',
                  width: `${ticks[i]}%`,
                }}
                animate={{ width: `${ticks[i]}%` }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
              />
            </div>
            <div className="text-[9px] text-[#666] tabular-nums">{ticks[i]}%</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ServiceStatusPanel() {
  return (
    <div className="border border-[#1c1c1c] bg-[#0a0a0a] rounded-sm p-4 font-mono">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] text-[#444] tracking-widest uppercase">Service Status</span>
        <span className="text-[10px] text-[#f97316]">6/6</span>
      </div>
      <div className="space-y-1.5">
        {systemStatus.map(s => (
          <div key={s.service} className="flex items-center justify-between">
            <span className="text-[11px] text-[#777]">{s.service}</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] status-dot" />
              <span className="text-[10px] text-[#22c55e] tracking-wider">UP</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CommandCenter() {
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
  };

  return (
    <section
      id="command-center"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{
        backgroundImage: 'linear-gradient(to right, #111111 1px, transparent 1px), linear-gradient(to bottom, #111111 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }}
    >
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full opacity-[0.04] bg-[#f97316] blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-[0.03] bg-[#3b82f6] blur-[120px] pointer-events-none" />

      {/* Top status bar */}
      <div className="absolute top-0 left-0 right-0 h-16 flex items-end px-6 pb-0">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-32 w-full">
        <div className="grid lg:grid-cols-[1fr_320px] gap-12 items-center">

          {/* Left: Main identity */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* System label */}
            <motion.div variants={itemVariants} className="flex items-center gap-3 mb-8">
              <div className="flex items-center gap-2 px-3 py-1 border border-[#1c1c1c] bg-[#0d0d0d] rounded-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] status-dot" />
                <span className="font-mono text-[10px] text-[#22c55e] tracking-widest uppercase">Systems Online</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 border border-[#1c1c1c] bg-[#0d0d0d] rounded-sm">
                <span className="font-mono text-[10px] text-[#444] tracking-widest uppercase">v2.0.0</span>
              </div>
            </motion.div>

            {/* Name */}
            <motion.div variants={itemVariants}>
              <h1
                className="font-display font-bold leading-[0.95] tracking-tight mb-4"
                style={{ fontSize: 'clamp(3.5rem, 8vw, 6.5rem)' }}
              >
                <span className="text-white">Vaibhav</span>
                <br />
                <span className="text-white">Makvana</span>
                <span className="text-[#f97316]">.</span>
              </h1>
            </motion.div>

            {/* Title */}
            <motion.div variants={itemVariants} className="mb-6">
              <div className="font-mono text-[#f97316] text-sm tracking-[0.2em] uppercase mb-2">
                {personal.title}
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-[#888] text-lg leading-relaxed max-w-xl mb-10 font-body"
            >
              Engineering production-grade backend systems, AI inference pipelines, and scalable infrastructure.
              Every system ships with observability, error recovery, and real deployment history.
            </motion.p>

            {/* CTA buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
              <a
                href="#ai-systems"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#f97316] text-black font-mono text-sm font-semibold tracking-widest uppercase hover:bg-[#fb923c] transition-colors duration-200 rounded-sm"
              >
                <span>Explore Systems</span>
                <span>→</span>
              </a>
              <a
                href="#architecture"
                className="inline-flex items-center gap-2 px-6 py-3 border border-[#2a2a2a] text-[#999] font-mono text-sm tracking-widest uppercase hover:border-[#f97316] hover:text-[#f97316] transition-all duration-200 rounded-sm"
              >
                View Architecture
              </a>
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-[#1c1c1c] text-[#666] font-mono text-sm tracking-widest uppercase hover:border-[#2a2a2a] hover:text-[#999] transition-all duration-200 rounded-sm"
              >
                LinkedIn
              </a>
            </motion.div>

            {/* Metrics strip */}
            <motion.div variants={itemVariants} className="mt-12 pt-8 border-t border-[#1a1a1a]">
              <div className="flex flex-wrap gap-8">
                {systemMetrics.map(m => (
                  <div key={m.label} className="font-mono">
                    <div className="text-3xl font-bold text-white tabular-nums flex items-baseline gap-0.5">
                      <AnimatedCounter target={parseInt(m.value)} />
                      <span className="text-[#f97316]">+</span>
                    </div>
                    <div className="text-[10px] text-[#444] tracking-widest uppercase mt-0.5">{m.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right: System panels */}
          <motion.div
            className="flex flex-col gap-3"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          >
            <ServiceStatusPanel />
            <LiveMetricPanel />

            {/* Location panel */}
            <div className="border border-[#1c1c1c] bg-[#0a0a0a] rounded-sm p-4 font-mono">
              <div className="text-[10px] text-[#444] tracking-widest uppercase mb-2">Engineer Profile</div>
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] text-[#555]">Location</span>
                  <span className="text-[11px] text-[#888]">{personal.location}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[11px] text-[#555]">Focus</span>
                  <span className="text-[11px] text-[#f97316]">Backend + Infra</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[11px] text-[#555]">Status</span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] status-dot" />
                    <span className="text-[11px] text-[#22c55e]">Available</span>
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[11px] text-[#555]">Domain</span>
                  <a
                    href={`https://${personal.domain}`}
                    className="text-[11px] text-[#666] hover:text-[#f97316] transition-colors"
                  >
                    {personal.domain}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="font-mono text-[9px] text-[#333] tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-[#333] to-transparent" />
      </motion.div>
    </section>
  );
}
