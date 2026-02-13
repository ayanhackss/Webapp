/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        // Royal Burgundy Palette
        burgundy: {
          50: '#FFF5F7',
          100: '#FFE3E8',
          200: '#FFC7D1',
          300: '#FF9BAD',
          400: '#FF6F89',
          500: '#D94A6A',
          600: '#B8264D',
          700: '#8B1538',
          800: '#6B0F2A',
          900: '#4A0A1D',
          950: '#2D0612',
        },
        // Royal Gold Palette
        gold: {
          50: '#FFFEF7',
          100: '#FFF9E0',
          200: '#FFF3C1',
          300: '#FFEB99',
          400: '#F4D03F',
          500: '#D4AF37',
          600: '#B8941F',
          700: '#9A7A15',
          800: '#7A5F0E',
          900: '#5C4708',
        },
        // Emerald for Success
        emerald: {
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B',
        },
        // Deep Teal - Professional, trustworthy
        teal: {
          50: '#F0FDFA',
          100: '#CCFBF1',
          200: '#99F6E4',
          300: '#5EEAD4',
          400: '#2DD4BF',
          500: '#14B8A6',
          600: '#0D9488',
          700: '#0F766E',
          800: '#115E59',
          900: '#134E4A',
        },
        // Warm Amber - Warnings, highlights
        amber: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
        // Forest Green - Success, money, growth
        forest: {
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#86EFAC',
          400: '#4ADE80',
          500: '#22C55E',
          600: '#16A34A',
          700: '#15803D',
          800: '#166534',
          900: '#14532D',
        },
        // Slate - Modern, professional neutrals
        slate: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },
        // Terracotta - Warm, organic, trustworthy
        terracotta: {
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#F97316',
          600: '#EA580C',
          700: '#C2410C',
          800: '#9A3412',
          900: '#7C2D12',
        },
        // Warm Neutrals
        ivory: '#FFFEF7',
        cream: '#FAF8F3',
        charcoal: '#1F1F1F',
      },
      fontFamily: {
        display: ['Cinzel', 'serif'],
        sans: ['Noto Sans', 'system-ui', 'sans-serif'],
        accent: ['Cinzel', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'spin': 'spin 1s linear infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #D4AF37 0%, #F4D03F 100%)',
        'burgundy-gradient': 'linear-gradient(135deg, #8B1538 0%, #6B0F2A 100%)',
        'royal-gradient': 'linear-gradient(135deg, #8B1538 0%, #6B0F2A 50%, #D4AF37 100%)',
      },
      boxShadow: {
        'gold': '0 4px 20px rgba(212, 175, 55, 0.3)',
        'gold-lg': '0 10px 40px rgba(212, 175, 55, 0.4)',
        'burgundy': '0 4px 20px rgba(139, 21, 56, 0.3)',
        'burgundy-lg': '0 10px 40px rgba(139, 21, 56, 0.4)',
      },
    },
  },
  plugins: [],
}
