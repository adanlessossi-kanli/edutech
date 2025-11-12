describe('Progress Tracker', () => {
  beforeEach(() => {
    cy.loginAsUser();
    cy.contains('button', 'Dashboard').click();
  });

  it('should display progress container', () => {
    cy.get('.progress-container').should('be.visible');
  });

  it('should display progress items', () => {
    cy.get('.progress-item').should('have.length.greaterThan', 0);
  });

  it('should display progress bars', () => {
    cy.get('.progress-bar').should('have.length.greaterThan', 0);
  });

  it('should display completion percentage', () => {
    cy.get('.progress-percentage').should('have.length.greaterThan', 0);
  });

  it('should show certificate badge for completed', () => {
    cy.get('.certificate-badge').should('exist');
  });
});
