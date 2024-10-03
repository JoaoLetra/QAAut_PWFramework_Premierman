import { Page } from '@playwright/test';
import { Locators } from '../locators/locators';

export class CatalogPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Verify 1st catalog product
  async isFirstProductVisible() {
    const firstProduct = this.page.locator(Locators.CatalogPage.firstProduct);
    await firstProduct.waitFor({ state: 'visible' });
    return firstProduct.isVisible();
  }
}