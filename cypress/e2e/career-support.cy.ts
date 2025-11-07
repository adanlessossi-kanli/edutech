describe('Career Support Page', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('.benefit').contains('Career Support').click();
  });

  it('should display page header', () => {
    cy.contains('Advance Your Tech Career').should('be.visible');
  });

  it('should display 6 service cards', () => {
    cy.get('.service-card').should('have.length', 6);
  });

  it('should display stats section', () => {
    cy.get('.stat').should('have.length', 3);
    cy.contains('85%').should('be.visible');
    cy.contains('$95K').should('be.visible');
    cy.contains('500+').should('be.visible');
  });

  it('should display service icons', () => {
    cy.get('.icon').should('have.length', 6);
  });
});
