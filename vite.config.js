import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:3000'
    }
  },
  build: {
    // Output to dist folder for production
    outDir: 'dist',
    assetsDir: 'assets',
    // Production optimizations
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'lucide': ['lucide-react']
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    sourcemap: false,
    target: 'es2015'
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'lucide-react']
  }
})
