import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests', // pasta onde ficam os testes
  testIgnore: '**/seed.spec.ts', // Ignora arquivos seed.spec.ts
  timeout: 30 * 1000, // tempo máximo por teste
  retries: 1, // tenta novamente se falhar
  reporter: [['html', { open: 'never' }]], // gera relatório HTML

  use: {
    headless: false, // define se o navegador é visível
    launchOptions: {
      slowMo: 500, // 500ms entre cada ação
    },
    viewport: { width: 1280, height: 720 },
    actionTimeout: 10 * 1000,
    baseURL: 'https://www.saucedemo.com',
    screenshot: 'only-on-failure', // salva screenshot se o teste falhar
    trace: 'on-first-retry', // grava o "filme" da execução em caso de falha
  },

  projects: [
    { name: 'Chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});