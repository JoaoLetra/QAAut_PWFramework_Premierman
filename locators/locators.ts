export const Locators = {
    Common: {
        waitLbl: '//div[@id="nbuxModalContent"]/../..'
    },
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
    ProductPage: {
        ProductTitle: '//h1[@id="productTitle"]',
        ProductPrice: '//div[@class="stars-and-prices"]//span[@class="price-now"]',
        AddToBagBtn: '//a[@name="addToBag-main"]'
    },
    BagPopup: {
        ProductTitle: '(//div[@class="product-title"]/div[@class="product_info"]/h3)[2]',
        ProductPrice: '(//div[@class="product-details"]/span[@class="product-price"])[2]',
        ContinuetoCheckoutBtn: '//a[contains(@class, "gui-btn-primary") and text()="Continue to Checkout"]'
    },
    CheckoutPage: {
        PageTitle: '//div[@class="view-bag-title-links"]/h1[text()="My Order"]',
        fstProductName: '//a[@id="viewItem"]',
        fstProductPrice: '//span[@id="productPrice-1"]',
        goPaymentBtn: '(//div[@class="gui-btn-inner" and text()="Go to Delivery & Payment"])[1]',
        deleteProductBtn: '//a[@id="removeItem-1"]'
    },
    PaymentPage: {
        OrderSummaryLbl: '//p[text()="Order summary"]',
        PlaceOrderBtn: '//button[@id="CHKT-PAY-NOW-BUTN"]',
    }
};