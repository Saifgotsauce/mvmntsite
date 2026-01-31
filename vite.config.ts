import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Optimize for production
    target: 'esnext',
    minify: 'terser',
    cssMinify: true,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log'],
      },
      format: {
        comments: false,
      },
    },
    rollupOptions: {
      output: {
        // Code splitting for better caching
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-ui': ['@radix-ui/react-dialog', '@radix-ui/react-label'],
          'vendor-icons': ['lucide-react'],
        },
        // Optimize chunk size
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          if (/\.(png|jpe?g|svg|gif|webp|ico)$/.test(assetInfo.name ?? '')) {
            return `assets/images/[name]-[hash][extname]`;
          } else if (/\.(woff2?|eot|ttf|otf)$/.test(assetInfo.name ?? '')) {
            return `assets/fonts/[name]-[hash][extname]`;
          }
          return `assets/[ext]/[name]-[hash][extname]`;
        },
      },
    },
    // Reduce bundle size
    sourcemap: false,
    // Optimize assets
    assetsInlineLimit: 4096,
    // Chunk size warning
    chunkSizeWarningLimit: 500,
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Optimize dependencies
    reportCompressedSize: false,
  },
  // Optimize dev server
  server: {
    hmr: {
      overlay: false,
    },
  },
  // CSS optimization
  css: {
    devSourcemap: false,
  },
  // Preload critical assets
  preview: {
    headers: {
      // Security headers
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=*, geolocation=()',
      // Content Security Policy
      'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' blob: https://unpkg.com https://*.elevenlabs.io https://elevenlabs.io; worker-src 'self' blob: https://*.elevenlabs.io; child-src 'self' blob: https://*.elevenlabs.io; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://formspree.io https://*.elevenlabs.io https://elevenlabs.io wss://*.elevenlabs.io; media-src 'self' https://*.elevenlabs.io https://elevenlabs.io blob: data:; frame-src 'none'; object-src 'none';",
      // HSTS
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    },
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'lucide-react'],
    exclude: [],
  },
});
