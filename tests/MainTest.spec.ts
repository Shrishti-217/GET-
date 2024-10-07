import { expect, test, BrowserContext, Page } from '@playwright/test';
import { loginPage } from '../Pages/loginPage';
import { Recruiter } from '../Pages/Recruiter_navigation';
import { Recruiter_Page } from '../Pages/Recruiter_Page';
import { JobOpeningPage } from '../Pages/jobOpeningPage';
import { CandidatePage } from '../Pages/candidatePage';

let candidateFullName: string; 

test.describe('Recruiter Portal Test', () => {
    let context: BrowserContext;
    let page: Page;
    let login: loginPage;
    let recruiter: Recruiter;
    let recruiter_page: Recruiter_Page;
    let jobOpeningPage: JobOpeningPage;
    let candidatePage: CandidatePage; 

    test.beforeAll(async ({ browser }) => {
        context = await browser.newContext();
        page = await context.newPage();
        login = new loginPage(page);
        recruiter = new Recruiter(page);
        recruiter_page = new Recruiter_Page(page);
        jobOpeningPage = new JobOpeningPage(page);
        candidatePage = new CandidatePage(page); 

        
        await login.navigateToLoginPage();
        await login.enterEmail();
        await login.enterPassword();
        await login.clickLoginButton();

      
        await expect(login.WelcomePage).toBeVisible();
    });

    test('should login and navigate to recruiter dashboard', async () => {
        await expect(page).toHaveURL('https://new-stage2-deployer.getglobalgroup.com/apps');

        await recruiter.navigate_recruiter();
        
        const [recruiterTab] = await Promise.all([
            context.waitForEvent('page'),
            recruiter.recruiter_optn() 
        ]);

        await recruiterTab.waitForLoadState('load');
        await expect(recruiterTab).toHaveURL('https://new-stage2-recruiter.getglobalgroup.com/dashboard');
    });

    test('should add a new candidate on the recruiter page', async () => {
        const [recruiterTab] = await context.pages().slice(-1); 
        await recruiterTab.waitForLoadState('load');

        recruiter_page = new Recruiter_Page(recruiterTab);
        await recruiter_page.Add_can(); 

        // Generate random values for the candidate details
        const randomFirstName = `TestUser_${Math.floor(Math.random() * 1000)}`;
        const randomLastName = `Last_${Math.floor(Math.random() * 1000)}`;
        const randomEmail = `test_${Math.floor(Math.random() * 1000)}@mailinator.com`;
        const randomPhone = `999${Math.floor(Math.random() * 10000000)}`;

        await recruiterTab.getByLabel('First Name').fill(randomFirstName);
        await recruiterTab.getByLabel('Last Name').fill(randomLastName);
        await recruiterTab.getByLabel('Email Address', { exact: true }).fill(randomEmail);
        await recruiterTab.locator('#mat-input-9').fill(randomPhone);

        // Wait for the "Create" button to be visible before clicking
        const createButton = await recruiterTab.getByRole('button', { name: 'Create' });
        await createButton.waitFor({ state: 'visible' });
        await createButton.click();

        await expect(recruiterTab.locator('text=Consultant created successfully')).toBeVisible({ timeout: 5000 });
        recruiterTab.waitForTimeout(3000) 

        // Save the candidate's full name for tagging
        candidateFullName = `${randomFirstName} ${randomLastName}`; // Store candidate full name in the global variable
    });

    test('should tag candidate to the first job role on the 1st page and navigate to profile', async () => {
        const [recruiterTab] = await context.pages().slice(-1); // Get the recruiter tab

        jobOpeningPage = new JobOpeningPage(recruiterTab);
        await jobOpeningPage.navigateToJobOpenings(); // Navigate to Job Openings
        await recruiterTab.waitForLoadState('load');
        await jobOpeningPage.selectFirstJob();

        // Click on "Tag Candidate"
        candidatePage = new CandidatePage(recruiterTab);
        await recruiterTab.waitForLoadState('load');
        await candidatePage.clickTagCandidate();
        

        // Search for the recently created candidate using the stored full name
        await candidatePage.searchCandidate(candidateFullName); 

        // Wait for search results to appear and tag the candidate
        const candidateLocator = recruiterTab.locator(`text=${candidateFullName}`); 
        await candidateLocator.waitFor({ state: 'visible', timeout: 10000 }); 
        await candidateLocator.click(); 
        await candidatePage.tagCandidateToRole();

        // Navigate to the candidate's profile
        await candidatePage.clickCandidateProfile();
        await candidatePage. navigateToJobOpeningsTab();
        await candidatePage.Activity_navigation();
        await candidatePage.ClickThreeDots();
        await candidatePage.TagToRole_Bttn();
        await candidatePage.fillSubject();
        await candidatePage.navigateToDocumentsTab();
        await candidatePage.upload_bttn();
    });

    test('Upload a file', async ({ page }) => {
        const fileInput = await page.locator('input[type="file"]');
        await fileInput.setInputFiles("C:\\Users\\Bug_Hunter13\\Downloads\\image (80).png");
    });
    

    
    // test.afterAll(async () => {
    //     await context.close();
    // });
});

