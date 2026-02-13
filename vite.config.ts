import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import { componentTagger } from 'lovable-tagger';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
  server: {
    host: '::',
    port: 8080,
  },
  build: {
    outDir: 'build',
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
}));
