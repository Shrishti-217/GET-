import { chromium, Page } from 'playwright';


export async function log_in_and_navigate(page: Page) {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const Page = await context.newPage();

  // Perform login and navigation as per the earlier script
  await page.goto('https://new-qa2-deployer.getglobalgroup.com/login');
  await page.fill('input[placeholder="User Name"]', '124_employee@mailinator.com');
  await page.fill('input[placeholder="Password"]', 'Pass@1234');
  await page.click('button[type="submit"]');

  await page.waitForURL('https://new-qa2-deployer.getglobalgroup.com/apps');
  await page.click('.get-head-menu'); 
  await page.waitForTimeout(5000);

  await browser.close();
}
