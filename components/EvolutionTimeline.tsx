'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { timeline } from '@/data/portfolio';

function TimelineEntry({
  entry,
  index,
  isLast,
}: {
  entry: typeof timeline[0];
  index: number;
  isLast: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className="relative grid grid-cols-[1fr_40px_1fr] gap-0 items-start">
      {/* Left side content */}
      <div className={`pr-8 ${isEven ? '' : 'invisible'}`}>
        {isEven && (
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
            className="border border-[#1c1c1c] bg-[#080808] rounded-sm p-5 card-hover"
          >
            <EntryContent entry={entry} index={index} />
          </motion.div>
        )}
      </div>

      {/* Center: dot + line */}
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="relative z-10 flex-shrink-0"
        >
          <div
            className="w-3 h-3 rounded-full border-2 border-[#f97316] bg-[#060606]"
            style={{ boxShadow: '0 0 12px rgba(249,115,22,0.3)' }}
          />
        </motion.div>
        {!isLast && (
          <motion.div
            className="w-px bg-[#1c1c1c] flex-1"
            style={{ minHeight: 60 }}
            initial={{ scaleY: 0, originY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          />
        )}
      </div>

      {/* Right side content */}
      <div className={`pl-8 ${!isEven ? '' : 'invisible'}`}>
        {!isEven && (
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
            className="border border-[#1c1c1c] bg-[#080808] rounded-sm p-5 card-hover"
          >
            <EntryContent entry={entry} index={index} />
          </motion.div>
        )}
      </div>
    </div>
  );
}

function EntryContent({ entry, index }: { entry: typeof timeline[0]; index: number }) {
  return (
    <>
      <div className="flex items-center justify-between mb-3">
        <span className="font-mono text-[9px] text-[#f97316] tracking-widest uppercase opacity-70">
          {entry.phase}
        </span>
        <span className="font-mono text-[10px] text-[#444] border border-[#1a1a1a] px-2 py-0.5 rounded-sm">
          {entry.period}
        </span>
      </div>

      <h3 className="font-display font-semibold text-white text-base leading-snug mb-2">
        {entry.title}
      </h3>
      <p className="text-[#666] text-xs leading-relaxed font-body mb-3">
        {entry.description}
      </p>

      {/* Stack tags */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {entry.stack.map(tech => (
          <span
            key={tech}
            className="font-mono text-[9px] text-[#555] border border-[#1a1a1a] px-1.5 py-0.5 rounded-sm"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Milestone */}
      <div className="flex items-center gap-2 pt-2 border-t border-[#111]">
        <span className="text-[#f97316] text-xs opacity-60">▶</span>
        <span className="font-mono text-[10px] text-[#888]">{entry.milestone}</span>
      </div>
    </>
  );
}

function MobileTimeline() {
  return (
    <div className="space-y-4">
      {timeline.map((entry, i) => {
        const ref = useRef<HTMLDivElement>(null);
        const inView = useInView(ref, { once: true, margin: '-40px' });
        return (
          <motion.div
            key={entry.phase}
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.05 * i }}
            className="flex gap-4"
          >
            {/* Left: dot + line */}
            <div className="flex flex-col items-center flex-shrink-0 pt-1">
              <div
                className="w-2.5 h-2.5 rounded-full border-2 border-[#f97316] bg-[#060606] flex-shrink-0"
                style={{ boxShadow: '0 0 8px rgba(249,115,22,0.3)' }}
              />
              {i < timeline.length - 1 && (
                <div className="w-px flex-1 bg-[#1c1c1c] mt-1" style={{ minHeight: 20 }} />
              )}
            </div>
            {/* Content */}
            <div className="border border-[#1c1c1c] bg-[#080808] rounded-sm p-4 flex-1 mb-1">
              <EntryContent entry={entry} index={i} />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export default function EvolutionTimeline() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section id="timeline" className="relative py-28" style={{ background: '#060606' }}>
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'linear-gradient(to right, #0d0d0d 1px, transparent 1px), linear-gradient(to bottom, #0d0d0d 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] rounded-full opacity-[0.03] bg-[#f97316] blur-[120px] pointer-events-none" />

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
            <div className="font-mono text-[10px] text-[#f97316] tracking-[0.3em] uppercase">05 / Evolution</div>
            <div className="flex-1 h-px bg-[#1c1c1c]" />
          </div>

          <h2 className="font-display font-bold text-white mb-3" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
            Engineering <span className="text-[#f97316]">Evolution</span>
          </h2>
          <p className="text-[#666] text-base leading-relaxed max-w-xl font-body">
            The technical journey — from static pages to production AI infrastructure.
            Each phase built on the last, compounding real-world experience.
          </p>
        </motion.div>

        {/* Desktop timeline (hidden on mobile) */}
        <div className="hidden md:block">
          <div className="space-y-8">
            {timeline.map((entry, i) => (
              <TimelineEntry
                key={entry.phase}
                entry={entry}
                index={i}
                isLast={i === timeline.length - 1}
              />
            ))}
          </div>
        </div>

        {/* Mobile timeline */}
        <div className="md:hidden">
          <MobileTimeline />
        </div>

        {/* Summary strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-16 border border-[#1c1c1c] bg-[#080808] rounded-sm p-6"
        >
          <div className="font-mono text-[10px] text-[#444] tracking-widest uppercase mb-4">Engineering Stack Depth</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Languages', value: '5+', sub: 'JS, TS, Python, PHP, SQL' },
              { label: 'Frameworks', value: '8+', sub: 'React, Next, Express, Node...' },
              { label: 'Infra Tools', value: '6+', sub: 'Docker, AWS, Nginx, Redis...' },
              { label: 'Production Systems', value: '5+', sub: 'Live, deployed, in use' },
            ].map(item => (
              <div key={item.label} className="font-mono">
                <div className="text-2xl font-bold text-white mb-0.5">{item.value}</div>
                <div className="text-[10px] text-[#f97316] uppercase tracking-wider mb-1">{item.label}</div>
                <div className="text-[9px] text-[#444]">{item.sub}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
