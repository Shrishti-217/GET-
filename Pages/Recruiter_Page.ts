import { Locator, Page } from "@playwright/test";

export class Recruiter_Page {
    private page: Page;
    private add_candidate: Locator;

    constructor(page: Page) {
        this.page = page;
        this.add_candidate = page.getByRole('link', { name: 'Add Candidate' });
        
    }

   
    async Add_can() {
        await this.page.waitForTimeout(5000); 
        await this.add_candidate.waitFor(); 
        await this.add_candidate.click();
    }

    
}
