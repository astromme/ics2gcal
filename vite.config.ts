import { defineConfig } from 'vite';
import webExtension from 'vite-plugin-web-extension';
import { copyFileSync, mkdirSync } from 'fs';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    webExtension({
      manifest: './manifest.json'
    }),
    {
      name: 'copy-icons',
      closeBundle() {
        // Copy icons to dist folder after build
        const iconsDir = resolve(__dirname, 'dist/icons');
        mkdirSync(iconsDir, { recursive: true });
        ['icon16.png', 'icon48.png', 'icon128.png'].forEach(icon => {
          copyFileSync(
            resolve(__dirname, 'icons', icon),
            resolve(iconsDir, icon)
          );
        });
      }
    }
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
});
