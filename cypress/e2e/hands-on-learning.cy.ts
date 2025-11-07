describe('Hands-On Learning Page', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('.benefit').contains('Hands-On Learning').click();
  });

  it('should display page header', () => {
    cy.contains('Learn By Building Real Projects').should('be.visible');
  });

  it('should display 6 project cards', () => {
    cy.get('.project-card').should('have.length', 6);
  });

  it('should display features section', () => {
    cy.get('.feature').should('have.length', 3);
  });

  it('should display tech tags', () => {
    cy.get('.tech-tag').should('have.length.greaterThan', 0);
  });

  it('should display project icons', () => {
    cy.get('.project-icon').should('have.length', 6);
  });
});
