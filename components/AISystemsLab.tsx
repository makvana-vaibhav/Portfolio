'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { projects } from '@/data/portfolio';

// ─── Status config ────────────────────────────────────────────────────────────

const statusConfig = {
  deployed: { label: 'DEPLOYED', color: '#22c55e' },
  live:     { label: 'LIVE',     color: '#3b82f6' },
  archived: { label: 'ARCHIVED', color: '#555555' },
};

// ─── GitHub repositories panel ───────────────────────────────────────────────

const ghRepos = [
  { name: 'snipshare',                    tech: 'Node.js · MongoDB',  href: 'https://github.com/makvana-vaibhav/snipshare' },
  { name: 'localbeam-lan-file-transfer',  tech: 'Python · Sockets',   href: 'https://github.com/makvana-vaibhav/localbeam-lan-file-transfer' },
  { name: 'CFN-IceCream-POS-System',      tech: 'Python · SQLite',    href: 'https://github.com/makvana-vaibhav/CFN-IceCream-POS-System' },
];

function GitHubAccessPanel() {
  return (
    <div className="border border-[#1c1c1c] bg-[#080808] rounded-sm overflow-hidden font-mono text-[10px]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#0a0a0a] border-b border-[#111]">
        <div className="flex items-center gap-2">
          <span className="text-[#f97316] opacity-50 text-xs">◈</span>
          <span className="text-[#333] tracking-widest uppercase">github / makvana-vaibhav</span>
        </div>
        <span className="flex items-center gap-1.5">
          <span className="w-1 h-1 rounded-full bg-[#22c55e]" style={{ opacity: 0.5 }} />
          <span className="text-[#2a2a2a]">public</span>
        </span>
      </div>
      {/* Repo listing */}
      <div className="px-4 pt-3 pb-1">
        <div className="text-[#222] tracking-widest mb-2">$ ls --repos</div>
        <div className="space-y-2">
          {ghRepos.map(repo => (
            <a
              key={repo.name}
              href={repo.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between group"
            >
              <span className="text-[#444] group-hover:text-[#888] transition-colors duration-150 truncate max-w-[150px]">
                {repo.name}
              </span>
              <span className="text-[#2a2a2a] group-hover:text-[#444] transition-colors duration-150 flex-shrink-0 ml-2 text-[9px]">
                {repo.tech}
              </span>
            </a>
          ))}
        </div>
      </div>
      {/* Footer CTA */}
      <div className="border-t border-[#0f0f0f] px-4 py-2.5 mt-2">
        <a
          href="https://github.com/makvana-vaibhav"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#2a2a2a] hover:text-[#f97316] transition-colors duration-200 tracking-widest uppercase"
        >
          $ open profile ↗
        </a>
      </div>
    </div>
  );
}

// ─── Animated mini architecture flow ─────────────────────────────────────────

function MiniArchFlow({ nodes, color, inView }: { nodes: string[]; color: string; inView: boolean }) {
  const nodeW = 64;
  const nodeH = 22;
  const gap   = 14;
  const totalW = nodes.length * nodeW + (nodes.length - 1) * gap;
  const midY   = 26;
  const vbH    = 52;

  const nodeCx = nodes.map((_, i) => i * (nodeW + gap) + nodeW / 2);
  const pathD  = `M 0,${midY} L ${totalW},${midY}`;

  return (
    <svg
      viewBox={`0 0 ${totalW} ${vbH}`}
      width="100%"
      style={{ display: 'block', overflow: 'visible' }}
    >
      {/* Dashed connector line */}
      <path
        d={pathD}
        stroke={color}
        strokeWidth={0.6}
        strokeDasharray="3 5"
        fill="none"
        opacity={0.22}
      />

      {/* Node boxes */}
      {nodes.map((label, i) => (
        <g key={`${label}-${i}`}>
          <rect
            x={nodeCx[i] - nodeW / 2}
            y={midY - nodeH / 2}
            width={nodeW}
            height={nodeH}
            rx={1.5}
            fill="#090909"
            stroke={color}
            strokeWidth={0.5}
            opacity={0.5}
          />
          <text
            x={nodeCx[i]}
            y={midY + 2.8}
            fontSize={6}
            textAnchor="middle"
            fontFamily="'JetBrains Mono', monospace"
            fill="#666"
            letterSpacing="0.06em"
          >
            {label}
          </text>
        </g>
      ))}

      {/* Animated dots — only render when card is in view */}
      {inView && (
        <>
          <circle r={2.5} fill={color} opacity={0.75}>
            <animateMotion dur="3.2s" repeatCount="indefinite" path={pathD} calcMode="linear" />
          </circle>
          <circle r={1.8} fill={color} opacity={0.4}>
            <animateMotion dur="3.2s" begin="1.6s" repeatCount="indefinite" path={pathD} calcMode="linear" />
          </circle>
        </>
      )}
    </svg>
  );
}

// ─── Project card ─────────────────────────────────────────────────────────────

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const status = statusConfig[project.status];
  const color  = project.archColor;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.4, 0, 0.2, 1] }}
      className="rounded-sm overflow-hidden border"
      style={{ borderColor: `${color}18`, background: '#0a0a0a' }}
      whileHover={{ borderColor: `${color}38`, backgroundColor: '#0c0c0c' }}
    >
      {/* Top color accent line */}
      <div
        className="h-px"
        style={{
          background: `linear-gradient(to right, transparent, ${color}50, transparent)`,
        }}
      />

      {/* Header */}
      <div className="flex items-start justify-between p-5 pb-4">
        <div className="flex-1 min-w-0">
          {/* Badges */}
          <div className="flex items-center gap-2 mb-2.5 flex-wrap">
            <span
              className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm border text-[9px] font-mono tracking-widest uppercase"
              style={{ borderColor: `${status.color}30`, color: status.color, background: `${status.color}0a` }}
            >
              <span className="w-1 h-1 rounded-full status-dot" style={{ background: status.color }} />
              {status.label}
            </span>
            <span className="text-[9px] font-mono text-[#3a3a3a] tracking-widest uppercase border border-[#1a1a1a] px-2 py-0.5 rounded-sm">
              {project.category.split(' ').slice(0, 2).join(' ')}
            </span>
          </div>

          {/* System name */}
          <div
            className="font-mono text-[9px] mb-1 tracking-widest uppercase"
            style={{ color: color, opacity: 0.4 }}
          >
            {project.systemName}
          </div>

          {/* Title */}
          <h3 className="font-display font-semibold text-white text-lg leading-tight mb-0.5">
            {project.title}
          </h3>
          <div className="text-[10px] font-mono text-[#444] tracking-wider uppercase">
            {project.category}
          </div>
        </div>

        {/* Index number */}
        <div
          className="font-mono text-4xl font-bold tabular-nums ml-4 flex-shrink-0 mt-1 select-none leading-none"
          style={{ color: `${color}14` }}
        >
          {String(index + 1).padStart(2, '0')}
        </div>
      </div>

      {/* Body */}
      <div className="px-5 pb-5">
        {/* Description */}
        <p className="text-[#5a5a5a] text-xs leading-relaxed mb-4 font-body">
          {project.description}
        </p>

        {/* Mini architecture flow */}
        <div className="mb-4">
          <div className="font-mono text-[9px] text-[#2a2a2a] tracking-widest uppercase mb-2">
            Architecture Flow
          </div>
          <div className="py-1.5">
            <MiniArchFlow nodes={project.archNodes} color={color} inView={inView} />
          </div>
        </div>

        {/* Stack tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.stack.map(tech => (
            <span
              key={tech}
              className="font-mono text-[10px] text-[#4a4a4a] border border-[#1a1a1a] px-2 py-0.5 rounded-sm"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Expand engineering detail */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full text-left font-mono text-[9px] tracking-widest uppercase transition-colors flex items-center gap-2 py-1 text-[#2d2d2d] hover:text-[#666]"
        >
          <span style={{ color: `${color}80` }}>{expanded ? '▼' : '▶'}</span>
          {expanded ? 'Hide' : 'Engineering'} Detail
        </button>

        <motion.div
          initial={false}
          animate={{ height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="overflow-hidden"
        >
          <div className="pt-3 mt-1 border-t" style={{ borderColor: '#111' }}>
            <div className="font-mono text-[9px] text-[#2a2a2a] tracking-widest uppercase mb-1.5">
              Engineering Challenge
            </div>
            <p className="text-[#555] text-xs leading-relaxed font-body mb-3">
              {project.challenge}
            </p>
            <div className="font-mono text-[9px] text-[#2a2a2a] tracking-widest uppercase mb-1.5">
              System Components
            </div>
            <div className="flex flex-wrap gap-1.5">
              {project.components.map(c => (
                <span
                  key={c}
                  className="font-mono text-[9px] px-2 py-0.5 rounded-sm border"
                  style={{
                    color:        `${color}88`,
                    borderColor:  `${color}20`,
                    background:   `${color}08`,
                  }}
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Links */}
        <div className="flex gap-2 mt-4 pt-4 border-t" style={{ borderColor: '#0f0f0f' }}>
          {project.links.live && (
            <motion.a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center font-mono text-[10px] py-2 rounded-sm tracking-widest uppercase border text-[#666]"
              style={{ borderColor: `${color}22` }}
              whileHover={{ borderColor: `${color}55`, color: color }}
              transition={{ duration: 0.15 }}
            >
              Live ↗
            </motion.a>
          )}
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center font-mono text-[10px] py-2 border border-[#1a1a1a] text-[#3a3a3a] hover:border-[#2a2a2a] hover:text-[#666] transition-all duration-200 rounded-sm tracking-widest uppercase"
            >
              Source ↗
            </a>
          )}
          {!project.links.live && !project.links.github && (
            <span className="flex-1 text-center font-mono text-[9px] py-2 text-[#222] tracking-widest uppercase">
              Private Infrastructure
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Section export ───────────────────────────────────────────────────────────

export default function AISystemsLab() {
  const headerRef    = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section id="projects" className="relative py-28" style={{ background: '#060606' }}>
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'linear-gradient(to right, #0d0d0d 1px, transparent 1px), linear-gradient(to bottom, #0d0d0d 1px, transparent 1px)',
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
              01 / Projects
            </div>
            <div className="flex-1 h-px bg-[#1c1c1c]" />
          </div>

          <div className="grid md:grid-cols-[1fr_260px] gap-8 items-end">
            <div>
              <h2
                className="font-display font-bold text-white mb-3"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
              >
                Engineering <span className="text-[#f97316]">Projects</span>
              </h2>
              <p className="text-[#666] text-base leading-relaxed max-w-xl font-body">
                Production systems, infrastructure automation, and operational software.
                Built with real constraints, deployed in live environments.
              </p>
            </div>
            <GitHubAccessPanel />
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
