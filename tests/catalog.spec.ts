import { test, expect } from '@playwright/test';
import { CatalogPage } from '../pages/CatalogPage';
import { Locators } from '../locators/locators';
import { initializeHomePage, screenshot } from '../pages/utils';

test.describe('BC Browsing Catalog Tests', () => {
    // Before each test, load cookies and localStorage
    test.beforeEach(async ({ page, context }) => {
        await initializeHomePage(page, context);
    })

    const catalogTests = [
        { menu: 'New In', locator: Locators.NavBar.NewInBtn, pageTitle: Locators.NewInPage.PageTitle },
        { menu: 'Menswear', locator: Locators.NavBar.MenswearBtn, pageTitle: Locators.MenswearPage.PageTitle },
        { menu: 'Shoes', locator: Locators.NavBar.ShoesBtn, pageTitle: Locators.ShoesPage.PageTitle },
        { menu: 'Nightwear & Underwear', locator: Locators.NavBar.NightwearUnderwearBtn, pageTitle: Locators.NightwearUnderwearPage.PageTitle },
        { menu: 'Womens', locator: Locators.NavBar.WomensBtn, pageTitle: Locators.WomensPage.PageTitle },
        { menu: 'Home & Garden', locator: Locators.NavBar.HomeGardenBtn, pageTitle: Locators.HomeGardenPage.PageTitle },
        { menu: 'Electricals', locator: Locators.NavBar.ElectricalsBtn, pageTitle: Locators.ElectricalsPage.PageTitle },
        { menu: 'Gifts', locator: Locators.NavBar.GiftsBtn, pageTitle: Locators.GiftsPage.PageTitle },
        { menu: 'Outlet', locator: Locators.NavBar.OutletBtn, pageTitle: Locators.OutletPage.PageTitle }
    ];

    catalogTests.forEach(({ menu, locator, pageTitle }, index) => {
        test(`BC${index + 1} Navigate to ${menu} catalog and verify products`, async ({ page }, testInfo) => {
            const catalogPage = new CatalogPage(page);

            await test.step('Navigate to menu', async () => {
                await page.locator(locator).click();
                await screenshot(page, testInfo, 'Navigate to menu');
            });

            await test.step('Verify page title', async () => {
                await expect(page.locator(pageTitle)).toBeVisible();
                await screenshot(page, testInfo, 'Catalog page');
            });

            await test.step('Verify if First Product is Visible', async () => {
                expect(await catalogPage.isFirstProductVisible()).toBe(true);
            });
        });
    });
});