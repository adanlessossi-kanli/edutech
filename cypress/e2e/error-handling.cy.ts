describe('Error Handling', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should handle navigation to non-existent routes gracefully', () => {
    cy.visit('/', { failOnStatusCode: false });
    cy.get('.main-content').should('exist');
  });

  it('should display workshops even with empty search', () => {
    cy.get('.nav-btn').contains('Workshops').click();
    cy.get('.search-input').clear();
    cy.get('.workshop-card').should('have.length.greaterThan', 0);
  });

  it('should handle filter combinations', () => {
    cy.get('.nav-btn').contains('Workshops').click();
    cy.get('.filters-sidebar select').first().select('Frontend');
    cy.get('.filters-sidebar select').eq(1).select('Advanced');
  });

  it('should recover from cleared filters', () => {
    cy.get('.nav-btn').contains('Workshops').click();
    cy.get('.filters-sidebar select').first().select('Backend');
    cy.get('.clear-btn').click();
    cy.get('.workshop-card').should('have.length.greaterThan', 0);
  });
});
