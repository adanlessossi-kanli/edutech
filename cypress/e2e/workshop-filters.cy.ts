describe('Workshop Filters', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/workshops', { fixture: 'workshops.json' });
    cy.visit('/');
    cy.contains('button', 'Workshops').click();
    cy.waitForPageLoad();
  });

  it('should display filters sidebar', () => {
    cy.get('.filters-sidebar').should('be.visible');
  });

  it('should filter by category', () => {
    cy.get('.filters-sidebar select').first().select('Frontend');
    cy.wait(300);
    cy.get('.workshop-card').should('be.visible');
  });

  it('should filter by level', () => {
    cy.get('.filters-sidebar select').eq(1).select('Beginner');
    cy.wait(300);
    cy.get('.workshop-card').should('be.visible');
  });

  it('should filter by price range', () => {
    cy.get('input[placeholder="Min"]').type('50');
    cy.get('input[placeholder="Max"]').type('150');
    cy.wait(300);
  });

  it('should clear all filters', () => {
    cy.get('.filters-sidebar select').first().select('Frontend');
    cy.wait(300);
    cy.get('.clear-btn').click();
    cy.wait(300);
    cy.get('.filters-sidebar select').first().should('be.visible');
  });
});
