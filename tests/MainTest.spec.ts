import { expect, test, BrowserContext, Page } from '@playwright/test';
import { loginPage } from '../Pages/loginPage';
import { Recruiter } from '../Pages/Recruiter_navigation';
import { Recruiter_Page } from '../Pages/Recruiter_Page';
import { JobOpeningPage } from '../Pages/jobOpeningPage';
import { CandidatePage } from '../Pages/candidatePage';
import path from 'path';

let candidateFullName: string; 

test.describe.serial('Recruiter Portal Test', () => {
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

        // Navigate to login page and perform login actions
        await login.navigateToLoginPage();
        await login.enterEmail();
        await login.enterPassword();
        await login.clickLoginButton();

        // Ensure the user is logged in by checking visibility of the Welcome page
        await expect(login.WelcomePage).toBeVisible();
    });

    test('should login and navigate to recruiter dashboard', async () => {
        // Confirm that the user is on the apps page
        await expect(page).toHaveURL('https://new-stage2-deployer.getglobalgroup.com/apps');

        // Navigate to recruiter dashboard
        await recruiter.navigate_recruiter();

        // Wait for the new page and ensure it's the recruiter's dashboard
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

        // Click on "Create" button and confirm candidate creation
        const createButton = await recruiterTab.getByRole('button', { name: 'Create' });
        await expect(createButton).toBeVisible();
        await createButton.click();
        await expect(recruiterTab.locator('text=consultant created successfully')).toBeVisible({ timeout: 5000 });
        recruiterTab.waitForTimeout(3000);

        // Save the candidate's full name for later use
        candidateFullName = `${randomFirstName} ${randomLastName}`;
    });

    test('should tag candidate to the first job role on the 1st page and navigate to profile', async () => {
        const [recruiterTab] = await context.pages().slice(-1);

        jobOpeningPage = new JobOpeningPage(recruiterTab);
        await jobOpeningPage.navigateToJobOpenings(); 
        await recruiterTab.waitForLoadState('load');
        await jobOpeningPage.selectFirstJob();

        // Click on "Tag Candidate"
        candidatePage = new CandidatePage(recruiterTab);
        await recruiterTab.waitForLoadState('load');
        await candidatePage.clickTagCandidate();

        // Search for the newly created candidate
        await candidatePage.searchCandidate(candidateFullName); 

        // Wait for search results and tag the candidate
        const candidateLocator = recruiterTab.locator(`text=${candidateFullName}`); 
        await candidateLocator.waitFor({ state: 'visible', timeout: 10000 });
        await candidateLocator.click();
        await candidatePage.tagCandidateToRole();

        // Navigate to the candidate's profile and complete various actions
        await candidatePage.clickCandidateProfile();
        await candidatePage.navigateToJobOpeningsTab();
        await candidatePage.Activity_navigation();
        await candidatePage.ClickThreeDots();
        await candidatePage.TagToRole_Bttn();
        await candidatePage.fillSubject();
        await candidatePage.navigateToDocumentsTab();
        await candidatePage.upload_bttn();
        await candidatePage.menu_bttn();
        await candidatePage.edit_bttn();
        await candidatePage.select_category();
        await candidatePage.resume_option();
        await candidatePage.update_bttn();
        await candidatePage.submit_btn();
        await candidatePage.Menu_btn2();
        await candidatePage.complete_activity();
        await candidatePage.Complete_act_subject();
        await candidatePage.Complete_act_commchannel();
        await candidatePage.chat_optn();
        await recruiterTab.waitForLoadState('load');
        await candidatePage.fill_notes();
        await candidatePage.validate_and_complete_button();
    });


    // test('For 2nd activity for Recruiter on the same page', async () => {
    //     // Ensure all actions are done on the current page
    //     await recruiter.Nav_menu();
    //     await login.Logout_bttn();
    //     await expect(page).toHaveURL('https://new-stage2-deployer.getglobalgroup.com/login');
    // });

    test('For 2nd Recruiter activity', async () => {
        // Get the current active page 
        const pages = context.pages();
        const recruiterTab = pages[pages.length - 1]; 

        await recruiter.Nav_menu();
        await login.Logout_bttn();
        await expect(recruiterTab).toHaveURL('https://new-stage2-deployer.getglobalgroup.com/login');

        await login.navigateToLoginPage();
        await login.email.fill('107_employee@mailinator.com');
        await login.password.fill('Pass@12345');
        await login.clickLoginButton();

        await expect(login.WelcomePage).toBeVisible();
    });

});
