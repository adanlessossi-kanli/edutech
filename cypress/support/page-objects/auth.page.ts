export class AuthPage {
  visit() {
    cy.visit('/');
    cy.contains('button', 'Login').click();
  }

  fillEmail(email: string) {
    cy.get('input[type="email"]').type(email);
  }

  fillPassword(password: string) {
    cy.get('input[type="password"]').type(password);
  }

  fillName(name: string) {
    cy.get('input[placeholder="Full Name"]').type(name);
  }

  submit() {
    cy.get('button[type="submit"]').click();
  }

  toggleMode() {
    cy.get('.toggle-btn').click();
  }

  login(email: string, password: string) {
    this.fillEmail(email);
    this.fillPassword(password);
    this.submit();
  }
}
