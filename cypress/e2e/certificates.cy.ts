describe('Certificates Page', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('.benefit').contains('Certificates').click();
  });

  it('should display page header', () => {
    cy.contains('Earn Industry-Recognized Certificates').should('be.visible');
  });

  it('should display 6 certificate cards', () => {
    cy.get('.certificate-card').should('have.length', 6);
  });

  it('should display benefits section', () => {
    cy.get('.benefit').should('have.length', 3);
  });

  it('should display skill badges', () => {
    cy.get('.skill-badge').should('have.length.greaterThan', 0);
  });

  it('should display certificate icons', () => {
    cy.get('.cert-icon').should('have.length', 6);
  });
});
