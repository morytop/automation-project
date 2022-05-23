const config = {
  workers: 1,
  use: {
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
    retries: 2,
    timeout: 60000,
    reporter: [
      ['line'],
      ['allure-playwright']
    ],
    ignoreHTTPSErrors: true,
    baseURL: "https://www.automationexercise.com/"
  },
  projects: [
    { name: 'Chromium', use: { browserName: 'chromium' } },
    { name: 'Firefox', use: { browserName: 'firefox' } },
    { name: 'Webkit', use: { browserName: 'webkit' } },
  ],
};

module.exports = config;