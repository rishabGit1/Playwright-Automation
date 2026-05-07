const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const CreateListingPage = require('../pages/CreateListingPage');
const loginData = require('../test-data/loginData.json');
const listingData = require('../test-data/listingData.json');

test.describe('Create Listing Flow', () => {

    test('Verify user can create a new property listing successfully', async ({ page }) => {
        const login = new LoginPage(page);
        const createListing = new CreateListingPage(page);

        // 1. Login
        await login.navigate('https://web.paxtrac.dev/login');
        await login.LoginToWeb(loginData.validUser.email, loginData.validUser.password);
        await expect(page).toHaveURL("https://web.paxtrac.dev/owner-home");

        // 2. Navigate to Create Listing (Assuming a button or direct URL)
        // If there's a button, we'd click it here. For now, navigating directly to listing URL if known, 
        // or assuming we are already on the page if that's how the flow works.
        // Let's assume there is a 'List your Property' button on owner-home.
        await page.click("//h2[text()='Create a Property Manager Listing']");
        await page.click("//button[text()='Let’s Go']");
        
        // Step 1: Address and Owner Info
        await createListing.fillAddressAndOwner(listingData.address, listingData.ownerName);

        // Step 2: Property Info
        await createListing.fillPropertyInfo(
            listingData.propertyType, 
            listingData.units, 
            listingData.vacantUnits, 
            listingData.monthlyRent
        );

        // Step 3: List of Services
        await createListing.selectServices(listingData.services);

        // Step 4: Bid Details
        await createListing.fillBidDetails(
            listingData.dueDiligence, 
            listingData.inspection, 
            listingData.bidDuration
        );

        // Step 5: Additional Requirements
        await createListing.fillAdditionalRequirements(
            listingData.experience, 
            listingData.software
        );

        // Step 6: Scope of Work
        await createListing.fillScopeOfWork(listingData.scopeOfWork);

        // Step 7: Contract Details
        await createListing.fillContractDetails(
            listingData.contractLength,
            listingData.compensationType,
            listingData.compensationAmount,
            listingData.tenantFinding,
            listingData.tenantFindingAmount,
            listingData.leaseRenewal,
            listingData.leaseRenewalAmount
        );

        // Step 8: Photos/Videos
        await createListing.uploadPhotosAndVideos(listingData.photoPath, listingData.videoPath);

        // Step 9: Finalize
        await createListing.finalizeListing(listingData.signaturePath);

        // Verification - Adjust based on what happens after Confirm
        await expect(page.locator("text=Listing Created Successfully")).toBeVisible({ timeout: 10000 });
    });

});
