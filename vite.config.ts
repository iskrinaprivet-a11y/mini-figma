import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Конфиг — ES-модуль, поэтому путь к корню берём из import.meta.url.
const root = fileURLToPath(new URL('.', import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // На GitHub Pages сайт живёт по пути /<имя-репозитория>/, а не в корне домена.
  base: '/mini-figma/',
  build: {
    // Две страницы: лендинг (index.html) и сам редактор (editor.html).
    // Без этого сборка знает только про index.html и редактор бы не попал в dist.
    rollupOptions: {
      input: {
        landing: root + 'index.html',
        editor: root + 'editor.html',
      },
    },
  },
})
