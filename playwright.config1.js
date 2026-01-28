// @ts-check
import { defineConfig, devices } from "@playwright/test";
import { worker } from "node:cluster";
import { permission } from "node:process";

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = {
  testDir: "./tests",
  retries: 1,
  workers: 1,
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
        headless: false,
        screenshot: "on",
        trace: "on", //on,off,retain-on-failure
        ...devices["iPhone 11"],
      },
    },
    {
      name: "chrome",
      use: {
        browserName: "chromium",
        headless: false,
        screenshot: "on",
        video: "retain-on-failure",
        ignoreHttpsErrors: true,
        permissions: ["geolocation"],
        trace: "on", //on,off,retain-on-failure
        viewport: { width: 720, height: 720 },
        // ...devices['iPhone 11']
      },
    },
  ],
};

module.exports = config;
