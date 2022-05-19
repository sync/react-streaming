import { join, dirname } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fastify from 'fastify-vite/plugin';

export default defineConfig(({ mode: _ }) => {
  return {
    root: join(dirname(new URL(import.meta.url).pathname), 'client'),
    plugins: [react(), fastify()],
  };
});
