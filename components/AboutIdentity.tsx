'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { aboutContent } from '@/data/portfolio';

export default function AboutIdentity() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section id="about" className="relative py-16 md:py-28" style={{ background: '#070707' }}>
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'linear-gradient(to right, #0e0e0e 1px, transparent 1px), linear-gradient(to bottom, #0e0e0e 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] rounded-full opacity-[0.03] bg-[#f97316] blur-[140px] pointer-events-none" />

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
              05 / About
            </div>
            <div className="flex-1 h-px bg-[#1c1c1c]" />
          </div>
          <h2
            className="font-display font-bold text-white mb-3"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
          >
            How I <span className="text-[#f97316]">Work</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_360px] gap-10 items-start">

          {/* Left: Statement + working traits */}
          <div>
            {/* Main statement */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-10"
            >
              <p
                className="font-display font-semibold text-white leading-snug mb-5"
                style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)' }}
              >
                {aboutContent.headline}
              </p>
              <p className="text-[#777] text-base leading-relaxed font-body whitespace-pre-line">
                {aboutContent.description}
              </p>
            </motion.div>

            {/* Working traits */}
            <div className="space-y-3">
              {aboutContent.traits.map((trait, i) => (
                <TraitCard key={trait.title} trait={trait} index={i} />
              ))}
            </div>
          </div>

          {/* Right: Domains + education + status */}
          <div className="space-y-4">
            {/* Domains panel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="border border-[#1c1c1c] bg-[#080808] rounded-sm overflow-hidden"
            >
              <div className="px-5 py-3 border-b border-[#111]">
                <span className="font-mono text-[10px] text-[#444] tracking-widest uppercase">Engineering Domains</span>
              </div>
              <div className="p-5 space-y-3">
                {aboutContent.domains.map((domain, i) => (
                  <motion.div
                    key={domain.label}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.4 }}
                    className="flex gap-3"
                  >
                    <span className="text-[#f97316] opacity-50 font-mono text-xs mt-0.5 flex-shrink-0">▸</span>
                    <div>
                      <div className="font-mono text-[11px] text-[#aaa] font-semibold mb-0.5">{domain.label}</div>
                      <div className="font-mono text-[10px] text-[#555]">{domain.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Education */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="border border-[#1c1c1c] bg-[#080808] rounded-sm p-5"
            >
              <div className="font-mono text-[10px] text-[#444] tracking-widest uppercase mb-3">Education</div>
              <div className="flex items-start gap-3">
                <span className="w-1 h-4 rounded-sm bg-[#a855f7] opacity-50 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-mono text-[12px] text-[#aaa] font-semibold">{aboutContent.education}</div>
                  <div className="font-mono text-[10px] text-[#444] mt-0.5">Foundations in CS, algorithms, software systems</div>
                </div>
              </div>
            </motion.div>

            {/* Status */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="border border-[#22c55e]/20 bg-[#22c55e]/04 rounded-sm p-5"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] status-dot" />
                <span className="font-mono text-[10px] text-[#22c55e] tracking-widest uppercase">Open To Opportunities</span>
              </div>
              <p className="font-mono text-[11px] text-[#666] leading-relaxed">
                {aboutContent.currentStatus}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TraitCard({ trait, index }: { trait: { title: string; body: string }; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-30px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="flex gap-4 p-4 border border-[#1a1a1a] bg-[#080808] rounded-sm hover:border-[#2a2a2a] transition-colors duration-200"
    >
      <div className="flex-shrink-0 w-7 h-7 rounded-sm border border-[#1c1c1c] flex items-center justify-center mt-0.5">
        <span className="font-mono text-[10px] text-[#f97316] opacity-60">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
      <div>
        <div className="font-mono text-[11px] text-[#aaa] font-semibold mb-1">{trait.title}</div>
        <p className="text-[#666] text-xs leading-relaxed font-body">{trait.body}</p>
      </div>
    </motion.div>
  );
}
