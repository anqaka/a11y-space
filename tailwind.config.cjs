/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#2f2a95',
        coral: '#ff674d',
        rose: '#efada3'
      },
      fontFamily: {
        sans: ['IBM Plex Sans', 'sans-serif'],
        mono: ['IBM Plex Mono', 'ui-monospace']
      },
      backgroundImage: ({ theme }) => ({
        gradient: `linear-gradient(65deg, ${theme('colors.rose')} 0%, ${theme('colors.coral')} 23%, ${theme('colors.primary')} 100%)`,
        'gradient-straight': `linear-gradient(90deg, ${theme('colors.rose')} 0%, ${theme('colors.coral')} 23%, ${theme('colors.primary')} 100%)`,
        'gradient-small': `linear-gradient(15deg, ${theme('colors.primary')} 0%, ${theme('colors.coral')} 10%, ${theme('colors.rose')} 15%, ${theme('colors.white')} 30%)`,
      }),
      keyframes: {
        animatetop: {
          '0%': { top: '-300px' },
          '100%': { top: 'inherit' }
        }
      },
      animation: {
        animatetop: 'animatetop 0.4s ease 1'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
