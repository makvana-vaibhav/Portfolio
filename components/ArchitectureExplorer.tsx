'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const NODE_W = 130;
const NODE_H = 40;

const nodes = [
  { id: 'browser', x: 195, y: 20, label: 'Client Browser', type: 'client', desc: 'React / Next.js SPA. Static export served from CDN.' },
  { id: 'cdn', x: 195, y: 100, label: 'CDN / Load Balancer', type: 'infra', desc: 'Nginx or cloud LB. SSL termination, static asset caching, traffic routing.' },
  { id: 'api', x: 195, y: 180, label: 'API Gateway', type: 'service', desc: '.NET / Node.js REST API. Auth middleware, rate limiting, request routing.' },
  { id: 'auth', x: 370, y: 180, label: 'Auth Service', type: 'service', desc: 'JWT token issuance and validation. OAuth 2.0 support.' },
  { id: 'queue', x: 100, y: 260, label: 'Redis Job Queue', type: 'data', desc: 'Async job queuing. Handles AI inference requests, batch processing.' },
  { id: 'workers', x: 290, y: 260, label: 'Python Workers', type: 'worker', desc: 'Celery/async workers consuming from Redis queue. CPU/GPU bound tasks.' },
  { id: 'db', x: 80, y: 340, label: 'MySQL / MongoDB', type: 'data', desc: 'Relational + document store. PDO-secured queries, indexed schemas.' },
  { id: 'gpu', x: 290, y: 340, label: 'GPU Processing', type: 'compute', desc: 'AI inference, image processing. GPU-accelerated Python pipelines.' },
  { id: 'storage', x: 185, y: 420, label: 'S3 / Object Storage', type: 'infra', desc: 'CDN-backed file storage. Output artifacts, processed images, exports.' },
  { id: 'monitor', x: 390, y: 100, label: 'Monitoring', type: 'infra', desc: 'Prometheus + Grafana. Request tracing, error rates, worker health.' },
];

const edges = [
  { from: 'browser', to: 'cdn', label: 'HTTPS' },
  { from: 'cdn', to: 'api', label: 'proxy' },
  { from: 'api', to: 'auth', label: 'verify' },
  { from: 'api', to: 'queue', label: 'enqueue' },
  { from: 'queue', to: 'workers', label: 'consume' },
  { from: 'workers', to: 'db', label: 'persist' },
  { from: 'workers', to: 'gpu', label: 'infer' },
  { from: 'gpu', to: 'storage', label: 'save' },
  { from: 'db', to: 'storage', label: 'export' },
  { from: 'api', to: 'monitor', label: 'metrics' },
  { from: 'workers', to: 'monitor', label: 'health' },
  { from: 'cdn', to: 'monitor', label: 'logs' },
];

const typeColors: Record<string, string> = {
  client: '#3b82f6',
  infra: '#6b7280',
  service: '#f97316',
  data: '#22c55e',
  worker: '#a855f7',
  compute: '#ef4444',
};

function getCenter(nodeId: string) {
  const n = nodes.find(n => n.id === nodeId);
  if (!n) return { x: 0, y: 0 };
  return { x: n.x + NODE_W / 2, y: n.y + NODE_H / 2 };
}

export default function ArchitectureExplorer() {
  const [hovered, setHovered] = useState<string | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });
  const svgRef = useRef<SVGSVGElement>(null);
  const svgInView = useInView(svgRef, { once: true });

  const hoveredNode = nodes.find(n => n.id === hovered);

  const SVG_W = 540;
  const SVG_H = 480;

  return (
    <section id="architecture" className="relative py-28" style={{ background: '#070707' }}>
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'linear-gradient(to right, #0e0e0e 1px, transparent 1px), linear-gradient(to bottom, #0e0e0e 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.03] bg-[#f97316] blur-[160px] pointer-events-none" />

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
            <div className="font-mono text-[10px] text-[#f97316] tracking-[0.3em] uppercase">04 / Architecture</div>
            <div className="flex-1 h-px bg-[#1c1c1c]" />
          </div>

          <h2 className="font-display font-bold text-white mb-3" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
            Architecture <span className="text-[#f97316]">Explorer</span>
          </h2>
          <p className="text-[#666] text-base leading-relaxed max-w-xl font-body">
            The reference architecture for a production AI backend system. Hover any node to inspect the service.
            Animated paths show live data flow directions.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_280px] gap-8 items-start">
          {/* SVG topology */}
          <div className="border border-[#1c1c1c] bg-[#080808] rounded-sm overflow-hidden">
            {/* Diagram header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-[#111]">
              <span className="font-mono text-[10px] text-[#444] tracking-widest uppercase">System Topology</span>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] status-dot" />
                <span className="font-mono text-[10px] text-[#22c55e]">Live</span>
              </div>
            </div>

            <div className="overflow-x-auto p-4">
              <svg
                ref={svgRef}
                viewBox={`0 0 ${SVG_W} ${SVG_H}`}
                width="100%"
                style={{ minWidth: 320, maxWidth: SVG_W }}
                className="block mx-auto"
              >
                {/* Edge lines */}
                {edges.map((edge, i) => {
                  const from = getCenter(edge.from);
                  const to = getCenter(edge.to);
                  const isActive =
                    hovered === edge.from || hovered === edge.to;

                  return (
                    <g key={`${edge.from}-${edge.to}`}>
                      {/* Static background line */}
                      <line
                        x1={from.x}
                        y1={from.y}
                        x2={to.x}
                        y2={to.y}
                        stroke={isActive ? '#f97316' : '#1c1c1c'}
                        strokeWidth={isActive ? 1.5 : 1}
                        strokeOpacity={isActive ? 0.8 : 1}
                        style={{ transition: 'stroke 0.2s, stroke-width 0.2s' }}
                      />
                      {/* Animated flow dots */}
                      {svgInView && (
                        <motion.circle
                          r={2}
                          fill={isActive ? '#f97316' : '#2a2a2a'}
                          style={{ transition: 'fill 0.2s' }}
                          animate={{
                            cx: [from.x, to.x],
                            cy: [from.y, to.y],
                            opacity: [0, 1, 1, 0],
                          }}
                          transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            delay: i * 0.22,
                            ease: 'linear',
                          }}
                        />
                      )}
                    </g>
                  );
                })}

                {/* Node rectangles */}
                {nodes.map((node, i) => {
                  const color = typeColors[node.type];
                  const isHovered = hovered === node.id;
                  const isConnected = hovered
                    ? edges.some(
                        e =>
                          (e.from === hovered && e.to === node.id) ||
                          (e.to === hovered && e.from === node.id)
                      )
                    : false;

                  return (
                    <g
                      key={node.id}
                      className="cursor-pointer"
                      onMouseEnter={() => setHovered(node.id)}
                      onMouseLeave={() => setHovered(null)}
                    >
                      {/* Glow behind active node */}
                      {isHovered && (
                        <rect
                          x={node.x - 4}
                          y={node.y - 4}
                          width={NODE_W + 8}
                          height={NODE_H + 8}
                          rx={4}
                          fill={color}
                          opacity={0.06}
                        />
                      )}

                      {/* Node background */}
                      <rect
                        x={node.x}
                        y={node.y}
                        width={NODE_W}
                        height={NODE_H}
                        rx={3}
                        fill="#0a0a0a"
                        stroke={isHovered ? color : isConnected ? '#2a2a2a' : '#1c1c1c'}
                        strokeWidth={isHovered ? 1.5 : 1}
                        style={{ transition: 'stroke 0.15s, stroke-width 0.15s' }}
                      />

                      {/* Left accent stripe */}
                      <rect
                        x={node.x}
                        y={node.y}
                        width={3}
                        height={NODE_H}
                        rx={2}
                        fill={color}
                        opacity={isHovered ? 0.9 : 0.3}
                        style={{ transition: 'opacity 0.15s' }}
                      />

                      {/* Node label */}
                      <text
                        x={node.x + 12}
                        y={node.y + NODE_H / 2 + 4}
                        fontFamily="JetBrains Mono, monospace"
                        fontSize={9}
                        fill={isHovered ? '#fff' : '#888'}
                        fontWeight={isHovered ? '600' : '400'}
                        style={{ transition: 'fill 0.15s' }}
                      >
                        {node.label}
                      </text>

                      {/* Status dot */}
                      <circle
                        cx={node.x + NODE_W - 12}
                        cy={node.y + NODE_H / 2}
                        r={2.5}
                        fill={color}
                        opacity={0.7}
                      />
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Right panel: node detail + legend */}
          <div className="space-y-4">
            {/* Node detail */}
            <div className="border border-[#1c1c1c] bg-[#080808] rounded-sm p-4 min-h-[120px]">
              <div className="font-mono text-[10px] text-[#444] tracking-widest uppercase mb-3">
                Service Inspector
              </div>
              {hoveredNode ? (
                <motion.div
                  key={hoveredNode.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ background: typeColors[hoveredNode.type] }}
                    />
                    <span className="font-mono text-xs font-semibold text-white">
                      {hoveredNode.label}
                    </span>
                  </div>
                  <p className="font-mono text-[11px] text-[#666] leading-relaxed">
                    {hoveredNode.desc}
                  </p>
                  <div className="mt-3 font-mono text-[9px] tracking-widest uppercase"
                    style={{ color: typeColors[hoveredNode.type], opacity: 0.7 }}
                  >
                    {hoveredNode.type.toUpperCase()} LAYER
                  </div>
                </motion.div>
              ) : (
                <p className="font-mono text-[11px] text-[#333]">
                  Hover a node to inspect the service...
                </p>
              )}
            </div>

            {/* Legend */}
            <div className="border border-[#1c1c1c] bg-[#080808] rounded-sm p-4">
              <div className="font-mono text-[10px] text-[#444] tracking-widest uppercase mb-3">
                Layer Legend
              </div>
              <div className="space-y-2">
                {Object.entries(typeColors).map(([type, color]) => (
                  <div key={type} className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-sm flex-shrink-0" style={{ background: color, opacity: 0.7 }} />
                    <span className="font-mono text-[10px] text-[#666] capitalize">{type}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Connection count */}
            <div className="border border-[#1c1c1c] bg-[#080808] rounded-sm p-4">
              <div className="font-mono text-[10px] text-[#444] tracking-widest uppercase mb-2">
                Topology Stats
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="font-mono text-xl font-bold text-white">{nodes.length}</div>
                  <div className="font-mono text-[9px] text-[#444] mt-0.5 tracking-wider uppercase">Services</div>
                </div>
                <div>
                  <div className="font-mono text-xl font-bold text-white">{edges.length}</div>
                  <div className="font-mono text-[9px] text-[#444] mt-0.5 tracking-wider uppercase">Connections</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
