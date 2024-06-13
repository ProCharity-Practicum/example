import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { libInjectCss } from 'vite-plugin-lib-inject-css'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    libInjectCss(),
  ],
  build: {
    copyPublicDir: false,
    lib: {
      entry: 'src/components/index.js',
      formats: ['es'],
    },
    sourcemap: true,
    minify: false,
    rollupOptions: {
      external: ['react', 'react/jsx-runtime', 'react-router-dom'],
    }
  },
})
