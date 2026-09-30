import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Library build: apps install the prebuilt dist/, so they need no special
// Vite/JSX/CSS-module setup to use the bar. React stays external so the app's
// own copy is used (two Reacts on one page breaks hooks).
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: 'src/index.js',
      formats: ['es'],
      fileName: () => 'kinia-shared-nav-bar.js',
      cssFileName: 'style',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
    },
  },
})
