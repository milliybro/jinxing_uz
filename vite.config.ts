import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: 3000,
    },
    define: {
      __APP_ENV__: env.APP_ENV,
    },
    build: {
      sourcemap: true,
    },
    optimizeDeps: {
      include: ['@twa-dev/sdk'],
    },
    ssr: {
      noExternal: ['@twa-dev/sdk'],
    },
  }
})
