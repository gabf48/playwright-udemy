# Playwright Automation Project

A simple end-to-end automation testing framework using **Playwright** (JavaScript) — built as part of a Udemy course project.

---

## 📦 What’s Inside

This repository includes:
- 🔹 Playwright configuration files (`playwright.config.js`, `playwright.config1.js`, `playwright.service.config.js`)
- 🔹 End-to-end test files (`/tests`)
- 🔹 Cucumber feature files (`/features`)
- 🔹 Page object models (`/pageobjects`, `/pageobjects_ts`)
- 🔹 Utility functions (`/utils`, `/utils_ts`)
- 🔹 Test reports (`/allure-report`, `/playwright-report`, `cucumber-report.html`)
- 🔹 GitHub Actions workflow for CI (`.github/workflows`)
- 🔹 Node.js + Playwright dependencies (`package.json`)

---

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:
- **Node.js** (v14+)
- **npm** or **yarn**

---

## 🛠 Installation

Clone the repo:

```bash
git clone https://github.com/gabf48/playwright-udemy.git
cd playwright-udemy
```

Install dependencies:

```bash
npm install
```

---

## 🧪 Running Tests

### Playwright Tests

Run all tests:

```bash
npm run regression
```

Run tests with the `Web` tag:

```bash
npm run webTest
```

Run tests with the `API` tag:

```bash
npm run APITest
```

Run tests with a custom configuration for Safari:

```bash
npm run SafariNewConfig
```

### Cucumber Tests

Run regression tests with Cucumber:

```bash
npm run CucumberRegression
```

---

## 📂 Project Structure

```
playwright-udemy/
├── allure-report/          # Allure test report files
├── allure-results/         # Allure raw results
├── features/               # Cucumber feature files
├── pageobjects/            # Page object models (JavaScript)
├── pageobjects_ts/         # Page object models (TypeScript)
├── playwright-report/      # Playwright test report files
├── tests/                  # End-to-end test files
├── utils/                  # Utility functions (JavaScript)
├── utils_ts/               # Utility functions (TypeScript)
├── playwright.config.js    # Playwright configuration
├── playwright.config1.js   # Alternate Playwright configuration
├── playwright.service.config.js # Service-specific Playwright configuration
├── package.json            # Project metadata and scripts
├── README.md               # Project documentation
```

---

## 🛠 Tools and Libraries

- **Playwright**: End-to-end testing framework
- **Cucumber.js**: Behavior-driven development (BDD) framework
- **Allure**: Test reporting tool
- **ExcelJS**: Library for working with Excel files

---

## 📄 License

This project is licensed under the ISC License.
