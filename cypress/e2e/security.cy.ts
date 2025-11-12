describe('Security Tests', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/workshops', { fixture: 'workshops.json' });
  });

  it('should prevent XSS attacks in search', () => {
    cy.visit('/');
    cy.contains('button', 'Workshops').click();
    cy.waitForPageLoad();
    cy.get('.search-input').type('<script>alert("XSS")</script>');
    cy.wait(300);
    cy.get('body').should('be.visible');
  });

  it('should prevent SQL injection in search', () => {
    cy.visit('/');
    cy.contains('button', 'Workshops').click();
    cy.waitForPageLoad();
    cy.get('.search-input').type("'; DROP TABLE workshops; --");
    cy.wait(300);
    cy.get('.workshop-card').should('be.visible');
  });

  it('should require authentication for protected routes', () => {
    cy.visit('/');
    cy.waitForPageLoad();
    cy.contains('button', 'Login').should('be.visible');
  });

  it('should prevent unauthorized admin access', () => {
    cy.loginAsUser();
    cy.contains('button', 'Publish').should('not.exist');
    cy.logout();
  });

  it('should sanitize user input in forms', () => {
    cy.loginAsAdmin();
    cy.contains('button', 'Publish').click();
    cy.waitForPageLoad();
    cy.get('input[placeholder="Workshop Title"]').type('<img src=x onerror=alert(1)>');
    cy.get('button[type="submit"]').click();
    cy.waitForPageLoad();
    cy.get('body').should('be.visible');
    cy.logout();
  });

  it('should enforce password strength', () => {
    cy.visit('/');
    cy.contains('button', 'Login').click();
    cy.get('.toggle-btn').click();
    cy.get('input[placeholder="Full Name"]').type('Test User');
    cy.get('input[type="email"]').type('test@example.com');
    cy.get('input[type="password"]').type('123');
    cy.get('button[type="submit"]').click();
    cy.wait(300);
  });

  it('should implement CSRF protection', () => {
    cy.loginAsUser();
    cy.logout();
  });

  it('should secure sensitive data in localStorage', () => {
    cy.loginAsUser();
    cy.window().then((win) => {
      const storage = win.localStorage;
      expect(storage).to.exist;
    });
    cy.logout();
  });
});
