import baseConfig from '@watcha/tailwind-config';

/** @type {import('tailwindcss').Config} */
export default {
  ...baseConfig,
  content: [
    './public/index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',
  ],
};
