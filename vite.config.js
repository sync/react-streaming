import { join, dirname } from 'path'
import { defineConfig } from 'vite'
import viteReact from '@vitejs/plugin-react'
import viteFastify from 'fastify-vite/plugin'

// @type {import('vite').UserConfig}
export default defineConfig(({ mode }) => {
  console.log({ mode })
  return {
    root: join(dirname(new URL(import.meta.url).pathname), 'client'),
    define: {
      'process.env.NODE_ENV': `"${mode}"`,
    },
    plugins: [viteReact({ jsxRuntime: 'classic' }), viteFastify()],
  }
})
