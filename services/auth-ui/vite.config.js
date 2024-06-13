import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'auth',
      filename: 'auth.js',
      // Modules to expose
      exposes: {
        './CurrentUser': './src/components/CurrentUser.jsx',
        './Protected': './src/components/Protected.jsx',
        './Hooks': './src/hooks/useUserContext.jsx',
        './UserContext': './src/contexts/UserContext.jsx',
      },
      shared: {
        'react': { singleton: true },
        'react-dom': { singleton: true },
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
