import { test, expect } from '@playwright/test';
import { CatalogPage } from '../pages/CatalogPage';
import { Locators } from '../locators/locators';
import { initializeHomePage } from '../pages/utils';

test.describe('Browsing Catalog Tests', () => {
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

    catalogTests.forEach(({ menu, locator, pageTitle }) => {
        test(`Navigate to ${menu} catalog and verify products`, async ({ page }) => {
            const catalogPage = new CatalogPage(page);

            // Navigate to menu
            await page.locator(locator).click();

            // Verify page title
            await expect(page.locator(pageTitle)).toBeVisible();

            // Verify if First Product is Visible
            expect(await catalogPage.isFirstProductVisible()).toBe(true);
        });
    });
});