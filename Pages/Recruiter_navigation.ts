import { Locator, Page } from "@playwright/test";

export class Recruiter {
    readonly page: Page;
    readonly navigate_toRecruiter: Locator;
    readonly recruiter_option: Locator;

    //For 2nd activity of Recruiter:
    readonly menuForNavigation: Locator;




    constructor(page: Page) {
        this.page = page;
        this.navigate_toRecruiter = page.locator('.get-head-menu');
        this.recruiter_option = page.locator('[href="https://new-stage2-recruiter.getglobalgroup.com/"]');

        //For 2nd activity of Recruiter:
        this.menuForNavigation = page.locator("//button[contains(@class, 'dropbtn') and contains(@style, 'imgpsh_fullsize_anim.png')]");

    }

    
    async navigate_ToApp() {
        await this.page.goto("https://new-stage2-deployer.getglobalgroup.com/apps");
        await this.page.waitForLoadState('networkidle');
    }

    
    async navigate_recruiter() {
        await this.page.waitForTimeout(500); // Short wait for stability
        await this.navigate_toRecruiter.click();
        await this.page.waitForLoadState('networkidle');
    }

    
    async recruiter_optn() {
        await this.recruiter_option.click();
    }


    //For 2nd activity of Recruiter:

    async Nav_menu(){
        await this.menuForNavigation.click();
    }

}
