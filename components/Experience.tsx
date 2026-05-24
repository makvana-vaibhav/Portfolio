'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { experience } from '@/data/portfolio';

export default function Experience() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section id="experience" className="relative py-16 md:py-28" style={{ background: '#060606' }}>
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: 'linear-gradient(to right, #0d0d0d 1px, transparent 1px), linear-gradient(to bottom, #0d0d0d 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full opacity-[0.03] bg-[#f97316] blur-[120px] pointer-events-none" />

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
              04 / Experience
            </div>
            <div className="flex-1 h-px bg-[#1c1c1c]" />
          </div>
          <h2
            className="font-display font-bold text-white mb-3"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
          >
            Work <span className="text-[#f97316]">Experience</span>
          </h2>
          <p className="text-[#666] text-base leading-relaxed max-w-xl font-body">
            Professional engineering experience — the systems I've built and maintained in production.
          </p>
        </motion.div>

        {/* Experience cards */}
        <div className="space-y-6 max-w-4xl">
          {experience.map((job, i) => (
            <ExperienceCard key={job.id} job={job} index={i} />
          ))}

          {/* Freelance row */}
          <FreelanceEntry />
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({ job, index }: { job: typeof experience[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
      className="border border-[#1c1c1c] bg-[#080808] rounded-sm overflow-hidden"
    >
      {/* Company header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 p-6 border-b border-[#111]">
        <div>
          <div className="flex items-center gap-3 mb-1.5 flex-wrap">
            <span className="font-display font-bold text-white text-xl">{job.company}</span>
            {job.current && (
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 border border-[#22c55e]/30 bg-[#22c55e]/08 rounded-sm">
                <span className="w-1 h-1 rounded-full bg-[#22c55e] status-dot" />
                <span className="font-mono text-[9px] text-[#22c55e] tracking-widest uppercase">Current</span>
              </span>
            )}
          </div>
          <div className="font-mono text-[11px] text-[#f97316] tracking-wider mb-1" style={{ opacity: 0.85 }}>
            {job.role}
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-mono text-[10px] text-[#444]">{job.period}</span>
          </div>
        </div>
        {/* Stack tags */}
        <div className="flex flex-wrap gap-1.5 sm:justify-end sm:max-w-xs">
          {job.stack.map(tech => (
            <span
              key={tech}
              className="font-mono text-[9px] text-[#555] border border-[#1a1a1a] px-2 py-0.5 rounded-sm whitespace-nowrap"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="px-6 pt-5 pb-4">
        <p className="text-[#777] text-sm leading-relaxed font-body mb-5">{job.summary}</p>

        <div className="grid md:grid-cols-2 gap-5">
          {/* AI work */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1 h-4 rounded-sm bg-[#f97316] opacity-60" />
              <span className="font-mono text-[10px] text-[#f97316] tracking-widest uppercase opacity-80">
                {job.aiWork.title}
              </span>
            </div>
            <ul className="space-y-2">
              {job.aiWork.points.map((point, pi) => (
                <li key={pi} className="flex gap-2.5 text-xs text-[#666] leading-relaxed font-body">
                  <span className="text-[#f97316] opacity-50 flex-shrink-0 mt-0.5 font-mono">▸</span>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* DevOps work */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1 h-4 rounded-sm bg-[#3b82f6] opacity-60" />
              <span className="font-mono text-[10px] text-[#3b82f6] tracking-widest uppercase opacity-80">
                {job.devopsWork.title}
              </span>
            </div>
            <ul className="space-y-2">
              {job.devopsWork.points.map((point, pi) => (
                <li key={pi} className="flex gap-2.5 text-xs text-[#666] leading-relaxed font-body">
                  <span className="text-[#3b82f6] opacity-50 flex-shrink-0 mt-0.5 font-mono">▸</span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function FreelanceEntry() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="border border-[#1c1c1c] bg-[#080808] rounded-sm p-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-3 mb-1.5 flex-wrap">
            <span className="font-display font-semibold text-white text-lg">Freelance Projects</span>
            <span className="font-mono text-[9px] text-[#444] border border-[#1a1a1a] px-2 py-0.5 rounded-sm tracking-widest uppercase">Independent</span>
          </div>
          <div className="font-mono text-[11px] text-[#f97316] tracking-wider mb-1" style={{ opacity: 0.7 }}>
            Full-Stack Developer · Systems Engineer
          </div>
          <div className="font-mono text-[10px] text-[#444]">2024 - Present · Remote</div>
        </div>
      </div>

      <p className="text-[#666] text-sm leading-relaxed font-body mt-4 mb-4">
        Designed and delivered end-to-end software for real clients. E-commerce backends, business websites, desktop systems, and browser tools.
        Work ranged from PHP/MySQL backend APIs to offline Python desktop applications deployed in live businesses.
      </p>

      <div className="flex flex-wrap gap-1.5">
        {['PHP (PDO)', 'MySQL', 'Python', 'Node.js', 'React', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'SQLite', 'Chrome APIs'].map(t => (
          <span key={t} className="font-mono text-[9px] text-[#555] border border-[#1a1a1a] px-2 py-0.5 rounded-sm">
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
