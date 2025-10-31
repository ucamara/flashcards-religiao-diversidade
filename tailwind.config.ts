import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui']
      },
      boxShadow: {
        '2xl': '0 25px 50px -12px rgba(79, 70, 229, 0.25)'
      }
    }
  },
  plugins: []
};

export default config;
