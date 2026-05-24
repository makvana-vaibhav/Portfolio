'use client';

import { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { projects } from '@/data/portfolio';

const statusConfig = {
  deployed: { label: 'DEPLOYED', color: '#22c55e', dot: 'bg-[#22c55e]' },
  live: { label: 'LIVE', color: '#3b82f6', dot: 'bg-[#3b82f6]' },
  archived: { label: 'ARCHIVED', color: '#666666', dot: 'bg-[#666]' },
};

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const status = statusConfig[project.status];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.4, 0, 0.2, 1] }}
      className="group border border-[#1c1c1c] bg-[#0a0a0a] rounded-sm overflow-hidden card-hover"
    >
      {/* Card header */}
      <div className="flex items-start justify-between p-5 pb-4 border-b border-[#111]">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm border text-[9px] font-mono tracking-widest uppercase`}
              style={{ borderColor: `${status.color}30`, color: status.color, background: `${status.color}08` }}
            >
              <span className={`w-1 h-1 rounded-full ${status.dot}`} />
              {status.label}
            </span>
            <span className="text-[9px] font-mono text-[#444] tracking-widest uppercase border border-[#1c1c1c] px-2 py-0.5 rounded-sm">
              {project.complexity}
            </span>
          </div>
          <div className="font-mono text-[10px] text-[#555] tracking-widest mb-1 uppercase">
            {project.systemName}
          </div>
          <h3 className="font-display font-semibold text-white text-lg leading-tight">
            {project.title}
          </h3>
          <div className="text-[10px] font-mono text-[#f97316] mt-1 tracking-wider uppercase opacity-80">
            {project.category}
          </div>
        </div>

        {/* Index */}
        <div className="font-mono text-[#1c1c1c] text-4xl font-bold tabular-nums ml-4 flex-shrink-0 mt-1 select-none">
          {String(index + 1).padStart(2, '0')}
        </div>
      </div>

      {/* Description */}
      <div className="p-5">
        <p className="text-[#777] text-sm leading-relaxed mb-4 font-body">{project.description}</p>

        {/* Architecture string */}
        <div className="mb-4">
          <div className="text-[9px] font-mono text-[#444] tracking-widest uppercase mb-1.5">Architecture</div>
          <div className="font-mono text-[11px] text-[#f97316]/80 bg-[#0d0d0d] border border-[#1a1a1a] rounded-sm px-3 py-2 leading-relaxed">
            {project.architecture}
          </div>
        </div>

        {/* Metrics row */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {project.metrics.map(m => (
            <div key={m.label} className="border border-[#1a1a1a] rounded-sm p-2.5 text-center bg-[#0d0d0d]">
              <div className="font-mono text-sm font-semibold text-white tabular-nums">{m.value}</div>
              <div className="font-mono text-[9px] text-[#444] mt-0.5 tracking-wider uppercase">{m.label}</div>
            </div>
          ))}
        </div>

        {/* Stack tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.stack.map(tech => (
            <span
              key={tech}
              className="font-mono text-[10px] text-[#666] border border-[#1c1c1c] px-2 py-0.5 rounded-sm hover:border-[#2a2a2a] hover:text-[#999] transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Expand/collapse engineering detail */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full text-left font-mono text-[10px] text-[#444] tracking-widest uppercase hover:text-[#f97316] transition-colors flex items-center gap-2 py-1"
        >
          <span className="text-[#f97316]">{expanded ? '▼' : '▶'}</span>
          {expanded ? 'Hide' : 'Show'} Engineering Detail
        </button>

        <motion.div
          initial={false}
          animate={{ height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="overflow-hidden"
        >
          <div className="pt-3 border-t border-[#111] mt-2">
            <div className="text-[9px] font-mono text-[#444] tracking-widest uppercase mb-2">Engineering Challenge</div>
            <p className="text-[#666] text-xs leading-relaxed font-body mb-3">{project.challenge}</p>

            <div className="text-[9px] font-mono text-[#444] tracking-widest uppercase mb-2">Components</div>
            <div className="flex flex-wrap gap-1.5">
              {project.components.map(c => (
                <span key={c} className="font-mono text-[10px] text-[#f97316]/70 bg-[#f97316]/05 border border-[#f97316]/15 px-2 py-0.5 rounded-sm">
                  {c}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Links */}
        <div className="flex gap-2 mt-4 pt-4 border-t border-[#111]">
          {project.links.live && project.links.live !== '#' && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center font-mono text-[10px] py-2 border border-[#2a2a2a] text-[#999] hover:border-[#f97316] hover:text-[#f97316] transition-all duration-200 rounded-sm tracking-widest uppercase"
            >
              Live ↗
            </a>
          )}
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center font-mono text-[10px] py-2 border border-[#1c1c1c] text-[#555] hover:border-[#2a2a2a] hover:text-[#999] transition-all duration-200 rounded-sm tracking-widest uppercase"
            >
              GitHub
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function AISystemsLab() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section
      id="ai-systems"
      className="relative py-28"
      style={{ background: '#060606' }}
    >
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'linear-gradient(to right, #0d0d0d 1px, transparent 1px), linear-gradient(to bottom, #0d0d0d 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="font-mono text-[10px] text-[#f97316] tracking-[0.3em] uppercase">
              01 / Systems Lab
            </div>
            <div className="flex-1 h-px bg-[#1c1c1c]" />
          </div>

          <div className="grid md:grid-cols-[1fr_auto] gap-6 items-end">
            <div>
              <h2 className="font-display font-bold text-white mb-3" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
                AI Systems <span className="text-[#f97316]">Lab</span>
              </h2>
              <p className="text-[#666] text-base leading-relaxed max-w-xl font-body">
                Production-deployed systems. Each built with real business constraints, real hardware, real traffic.
                Not demos — deployed software.
              </p>
            </div>
            <div className="flex items-center gap-2 font-mono text-[10px] text-[#444] border border-[#1c1c1c] px-4 py-2 rounded-sm flex-shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] status-dot" />
              <span>{projects.length} systems active</span>
            </div>
          </div>
        </motion.div>

        {/* Project grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
