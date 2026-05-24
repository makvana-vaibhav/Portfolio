/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        accent: '#f97316',
        'accent-dim': 'rgba(249, 115, 22, 0.15)',
        'accent-glow': 'rgba(249, 115, 22, 0.3)',
        'bg-base': '#060606',
        'bg-card': '#0d0d0d',
        'bg-panel': '#111111',
        'bg-elevated': '#161616',
        'border-dim': '#1c1c1c',
        'border-active': '#2e2e2e',
        'text-dim': '#2e2e2e',
        'text-muted': '#666666',
        'text-secondary': '#999999',
        'status-green': '#22c55e',
        'status-yellow': '#f59e0b',
        'status-red': '#ef4444',
        'status-blue': '#3b82f6',
      },
      fontFamily: {
        mono: ['var(--font-mono)', 'JetBrains Mono', 'Fira Code', 'monospace'],
        display: ['var(--font-display)', 'Space Grotesk', 'sans-serif'],
        body: ['var(--font-body)', 'Inter', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        'flow': 'flow 3s linear infinite',
        'scanline': 'scanline 8s linear infinite',
        'blink': 'blink 1.2s step-end infinite',
      },
      keyframes: {
        flow: {
          '0%': { strokeDashoffset: '100' },
          '100%': { strokeDashoffset: '0' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(to right, #1a1a1a 1px, transparent 1px), linear-gradient(to bottom, #1a1a1a 1px, transparent 1px)",
        'grid-pattern-sm': "linear-gradient(to right, #141414 1px, transparent 1px), linear-gradient(to bottom, #141414 1px, transparent 1px)",
      },
      backgroundSize: {
        'grid': '40px 40px',
        'grid-sm': '20px 20px',
      },
    },
  },
  plugins: [],
};
