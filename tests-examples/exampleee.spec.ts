import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://new-qa2-deployer.getglobalgroup.com/login');
  await page.getByPlaceholder('User Name').click();
  await page.getByPlaceholder('User Name').fill('124_employee@mailinator.com');
  await page.getByPlaceholder('Password', { exact: true }).click();
  await page.getByPlaceholder('Password', { exact: true }).fill('Pass@1234');
  await page.getByPlaceholder('Password', { exact: true }).press('Enter');
  await page.getByRole('button').click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: ' Recruiter' }).click();
  const page1 = await page1Promise;
  await page1.goto('https://new-qa2-recruiter.getglobalgroup.com/');
  await page1.goto('https://new-qa2-recruiter.getglobalgroup.com/dashboard')
  await page1.getByRole('link', { name: 'Add Candidate' }).click();
  await page1.getByLabel('First Name').click();
  await page1.getByLabel('First Name').fill('tester');
  await page1.locator('#mat-mdc-form-field-label-122 span').click();
  await page1.locator('div').filter({ hasText: /^Last Name$/ }).nth(2).click();
  await page1.getByLabel('Last Name').fill('user');
  await page1.getByLabel('Email Address', { exact: true }).click();
  await page1.getByLabel('Email Address', { exact: true }).fill('testuser04@gmail.com');
  await page1.locator('#mat-input-51').click();
  await page1.locator('#mat-input-51').fill('6765754566');
  await page1.getByRole('button', { name: 'Create' }).click();
  await page1.getByRole('link', { name: 'Job Openings' }).click();
  await page1.locator('mat-card').filter({ hasText: 'info Mud Logger-L2' }).first().click();
  await page1.getByRole('link', { name: 'Mud Logger-L2' }).first().click();
  await page1.getByRole('button', { name: 'Tag Candidate' }).click();
  await page1.locator('div:nth-child(2) > div > .more').first().click();
});