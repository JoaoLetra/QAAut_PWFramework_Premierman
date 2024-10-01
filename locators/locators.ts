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
    UserAccountPage:{
        userEmail: (email:string) => `xpath=//p[text()="Email"]/../../p[text()='${email}']`
    }
};