'use client';

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

// ─── Node / Edge definitions ────────────────────────────────────────────────

type NodeId = 'client' | 'api_gw' | 'sqs' | 'workers' | 'ai_pipe' | 'postgres' | 'redis';

interface NodeDef {
  id: NodeId;
  label: string;
  sub: string;
  cx: number;
  cy: number;
  w: number;
  h: number;
  color: string;
  tech: string;
  status: 'OPERATIONAL' | 'ACTIVE' | 'EXTERNAL';
  desc: string;
}

interface EdgeDef {
  id: string;
  d: string;
  color: string;
  dur: number;
  // stagger offsets in seconds for animated dots on this edge
  offsets: number[];
  // label positioned near edge midpoint (optional)
  lx?: number;
  ly?: number;
  ltext?: string;
}

const NODES: NodeDef[] = [
  {
    id: 'client',
    label: 'CLIENT',
    sub: 'API Consumer',
    cx: 390, cy: 40, w: 100, h: 32,
    color: '#555555',
    tech: 'HTTPS / REST',
    status: 'EXTERNAL',
    desc: 'External API consumer. All inbound traffic enters here - TLS-terminated, rate-limited at the edge.',
  },
  {
    id: 'api_gw',
    label: 'API GATEWAY',
    sub: 'Route & Authenticate',
    cx: 390, cy: 148, w: 140, h: 38,
    color: '#f97316',
    tech: 'Node.js · Express · JWT',
    status: 'OPERATIONAL',
    desc: 'Validates JWT tokens, applies rate limiting, routes requests to sync handlers or enqueues async jobs to SQS.',
  },
  {
    id: 'sqs',
    label: 'JOB QUEUE',
    sub: 'Async Dispatch',
    cx: 592, cy: 268, w: 122, h: 36,
    color: '#f59e0b',
    tech: 'AWS SQS',
    status: 'ACTIVE',
    desc: 'Decouples the API layer from workers. Handles backpressure, configurable retries, and dead-letter routing for failed jobs.',
  },
  {
    id: 'workers',
    label: 'WORKER POOL',
    sub: 'Job Processing',
    cx: 200, cy: 268, w: 132, h: 36,
    color: '#22c55e',
    tech: 'Python 3.11 · Concurrent',
    status: 'OPERATIONAL',
    desc: 'Pulls jobs from SQS. Spawns concurrent workers per job type. Exponential backoff on failures, visibility timeout management.',
  },
  {
    id: 'ai_pipe',
    label: 'AI PIPELINE',
    sub: 'Inference Engine',
    cx: 108, cy: 388, w: 122, h: 36,
    color: '#a855f7',
    tech: 'Python · OpenAI API',
    status: 'OPERATIONAL',
    desc: 'Image enhancement, hallucination detection, and content tagging at scale. Results written back to PostgreSQL.',
  },
  {
    id: 'postgres',
    label: 'POSTGRESQL',
    sub: 'Primary Store',
    cx: 318, cy: 388, w: 122, h: 36,
    color: '#3b82f6',
    tech: 'PostgreSQL · Pooled',
    status: 'OPERATIONAL',
    desc: 'Stores job metadata, AI outputs, and application state. Connection-pooled, indexed for high-volume read/write workloads.',
  },
  {
    id: 'redis',
    label: 'REDIS CACHE',
    sub: 'Hot Data Layer',
    cx: 578, cy: 388, w: 116, h: 36,
    color: '#22c55e',
    tech: 'Redis · In-Memory',
    status: 'OPERATIONAL',
    desc: 'Caches frequent reads, rate limit counters, and session tokens. Sub-millisecond latency. Keyed by job ID and user context.',
  },
];

// Paths connect node edges (not centers)
// client.bottom=(390,56) → api_gw.top=(390,129)
// api_gw.left=(320,148) → workers.top=(200,250)
// api_gw.right=(460,148) → sqs.top=(592,250)
// sqs.left=(531,268) → workers.right=(266,268)
// workers.bottom=(200,286) → ai_pipe.top=(108,370)
// workers.bottom=(200,286) → postgres.top=(318,370)
// sqs.bottom=(592,286) → redis.top=(578,370)
const EDGES: EdgeDef[] = [
  {
    id: 'c-gw',
    d: 'M 390,56 L 390,129',
    color: '#444',
    dur: 1.6,
    offsets: [0, 0.8],
  },
  {
    id: 'gw-w',
    d: 'M 320,148 C 244,148 200,212 200,250',
    color: '#f97316',
    dur: 2.4,
    offsets: [0, 1.2],
    lx: 236, ly: 182, ltext: 'sync',
  },
  {
    id: 'gw-sq',
    d: 'M 460,148 C 536,148 592,212 592,250',
    color: '#f59e0b',
    dur: 2.4,
    offsets: [0.3, 1.5],
    lx: 554, ly: 182, ltext: 'async',
  },
  {
    id: 'sq-w',
    d: 'M 531,268 L 266,268',
    color: '#f59e0b',
    dur: 3.2,
    offsets: [0, 1.6],
    lx: 398, ly: 261, ltext: 'pull',
  },
  {
    id: 'w-ai',
    d: 'M 200,286 C 174,328 108,356 108,370',
    color: '#a855f7',
    dur: 2.8,
    offsets: [0.4],
  },
  {
    id: 'w-pg',
    d: 'M 200,286 C 232,328 318,356 318,370',
    color: '#3b82f6',
    dur: 3.0,
    offsets: [0.8],
  },
  {
    id: 'sq-r',
    d: 'M 586,286 C 584,326 580,356 578,370',
    color: '#22c55e',
    dur: 2.0,
    offsets: [0.2],
  },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function TopoNode({
  node,
  hovered,
  onHover,
}: {
  node: NodeDef;
  hovered: boolean;
  onHover: (id: NodeId | null) => void;
}) {
  const rx = node.cx - node.w / 2;
  const ry = node.cy - node.h / 2;
  const dotColor = node.status === 'EXTERNAL' ? '#444' : node.status === 'ACTIVE' ? '#f59e0b' : '#22c55e';

  return (
    <g
      style={{ cursor: 'pointer' }}
      onMouseEnter={() => onHover(node.id)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onHover(hovered ? null : node.id)}
    >
      {/* Glow rect on hover */}
      {hovered && (
        <rect
          x={rx - 4}
          y={ry - 4}
          width={node.w + 8}
          height={node.h + 8}
          rx={3}
          fill={node.color}
          opacity={0.06}
        />
      )}
      {/* Main rect */}
      <rect
        x={rx}
        y={ry}
        width={node.w}
        height={node.h}
        rx={2}
        fill="#0a0a0a"
        stroke={node.color}
        strokeWidth={hovered ? 1 : 0.5}
        opacity={hovered ? 1 : 0.7}
      />
      {/* Status dot */}
      <circle
        cx={rx + node.w - 10}
        cy={node.cy}
        r={2.5}
        fill={dotColor}
        opacity={hovered ? 1 : 0.55}
      />
      {/* Label */}
      <text
        x={rx + 10}
        y={node.cy - (node.h > 34 ? 5 : 4)}
        fontSize={9}
        fontFamily="'JetBrains Mono', monospace"
        fill={hovered ? node.color : '#aaa'}
        fontWeight="600"
        letterSpacing="0.12em"
      >
        {node.label}
      </text>
      {/* Sublabel */}
      <text
        x={rx + 10}
        y={node.cy + (node.h > 34 ? 9 : 8)}
        fontSize={7.5}
        fontFamily="'JetBrains Mono', monospace"
        fill={hovered ? '#666' : '#333'}
        letterSpacing="0.04em"
      >
        {node.sub}
      </text>
    </g>
  );
}

function FlowDot({
  d,
  color,
  dur,
  begin,
}: {
  d: string;
  color: string;
  dur: number;
  begin: number;
}) {
  return (
    <circle r={2.5} fill={color} opacity={0.75}>
      <animateMotion
        dur={`${dur}s`}
        begin={`${begin}s`}
        repeatCount="indefinite"
        path={d}
        calcMode="linear"
      />
    </circle>
  );
}

// ─── Main export ─────────────────────────────────────────────────────────────

export default function SystemTopology() {
  const [hoveredId, setHoveredId] = useState<NodeId | null>(null);
  const hoveredNode = NODES.find(n => n.id === hoveredId) ?? null;

  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });
  const svgRef = useRef<HTMLDivElement>(null);
  const svgInView = useInView(svgRef, { once: true });

  return (
    <section
      id="architecture"
      className="relative py-16 md:py-28"
      style={{ background: '#060606' }}
      ref={sectionRef}
    >
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            'linear-gradient(to right, #0d0d0d 1px, transparent 1px), linear-gradient(to bottom, #0d0d0d 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-[0.025] bg-[#f97316] blur-[120px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="font-mono text-[10px] text-[#f97316] tracking-[0.3em] uppercase">
              02 / Architecture
            </div>
            <div className="flex-1 h-px bg-[#1c1c1c]" />
          </div>
          <div className="grid md:grid-cols-[1fr_auto] gap-6 items-end">
            <div>
              <h2
                className="font-display font-bold text-white mb-3"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
              >
                System <span className="text-[#f97316]">Architecture</span>
              </h2>
              <p className="text-[#666] text-base leading-relaxed max-w-xl font-body">
                A distributed backend system - the kind of infrastructure I design and maintain.
                Hover any node to inspect it.
              </p>
            </div>
            <div className="flex items-center gap-2 border border-[#1c1c1c] px-4 py-2 rounded-sm flex-shrink-0 font-mono text-[10px] text-[#444]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] status-dot" />
              <span>All services operational</span>
            </div>
          </div>
        </motion.div>

        {/* SVG topology */}
        <motion.div
          ref={svgRef}
          initial={{ opacity: 0, y: 20 }}
          animate={svgInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
          className="border border-[#1c1c1c] bg-[#080808] rounded-sm overflow-hidden"
        >
          {/* Terminal bar */}
          <div className="flex items-center gap-2 px-5 py-3 border-b border-[#111] bg-[#0a0a0a]">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ef4444] opacity-30" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#f59e0b] opacity-30" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#22c55e] opacity-30" />
            </div>
            <span className="font-mono text-[10px] text-[#2a2a2a] ml-2 tracking-widest uppercase">
              infra-topology.svg — live system
            </span>
          </div>

          {/* SVG */}
          <div className="p-4 sm:p-6 overflow-x-auto">
            <svg
              viewBox="0 0 780 430"
              style={{ minWidth: '600px', maxWidth: '780px', width: '100%', display: 'block', margin: '0 auto' }}
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Edge paths */}
              {EDGES.map(edge => (
                <path
                  key={edge.id}
                  d={edge.d}
                  stroke={edge.color}
                  strokeWidth={0.5}
                  strokeDasharray="3 4"
                  fill="none"
                  opacity={0.25}
                />
              ))}

              {/* Edge labels */}
              {EDGES.filter(e => e.ltext).map(edge => (
                <text
                  key={`lbl-${edge.id}`}
                  x={edge.lx}
                  y={edge.ly}
                  fontSize={7}
                  fontFamily="'JetBrains Mono', monospace"
                  fill={edge.color}
                  opacity={0.4}
                  letterSpacing="0.08em"
                  textAnchor="middle"
                >
                  {edge.ltext}
                </text>
              ))}

              {/* Animated flow dots */}
              {svgInView &&
                EDGES.flatMap(edge =>
                  edge.offsets.map((offset, i) => (
                    <FlowDot
                      key={`${edge.id}-dot-${i}`}
                      d={edge.d}
                      color={edge.color}
                      dur={edge.dur}
                      begin={offset}
                    />
                  ))
                )}

              {/* Nodes */}
              {NODES.map(node => (
                <TopoNode
                  key={node.id}
                  node={node}
                  hovered={hoveredId === node.id}
                  onHover={setHoveredId}
                />
              ))}
            </svg>
          </div>

          {/* Inspector bar */}
          <div className="border-t border-[#111] min-h-[72px] relative overflow-hidden">
            <AnimatePresence mode="wait">
              {hoveredNode ? (
                <motion.div
                  key={hoveredNode.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col sm:flex-row sm:items-center gap-4 px-5 py-4"
                >
                  {/* Node identity */}
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <div
                      className="w-1 h-10 rounded-full flex-shrink-0"
                      style={{ background: hoveredNode.color, opacity: 0.6 }}
                    />
                    <div>
                      <div
                        className="font-mono text-sm font-bold"
                        style={{ color: hoveredNode.color }}
                      >
                        {hoveredNode.label}
                      </div>
                      <div className="font-mono text-[10px] text-[#444]">{hoveredNode.sub}</div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="hidden sm:block w-px h-8 bg-[#1a1a1a] flex-shrink-0" />

                  {/* Description */}
                  <p className="text-[#666] text-xs leading-relaxed font-body flex-1">
                    {hoveredNode.desc}
                  </p>

                  {/* Tech + status */}
                  <div className="flex-shrink-0 text-right space-y-1">
                    <div className="font-mono text-[10px] text-[#888]">{hoveredNode.tech}</div>
                    <div className="flex items-center gap-1.5 justify-end">
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{
                          background:
                            hoveredNode.status === 'EXTERNAL'
                              ? '#555'
                              : hoveredNode.status === 'ACTIVE'
                              ? '#f59e0b'
                              : '#22c55e',
                        }}
                      />
                      <span
                        className="font-mono text-[9px] tracking-widest uppercase"
                        style={{
                          color:
                            hoveredNode.status === 'EXTERNAL'
                              ? '#555'
                              : hoveredNode.status === 'ACTIVE'
                              ? '#f59e0b'
                              : '#22c55e',
                        }}
                      >
                        {hoveredNode.status}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-3 px-5 py-4"
                >
                  <span className="font-mono text-[10px] text-[#2a2a2a] tracking-widest uppercase">
                    Hover a node to inspect
                  </span>
                  <div className="flex gap-4 ml-4">
                    {NODES.filter(n => n.id !== 'client').map(n => (
                      <button
                        key={n.id}
                        onMouseEnter={() => setHoveredId(n.id)}
                        onMouseLeave={() => setHoveredId(null)}
                        className="flex items-center gap-1.5 cursor-default"
                      >
                        <span
                          className="w-1 h-1 rounded-full"
                          style={{ background: n.color, opacity: 0.4 }}
                        />
                        <span className="font-mono text-[9px] text-[#333] hidden sm:block">
                          {n.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
