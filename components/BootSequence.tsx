'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const bootLines = [
  { text: '> VAIBHAV MAKVANA SYSTEMS v2.0', type: 'header' as const, delay: 0 },
  { text: '> Initializing core runtime...', type: 'info' as const, delay: 220 },
  { text: '  ✓ Node.js runtime loaded', type: 'success' as const, delay: 440 },
  { text: '  ✓ Python workers initialized', type: 'success' as const, delay: 560 },
  { text: '> Connecting data services...', type: 'info' as const, delay: 700 },
  { text: '  ✓ MySQL / MongoDB connected', type: 'success' as const, delay: 880 },
  { text: '  ✓ Redis queue handlers active', type: 'success' as const, delay: 980 },
  { text: '> Mounting API layer...', type: 'info' as const, delay: 1100 },
  { text: '  ✓ REST endpoints registered', type: 'success' as const, delay: 1260 },
  { text: '  ✓ JWT auth middleware armed', type: 'success' as const, delay: 1360 },
  { text: '> Syncing infrastructure...', type: 'info' as const, delay: 1480 },
  { text: '  ✓ AWS regions online', type: 'success' as const, delay: 1640 },
  { text: '  ✓ Docker containers healthy', type: 'success' as const, delay: 1740 },
  { text: '> Starting observability stack...', type: 'info' as const, delay: 1860 },
  { text: '  ✓ Monitoring systems ready', type: 'success' as const, delay: 2020 },
  { text: '─────────────────────────────────────────', type: 'divider' as const, delay: 2200 },
  { text: '  ALL SYSTEMS OPERATIONAL', type: 'ready' as const, delay: 2380 },
];

interface Props {
  onComplete: () => void;
}

export default function BootSequence({ onComplete }: Props) {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const completedRef = useRef(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    bootLines.forEach((line, i) => {
      const t = setTimeout(() => {
        setVisibleLines(prev => [...prev, i]);
        setProgress(Math.round(((i + 1) / bootLines.length) * 100));
      }, line.delay);
      timers.push(t);
    });

    const exitTimer = setTimeout(() => {
      if (!completedRef.current) {
        completedRef.current = true;
        setExiting(true);
        setTimeout(onComplete, 600);
      }
    }, 2900);
    timers.push(exitTimer);

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  const lineColor = (type: string) => {
    if (type === 'header') return 'text-white font-semibold';
    if (type === 'success') return 'text-[#22c55e]';
    if (type === 'info') return 'text-[#999999]';
    if (type === 'divider') return 'text-[#2e2e2e]';
    if (type === 'ready') return 'text-[#f97316] font-semibold tracking-widest';
    return 'text-[#999]';
  };

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-[#060606] flex items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Background grid */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'linear-gradient(to right, #1a1a1a 1px, transparent 1px), linear-gradient(to bottom, #1a1a1a 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />

          <div className="relative w-full max-w-xl mx-4">
            {/* Terminal window */}
            <div className="border border-[#1c1c1c] rounded-sm overflow-hidden">
              {/* Terminal header bar */}
              <div className="flex items-center gap-2 px-4 py-2.5 bg-[#0d0d0d] border-b border-[#1c1c1c]">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ef4444] opacity-60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#f59e0b] opacity-60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#22c55e] opacity-60" />
                </div>
                <span className="font-mono text-[10px] text-[#444] ml-2 tracking-widest uppercase">
                  vaibhav.sys — boot sequence
                </span>
              </div>

              {/* Terminal body */}
              <div className="bg-[#080808] p-5 min-h-[300px] font-mono text-xs leading-relaxed">
                {bootLines.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -4 }}
                    animate={visibleLines.includes(i) ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                    className={`${lineColor(line.type)} mb-0.5 whitespace-pre`}
                  >
                    {line.text}
                    {i === visibleLines[visibleLines.length - 1] && line.type !== 'ready' && (
                      <span className="cursor-blink text-[#f97316] ml-0.5">█</span>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Progress bar */}
              <div className="bg-[#080808] px-5 pb-4 border-t border-[#111]">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono text-[10px] text-[#444] tracking-widest uppercase">Boot progress</span>
                  <span className="font-mono text-[10px] text-[#f97316] tabular-nums">{progress}%</span>
                </div>
                <div className="h-[2px] bg-[#111] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-[#f97316] rounded-full"
                    style={{ width: `${progress}%` }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                  />
                </div>
              </div>
            </div>

            {/* Bottom label */}
            <div className="mt-4 text-center">
              <span className="font-mono text-[10px] text-[#333] tracking-[0.3em] uppercase">
                vaibhavmakvana.in
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
