import { Page } from '@playwright/test';
import { Locators } from '../locators/locators';
const config = require('../config/settings.json');

export class CatalogPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToCatalogPage(menu) {
    await this.page.goto(config.baseUrl + '/shop/c/' + menu);
  }

  // Verify 1st catalog product
  async isFirstProductVisible() {
    const firstProduct = this.page.locator(Locators.CatalogPage.firstProduct);
    await firstProduct.waitFor({ state: 'visible' });
    return firstProduct.isVisible();
  }

  async selectFirstProduct() {
    await this.page.locator(Locators.CatalogPage.firstProduct).click();
  }
}