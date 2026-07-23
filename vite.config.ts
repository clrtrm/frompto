import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/styles/colors.scss" as *;
          @use "@/styles/sizes.scss" as *;
          @use "@/styles/fonts.scss" as *;
        `,
      },
    },
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})