import { Page, BrowserContext } from '@playwright/test';
import * as fs from 'fs';
const config = require('../config/settings.json');
import { Locators } from '../locators/locators';

export default class HomePage {
    readonly page: Page;
    readonly context: BrowserContext;

    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
    }

    async navigateToHomePage(path = '') {
        await this.page.goto(config.baseUrl + path);
    }

    async clickNavBarItem(menu: string) {
        const locator = Locators.NavBar[menu];
        await this.page.locator(locator).click();
    }

    async setCookies() {
        const cookiesPath = 'cookies.json';
        if (fs.existsSync(cookiesPath)) {
            const cookiesString = fs.readFileSync(cookiesPath, 'utf-8');
            const cookies = JSON.parse(cookiesString);
            await this.context.addCookies(cookies);
        }
    }

    async setLocalStorage() {
        const localStoragePath = 'localStorage.json';
        if (fs.existsSync(localStoragePath)) {
            const localStorageString = fs.readFileSync(localStoragePath, 'utf-8');
            const localStorageItems = JSON.parse(localStorageString);

            await this.page.evaluate((items) => {
                for (const key in items) {
                    localStorage.setItem(key, items[key]);
                }
            }, localStorageItems);
        }
    }
}