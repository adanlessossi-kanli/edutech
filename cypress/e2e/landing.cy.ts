import { LandingPage } from '../support/page-objects';

describe('Landing Page', () => {
  const landingPage = new LandingPage();

  beforeEach(() => {
    landingPage.visit();
  });

  it('should display hero section', () => {
    landingPage.getHeroTitle().should('be.visible');
    landingPage.getCtaButton().should('be.visible');
  });

  it('should show 6 benefits', () => {
    landingPage.getBenefits().should('have.length', 6);
  });

  it('should navigate to instructors', () => {
    landingPage.clickBenefit('Expert Instructors');
    cy.contains('Meet Our Expert Instructors').should('be.visible');
  });
});
