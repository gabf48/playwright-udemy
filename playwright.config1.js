// @ts-check
import { defineConfig, devices } from "@playwright/test";

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = {
  testDir: "./tests",
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  reporter: "html",
  projects: [
    {
      name: "safari",

      use: {
        // browserName: 'webkit', // Safari
        // browserName: 'firefox',
        browserName: "webkit",
        headless: true,
        screenshot: "on",
        trace: "on", //on,off,retain-on-failure
      }
    },
    {
      name: 'chrome',
      user: {
        browserName: 'chromium',
        headless: false,
        screenshot: 'on',
        trace: 'on' //on,off,retain-on-failure
      }
    }
  ],
};

module.exports = config;
