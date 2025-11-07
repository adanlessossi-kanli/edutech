describe('Community Page', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('.benefit').contains('Community').click();
  });

  it('should display page header', () => {
    cy.contains('Join Our Global Community').should('be.visible');
  });

  it('should display 6 feature cards', () => {
    cy.get('.feature-card').should('have.length', 6);
  });

  it('should display stats section', () => {
    cy.get('.stat').should('have.length', 3);
    cy.contains('50K+').should('be.visible');
    cy.contains('150+').should('be.visible');
    cy.contains('24/7').should('be.visible');
  });

  it('should display feature icons', () => {
    cy.get('.icon').should('have.length', 6);
  });
});
