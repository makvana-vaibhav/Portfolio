'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { skillCategories } from '@/data/portfolio';

function SkillRow({
  category,
  index,
}: {
  category: typeof skillCategories[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -16 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.4, 0, 0.2, 1] }}
      className="group flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-0 py-4 border-b border-[#111] last:border-b-0"
    >
      {/* Left: category label */}
      <div className="sm:w-40 flex-shrink-0 flex items-center gap-2.5 sm:pt-0.5">
        <span
          className="w-1 h-4 rounded-full flex-shrink-0"
          style={{ background: category.color, opacity: 0.5 }}
        />
        <span
          className="font-mono text-[10px] tracking-[0.15em] uppercase"
          style={{ color: category.color, opacity: 0.85 }}
        >
          {category.label}
        </span>
      </div>

      {/* Divider */}
      <div className="hidden sm:block w-px self-stretch bg-[#1a1a1a] mx-6 flex-shrink-0" />

      {/* Right: skill tags */}
      <div className="flex flex-wrap gap-1.5">
        {category.skills.map((skill, si) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.3, delay: index * 0.07 + si * 0.03 }}
            className="font-mono text-[11px] text-[#999] border border-[#1e1e1e] px-2.5 py-1 rounded-sm hover:text-white hover:border-[#2e2e2e] transition-colors duration-150 cursor-default"
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

export default function EngineeringStack() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section
      id="stack"
      className="relative py-28"
      style={{ background: '#070707' }}
    >
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'linear-gradient(to right, #0e0e0e 1px, transparent 1px), linear-gradient(to bottom, #0e0e0e 1px, transparent 1px)',
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
              02 / Stack
            </div>
            <div className="flex-1 h-px bg-[#1c1c1c]" />
          </div>

          <div className="grid md:grid-cols-[1fr_auto] gap-6 items-end">
            <div>
              <h2
                className="font-display font-bold text-white mb-3"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
              >
                Engineering <span className="text-[#f97316]">Stack</span>
              </h2>
              <p className="text-[#666] text-base leading-relaxed max-w-xl font-body">
                Technologies I actively work with across backend, AI systems, infrastructure, and frontend.
                No ratings. No percentages. Just the stack.
              </p>
            </div>
            <div className="border border-[#1c1c1c] rounded-sm px-4 py-2.5 font-mono text-[10px] text-[#444] flex-shrink-0 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f97316] opacity-60" />
              <span>{skillCategories.reduce((acc, c) => acc + c.skills.length, 0)} technologies across {skillCategories.length} domains</span>
            </div>
          </div>
        </motion.div>

        {/* Skills table */}
        <div className="border border-[#1c1c1c] bg-[#080808] rounded-sm overflow-hidden">
          {/* Table header */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-0 px-6 py-3 border-b border-[#1a1a1a] bg-[#0a0a0a]">
            <div className="sm:w-40 flex-shrink-0">
              <span className="font-mono text-[9px] text-[#333] tracking-[0.2em] uppercase">Domain</span>
            </div>
            <div className="hidden sm:block w-px self-stretch bg-[#1a1a1a] mx-6" />
            <span className="font-mono text-[9px] text-[#333] tracking-[0.2em] uppercase">Technologies</span>
          </div>

          {/* Skill rows */}
          <div className="px-6">
            {skillCategories.map((cat, i) => (
              <SkillRow key={cat.id} category={cat} index={i} />
            ))}
          </div>
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-5 font-mono text-[10px] text-[#2e2e2e] text-right"
        >
          Stack is actively used — not aspirational
        </motion.p>
      </div>
    </section>
  );
}
