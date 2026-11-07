import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Enforcing the dealership's primary red brand color
        dealership: {
          red: '#dc2626',      // bg-red-600
          darkRed: '#991b1b',  // bg-red-800
          lightRed: '#fef2f2', // bg-red-50
        },
        background: '#f8f9fa', // Light gray for the main dashboard background
      },
    },
  },
  plugins: [],
}
export default config