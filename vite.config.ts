import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    // Uncomment and configure the proxy if needed
    // proxy: {
    //   '/api/auth/user': {
    //     target: "http://localhost:5000",
    //     changeOrigin: true
    //   }
    // },
    watch: {
      usePolling: true,
    },
  },
})
