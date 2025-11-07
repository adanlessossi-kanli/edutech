describe('Flexible Schedule Page', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('.benefit').contains('Flexible Schedule').click();
  });

  it('should display page header', () => {
    cy.contains('Learn On Your Schedule').should('be.visible');
  });

  it('should display 6 feature cards', () => {
    cy.get('.feature-card').should('have.length', 6);
  });

  it('should display learning formats', () => {
    cy.get('.format').should('have.length', 4);
  });

  it('should display format titles', () => {
    cy.contains('Video Lessons').should('be.visible');
    cy.contains('Mobile Learning').should('be.visible');
  });
});
