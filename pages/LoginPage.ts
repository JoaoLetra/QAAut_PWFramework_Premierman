import { expect } from '@playwright/test';
import { Page } from 'playwright';
import fs from 'fs';
import { Context } from 'vm';
import { Locators } from '../locators/locators';

const config = require('../config/settings.json');
const COOKIES_FILE = 'cookies.json';
const LOCAL_STORAGE_FILE = 'localStorage.json';
const SESSION_STORAGE_FILE = 'sessionStorage.json';


export class LoginPage {
  private page: Page;
  private context: Context;

  constructor(page: Page, context: Context) {
    this.page = page;
    this.context = context;
  }

  async navigateToLogin() {
    await this.page.goto(config.loginUrl);
  }

  // Method to accept cookies 
  async acceptCookies() {
    const acceptCookiesButton = this.page.locator(Locators.CookiesPopUp.accpetBtn);
    await expect(acceptCookiesButton).toBeVisible();
    await acceptCookiesButton.click();

    // Save cookies
    const cookies = await this.context.cookies();
    fs.writeFileSync(COOKIES_FILE, JSON.stringify(cookies, null, 2));
  }

  async saveSession() {
    // Save localStorage
    const localStorage = await this.page.evaluate(() => JSON.stringify(window.localStorage));
    fs.writeFileSync(LOCAL_STORAGE_FILE, localStorage);

    // Save sessionStorage
    const sessionStorage = await this.page.evaluate(() => JSON.stringify(window.sessionStorage));
    fs.writeFileSync(SESSION_STORAGE_FILE, sessionStorage);
  }

  async login(username: string, password: string) {
    await this.page.fill(Locators.LoginPage.usernameInput, username);
    await this.page.fill(Locators.LoginPage.passwordInput, password);
    await this.page.click(Locators.LoginPage.loginButton);
  }
}