const BasePage = require('./BasePage');

class CreateListingPage extends BasePage {
    constructor(page) {
        super(page);

        // Common Buttons
        this.nextButton = "//button[text()='Next']";
        this.backButton = "//button[text()='Back']";
        this.saveButton = "//button[text()='Save']";
        this.confirmButton = "//button[text()='Confirm']";

        // Step 1: Address and Owner Info
        this.addressInput = "//input[@name='address']";
        this.ownerNameInput = "//input[@name='ownerName']";

        // Step 2: Property Info
        this.propertyTypeRadio = (type) => this.page.getByRole('radio', { name: type, exact: true });
        this.unitsInput = "//input[@name='units']";
        this.vacantUnitsInput = "//input[@name='vacantUnits']"; // 2nd 'Enter units' input = vacant units field
        this.sqftInput = "//input[@name='squareFeet']";
        this.monthlyRentInput = "//input[@name='currentGrossMonthlyRent']";

        // Step 3: List of Services
        this.serviceCheckbox = (serviceName) => this.page.getByRole('checkbox', { name: serviceName, exact: true });

        // Step 4: Bid Details
        this.dueDiligenceInput = "//input[@name='Diligence']";
        this.inspectionRadio = (option) => this.page.getByRole('radio', { name: option, exact: true });
        this.bidDurationInput = "//input[@name='bid']";

        // Step 5: Additional Requirements
        this.experienceInput = "//input[@name='propertyManagementExperienceRequirement']";
        this.softwareInput = "//input[@name='propertyManagementSoftwareRequirement']";
        this.uploadFilesArea = "//label[text()='choose files']";

        // Step 6: Scope of Work
        this.scopeOfWorkTextArea = "//textarea[@name='scopeOfWork']";

        // Step 7: Contract Details
        this.contractLengthRadio = (length) => this.page.getByRole('radio', { name: length, exact: true });
        this.compensationRadio = (type) => this.page.getByRole('radio', { name: type, exact: true });
        this.tenantFindingRadio = (type) => this.page.getByRole('radio', { name: type, exact: true });
        this.leaseRenewalRadio = (value) => this.page.locator(`//input[@name='leaseRenewalCompensation' and @value='${value}']`);
        this.flatFeeAmountInput = "//input[@placeholder='$ Flat Fee']";
        this.paxtracContractRadio = "//input[@id='radio12']";
        this.ownContractRadio = "//input[@id='radio13']";
        this.agreeCheckbox = "//input[@id='checkbox1']";

        // Step 8: Photos/Videos
        this.photoUpload = "(//label[text()='choose files'])[1]";
        this.videoUpload = "(//label[text()='choose files'])[2]";

        // Step 9: Finished
        this.listingAgreementCheckbox = "//input[@id='agreementCheck']";
        this.signatureUpload = "//label[text()='Upload']";
        this.reviewSignButton = "//button[text()='Review & Sign']";
        this.successPopupOkButton = "//button[text()='OK']";
    }

    async fillAddressAndOwner(address, owner) {
        await this.page.locator(this.addressInput).waitFor({ state: 'visible' });
        await this.fillInput(this.addressInput, address);
        await this.fillInput(this.ownerNameInput, owner);
        await this.takeStepScreenshot('Step1_Address_Info');
        await this.clickButton(this.nextButton);
        await this.page.waitForLoadState('networkidle');
    }

    async fillPropertyInfo(type, units, vacantUnits, rent) {
        await this.page.locator(this.unitsInput).waitFor({ state: 'visible' });
        await this.propertyTypeRadio(type).click();
        await this.fillInput(this.unitsInput, units);
        await this.fillInput(this.vacantUnitsInput, vacantUnits);
        await this.fillInput(this.monthlyRentInput, rent);
        
        await this.takeStepScreenshot('Step2_Property_Info');
        await this.clickButton(this.nextButton);
        await this.page.waitForLoadState('networkidle');
    }

    async selectServices(services) {
        await this.page.locator(this.nextButton).waitFor({ state: 'visible' });
        for (const service of services) {
            await this.serviceCheckbox(service).check();
        }
        await this.takeStepScreenshot('Step3_Services');
        await this.clickButton(this.nextButton);
        await this.page.waitForLoadState('networkidle');
    }

    async fillBidDetails(dueDiligence, inspection, bidDuration) {
        await this.page.locator(this.dueDiligenceInput).waitFor({ state: 'visible' });
        await this.fillInput(this.dueDiligenceInput, dueDiligence);
        await this.inspectionRadio(inspection).click();
        await this.fillInput(this.bidDurationInput, bidDuration);
        await this.takeStepScreenshot('Step4_Bid_Details');
        await this.clickButton(this.nextButton);
        await this.page.waitForLoadState('networkidle');
    }

    async fillAdditionalRequirements(experience, software) {
        await this.page.locator(this.experienceInput).waitFor({ state: 'visible' });
        await this.fillInput(this.experienceInput, experience);
        await this.fillInput(this.softwareInput, software);
        await this.takeStepScreenshot('Step5_Additional_Requirements');
        await this.clickButton(this.nextButton);
        await this.page.waitForLoadState('networkidle');
    }

    async fillScopeOfWork(description) {
        await this.page.locator(this.scopeOfWorkTextArea).waitFor({ state: 'visible' });
        await this.fillInput(this.scopeOfWorkTextArea, description);
        await this.takeStepScreenshot('Step6_Scope_of_Work');
        await this.clickButton(this.nextButton);
        await this.page.waitForLoadState('networkidle');
    }

    async fillContractDetails(length, compType, compAmount, tenantFinding, tenantAmount, renewal, renewalAmount) {
        await this.page.locator(this.paxtracContractRadio).waitFor({ state: 'attached' });
        await this.contractLengthRadio(length).click();
        
        await this.compensationRadio(compType).first().click();
        if (compType === 'Flat Fee') {
            await this.page.locator(this.flatFeeAmountInput).nth(0).fill(compAmount);
        }

        await this.tenantFindingRadio(tenantFinding).first().click();
        if (tenantFinding === 'Flat Fee') {
            await this.page.locator(this.flatFeeAmountInput).nth(1).fill(tenantAmount);
        } else if (tenantFinding === 'Percentage of the First Months Rent' && tenantAmount) {
            // Fill percentage amount input (confirmed placeholder from DevTools)
            await this.page.locator("//input[@name='newTenantCompensationamount']").fill(tenantAmount);
        }

        await this.leaseRenewalRadio(renewal).click();
        if (renewal === 'Flat Fee') {
            await this.page.locator(this.flatFeeAmountInput).nth(2).fill(renewalAmount);
        }

        await this.page.locator(this.paxtracContractRadio).first().click();
        await this.takeStepScreenshot('Step7_Contract_Details');
        await this.clickButton(this.nextButton);
        await this.page.waitForLoadState('networkidle');
    }

    async uploadPhotosAndVideos(photoPath, videoPath) {
        await this.page.locator(this.photoUpload).first().waitFor({ state: 'visible' });
        // Playwright's setInputFiles is better for file uploads
        if (photoPath) {
            const [fileChooser] = await Promise.all([
                this.page.waitForEvent('filechooser'),
                this.page.locator(this.photoUpload).first().click(),
            ]);
            await fileChooser.setFiles(photoPath);
        }
        if (videoPath) {
            const [fileChooser] = await Promise.all([
                this.page.waitForEvent('filechooser'),
                this.page.locator(this.videoUpload).first().click(),
            ]);
            await fileChooser.setFiles(videoPath);
        }
        await this.takeStepScreenshot('Step8_Photos_Videos');
        await this.clickButton(this.nextButton);
        await this.page.waitForLoadState('networkidle');
    }

    async finalizeListing(signaturePath) {
        // Initial popup check
        await this.handleSuccessPopup();

        // Checkbox: Only check if it's visible and enabled
        const checkbox = this.page.locator(this.listingAgreementCheckbox);
        if (await checkbox.isVisible() && await checkbox.isEnabled()) {
            const isChecked = await checkbox.isChecked();
            if (!isChecked) {
                await checkbox.check().catch(() => {});
                await this.handleSuccessPopup(); 
            }
        }
        
        // Upload signature
        if (signaturePath) {
            const uploadBtn = this.page.locator(this.signatureUpload);
            if (await uploadBtn.isVisible()) {
                const [fileChooser] = await Promise.all([
                    this.page.waitForEvent('filechooser', { timeout: 5000 }).catch(() => null),
                    uploadBtn.click().catch(() => {}),
                ]);
                if (fileChooser) {
                    await fileChooser.setFiles(signaturePath);
                    await this.handleSuccessPopup();
                }
            }
        }

        // Review & Sign
        const reviewBtn = this.page.locator(this.reviewSignButton);
        if (await reviewBtn.isVisible()) {
            await reviewBtn.click().catch(() => {});
            await this.page.waitForTimeout(2000);
            await this.handleSuccessPopup();
        }

        // Take screenshot before final action
        await this.takeStepScreenshot('Step9_Finalize');

        // Confirm Button: Click whenever it's visible on the page
        const confirmBtn = this.page.locator(this.confirmButton);
        for (let i = 0; i < 2; i++) { // Try up to 2 times if it stays on page
            if (await confirmBtn.isVisible()) {
                await confirmBtn.scrollIntoViewIfNeeded();
                await confirmBtn.click().catch(() => {});
                await this.page.waitForTimeout(1000);
                await this.handleSuccessPopup();
            }
        }
    }

    async handleSuccessPopup() {
        const okButton = this.page.locator(this.successPopupOkButton);
        try {
            // Check if popup is visible without long timeout
            if (await okButton.isVisible({ timeout: 2000 })) {
                await okButton.click({ force: true });
                await this.page.waitForTimeout(1000);
            }
        } catch (e) {
            // Ignore if not found or not clickable
        }
    }

    async takeStepScreenshot(stepName) {
        const saveBtn = this.page.locator(this.saveButton);
        if (await saveBtn.isVisible()) {
            await saveBtn.scrollIntoViewIfNeeded();
        }
        await this.page.screenshot({ path: `screenshots/${stepName}.png` });
    }
}

module.exports = CreateListingPage;
