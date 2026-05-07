const { test, expect } = require('@playwright/test');
const SignupPage = require('../pages/SignupPage');
const signupData = require('../test-data/signupData.json');

test('Verify User can sign up successfully', async ({ page }) => {
    const signup = new SignupPage(page);

    await signup.navigate('https://web.paxtrac.dev/');
    await signup.navigateToSignupForm();

    await signup.fillBasicDetails
    (
        signupData.newUser.firstName,
        signupData.newUser.lastName,
        signupData.newUser.mobileNumber
    );

    await signup.fillAccountDetails
    (
        signupData.newUser.email,
        signupData.newUser.password
    );

    try 
    {
        await page.waitForNavigation({ waitUntil: 'networkidle', timeout: 8000 });
    } catch (e) 
    {
        await signup.wait(2);
    }
});
 