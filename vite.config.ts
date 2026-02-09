import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { componentTagger } from 'lovable-tagger';

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // Transpile all source files (JS/TS/JSX/TSX) with a TSX-capable loader.
  // This keeps legacy .js files with JSX working without breaking TypeScript parsing.
  esbuild: {
    include: /src\/.*\.[jt]sx?$/,
    loader: 'tsx',
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
  build: {
    rollupOptions: {
      plugins: [
        {
          name: 'treat-js-files-as-jsx',
          async transform(code, id) {
            if (!id.match(/src\/.*\.js$/)) return null;
            return {
              code,
              map: null,
            };
          },
        },
      ],
    },
  },
  server: {
    host: '::',
    port: 8080,
  },
}));
