'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { systemCapabilities } from '@/data/portfolio';

function CapabilityRow({
  cap,
  index,
}: {
  cap: (typeof systemCapabilities)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.4, 0, 0.2, 1] }}
      className="group border-b border-[#0f0f0f] last:border-b-0 py-7 px-6 hover:bg-[#090909] transition-colors duration-200"
    >
      <div className="flex flex-col lg:flex-row lg:items-start gap-5">
        {/* Left: accent + name */}
        <div className="lg:w-72 flex-shrink-0 flex items-start gap-4">
          <span
            className="w-0.5 h-full min-h-[40px] rounded-full flex-shrink-0 mt-1"
            style={{ background: cap.color, opacity: 0.5 }}
          />
          <div>
            <div
              className="font-mono text-[9px] tracking-[0.2em] uppercase mb-1.5"
              style={{ color: cap.color, opacity: 0.7 }}
            >
              {cap.marker}
            </div>
            <h3 className="font-display font-semibold text-white text-base leading-snug group-hover:text-white">
              {cap.name}
            </h3>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden lg:block w-px self-stretch bg-[#111] flex-shrink-0" />

        {/* Center: description */}
        <p className="text-[#666] text-sm leading-relaxed font-body flex-1 group-hover:text-[#777] transition-colors duration-200">
          {cap.description}
        </p>

        {/* Right: tool pills */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="flex flex-wrap gap-1.5 lg:justify-end">
            {cap.tools.map(tool => (
              <span
                key={tool}
                className="font-mono text-[10px] border px-2 py-0.5 rounded-sm transition-colors duration-150"
                style={{
                  color: cap.color,
                  borderColor: `${cap.color}22`,
                  background: `${cap.color}07`,
                }}
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function EngineeringStack() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section id="stack" className="relative py-28" style={{ background: '#070707' }}>
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(to right, #0e0e0e 1px, transparent 1px), linear-gradient(to bottom, #0e0e0e 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="font-mono text-[10px] text-[#f97316] tracking-[0.3em] uppercase">
              03 / Capabilities
            </div>
            <div className="flex-1 h-px bg-[#1c1c1c]" />
          </div>

          <div className="grid md:grid-cols-[1fr_auto] gap-6 items-end">
            <div>
              <h2
                className="font-display font-bold text-white mb-3"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
              >
                System <span className="text-[#f97316]">Capabilities</span>
              </h2>
              <p className="text-[#666] text-base leading-relaxed max-w-xl font-body">
                What I can build and maintain in production — organized by engineering domain,
                not by tool collection.
              </p>
            </div>
            <div className="border border-[#1c1c1c] rounded-sm px-4 py-2.5 font-mono text-[10px] text-[#444] flex-shrink-0 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f97316] opacity-50" />
              <span>{systemCapabilities.length} engineering domains</span>
            </div>
          </div>
        </motion.div>

        {/* Capability rows */}
        <div className="border border-[#1c1c1c] bg-[#080808] rounded-sm overflow-hidden">
          {systemCapabilities.map((cap, i) => (
            <CapabilityRow key={cap.id} cap={cap} index={i} />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-4 font-mono text-[10px] text-[#222] text-right"
        >
          Capabilities earned from production work — not side projects
        </motion.p>
      </div>
    </section>
  );
}
