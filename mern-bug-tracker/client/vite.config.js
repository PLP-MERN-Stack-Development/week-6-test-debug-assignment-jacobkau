import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss(),],
    test: {
    environment: 'jsdom', // 👈 IMPORTANT
    globals: true,
    setupFiles: ['./src/setupTests.js'], // 👈 See next step
  },
})
