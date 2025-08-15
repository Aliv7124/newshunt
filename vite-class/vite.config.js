// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/newshunt/',  // ✅ this is your repo name
  plugins: [react()],
})
