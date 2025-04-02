import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  outDir: 'dist',
  emptyOutDir: true,
  plugins: [react()],
  base: "/GoodGameWeb",
})
