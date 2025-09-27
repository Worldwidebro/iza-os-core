import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: mode === 'mobile' ? 3001 : 3000,
    open: true,
    cors: true,
    hmr: {
      overlay: false
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['framer-motion', 'lucide-react'],
          query: ['@tanstack/react-query'],
          router: ['react-router-dom']
        }
      }
    },
    // Mobile optimization
    target: mode === 'mobile' ? 'es2015' : 'esnext',
    minify: mode === 'mobile' ? 'terser' : 'esbuild',
    terserOptions: mode === 'mobile' ? {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    } : undefined
  },
  define: {
    __MOBILE_MODE__: mode === 'mobile'
  },
  css: {
    devSourcemap: true
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'framer-motion',
      'lucide-react',
      '@tanstack/react-query',
      'react-router-dom',
      'socket.io-client'
    ]
  }
}))