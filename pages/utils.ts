import { Page, BrowserContext } from 'playwright';
import HomePage from './HomePage';
import { Locators } from '../locators/locators';
import { TestInfo } from '@playwright/test';

export async function initializeHomePage(page: Page, context: BrowserContext, path = '') {
    const homePage = new HomePage(page, context);

    //Improvment TODO login via API

    await homePage.setCookies();
    await homePage.setStorage();
    await homePage.navigateToHomePage(path);
}

export async function waitForLoadingSpinnerDisappear(page: Page) {
    await page.waitForSelector(Locators.Common.waitLbl, { state: 'hidden' });
}

// Function to take a screenshot with dynamic test name and timestamp
export async function screenshot(page: Page, testInfo: TestInfo, screenshotName: string) {
    const testName = testInfo.title.replace(/[^a-zA-Z0-9]/g, '_'); // Format test name
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-'); // Format timestamp
    const fileName = `${testName}_${screenshotName}_${timestamp}.png`; // Format filename
    await page.screenshot({ path: `screenshots/${fileName}`, fullPage: true });
}