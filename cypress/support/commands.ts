declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>;
      loginAsAdmin(): Chainable<void>;
      loginAsUser(): Chainable<void>;
      logout(): Chainable<void>;
    }
  }
}

Cypress.Commands.add('login', (email: string, password: string) => {
  cy.visit('/');
  cy.get('.nav-btn').contains('Login').click();
  cy.get('input[type="email"]').type(email);
  cy.get('input[type="password"]').type(password);
  cy.get('button[type="submit"]').click();
});

Cypress.Commands.add('loginAsAdmin', () => {
  cy.login('admin@example.com', 'password');
});

Cypress.Commands.add('loginAsUser', () => {
  cy.login('user@example.com', 'password');
});

Cypress.Commands.add('logout', () => {
  cy.get('.logout-btn').click();
});

export {};