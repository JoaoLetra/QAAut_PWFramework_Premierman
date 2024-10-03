import { Page, BrowserContext } from 'playwright';
import HomePage from './HomePage';
import { Locators } from '../locators/locators';
import * as fs from 'fs';



export async function initializeHomePage(page: Page, context: BrowserContext, path = '') {
    const homePage = new HomePage(page, context);

    await homePage.setCookies();
    await homePage.setStorage();
    await homePage.navigateToHomePage(path);
}

export async function waitForLoadingSpinnerDisappear(page: Page) {
    await page.waitForSelector(Locators.Common.waitLbl, { state: 'hidden' });
}