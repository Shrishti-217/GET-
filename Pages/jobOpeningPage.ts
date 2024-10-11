import { Locator, Page, expect } from "@playwright/test";

export class JobOpeningPage {
    readonly page: Page;
    readonly job_openings_menu: Locator;
    readonly first_job_atPage: Locator;
    readonly tag_candidate_button: Locator;

    constructor(page: Page) {
        this.page = page;
        this.job_openings_menu = page.locator('a[href="/job-openings"]'); 
        this.first_job_atPage = page.locator('//a[@app-permissions-required="job-openings-details"]').first()
        this.tag_candidate_button = page.getByRole('button', { name: 'Tag Candidate' })
        
    }

    
    async navigateToJobOpenings() {
        await expect(this.job_openings_menu).toBeVisible(); 
        await this.job_openings_menu.click();
        await this.page.waitForLoadState('load');
    }

    
    async selectFirstJob() {
        await this.page.waitForSelector('//a[@app-permissions-required="job-openings-details"]', { state: 'visible' });
        const abc =  await this.page.locator('//a[@app-permissions-required="job-openings-details"]');
        console.log(">>>>>11"+abc)
        await this.first_job_atPage.click();
        await this.page.waitForLoadState('load');
    }

    
    async tagCandidate() {
        await this.tag_candidate_button.click();
    }
}
