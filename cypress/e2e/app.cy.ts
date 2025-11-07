describe('Edutech App', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the app title', () => {
    cy.contains('EduTech Pro').should('be.visible');
  });

  it('should display navigation bar', () => {
    cy.get('.nav-menu').should('be.visible');
    cy.get('.nav-btn').should('have.length.greaterThan', 0);
  });

  it('should show landing page by default', () => {
    cy.contains('Transform Your Tech Career').should('be.visible');
  });

  it('should navigate to workshops', () => {
    cy.get('.nav-btn').contains('Workshops').click();
    cy.get('.workshop-list-container').should('be.visible');
  });

  it('should navigate to login page', () => {
    cy.get('.nav-btn').contains('Login').click();
    cy.get('.auth-container').should('be.visible');
  });

  it('should navigate to instructors', () => {
    cy.get('.benefit').contains('Expert Instructors').click();
    cy.contains('Meet Our Expert Instructors').should('be.visible');
  });

  it('should navigate to certificates', () => {
    cy.get('.benefit').contains('Certificates').click();
    cy.contains('Earn Industry-Recognized Certificates').should('be.visible');
  });

  it('should be responsive', () => {
    cy.viewport('iphone-6');
    cy.get('.nav-menu').should('be.visible');
  });
});