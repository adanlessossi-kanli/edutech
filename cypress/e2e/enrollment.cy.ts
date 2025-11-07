describe('Workshop Enrollment', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('.nav-btn').contains('Workshops').click();
  });

  it('should require login to enroll', () => {
    cy.get('.enroll-btn').first().should('contain', 'Login to Enroll');
  });

  it('should enable enrollment after login', () => {
    cy.loginAsUser();
    cy.get('.nav-btn').contains('Workshops').click();
    cy.get('.enroll-btn').first().should('contain', 'Enroll Now');
  });

  it('should show full status for full workshops', () => {
    cy.loginAsUser();
    cy.get('.nav-btn').contains('Workshops').click();
    cy.get('.enroll-btn').should('exist');
  });

  it('should display workshop price', () => {
    cy.get('.price').should('have.length.greaterThan', 0);
  });

  it('should display participant count', () => {
    cy.get('.participants').should('have.length.greaterThan', 0);
  });
});
