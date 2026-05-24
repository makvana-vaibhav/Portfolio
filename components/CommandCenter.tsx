'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { personal, systemStatus, techStrip } from '@/data/portfolio';

function LiveSystemPanel() {
  const [latencies, setLatencies] = useState([3, 1, 2, 1, 11, 1]);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLatencies(prev =>
        prev.map(l => Math.max(1, Math.min(29, l + Math.round((Math.random() - 0.45) * 3)))
        )
      );
      setTick(t => t + 1);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="border border-[#1c1c1c] bg-[#0a0a0a] rounded-sm p-4 font-mono">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] text-[#444] tracking-widest uppercase">Service Health</span>
        <span className="flex items-center gap-1.5">
          <span className="w-1 h-1 rounded-full bg-[#22c55e] status-dot" />
          <span className="text-[10px] text-[#22c55e]">6 / 6</span>
        </span>
      </div>
      <div className="space-y-1.5">
        {systemStatus.map((s, i) => (
          <div key={s.service} className="flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-[#22c55e] flex-shrink-0" style={{ opacity: 0.6 }} />
              <span className="text-[11px] text-[#666]">{s.service}</span>
            </span>
            <span className="text-[10px] text-[#3a3a3a] tabular-nums">
              {latencies[i]}ms
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ActiveStackPanel() {
  const [queueDepth, setQueueDepth] = useState(7);

  useEffect(() => {
    const interval = setInterval(() => {
      setQueueDepth(prev =>
        Math.max(0, Math.min(42, prev + Math.round((Math.random() - 0.45) * 4)))
      );
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const activeStack = [
    { label: 'Runtime', value: 'Python 3.11' },
    { label: 'Queue', value: 'AWS SQS', live: true, liveValue: `${queueDepth} jobs` },
    { label: 'API', value: 'Node.js / Express' },
    { label: 'Database', value: 'PostgreSQL + Redis' },
    { label: 'Infra', value: 'Docker + AWS' },
    { label: 'Auth', value: 'JWT / OAuth 2.0' },
  ];

  return (
    <div className="border border-[#1c1c1c] bg-[#0a0a0a] rounded-sm p-4 font-mono">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] text-[#444] tracking-widest uppercase">Active Stack</span>
        <span className="flex items-center gap-1.5">
          <span className="w-1 h-1 rounded-full bg-[#f97316] flex-shrink-0" style={{ opacity: 0.6 }} />
          <span className="text-[10px] text-[#f97316]" style={{ opacity: 0.7 }}>IN USE</span>
        </span>
      </div>
      <div className="space-y-1.5">
        {activeStack.map(item => (
          <div key={item.label} className="flex items-center justify-between">
            <span className="text-[10px] text-[#444]">{item.label}</span>
            <span className="text-[11px] text-[#777]">
              {item.value}
              {item.live && (
                <span className="ml-1.5 text-[9px] text-[#2a2a2a] tabular-nums">
                  · {item.liveValue}
                </span>
              )}
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
        backgroundImage:
          'linear-gradient(to right, #111111 1px, transparent 1px), linear-gradient(to bottom, #111111 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }}
    >
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full opacity-[0.04] bg-[#f97316] blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-32 w-full">
        <div className="grid lg:grid-cols-[1fr_300px] gap-12 items-center">

          {/* Left: Identity */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Status badges */}
            <motion.div variants={itemVariants} className="flex items-center gap-3 mb-8 flex-wrap">
              <div className="flex items-center gap-2 px-3 py-1 border border-[#1c1c1c] bg-[#0d0d0d] rounded-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] status-dot" />
                <span className="font-mono text-[10px] text-[#22c55e] tracking-widest uppercase">Available</span>
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
              <div className="font-mono text-[#f97316] text-sm tracking-[0.2em] uppercase">
                {personal.title}
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-[#888] text-lg leading-relaxed max-w-xl mb-10 font-body"
            >
              Building backend systems, AI pipelines, and cloud infrastructure.
              Currently at Rishvi Ltd working on production AI systems, image processing,
              worker orchestration, and DevOps.
            </motion.p>

            {/* CTA buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#f97316] text-black font-mono text-sm font-semibold tracking-widest uppercase hover:bg-[#fb923c] transition-colors duration-200 rounded-sm"
              >
                <span>View Projects</span>
                <span>→</span>
              </a>
              <a
                href="#experience"
                className="inline-flex items-center gap-2 px-6 py-3 border border-[#2a2a2a] text-[#999] font-mono text-sm tracking-widest uppercase hover:border-[#f97316] hover:text-[#f97316] transition-all duration-200 rounded-sm"
              >
                Experience
              </a>
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-[#1c1c1c] text-[#666] font-mono text-sm tracking-widest uppercase hover:border-[#2a2a2a] hover:text-[#999] transition-all duration-200 rounded-sm"
              >
                GitHub ↗
              </a>
            </motion.div>

            {/* Tech strip — replaces inflated number metrics */}
            <motion.div
              variants={itemVariants}
              className="mt-12 pt-8 border-t border-[#1a1a1a] flex flex-wrap items-center gap-x-4 gap-y-2"
            >
              {techStrip.map((tech, i) => (
                <span key={tech} className="flex items-center gap-2">
                  <span className="font-mono text-[11px] text-[#444] tracking-widest">{tech}</span>
                  {i < techStrip.length - 1 && (
                    <span className="text-[#222] font-mono text-[8px]">·</span>
                  )}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: live panels */}
          <motion.div
            className="flex flex-col gap-3"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          >
            <LiveSystemPanel />
            <ActiveStackPanel />

            {/* Profile panel */}
            <div className="border border-[#1c1c1c] bg-[#0a0a0a] rounded-sm p-4 font-mono">
              <div className="text-[10px] text-[#444] tracking-widest uppercase mb-2">Profile</div>
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-[#444]">Location</span>
                  <span className="text-[11px] text-[#777]">Rajkot, India</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-[#444]">Focus</span>
                  <span className="text-[11px] text-[#f97316]" style={{ opacity: 0.8 }}>
                    Backend + AI + DevOps
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-[#444]">Domain</span>
                  <a
                    href={`https://${personal.domain}`}
                    className="text-[11px] text-[#555] hover:text-[#f97316] transition-colors"
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
        <span className="font-mono text-[9px] text-[#2a2a2a] tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-[#2a2a2a] to-transparent" />
      </motion.div>
    </section>
  );
}
