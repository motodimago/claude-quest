import type { Config } from 'tailwindcss';

// RPG調のテーマ色。夜の冒険＋羊皮紙＋輝きのパレット。
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // 背景・面（600以上）＋ テキスト用の明るいシェード（50〜300）
        night: {
          50: '#eef0fb',
          100: '#dbe0f2',
          200: '#b6bee0',
          300: '#8b94bf',
          600: '#343c6e',
          700: '#262c52',
          800: '#1a1e3a',
          900: '#11142a',
          950: '#0b0d1a',
        },
        // 進行・強調（魔法の青紫）
        arcane: {
          400: '#8b9cff',
          500: '#6d7dff',
          600: '#5560e0',
        },
        // 習得・宝（金）
        gold: {
          300: '#ffe08a',
          400: '#ffce5c',
          500: '#f5b73d',
        },
        // ケース・実戦（炎）
        ember: {
          400: '#ff8a5c',
          500: '#ff6b3d',
          600: '#e8501f',
        },
        // 成功・自然
        leaf: {
          400: '#5fd6a0',
          500: '#34c98a',
        },
        parchment: '#f3ead6',
      },
      fontFamily: {
        sans: [
          'system-ui',
          '"Hiragino Kaku Gothic ProN"',
          '"Hiragino Sans"',
          '"Yu Gothic"',
          'Meiryo',
          'sans-serif',
        ],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 16px 2px rgba(109, 125, 255, 0.55)',
        'glow-gold': '0 0 18px 3px rgba(245, 183, 61, 0.55)',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 10px 1px rgba(109,125,255,0.4)' },
          '50%': { boxShadow: '0 0 22px 5px rgba(109,125,255,0.75)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        float: 'float 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
} satisfies Config;
