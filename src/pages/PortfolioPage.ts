import { expect, type Locator, type Page } from '@playwright/test';

export class PortfolioPage {
  readonly page: Page;
  readonly heroHeading: Locator;
  readonly workSection: Locator;
  readonly aboutSection: Locator;
  readonly contactSection: Locator;
  readonly languageToggle: Locator;
  readonly contactForm: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heroHeading = page.getByRole('heading', { level: 1 });
    this.workSection = page.locator('#work');
    this.aboutSection = page.locator('#about');
    this.contactSection = page.locator('#contact');
    this.languageToggle = page.locator('#langToggle');
    this.contactForm = page.locator('#contactForm');
  }

  async open(): Promise<void> {
    await this.page.goto('/');
    await expect(this.heroHeading).toBeVisible();
  }

  async navigateTo(section: 'work' | 'about' | 'contact'): Promise<void> {
    await this.page.locator(`nav a[href="#${section}"]`).click();
    await expect(this.page.locator(`#${section}`)).toBeInViewport();
  }

  async switchToSpanish(): Promise<void> {
    await this.languageToggle.click();
    await expect(this.languageToggle).toHaveAttribute('aria-label', 'View in English');
  }
}

