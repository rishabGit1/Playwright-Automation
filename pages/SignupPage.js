const BasePage = require('./BasePage');

class SignupPage extends BasePage {
    constructor(page) 
    {
        super(page);

        this.loginSignupEntry = "//div[text()='Log In / Sign Up']";
        this.signUpTab = "//div[text()='Sign Up']";

        this.firstNameInput = "//input[@name='firstName']";
        this.lastNameInput = "//input[@name='lastName']";
        this.mobileInput = "//input[@name='mobileNumber']";
        this.nextButton = "//button[contains(., 'Next')]";

        this.emailInput = "//input[@name='email']";
        this.passwordInput = "//input[@name='password']";
        this.confirmPasswordInput = "//input[@name='confirmPassword']";
        this.createAccountButton = "//button[text()='Create Account']";
    }

    async navigateToSignupForm() 
    {
        await this.clickButton(this.loginSignupEntry);
        await this.clickButton(this.signUpTab);
    }

    async fillBasicDetails(fName, lName, mobile)
   {
        await this.fillInput(this.firstNameInput, fName);
        await this.fillInput(this.lastNameInput, lName);
        await this.fillInput(this.mobileInput, mobile);

        const nextBtn = this.page.locator(this.nextButton);
        await nextBtn.scrollIntoViewIfNeeded();
        await nextBtn.click();
    }

    async fillAccountDetails(email, password) 
    {
        await this.fillInput(this.emailInput, email);
        await this.fillInput(this.passwordInput, password);
        await this.fillInput(this.confirmPasswordInput, password);

        const createBtn = this.page.locator(this.createAccountButton);
        await createBtn.scrollIntoViewIfNeeded();
        await createBtn.click();
    }
}

module.exports = SignupPage;
