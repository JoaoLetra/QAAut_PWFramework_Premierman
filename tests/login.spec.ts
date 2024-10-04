import { test, expect, chromium, firefox } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage'; // Import the LoginPage class
import { Locators } from '../locators/locators';
import { screenshot } from '../pages/utils';

const config = require('../config/settings.json');
let loginPage: LoginPage;

// Before each test, initialize the page object and navigate to the login page
test.beforeEach(async ({ page, context }) => {
    loginPage = new LoginPage(page, context); // Create an instance of LoginPage
    await loginPage.navigateToLogin();      // Navigate to the site URL
    await loginPage.acceptCookies();
});


test.describe('LI Login Tests', () => {
    test('LI1 Valid Login', async ({ page }, testInfo) => {
        await test.step('Perform the login using valid credentials', async () => {
            await screenshot(page, testInfo, 'loginPage');
            await loginPage.login(config.username, config.password);
        });

        await test.step('Check that login was successful', async () => {
            const accountHeader = await page.locator(Locators.UserAccountPage.userEmail(config.username));
            await expect(accountHeader).toBeVisible();
            await screenshot(page, testInfo, 'LoggedIn');
            await loginPage.saveSession();
        });
    });

    test('LI2 Invalid Login', async ({ page }, testInfo) => {
        await test.step('Attempt to login with invalid credentials', async () => {
            await loginPage.login('invalid_user@test.com', 'wrong_password');
        });

        await test.step('Check for error message indicating login failure', async () => {
            const errorMessage = await page.locator(Locators.LoginPage.errorMessage);
            await expect(errorMessage).toBeVisible();
            await screenshot(page, testInfo, 'LoginFailed');
        });
    });
});