import { test, expect } from '@playwright/test';
import { CatalogPage } from '../pages/CatalogPage';
import { ProductPage } from '../pages/ProductPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { initializeHomePage } from '../pages/utils';
import { Locators } from '../locators/locators';

test.describe('Adding Products to Bag', () => {
    // Before each test, load cookies and localStorage
    test.beforeEach(async ({ page, context }) => {
        await initializeHomePage(page, context);
    });

    test('Add one product to bag', async ({ page, context }) => {
        const catalogPage = new CatalogPage(page);
        const productPage = new ProductPage(page);
        const checkoutPage = new CheckoutPage(page);

        // Navigate to the menu
        await catalogPage.navigateToCatalogPage('new-in');
        await expect(page.locator(Locators.NewInPage.PageTitle)).toBeVisible({ timeout: 10000 });

        await catalogPage.selectFirstProduct();

        // Verify the product title and price on the product details page
        const productTitle = await productPage.getProductTitle();
        const productPrice = await productPage.getProductPrice();

        await productPage.addToBag();
        // Verify title and price in the bag popup
        await productPage.verifyProductInPopup(productTitle, productPrice);
        await productPage.proceedToCheckout();
        await checkoutPage.verifyProductInCheckout(productTitle, productPrice);
    });

    test('Remove first product from bag', async ({ page, context }) => {
        const checkoutPage = new CheckoutPage(page);

        // Add item to the cart via API URL
        await page.goto('https://www.premierman.com/shop/product/details/ajax/addToBag.action?lpgUid=&optionColour=No+Colour&optionSize=NO+SIZE&pdBoUid=5089&pdLpUid=EI716&productId=EI716NJ&quantity=1&selectedOptionId=01&personalisation=&forceNoPersonalisation=false');
        // Go to the checkout page to verify if the item was added and delete it
        await checkoutPage.navigateToCheckoutPage();
        await checkoutPage.verifyFstItemExist();
        await checkoutPage.removeFstItemFromBag();
    });
});