import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        void: 'var(--mx-void)',
        neon: 'var(--mx-neon-primary)',
        plasma: 'var(--mx-neon-secondary)',
        holo: 'var(--mx-holo-white)'
      },
      boxShadow: {
        glow: '0 0 30px rgba(145, 70, 255, 0.55)',
        panel: '0 20px 50px rgba(5, 6, 32, 0.45)'
      },
      fontFamily: {
        display: ['var(--font-space)', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace']
      },
      backdropBlur: {
        xs: '2px'
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(200%)' }
        },
        pulseGlow: {
          '0%,100%': { opacity: '0.5' },
          '50%': { opacity: '1' }
        }
      },
      animation: {
        scan: 'scan 2.8s linear infinite',
        pulseGlow: 'pulseGlow 3s ease-in-out infinite'
      }
    }
  },
  plugins: []
} satisfies Config;
