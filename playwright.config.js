const { defineConfig, devices } = require('@playwright/test');

/**
 * Professional Playwright Configuration
 */
module.exports = defineConfig({
  testDir: './tests',
  
  // High-performance settings
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0, // Run only once (no retries)
  timeout: 60000, // Give it 60 seconds to finish (because of our 3s waits)
  workers: process.env.CI ? 1 : undefined, // Maximize cores locally

  // Professional reporting
  reporter: [
    ['list'], 
    ['html', { open: 'never' }]
  ],

  use: {
    baseURL: 'https://www.saucedemo.com',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'on-first-retry',
    
    // Modern apps often need a specific viewport
    viewport: { width: 1280, height: 720 },
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // We can easily add more projects here (Firefox, Safari) in the future
  ],
});
