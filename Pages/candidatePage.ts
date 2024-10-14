import { Page, Locator, expect } from "@playwright/test"; // Import Locator
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
    readonly menu_button: Locator;
    readonly edit_button: Locator;
    readonly category_field: Locator;
    readonly resume: Locator;
    readonly update_button: Locator;
    readonly submit_button: Locator;
    readonly menu_button2: Locator;
    readonly Complete_act: Locator;
    readonly Complete_act_sub: Locator;
    readonly Complete_act_communicationChannel: Locator;
    readonly chat_option: Locator;
    readonly validate_and_complete: Locator;
    readonly iframe: Locator;
    readonly iframe_input: Locator;
    readonly validate_and_complete_bttn: Locator;


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
        this.upload_button = page.getByRole('button', { name: 'Upload' });
        this.menu_button = page.getByRole('button', { name: 'more' });
        this.edit_button = page.getByRole('menuitem', { name: 'Edit' });
        this.category_field = page.getByLabel('Select Category').locator('span');
        this.resume = page.locator('mat-option:has-text("Resume")');
        this.update_button = page.getByLabel('SAVE');
        this.submit_button = page.getByRole('button', { name: 'Tag to Role' });
        this.menu_button2 = page.locator("//mat-card-title[contains(@class,'matCardTitle')]/div[2]/button");
        this.Complete_act = page.locator('button:has-text("Complete")');
        this.Complete_act_sub = page.locator('[formcontrolname="subject"]');
        this.Complete_act_communicationChannel = page.getByLabel('Communication Channel').locator('div').first();
        this.chat_option = page.getByRole('option', { name: 'Chat' });
        this.validate_and_complete = page.locator('button:has-text("VALIDATE & COMPLETE")');
        this.iframe = page.locator('iframe[title]').contentFrame().locator('#tinymce');
        this.iframe_input = page.locator('iframe[title]').contentFrame().locator('#tinymce');
        this.validate_and_complete_bttn = page.locator('button:has-text("VALIDATE & COMPLETE")');
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
        await this.page.locator('span.mdc-tab__text-label:has-text("Documents")').click(); 
    }

    async upload_bttn(){
        // await this.upload_button.click()
        // page.getByRole('button', { name: 'Upload' })
        // await this.page.locator('input[type="file"]').setInputFiles('C:\\Users\\Bug_Hunter13\\Downloads\\image (80).png');
        const fileChooserPromise = this.page.waitForEvent('filechooser');
  await this.page.getByRole('button', { name: 'Upload' }).click()

const fileChooser = await fileChooserPromise;
console.log(path.join(__dirname, '../fixtures/image.png'))
await fileChooser.setFiles(path.join(__dirname, '../fixtures/image.png'));
    }

    async menu_bttn(){
        await this.menu_button.click()
    }

    async edit_bttn(){
        await this.edit_button.click() 
    }


    async select_category(){
        await this.category_field.click()
    }

    async resume_option(){
        await this.page.waitForTimeout(3000);0
        await this.resume.click() 
    }

    async update_bttn(){
        await this.update_button.click() 
    }

    async submit_btn(){
        await this.submit_button.click()
    }


    async Menu_btn2(){
        await expect(this.menu_button2).toBeVisible();
        await this.menu_button2.click()
    }


    async complete_activity() {
        const completeButton = this.Complete_act;
        await completeButton.waitFor({ state: 'visible', timeout: 5000 }); // Wait until visible
        await completeButton.click(); 
    }
    


    async Complete_act_subject(){
        await this.Complete_act_sub.fill("Test")
    }
    

    async Complete_act_commchannel(){
        this.page.waitForTimeout(3000)
        await this.Complete_act_communicationChannel.click()
    }
    

    async chat_optn(){
        await this.chat_option.click()
    }


    async Validate_and_complete_bttn(){
        await this.validate_and_complete.click()
    }


    async fill_notes(){
        await this.iframe.click();
        await this.iframe_input.fill("Test123  ")
    }


    async validate_and_complete_button(){
        await this.validate_and_complete_bttn.click()
    }

}


