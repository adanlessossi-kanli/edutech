declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>;
      loginAsAdmin(): Chainable<void>;
      loginAsUser(): Chainable<void>;
      logout(): Chainable<void>;
      register(name: string, email: string, password: string): Chainable<void>;
      enrollInWorkshop(workshopTitle: string): Chainable<void>;
      createWorkshop(workshop: any): Chainable<void>;
      waitForPageLoad(): Chainable<void>;
      checkAccessibility(): Chainable<void>;
    }
  }
}

Cypress.Commands.add('login', (email: string, password: string) => {
  cy.visit('/');
  cy.contains('button', 'Login').click();
  cy.get('input[type="email"]').type(email);
  cy.get('input[type="password"]').type(password);
  cy.get('button[type="submit"]').click();
  cy.waitForPageLoad();
});

Cypress.Commands.add('loginAsAdmin', () => {
  cy.login('admin@example.com', 'password');
});

Cypress.Commands.add('loginAsUser', () => {
  cy.login('user@example.com', 'password');
});

Cypress.Commands.add('logout', () => {
  cy.get('.logout-btn').click();
  cy.waitForPageLoad();
});

Cypress.Commands.add('register', (name: string, email: string, password: string) => {
  cy.visit('/');
  cy.contains('button', 'Login').click();
  cy.get('.toggle-btn').click();
  cy.get('input[placeholder="Full Name"]').type(name);
  cy.get('input[type="email"]').type(email);
  cy.get('input[type="password"]').type(password);
  cy.get('button[type="submit"]').click();
  cy.waitForPageLoad();
});

Cypress.Commands.add('enrollInWorkshop', (workshopTitle: string) => {
  cy.contains('button', 'Workshops').click();
  cy.contains('.workshop-card', workshopTitle).within(() => {
    cy.get('.enroll-btn').click();
  });
});

Cypress.Commands.add('createWorkshop', (workshop: any) => {
  cy.contains('button', 'Publish').click();
  cy.wait(200);
  cy.get('input[placeholder="Workshop Title"]').should('be.visible').type(workshop.title);
  cy.get('textarea[placeholder="Description"]').type(workshop.description);
  cy.get('input[placeholder="Instructor Name"]').type(workshop.instructor);
  cy.get('input[placeholder="Duration (minutes)"]').type(workshop.duration);
  cy.get('input[placeholder="Price ($)"]').type(workshop.price);
  cy.get('.form-select').first().should('be.visible').select(workshop.category);
  cy.get('.form-select').eq(1).select(workshop.level);
  cy.get('input[placeholder="Max Participants"]').type(workshop.maxParticipants);
  cy.get('button[type="submit"]').click();
  cy.wait(500);
});

Cypress.Commands.add('waitForPageLoad', () => {
  cy.wait(1000);
  cy.get('body').should('be.visible');
});

Cypress.Commands.add('checkAccessibility', () => {
  cy.get('body').should('be.visible');
  cy.get('img').each(($img) => {
    cy.wrap($img).should('have.attr', 'alt');
  });
});

export {};
