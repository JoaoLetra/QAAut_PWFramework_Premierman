export const Locators = {
    CookiesPopUp: {
        accpetBtn: 'button[id="onetrust-accept-btn-handler"]'
    },
    LoginPage: {
        usernameInput: 'input[id="username"]',
        passwordInput: 'input[id="password"]',
        loginButton: 'button[id="signInButton"]',
        errorMessage: 'xpath=//p[@class="alert__text_error" and contains(text(), "username or password were incorrect")]'
    },
    UserAccountPage: {
        userEmail: (email: string) => `xpath=//p[text()="Email"]/../../p[text()='${email}']`
    },
    NavBar: {
        NewInBtn: 'a[id="topNav_NewIn"]',
        MenswearBtn: 'a[id="topNav_Menswear"]',
        NightwearUnderwearBtn: 'a[id="topNav_Nightwear&Underwear"]',
        ShoesBtn: 'a[id="topNav_Shoes"]',
        WomensBtn: 'a[id="topNav_Womens"]',
        HomeGardenBtn: 'a[id="topNav_Home&Garden"]',
        ElectricalsBtn: 'a[id="topNav_Electricals"]',
        GiftsBtn: 'a[id="topNav_Gifts"]',
        OutletBtn: 'a[id="topNav_Outlet"]',
    },
    CatalogPage: {
        itemsFoundLabel: '//strong[contains(text(), "items found for New In")]',
        firstProduct: '(//a[@class="product__link"])[1]',
        firstProductImg: '(//a[@class="product__link"])[1]/img',
        firstProductTitle: '(//p[contains(@class,"product__title")]/a[contains(@class,"title")])[1]'
    },
    NewInPage: {
        PageTitle: '//span[@itemprop="title" and text()="New In"]'
    },
    MenswearPage: {
        PageTitle: '//span[@itemprop="title" and text()="Menswear"]'
    },
    NightwearUnderwearPage: {
        PageTitle: '//span[@itemprop="title" and text()="Nightwear & Underwear"]'
    },
    ShoesPage: {
        PageTitle: '//span[@itemprop="title" and text()="Shoes"]'
    },
    WomensPage: {
        PageTitle: '//span[@itemprop="title" and text()="Womens"]'
    },
    HomeGardenPage: {
        PageTitle: '//span[@itemprop="title" and text()="Home & Garden"]'
    },
    ElectricalsPage: {
        PageTitle: '//span[@itemprop="title" and text()="Electricals"]'
    },
    GiftsPage: {
        PageTitle: '//span[@itemprop="title" and text()="Gifts"]'
    },
    OutletPage: {
        PageTitle: '//span[@itemprop="title" and text()="Outlet"]'
    },
};