# Playwright Automation Project

## Description

This is a test automation framework built using [Playwright](https://playwright.dev) and [TypeScript](https://www.typescriptlang.org). It automates interactions on an e-commerce website, utilizing the Page Object Model (POM) pattern and integrating [Allure](https://docs.qameta.io/allure/) for test reporting.. It includes functionality for capturing screenshots, generating Allure reports and uploading it to Google Drive.


## Table of Contents

- [Playwright Automation Project](#playwright-automation-project)
  - [Description](#description)
  - [Table of Contents](#table-of-contents)
  - [Requirements](#requirements)
  - [Installation](#installation)
      - [1. Clone the repository:](#1-clone-the-repository)
      - [2. Install dependencies:](#2-install-dependencies)
      - [3. Install Playwright and browsers](#3-install-playwright-and-browsers)
  - [Configuration](#configuration)
    - [Configuration File](#configuration-file)
    - [Configure Google API credentials:](#configure-google-api-credentials)
    - [Allure Configuration](#allure-configuration)
    - [Configuration Checklist](#configuration-checklist)
  - [Framework Structure](#framework-structure)
  - [Testing Structure](#testing-structure)
    - [Example Test Case](#example-test-case)
  - [Capturing Screenshots](#capturing-screenshots)
  - [Allure Reports](#allure-reports)
  - [Uploading Reports](#uploading-reports)
  - [Sending Email with Reports](#sending-email-with-reports)
  - [Usage](#usage)
    - [Run tests:](#run-tests)
    - [Generate Allure report:](#generate-allure-report)
  - [Best Practices](#best-practices)
  - [Final Considerations](#final-considerations)

## Requirements
-  **Node.js (version 14+)**: [Download Node.js](https://nodejs.org/)
- **npm**
- **Playwright**: [Instalação do Playwright](https://playwright.dev/docs/intro)
- **TypeScript**
- **Allure** (for reporting)
- **Google APIs** (for integrating Google Drive and Gmail)
- **Nodemailer** (for sending emails)


## Installation
#### 1. Clone the repository:
   ```bash
   git clone https://github.com/JoaoLetra/QAAut_PWFramework_Premierman
   cd QAAut_PWFramework_Premierman
   ```

#### 2. Install dependencies:

```bash
npm install
```

#### 3. Install Playwright and browsers

Playwright requires an additional installation for browsers to run the tests:

```bash
npx playwright install
```

## Configuration

### Configuration File

Project settings, such as the website URL and login credentials, are located in the `config/settings.json` file. Update this file with the necessary values:

```json
{
  "baseUrl": "main application url",
  "loginUrl": "login application url",
  "username": "login username",
  "password": "login password",
  "reportSenderEmail": "reportSender@email",
  "reportSenderEmailPW": "reportSenderEmail Password",
  "reportRecepientEmail": "reportRecepient@email",
  "reportRecepientEmail": "reportRecepient@email",
  "reportRecepientName": "reportRecepient name",
}
```

### Configure Google API credentials:

1. Create a Google Cloud project.
2. Enable the Google Drive and Gmail APIs.
3. Download the credentials JSON file and save it as GoogleAPI.json in the config directory.
   
For more details, refer to the official [Google API documentation](https://developers.google.com/docs/api/reference/rest).


### Allure Configuration
To enable Allure, you need to add the integration with Playwright. Install Allure using the following command:

```bash
npm install --save-dev @playwright/test allure-playwright
```
### Configuration Checklist
- [ ] Clone the repository
- [ ] Install dependencies
- [ ] Configure the `settings.json` file
- [ ] Set up Google API credentials


## Framework Structure
The following is the structure of the framework, with a brief explanation of each component:

```plaintext
QAAut_PWFramework/
 ┣ config/                  # Configuration files (API keys, settings, etc.)
 ┃ ┣ GoogleAPI.json         # Google API configuration for Gmail and Drive
 ┃ ┗ settings.json          # Custom settings for the project
 ┣ locators/                # Centralized locators for all elements on the pages
 ┃ ┗ locators.ts
 ┣ pages/                   # Page Object Models (POM) for the site
 ┃ ┣ HomePage.ts
 ┃ ┣ LoginPage.ts
 ┃ ┗ utils.ts               # Utility functions used across the pages
 ┣ reports/                 # Allure reports will be generated here
 ┣ tests/                   # Test scripts
 ┃ ┣ bag.spec.ts            # Tests related to the shopping bag
 ┃ ┣ catalog.spec.ts        # Catalog page-related tests
 ┃ ┗ login.spec.ts          # Login page tests
 ┣ global-teardown.ts       # Global teardown for cleaning up after tests
 ┣ playwright.config.ts     # Playwright configuration
 ┣ uploadAndEmailReport.js  # Script for uploading the Allure report and sending an email notification
 ┗ README.md                # Documentation for the project
```

## Testing Structure

The framework follows the Page Object Model (POM) design pattern to organize page-specific actions and locators. The tests are written in `*.spec.ts` files, each focusing on different functionalities like catalog navigation and login.

### Example Test Case

```typescript
test('BC1 Navigate to products catalog', async ({ page }, testInfo) => {
    const catalogPage = new CatalogPage(page);
    await test.step('Navigate to menu', async () => {
        await page.locator(locator).click();
        await screenshot(page, testInfo, 'Navigate to menu');
    });
});
```


## Capturing Screenshots

Screenshots are captured during test execution for better visibility of test results. You can customize the screenshot naming pattern in the `utils.ts` file to include timestamps, making each screenshot unique.

## Allure Reports

Allure reports are generated after test execution. The report can be generated using:

As single file:
```bash
allure generate allure-results --clean -o allure-report --single-file
```

As a web site:
```bash
allure generate allure-results --clean -o allure-report
```

## Uploading Reports
After generating the Allure report, it is uploaded to Google Drive using the Google Drive API. The upload script is located in `uploadAndEmailReport.ts`:

## Sending Email with Reports
After uploading the report, an email is sent with the report link. The email function is defined in the same upload script.
The `settings.json` file should be updated.

## Usage
### Run tests:

To execute the tests without UI:
```bash
npx playwright test
```

To run tests with the browser UI:
```bash
npx playwright test --headed
```

To open the Playwright Test UI:
```bash
npx playwright test --ui
```

To execute a single test file:
```bash
npx playwright test tests/testName.spec.ts
```

### Generate Allure report:
```bash
npx allure open allure-report
```



## Best Practices
- Use test.step() to break down test actions for better reporting.
- Capture screenshots at critical points in the tests (e.g., before and after important actions).
- Follow the POM pattern for better organization and reusability of code.
- Keep locators centralized for easy maintenance.

## Final Considerations
This framework was developed with best practices in mind, including using POM for structure and Allure for detailed reporting. It also provides integration with Google Drive and Gmail APIs for sharing test results.