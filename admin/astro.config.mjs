// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  server: {
    port: 4322,
  },
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});