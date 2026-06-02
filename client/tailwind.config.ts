import type { Config } from 'tailwindcss'

const config: Config = {
  theme: {
    extend: {
      colors: {
        'navy-deep': '#0c2540',
        'navy': '#153c66',
        'slate-custom': '#809db1',
        'slate-light': '#b3c8d8',
        'white-custom': '#f0f4f8',
      },
      fontFamily: {
        'syne': ['var(--font-syne)', 'sans-serif'],
      },
      keyframes: {
        'aav-grid-fade': {
          'to': { 'opacity': '1' },
        },
        'aav-glow-pulse': {
          '0%, 100%': { 'transform': 'scale(1)', 'opacity': '0.7' },
          '50%': { 'transform': 'scale(1.15)', 'opacity': '1' },
        },
        'aav-tagline-reveal': {
          'from': { 'opacity': '0', 'letter-spacing': '0.6em' },
          'to': { 'opacity': '0.7', 'letter-spacing': '0.35em' },
        },
        'aav-fade-in': {
          'to': { 'opacity': '1' },
        },
        'aav-bar-fill': {
          'to': { 'width': '100%' },
        },
        'aav-loader-exit': {
          '0%': { 'opacity': '1', 'transform': 'scale(1)' },
          '100%': { 'opacity': '0', 'transform': 'scale(1.04)' },
        },
        'aav-part-reveal': {
          'to': { 'opacity': '1', 'transform': 'translateY(0)' },
        },
      },
      animation: {
        'aav-grid-fade': 'aav-grid-fade 0.8s ease forwards',
        'aav-glow-pulse': 'aav-glow-pulse 3s ease-in-out infinite',
        'aav-tagline-reveal': 'aav-tagline-reveal 0.6s ease forwards 2.4s',
        'aav-progress-fade': 'aav-fade-in 0.4s ease forwards 2.2s',
        'aav-loader-exit': 'aav-loader-exit 0.7s cubic-bezier(0.4, 0, 1, 1) forwards',
      },
    },
  },
}

export default config
