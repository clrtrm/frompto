import path from 'node:path'
import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "~/styles/colors.scss" as *;
          @use "~/styles/fonts.scss" as *;
          @use "~/styles/mixins.scss" as *;
          @use "~/styles/sizes.scss" as *;
        `,
      },
    },
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
    },
  },
})
