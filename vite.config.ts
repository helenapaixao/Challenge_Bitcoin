import { defineConfig } from 'vitest/config';
import path from 'path';
import vue from '@vitejs/plugin-vue';

const PATH_SRC = path.resolve(__dirname, './src');

export default defineConfig({
  plugins: [vue()],
  base: process.env.NODE_ENV === 'production' ? '/vue-coins' : '/',

  server: {
    port: 4000,
  },

  resolve: {
    alias: {
      '~/': `${PATH_SRC}/`,
    },
  },
  test: {
    include: ['test/**/*.test.ts', 'src/**/*.test.ts'],
    environment: 'jsdom',
    deps: {
      inline: ['@vue', '@vueuse'],
    },
  },
});
