import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

function csv(value) {
  return String(value || '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const allowedHosts = csv(env.VITE_DEV_ALLOWED_HOSTS)
  const proxyTarget = String(env.VITE_DEV_API_PROXY_TARGET || '').trim()

  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            const normalizedId = id.replace(/\\/g, '/')
            if (normalizedId.includes('/node_modules/three/')) {
              return 'three'
            }
          },
        },
      },
    },
    server: {
      host: '0.0.0.0',
      port: Number(env.VITE_DEV_SERVER_PORT || 3000),
      strictPort: true,
      cors: true,
      ...(allowedHosts.length ? { allowedHosts } : {}),
      ...(proxyTarget
        ? {
            proxy: {
              '/api': {
                target: proxyTarget,
                changeOrigin: true,
              },
            },
          }
        : {}),
    },
  }
})
