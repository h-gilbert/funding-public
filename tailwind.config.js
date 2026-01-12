/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        // Backgrounds
        background: {
          DEFAULT: '#FFFFFF',
          secondary: '#FAFBFC',
          tertiary: '#F8FAFC',
        },
        // Text colors
        text: {
          primary: '#0F172A',
          secondary: '#475569',
          tertiary: '#94A3B8',
          muted: '#CBD5E1',
        },
        // Accent (blue)
        accent: {
          DEFAULT: '#0066FF',
          hover: '#0052CC',
          light: '#E6F0FF',
        },
        // Profit (green)
        profit: {
          DEFAULT: '#00C853',
          light: '#E8F8EF',
          dark: '#00A344',
        },
        // Loss (red)
        loss: {
          DEFAULT: '#FF3B30',
          light: '#FFEBEA',
        },
        // Chart colors
        chart: {
          primary: '#0066FF',
          grid: '#E2E8F0',
          axis: '#94A3B8',
        }
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif'
        ],
        mono: [
          'SF Mono',
          'Fira Code',
          'Monaco',
          'Menlo',
          'monospace'
        ]
      },
      fontSize: {
        'display': ['4.5rem', { lineHeight: '1.1', fontWeight: '700' }],
        'h1': ['3rem', { lineHeight: '1.2', fontWeight: '700' }],
        'h2': ['2.25rem', { lineHeight: '1.25', fontWeight: '600' }],
        'h3': ['1.75rem', { lineHeight: '1.3', fontWeight: '600' }],
        'h4': ['1.375rem', { lineHeight: '1.35', fontWeight: '600' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
        'caption': ['0.75rem', { lineHeight: '1.4', fontWeight: '500' }],
      },
      boxShadow: {
        'subtle': '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        'card': '0 2px 8px -2px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 8px 24px -4px rgba(0, 0, 0, 0.12)',
        'elevated': '0 12px 40px -12px rgba(0, 0, 0, 0.15)',
        'nav': '0 1px 0 rgba(0, 0, 0, 0.05)',
      },
      maxWidth: {
        'container': '1200px',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
