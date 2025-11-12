import { WorkshopsPage } from '../support/page-objects';

describe('Workshops', () => {
  const workshopsPage = new WorkshopsPage();

  beforeEach(() => {
    cy.intercept('GET', '**/api/workshops', { fixture: 'workshops.json' });
    workshopsPage.visit();
    cy.waitForPageLoad();
  });

  it('should display workshop list', () => {
    cy.get('.workshop-list-container').should('be.visible');
    cy.get('.workshop-card').should('be.visible');
  });

  it('should display search bar', () => {
    cy.get('.search-input').should('be.visible');
  });

  it('should search workshops', () => {
    workshopsPage.searchWorkshop('React');
    cy.wait(300);
    workshopsPage.getWorkshopCards().should('be.visible');
  });

  it('should filter by category', () => {
    workshopsPage.filterByCategory('Frontend');
    cy.wait(300);
    workshopsPage.getWorkshopCards().should('be.visible');
  });

  it('should filter by level', () => {
    workshopsPage.filterByLevel('Beginner');
    cy.wait(300);
    workshopsPage.getWorkshopCards().should('be.visible');
  });

  it('should display workshop details', () => {
    cy.get('.workshop-card').first().within(() => {
      cy.get('h3').should('be.visible');
      cy.get('.instructor').should('be.visible');
      cy.get('.price').should('be.visible');
    });
  });

  it('should show filters sidebar', () => {
    cy.get('.filters-sidebar').should('be.visible');
  });

  it('should display enroll button', () => {
    cy.get('.enroll-btn').should('be.visible');
  });
});