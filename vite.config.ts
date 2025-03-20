<<<<<<< HEAD
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
=======
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


const __dirname =  dirname(fileURLToPath(import.meta.url))
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  },
  root:'./',
  build: {
    outDir: 'dist',
    rollupOptions:{
      input:{
        main: resolve(__dirname, 'app/public/index.html'),
      }
    },
    sourcemap: true
  }
>>>>>>> 58089f24 (Dockerfile funcionand)
})
