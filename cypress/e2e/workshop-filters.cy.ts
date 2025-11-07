describe('Workshop Filters', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('.nav-btn').contains('Workshops').click();
  });

  it('should display filters sidebar', () => {
    cy.get('.filters-sidebar').should('be.visible');
  });

  it('should filter by category', () => {
    cy.get('select').first().select('Frontend');
    cy.get('.workshop-card').should('have.length.greaterThan', 0);
  });

  it('should filter by level', () => {
    cy.get('select').eq(1).select('Beginner');
    cy.get('.workshop-card').should('have.length.greaterThan', 0);
  });

  it('should filter by price range', () => {
    cy.get('input[placeholder="Min"]').type('50');
    cy.get('input[placeholder="Max"]').type('150');
  });

  it('should clear all filters', () => {
    cy.get('.filters-sidebar select').first().select('Frontend');
    cy.get('.clear-btn').click();
    cy.get('.filters-sidebar select').first().should('have.value', '');
  });
});
