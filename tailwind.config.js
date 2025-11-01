/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // プレミアム金属カラー
        gold: {
          50: '#FFFDF7',
          100: '#FFF9E6',
          200: '#FFEFC1',
          300: '#FFE49C',
          400: '#FFD97D',
          500: '#FFD700', // メインゴールド
          600: '#E6C200',
          700: '#B39700',
          800: '#806D00',
          900: '#4D4200',
        },
        silver: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#E8E8E8',
          300: '#D4D4D4',
          400: '#C0C0C0', // メインシルバー
          500: '#A8A8A8',
          600: '#8C8C8C',
          700: '#6E6E6E',
          800: '#4A4A4A',
          900: '#2E2E2E',
        },
        bronze: {
          50: '#FFF8F3',
          100: '#FFEEE1',
          200: '#FFD9BC',
          300: '#F5C097',
          400: '#E6A872',
          500: '#CD7F32', // メインブロンズ
          600: '#B56B25',
          700: '#8E5419',
          800: '#663D0F',
          900: '#3D2409',
        },
        // 和モダンカラーパレット
        wabi: {
          ink: '#1A1A1A',        // 墨色
          charcoal: '#2D2D2D',   // 炭色
          slate: '#3A3A3A',      // 鈍色
          ash: '#6B6B6B',        // 灰色
          mist: '#9E9E9E',       // 霞色
          pearl: '#E8E8E8',      // 真珠色
          snow: '#F5F5F5',       // 雪色
          ivory: '#FFFEF9',      // 象牙色
        },
        neon: {
          red: '#FF0844',        // ネオンレッド
          pink: '#FF2E97',       // ネオンピンク
          purple: '#BD00FF',     // ネオンパープル
          blue: '#00D9FF',       // ネオンブルー
          green: '#00FF94',      // ネオングリーン
          yellow: '#FFE600',     // ネオンイエロー
          orange: '#FF6B00',     // ネオンオレンジ
        },
        // 伝統的な和色（アクセント用）
        traditional: {
          crimson: '#DC143C',    // 紅色
          vermillion: '#E83828', // 朱色
          amber: '#F39800',      // 琥珀色
          jade: '#00A381',       // 翡翠色
          indigo: '#094067',     // 藍色
          plum: '#8B008B',       // 梅色
        }
      },
      fontFamily: {
        japanese: ['"Noto Sans JP"', 'sans-serif'],
        display: ['"Zen Maru Gothic"', '"Noto Sans JP"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'shimmer': 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
        'noise': "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"4\" /%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\" opacity=\"0.05\"/%3E%3C/svg%3E')",
      },
      boxShadow: {
        'glow': '0 0 20px rgba(255, 215, 0, 0.5)',
        'glow-lg': '0 0 40px rgba(255, 215, 0, 0.6)',
        'glow-xl': '0 0 60px rgba(255, 215, 0, 0.7)',
        'neon': '0 0 10px currentColor, 0 0 20px currentColor',
        'neon-strong': '0 0 10px currentColor, 0 0 30px currentColor, 0 0 50px currentColor',
        'inner-glow': 'inset 0 0 20px rgba(255, 255, 255, 0.1)',
        'float': '0 10px 40px rgba(0, 0, 0, 0.2)',
      },
      dropShadow: {
        'glow': '0 0 20px rgba(255, 215, 0, 0.8)',
        'neon': '0 0 10px currentColor',
      },
      animation: {
        'shimmer': 'shimmer 2s infinite',
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'bounce-slow': 'bounce 3s infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 20px currentColor' },
          '50%': { opacity: '0.8', boxShadow: '0 0 40px currentColor' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
