'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { infraStack } from '@/data/portfolio';

function ServiceNode({
  service,
  delay,
}: {
  service: { name: string; version: string; status: 'active' | 'inactive' };
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className="group flex items-center justify-between px-3 py-2.5 border border-[#1a1a1a] bg-[#0a0a0a] rounded-sm hover:border-[#2a2a2a] hover:bg-[#0d0d0d] transition-all duration-200 cursor-default"
    >
      <div className="flex items-center gap-2.5 min-w-0">
        <span
          className="w-1.5 h-1.5 rounded-full flex-shrink-0 status-dot"
          style={{ background: service.status === 'active' ? '#22c55e' : '#444' }}
        />
        <span className="font-mono text-[11px] text-[#aaa] group-hover:text-white transition-colors truncate">
          {service.name}
        </span>
      </div>
      <span className="font-mono text-[9px] text-[#333] group-hover:text-[#666] transition-colors flex-shrink-0 ml-2">
        {service.version}
      </span>
    </motion.div>
  );
}

function CategoryPanel({
  category,
  panelIndex,
}: {
  category: typeof infraStack[0];
  panelIndex: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: panelIndex * 0.08, ease: [0.4, 0, 0.2, 1] }}
      className="border border-[#1c1c1c] bg-[#080808] rounded-sm overflow-hidden"
    >
      {/* Panel header */}
      <div
        className="flex items-center justify-between px-4 py-3 border-b border-[#111]"
        style={{ background: `${category.color}06` }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-2 h-2 rounded-full"
            style={{ background: category.color, opacity: 0.7 }}
          />
          <span
            className="font-mono text-[10px] tracking-widest uppercase font-semibold"
            style={{ color: category.color }}
          >
            {category.category}
          </span>
        </div>
        <div className="flex items-center gap-1">
          {category.services.map((_, i) => (
            <div
              key={i}
              className="w-1 h-1 rounded-full"
              style={{ background: category.color, opacity: 0.4 }}
            />
          ))}
        </div>
      </div>

      {/* Services */}
      <div className="p-3 space-y-1.5">
        {category.services.map((service, i) => (
          <ServiceNode
            key={service.name}
            service={service}
            delay={panelIndex * 0.08 + i * 0.04}
          />
        ))}
      </div>
    </motion.div>
  );
}

function UptimeDisplay() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  const bars = Array.from({ length: 90 }, (_, i) => ({
    active: Math.random() > 0.03,
    height: 60 + Math.random() * 40,
  }));

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className="border border-[#1c1c1c] bg-[#080808] rounded-sm p-5"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="font-mono text-[10px] text-[#444] tracking-widest uppercase mb-1">System Uptime</div>
          <div className="font-display text-3xl font-bold text-white">99.9<span className="text-[#f97316]">%</span></div>
        </div>
        <div className="text-right">
          <div className="font-mono text-[10px] text-[#444] tracking-widest uppercase mb-1">Last 90 Days</div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] status-dot" />
            <span className="font-mono text-[11px] text-[#22c55e]">All systems nominal</span>
          </div>
        </div>
      </div>

      {/* Uptime bars */}
      <div className="flex items-end gap-0.5 h-10">
        {bars.map((bar, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-sm"
            style={{
              height: `${bar.active ? bar.height : 20}%`,
              background: bar.active ? '#22c55e' : '#ef4444',
              opacity: bar.active ? 0.7 : 0.5,
            }}
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ delay: i * 0.008, duration: 0.3 }}
          />
        ))}
      </div>
      <div className="flex justify-between mt-2">
        <span className="font-mono text-[9px] text-[#333]">90 days ago</span>
        <span className="font-mono text-[9px] text-[#333]">Today</span>
      </div>
    </motion.div>
  );
}

export default function InfrastructureControl() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section
      id="infrastructure"
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

      {/* Accent glow */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full opacity-[0.03] bg-[#f97316] blur-[120px] pointer-events-none" />

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
              02 / Infrastructure
            </div>
            <div className="flex-1 h-px bg-[#1c1c1c]" />
          </div>

          <div className="grid md:grid-cols-[1fr_auto] gap-6 items-end">
            <div>
              <h2 className="font-display font-bold text-white mb-3" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
                Infrastructure <span className="text-[#f97316]">Control</span>
              </h2>
              <p className="text-[#666] text-base leading-relaxed max-w-xl font-body">
                The full technology stack — runtime environments, data systems, cloud infrastructure, and security layers.
                Each service actively used in production systems.
              </p>
            </div>
            <div className="border border-[#1c1c1c] rounded-sm px-4 py-2.5 font-mono text-[10px] text-[#444] flex-shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f97316]" />
                <span>{infraStack.reduce((acc, cat) => acc + cat.services.length, 0)} technologies in stack</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Infrastructure grid */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-8">
          {infraStack.map((cat, i) => (
            <CategoryPanel key={cat.category} category={cat} panelIndex={i} />
          ))}
        </div>

        {/* Uptime strip */}
        <UptimeDisplay />

        {/* Bottom capability strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3"
        >
          {[
            { icon: '⬡', label: 'Containerized', desc: 'Docker environments' },
            { icon: '⌖', label: 'Cloud-Ready', desc: 'AWS deployments' },
            { icon: '◈', label: 'API-First', desc: 'REST & WebSocket' },
            { icon: '◎', label: 'Observable', desc: 'Monitoring + logging' },
          ].map(cap => (
            <div
              key={cap.label}
              className="border border-[#1a1a1a] bg-[#080808] rounded-sm px-4 py-3 flex items-center gap-3"
            >
              <span className="text-[#f97316] text-lg opacity-50 font-mono">{cap.icon}</span>
              <div>
                <div className="font-mono text-[11px] text-[#999] font-semibold">{cap.label}</div>
                <div className="font-mono text-[9px] text-[#444] mt-0.5">{cap.desc}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
