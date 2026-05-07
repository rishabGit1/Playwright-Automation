const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const loginData = require('../test-data/loginData.json');

test('Verify User can log in successfully', async ({ page }) => {
    const login = new LoginPage(page);

    await login.navigate('https://web.paxtrac.dev/login');



    await login.LoginToWeb
    (
        loginData.validUser.email,
        loginData.validUser.password
    );
    await expect(page).toHaveURL('https://web.paxtrac.dev/owner-home');
});