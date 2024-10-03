import { expect, Page } from '@playwright/test';
import { Locators } from '../locators/locators';

export class PaymentPage {
  constructor(private page: Page) {}

  async verifyPaymentPageElements() {
    await expect(this.page.locator(Locators.PaymentPage.OrderSummaryLbl)).toBeVisible();
    await expect(this.page.locator(Locators.PaymentPage.PlaceOrderBtn)).toBeVisible();
  }
}