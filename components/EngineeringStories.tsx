'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { engineeringStories } from '@/data/portfolio';

const severityConfig = {
  HIGH: { label: 'SEV-1', color: '#ef4444', bg: '#ef444410', border: '#ef444430' },
  MEDIUM: { label: 'SEV-2', color: '#f59e0b', bg: '#f59e0b10', border: '#f59e0b30' },
  LOW: { label: 'SEV-3', color: '#22c55e', bg: '#22c55e10', border: '#22c55e30' },
};

function StoryCard({
  story,
  index,
}: {
  story: typeof engineeringStories[0];
  index: number;
}) {
  const [open, setOpen] = useState(index === 0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const sev = severityConfig[story.severity];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
      className="border border-[#1c1c1c] bg-[#080808] rounded-sm overflow-hidden"
    >
      {/* Incident header - always visible */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left p-5 hover:bg-[#0a0a0a] transition-colors duration-150"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            {/* Meta row */}
            <div className="flex items-center gap-2 flex-wrap mb-2.5">
              <span
                className="font-mono text-[9px] px-2 py-0.5 rounded-sm border tracking-widest uppercase font-semibold"
                style={{ color: sev.color, background: sev.bg, borderColor: sev.border }}
              >
                {sev.label} · {story.severity}
              </span>
              <span className="font-mono text-[9px] text-[#444] border border-[#1a1a1a] px-2 py-0.5 rounded-sm tracking-wider uppercase">
                {story.system}
              </span>
              <span className="font-mono text-[9px] text-[#333] tracking-wider">{story.date}</span>
            </div>

            <h3 className="font-display font-semibold text-white text-base leading-snug mb-1.5">
              {story.title}
            </h3>
            <p className="font-mono text-[11px] text-[#666] leading-relaxed">
              {story.summary}
            </p>
          </div>

          {/* Expand toggle */}
          <motion.div
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="font-mono text-[#444] text-xs flex-shrink-0 mt-1"
          >
            ▼
          </motion.div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {story.tags.map(tag => (
            <span
              key={tag}
              className="font-mono text-[9px] text-[#555] border border-[#1a1a1a] px-2 py-0.5 rounded-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </button>

      {/* Expanded incident report */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-[#111] p-5 space-y-5">

              {/* Problem */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="w-1 h-4 rounded-sm flex-shrink-0"
                    style={{ background: sev.color, opacity: 0.7 }}
                  />
                  <span className="font-mono text-[10px] text-[#444] tracking-widest uppercase">Problem</span>
                </div>
                <p className="text-[#888] text-sm leading-relaxed font-body pl-3">
                  {story.problem}
                </p>
              </div>

              {/* Investigation - terminal style */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-1 h-4 rounded-sm flex-shrink-0 bg-[#f59e0b] opacity-70" />
                  <span className="font-mono text-[10px] text-[#444] tracking-widest uppercase">Investigation Log</span>
                </div>
                <div className="bg-[#060606] border border-[#1a1a1a] rounded-sm p-4 font-mono">
                  {story.investigation.map((step, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * i, duration: 0.3 }}
                      className="flex gap-3 mb-1.5 last:mb-0 text-xs"
                    >
                      <span className="text-[#f97316] flex-shrink-0 opacity-60">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="text-[#777] leading-relaxed">{step}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Solution */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-1 h-4 rounded-sm flex-shrink-0 bg-[#22c55e] opacity-70" />
                  <span className="font-mono text-[10px] text-[#444] tracking-widest uppercase">Resolution</span>
                </div>
                <p className="text-[#888] text-sm leading-relaxed font-body pl-3">
                  {story.solution}
                </p>
              </div>

              {/* Outcome */}
              <div
                className="rounded-sm px-4 py-3 border"
                style={{ background: '#22c55e08', borderColor: '#22c55e20' }}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] status-dot" />
                  <span className="font-mono text-[10px] text-[#22c55e] tracking-widest uppercase">Outcome</span>
                </div>
                <p className="text-[#777] text-sm leading-relaxed font-body">{story.outcome}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function EngineeringStories() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section id="stories" className="relative py-28" style={{ background: '#060606' }}>
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: 'linear-gradient(to right, #0d0d0d 1px, transparent 1px), linear-gradient(to bottom, #0d0d0d 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Red glow for incident feel */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full opacity-[0.025] bg-[#ef4444] blur-[140px] pointer-events-none" />

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
            <div className="font-mono text-[10px] text-[#f97316] tracking-[0.3em] uppercase">
              03 / Production Stories
            </div>
            <div className="flex-1 h-px bg-[#1c1c1c]" />
          </div>

          <div className="grid md:grid-cols-[1fr_auto] gap-6 items-end">
            <div>
              <h2 className="font-display font-bold text-white mb-3" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
                Engineering <span className="text-[#f97316]">Stories</span>
              </h2>
              <p className="text-[#666] text-base leading-relaxed max-w-xl font-body">
                Real incidents, real debugging, real systems. These are the problems that production throws at you —
                and how they were resolved.
              </p>
            </div>
            <div className="border border-[#1c1c1c] rounded-sm px-4 py-2.5 font-mono text-[10px] flex-shrink-0 flex flex-col gap-1.5">
              {Object.entries(severityConfig).map(([k, v]) => (
                <div key={k} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: v.color }} />
                  <span className="text-[#444]">{v.label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Stories */}
        <div className="space-y-4 max-w-4xl">
          {engineeringStories.map((story, i) => (
            <StoryCard key={story.id} story={story} index={i} />
          ))}
        </div>

        {/* Bottom callout */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-10 max-w-4xl border border-[#1c1c1c] bg-[#080808] rounded-sm p-5 flex items-start gap-4"
        >
          <div className="w-6 h-6 rounded-full border border-[#f97316]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-[#f97316] text-xs">i</span>
          </div>
          <p className="text-[#555] text-sm leading-relaxed font-mono">
            These case studies represent real technical challenges encountered during development and production.
            The debugging patterns, root cause analysis, and solutions reflect actual engineering decisions,
            not hypothetical scenarios.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
