const BasePage = require('./BasePage');

class LoginPage extends BasePage
{
    constructor(page)
    {
        super(page);

        this.EmailAddressField = "//input[@type='email']";
        this.PasswordField = "//input[@type='password']";
        this.LoginButton = "//button[text()='Log In']";
    }

    async LoginToWeb(email, password)
    {
        await this.fillInput(this.EmailAddressField, email);
        await this.fillInput(this.PasswordField, password);
        await this.clickButton(this.LoginButton);
    }
}

module.exports = LoginPage;