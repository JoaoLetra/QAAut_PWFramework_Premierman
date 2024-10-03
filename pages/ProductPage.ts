import { expect, Page } from '@playwright/test';
import { Locators } from '../locators/locators';

export class ProductPage {
  constructor(private page: Page) { }

  async getProductTitle() {
    return this.page.locator(Locators.ProductPage.ProductTitle).innerText();
  }

  async getProductPrice() {
    return this.page.locator(Locators.ProductPage.ProductPrice).innerText();
  }

  async addToBag() {
    await this.page.locator(Locators.ProductPage.AddToBagBtn).click();
  }

  //#region Bag Popup functions
  async verifyProductInPopup(expectedTitle: string, expectedPrice: string) {
    const actualTitle = await this.page.locator(Locators.BagPopup.ProductTitle).innerText();
    const actualPrice = await this.page.locator(Locators.BagPopup.ProductPrice).innerText();

    expect(actualTitle).toBe(expectedTitle);
    expect(actualPrice).toBe(expectedPrice);
  }

  async proceedToCheckout() {
    await this.page.locator(Locators.BagPopup.ContinuetoCheckoutBtn).click();
  }
  //#endregion Bag Popup functions
}