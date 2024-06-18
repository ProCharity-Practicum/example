import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    copyPublicDir: false,
    lib: {
      entry: 'src/main.jsx',
      formats: ['es'],
    },
    sourcemap: true,
    minify: false,
    rollupOptions: {
      external: ['react', 'react/jsx-runtime', 'react-router-dom'],
    }
  },
})
