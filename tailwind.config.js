/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './data/**/*.{js,ts,jsx,tsx}',
    './hooks/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        'surface-2': 'var(--surface-2)',
        border: 'var(--border)',
        accent: 'var(--accent)',
        'accent-2': 'var(--accent-2)',
        muted: 'var(--muted)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        // Dashboard Premium Colors
        'dashboard-bg': '#09090b',
        'dashboard-card': '#18181b',
        'dashboard-border': '#27272a',
        'dashboard-hover': '#3f3f46',
        'dashboard-text': '#fafafa',
        'dashboard-text-secondary': '#a1a1aa',
        'dashboard-accent': '#7c3aed',
        'dashboard-accent-secondary': '#06b6d4',
      },
      fontFamily: {
        sans: ['SF Pro Display', 'system-ui', 'sans-serif'],
        display: ['SF Pro Display', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 40px rgba(59, 130, 246, 0.2)',
        'glow-purple': '0 0 40px rgba(139, 92, 246, 0.2)',
        'dashboard-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'dashboard-md': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        'dashboard-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        'dashboard-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        'dashboard-2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'dashboard-violet': '0 0 20px rgba(124, 58, 237, 0.2)',
        'dashboard-cyan': '0 0 20px rgba(6, 182, 212, 0.2)',
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
      },
      animation: {
        'pulse-soft': 'pulse-soft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        'pulse-soft': {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '0.8' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
    },
  },
  plugins: [],
};
