import { Locator, Page } from "@playwright/test";

export class loginPage {
    readonly page: Page;
    readonly email: Locator;
    readonly password: Locator;
    readonly loginbttn: Locator;
    readonly WelcomePage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.email = page.getByPlaceholder('User Name');
        this.password = page.getByPlaceholder('Password', { exact: true });
        this.loginbttn = page.getByRole('button', { name: 'Login' });
        this.WelcomePage = page.getByRole('heading', { name: 'Welcome!' });
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
}
