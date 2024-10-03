import { test, expect, chromium, firefox } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage'; // Import the LoginPage class
import { Locators } from '../locators/locators';

const config = require('../config/settings.json');
let loginPage: LoginPage;

// Before each test, initialize the page object and navigate to the login page
test.beforeEach(async ({ page, context }) => {
    loginPage = new LoginPage(page, context); // Create an instance of LoginPage
    await loginPage.navigateToLogin();      // Navigate to the site URL
    await loginPage.acceptCookies();
});


test.describe('Login Tests', () => {
    test('Valid Login', async ({ page }) => {
        // Perform the login using valid credentials
        await loginPage.login(config.username, config.password);

        // Check that login was successful
        const accountHeader = await page.locator(Locators.UserAccountPage.userEmail(config.username));
        await expect(accountHeader).toBeVisible();
    });

    test('Invalid Login', async ({ page }) => {
        // Attempt to login with invalid credentials
        await loginPage.login('invalid_user@test.com', 'wrong_password');

        // Check for error message indicating login failure
        const errorMessage = await page.locator(Locators.LoginPage.errorMessage);
        await expect(errorMessage).toBeVisible();
    });
});

