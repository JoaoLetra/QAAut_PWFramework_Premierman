import { expect, Page } from '@playwright/test';
import { Locators } from '../locators/locators';
import { waitForLoadingSpinnerDisappear } from '../pages/utils';
const config = require('../config/settings.json');

export class CheckoutPage {
  constructor(private page: Page) { }

  async navigateToCheckoutPage() {
    await this.page.goto(config.baseUrl + '/shop/viewbag/ViewBag.action');
  }
  async verifyFstItemExist() {
    const productNameLocator = this.page.locator(Locators.CheckoutPage.fstProductName);
    await expect(productNameLocator).toBeVisible();
  }

  async verifyProductInCheckout(expectedTitle: string, expectedPrice: string) {
    const actualTitle = await this.page.locator(Locators.CheckoutPage.fstProductName).innerText();
    const actualPrice = await this.page.locator(Locators.CheckoutPage.fstProductPrice).innerText();

    // expect(actualTitle).toBe(expectedTitle);
    expect(actualPrice).toBe(expectedPrice);
  }

  async goToPayment() {
    await this.page.locator(Locators.CheckoutPage.goPaymentBtn).click();
    await waitForLoadingSpinnerDisappear(this.page);
  }

  async removeFstItemFromBag() {
    // // Remove the product from the bag
    const deleteBtnLocator = this.page.locator(Locators.CheckoutPage.deleteProductBtn);
    const productNameLocator = this.page.locator(Locators.CheckoutPage.fstProductName)
    await deleteBtnLocator.click();

    // Verify that the product has been removed
    await expect(productNameLocator).not.toBeVisible();
  }
}