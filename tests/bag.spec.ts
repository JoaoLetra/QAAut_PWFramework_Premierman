import { test, expect } from '@playwright/test';
import { CatalogPage } from '../pages/CatalogPage';
import { ProductPage } from '../pages/ProductPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { initializeHomePage, screenshot } from '../pages/utils';
import { Locators } from '../locators/locators';

test.describe('BP Adding Products to Bag', () => {
    // Before each test, load cookies and localStorage
    test.beforeEach(async ({ page, context }) => {
        await initializeHomePage(page, context);
    });

    test('BP1 Add one product to bag', async ({ page, context }, testInfo) => {
        const catalogPage = new CatalogPage(page);
        const productPage = new ProductPage(page);
        const checkoutPage = new CheckoutPage(page);
        let productTitle;
        let productPrice;

        await test.step('Navigate to the menu and select first product', async () => {
            await catalogPage.navigateToCatalogPage('new-in');
            await expect(page.locator(Locators.NewInPage.PageTitle)).toBeVisible({ timeout: 10000 });
            await catalogPage.selectFirstProduct();
            await screenshot(page, testInfo, 'First product page');

        });

        await test.step('Add product to bag and proceed to checkout', async () => {
            // get the product title and price on the product details page to compare
            productTitle = await productPage.getProductTitle();
            productPrice = await productPage.getProductPrice();

            await productPage.addToBag();
            await productPage.verifyProductInPopup(productTitle, productPrice);
            await screenshot(page, testInfo, 'bag popup with product');
            await productPage.proceedToCheckout();
        });

        await test.step('Verify if product is in checkout', async () => {
            await checkoutPage.verifyProductInCheckout(productTitle, productPrice);
            await screenshot(page, testInfo, 'product in checkout page');
        });

    });

    test('BP2 Remove first product from bag', async ({ page, context }, testInfo) => {
        const checkoutPage = new CheckoutPage(page);

        // Add item to the cart via API URL
        await page.goto('https://www.premierman.com/shop/product/details/ajax/addToBag.action?lpgUid=&optionColour=No+Colour&optionSize=NO+SIZE&pdBoUid=5089&pdLpUid=EI716&productId=EI716NJ&quantity=1&selectedOptionId=01&personalisation=&forceNoPersonalisation=false');

        await test.step('Go to the checkout page', async () => {
            await checkoutPage.navigateToCheckoutPage();
        });

        await test.step('Verify if the item is in bag', async () => {
            await checkoutPage.verifyFstItemExist();
            await screenshot(page, testInfo, 'product exist in checkout page');
        });

        await test.step('Delete item from bag', async () => {
            await checkoutPage.removeFstItemFromBag();
            await screenshot(page, testInfo, 'product doesnt exist in checkout page');
        });
    });
});