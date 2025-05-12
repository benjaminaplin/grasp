import { defineConfig } from 'vite';

export default defineConfig({
  ssr: {
    noExternal: ['your-packages-if-any'],
  },
});
