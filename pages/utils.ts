import { Page, BrowserContext } from 'playwright';
import HomePage from './HomePage';

export async function initializeHomePage(page: Page, context: BrowserContext) {
    const homePage = new HomePage(page, context);
    await homePage.navigateToHomePage();
    await homePage.setCookies();
    await homePage.setLocalStorage();
    await page.reload();
}