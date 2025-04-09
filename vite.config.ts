import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import path from 'path'

const __dirname =  dirname(fileURLToPath(import.meta.url))
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      // Configuração para exportar SVGs como URLs
      svgrOptions: {
        exportType: 'named',
        ref: true,
        svgo: false,
        titleProp: true
      },
      // Esta opção faz com que SVGs importados sem ?react sejam tratados como URLs
      include: '**/*.react.svg' // Apenas arquivos com .react.svg serão processados como componentes
    })
  ],
  assetsInclude: ['**/*.svg'],
  server: {
    port: 3000
  },
  root:'./',
  build: {
    assetsInlineLimit: 0,
    outDir: 'dist',
    rollupOptions:{
      input:{
        main: resolve(__dirname, './index.html'),
      }
    },
    sourcemap: true
  },
  resolve:{
    alias:{
      '@assets': path.resolve(__dirname, './src/assets'), // Alias para assets
    }
  },
})
