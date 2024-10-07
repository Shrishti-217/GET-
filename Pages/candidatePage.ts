import { Page, Locator } from "@playwright/test"; // Import Locator
import * as path from 'path';

export class CandidatePage {
    readonly page: Page;
    readonly tag_candidate_button: Locator;
    readonly search_candidate_field: Locator;
    readonly search_icon: Locator;
    readonly tag_to_role_button: Locator;
    readonly profile_link: Locator;
    readonly job_openings_tab: Locator;
    readonly act_nav_tab: Locator;
    readonly three_dots: Locator;
    readonly tagToRole_bttn: Locator;
    readonly sub_field: Locator;
    readonly upload_button: Locator;

    constructor(page: Page) {
        this.page = page;
        this.tag_candidate_button = page.getByRole('button', { name: 'Tag Candidate' });
        this.search_candidate_field = page.locator("#mat-input-0");
        this.search_icon = page.locator('mat-icon[data-mat-icon-type="font"]:has-text("search")');
        this.tag_to_role_button = page.locator("//span[text() ='TAG TO ROLE']");
        this.profile_link = page.locator('mat-card').filter({ hasText: '' }).getByRole('link');
        this.job_openings_tab = page.locator('span.mdc-tab__text-label:has-text("Job Openings")').locator('..');
        this.act_nav_tab = page.getByTitle('Recruiter Review').locator('i');
        this.three_dots = page.locator("//mat-card-title[contains(@class,'matCardTitle')]/div[2]/button");
        this.tagToRole_bttn = page.locator('button:has-text("Tag to Role")');
        this.sub_field = page.locator('textarea[formcontrolname="subject"]');
        this.upload_button = page.getByRole('button', { name: 'Upload' })
    }

    
    async clickTagCandidate() {
        await this.tag_candidate_button.click();
        await this.page.waitForLoadState('networkidle');
    }

    
    async searchCandidate(name: string) {
        await this.search_candidate_field.fill(name);
        await this.search_icon.click();
    }

    
    async tagCandidateToRole() {
        await this.tag_to_role_button.click();
    }

    
    async clickCandidateProfile() {
        await this.profile_link.click();
    }

    
    async navigateToJobOpeningsTab() {
        await this.job_openings_tab.click();
    }

    
    async Activity_navigation() {
        await this.act_nav_tab.click();
    }

    
    async ClickThreeDots() {
        await this.three_dots.click();
    }

   
    async TagToRole_Bttn() {
        await this.tagToRole_bttn.click();
    }

    
    async fillSubject() {
        await this.sub_field.fill("Test");
    }

    
    async navigateToDocumentsTab() {
        await this.page.locator('span.mdc-tab__text-label:has-text("Documents")').click(); // Replace with the correct selector for Documents tab
    }

    async upload_bttn(){
        await this.upload_button.click()
    }


    
}

