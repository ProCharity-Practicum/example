import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'main',
      remotes: {
        auth: "/auth/assets/auth.js",
      },
      shared: {
        'react': { singleton: true },
        'react-dom': { singleton: true },
        'common': { singleton: true },
      }
    })
  ],
  base:'./',
  server: {
    proxy: {
      '/api': 'http://localhost:3000'
    },
    cors: true
  },
  build: {
    target: 'esnext'
  },
})
