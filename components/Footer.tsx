'use client';

import { personal } from '@/data/portfolio';

export default function Footer() {
  return (
    <footer className="border-t border-[#1a1a1a] bg-[#060606] py-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2 font-mono">
            <span className="text-[#f97316] opacity-60 text-xs">▶</span>
            <span className="text-white text-sm font-semibold tracking-widest">{personal.handle}</span>
          </div>


          {/* Right: year + name */}
          <div className="font-mono text-[10px] text-[#333] tracking-wider">
            © 2026 {personal.name}
          </div>
        </div>

        {/* Bottom strip */}
        <div className="mt-6 pt-6 border-t border-[#111] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] status-dot" />
            <span className="font-mono text-[9px] text-[#333] tracking-widest uppercase">All systems operational</span>
          </div>
          <div className="flex items-center gap-4">
            {[
              { label: 'GitHub', href: personal.github },
              { label: 'LinkedIn', href: personal.linkedin },
              { label: 'Email', href: `mailto:${personal.email}` },
            ].map(link => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="font-mono text-[10px] text-[#333] hover:text-[#f97316] transition-colors tracking-wider uppercase"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
