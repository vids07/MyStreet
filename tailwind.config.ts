import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: '#FAFAF8',
        card: '#FFFFFF',
        'text-primary': '#1A1A1A',
        'text-muted': '#6B6B6B',
        border: '#E8E8E4',
        failure: '#C0392B',
        'failure-bg': '#FDECEA',
        warning: '#B45309',
        'warning-bg': '#FEF3C7',
        evidence: '#2D7A27',
        'evidence-bg': '#EAF4E2',
        dangerous: '#7B1D1D',
        'dangerous-bg': '#FCE8E8',
        empowerment: '#D97706',
        'empowerment-text': '#FFFFFF',
      },
      spacing: {
        '2xs': '4px',
        xs: '8px',
        sm: '16px',
        md: '30px',
        lg: '52px',
        xl: '80px',
      },
      borderRadius: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        full: '9999px',
      },
      boxShadow: {
        card: '0 8px 40px rgba(0,0,0,0.18), 0 0 0 0.5px rgba(0,0,0,0.04)',
        'card-hover': '0 12px 48px rgba(0,0,0,0.22), 0 0 0 0.5px rgba(0,0,0,0.04)',
      },
      fontSize: {
        'display': ['44px', { lineHeight: '1.0', letterSpacing: '-0.03em', fontWeight: '900' }],
        'headline': ['30px', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '800' }],
        'title': ['20px', { lineHeight: '1.3', letterSpacing: '0', fontWeight: '700' }],
        'body-bold': ['16px', { lineHeight: '1.6', fontWeight: '600' }],
        'body': ['16px', { lineHeight: '1.75', fontWeight: '400' }],
        'meta': ['16px', { lineHeight: '1.6', fontWeight: '400' }],
        'label': ['11px', { lineHeight: '1.0', letterSpacing: '0.1em', fontWeight: '700' }],
      },
    },
  },
  plugins: [],
};
export default config;
