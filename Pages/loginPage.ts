import { Locator, Page } from "@playwright/test";

export class loginPage {
    readonly page: Page;
    readonly email: Locator;
    readonly password: Locator;
    readonly loginbttn: Locator;
    readonly WelcomePage: Locator;

    //For 2nd Activity of recruiter with ID "devesh sharma" 
    readonly menu_Locator: Locator;
    readonly logout_button: Locator;

    constructor(page: Page) {
        this.page = page;
        this.email = page.getByPlaceholder('User Name');
        this.password = page.getByPlaceholder('Password', { exact: true });
        this.loginbttn = page.getByRole('button', { name: 'Login' });
        this.WelcomePage = page.getByRole('heading', { name: 'Welcome!' });

        //For 2nd Activity of recruiter with ID "devesh sharma" 
        this.menu_Locator = page.locator('.get-head-menu');
        this.logout_button = page.getByText('Logout');
    }

   
    async navigateToLoginPage() {
        await this.page.goto("https://new-stage2-deployer.getglobalgroup.com/login");
        await this.page.waitForLoadState('networkidle');
    }

    
    async enterEmail() {
        await this.email.fill("124_employee@mailinator.com");
    }

   
    async enterPassword() {
        await this.password.fill("Pass@123");
    }

    
    async clickLoginButton() {
        await this.loginbttn.click();
        await this.page.waitForLoadState('networkidle');
    }




    //For 2nd Activity of recruiter with ID "devesh sharma" 

    async Menu_locator(){
        await this.menu_Locator.click();
    }


    async Logout_bttn(){
        await this.logout_button.click();
    }




}
