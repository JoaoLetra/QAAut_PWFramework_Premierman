import { Page, BrowserContext } from 'playwright';
import HomePage from './HomePage';
import { Locators } from '../locators/locators';


export async function initializeHomePage(page: Page, context: BrowserContext, path = '') {
    const homePage = new HomePage(page, context);
    await homePage.navigateToHomePage(path);
    await homePage.setCookies();
    await homePage.setLocalStorage();
    await page.reload({ timeout: 60000 });
}

export async function waitForLoadingSpinnerDisappear(page: Page) {
    await page.waitForSelector(Locators.Common.waitLbl, { state: 'hidden' });
}