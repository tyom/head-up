import { defineConfig } from 'vite';
import { mainConfig } from '../vite.config';

export default defineConfig({
  ...mainConfig,
  build: {
    emptyOutDir: false,
    rollupOptions: {
      input: {
        main: 'examples/index.html',
        build: 'examples/build.html',
        runtime: 'examples/runtime.html',
      },
    },
  },
});
