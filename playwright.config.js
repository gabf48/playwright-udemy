const config = {
  testDir: "./tests",
  retries: 2,
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  reporter: [
    ["html"],
    ["list"],
    ["allure-playwright", { outputFolder: "allure-results", detail: true }],
  ],
  use: {
    browserName: "chromium",
    headless: true,
    screenshot: "on",
    trace: "on", //on,off,retain-on-failure
  },
};
module.exports = config;
