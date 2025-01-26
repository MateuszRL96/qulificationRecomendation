import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests', // Folder, w którym będą znajdować się testy
  use: {
    browserName: 'chromium', // Wybór przeglądarki: tylko Chromium
    baseURL: 'http://localhost:4200', // URL Twojej aplikacji Angular
    headless: true, // Przeglądarka w trybie headless
    viewport: { width: 1280, height: 720 }, // Rozdzielczość przeglądarki
  },
  workers: 1, // Uruchamianie testów po kolei
});
