class BasePage {
    constructor(page) 
    {
        this.page = page;
    }

    async navigate(url) 
    {
        await this.page.goto(url);
    }

    async fillInput(selector, text) 
    {
        await this.page.locator(selector).fill(text);
    }

    async clickButton(selector)
    {
        await this.page.locator(selector).click();
    }

    async wait(seconds)
    {
        await this.page.waitForTimeout(seconds * 1000);
    }
}

module.exports = BasePage;
