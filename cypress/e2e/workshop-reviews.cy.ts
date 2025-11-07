describe('Workshop Reviews', () => {
  beforeEach(() => {
    cy.loginAsUser();
    cy.get('.nav-btn').contains('Workshops').click();
  });

  it('should have reviews toggle button', () => {
    cy.get('.reviews-btn').should('have.length.greaterThan', 0);
  });

  it('should toggle reviews button text', () => {
    cy.get('.reviews-btn').first().should('contain', 'Show Reviews');
    cy.get('.reviews-btn').first().click();
    cy.get('.reviews-btn').first().should('contain', 'Hide Reviews');
  });
});
