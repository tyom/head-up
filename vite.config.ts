import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export const mainConfig = {
  build: {
    lib: {
      entry: 'src/main.ts',
      name: 'HeadUp',
      fileName: (format: string) => `head-up.${format}.js`
    },
  },
  plugins: [vue()]
}

export default defineConfig(mainConfig)
