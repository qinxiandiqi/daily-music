import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  clearScreen: false,
  root: './src',  // 设置 root 为 src 目录，因为 index.html 在 src 中
  publicDir: '../public',  // public 目录在上一级
  server: {
    port: 3001,
    strictPort: true,
    watch: {
      usePolling: true,
    },
  },
  build: {
    outDir: '../dist',  // 输出到上一级目录
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})