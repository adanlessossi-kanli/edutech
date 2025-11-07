export class LandingPage {
  visit() {
    cy.visit('/');
  }

  getHeroTitle() {
    return cy.contains('Transform Your Tech Career');
  }

  getCtaButton() {
    return cy.get('.cta-btn');
  }

  getBenefits() {
    return cy.get('.benefit');
  }

  clickBenefit(name: string) {
    cy.get('.benefit').contains(name).click();
  }
}
