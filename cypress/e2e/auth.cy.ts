import { AuthPage } from '../support/page-objects';

describe('Authentication', () => {
  const authPage = new AuthPage();

  beforeEach(() => {
    authPage.visit();
  });

  it('should display login form', () => {
    cy.get('.auth-form').should('be.visible');
    cy.contains('Login').should('be.visible');
  });

  it('should toggle to register mode', () => {
    authPage.toggleMode();
    cy.contains('Register').should('be.visible');
  });

  it('should login successfully', () => {
    authPage.login('user@example.com', 'password');
    cy.get('.user-info').should('be.visible');
  });

  it('should show dashboard after login', () => {
    authPage.login('user@example.com', 'password');
    cy.get('.nav-btn').contains('Dashboard').click();
    cy.get('.dashboard-container').should('be.visible');
  });

  it('should logout successfully', () => {
    cy.loginAsUser();
    cy.logout();
    cy.get('.nav-btn').contains('Login').should('be.visible');
  });

  it('should show admin hint', () => {
    cy.get('.admin-hint').should('be.visible');
  });
});