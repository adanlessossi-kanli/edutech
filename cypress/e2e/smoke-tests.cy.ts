describe('Smoke Tests - Critical Paths', () => {
  it('should load application', () => {
    cy.visit('/');
    cy.get('body').should('be.visible');
  });

  it('should display main navigation', () => {
    cy.visit('/');
    cy.get('.nav-menu').should('be.visible');
    cy.get('button').should('have.length.greaterThan', 2);
  });

  it('should allow user login', () => {
    cy.loginAsUser();
    cy.get('.user-info').should('be.visible');
    cy.logout();
  });

  it('should display workshops', () => {
    cy.visit('/');
    cy.contains('button', 'Workshops').click();
    cy.get('.workshop-card').should('exist');
  });

  it('should allow workshop search', () => {
    cy.visit('/');
    cy.contains('button', 'Workshops').click();
    cy.get('.search-input').type('React');
    cy.get('.workshop-card').should('be.visible');
  });

  it('should allow admin to create workshop', () => {
    cy.loginAsAdmin();
    cy.contains('button', 'Publish').click();
    cy.get('.form-container').should('be.visible');
    cy.logout();
  });

  it('should handle navigation between pages', () => {
    cy.visit('/');
    cy.contains('button', 'Workshops').click();
    cy.get('.workshop-list-container').should('be.visible');
    cy.contains('button', 'Home').click();
    cy.contains('Transform Your Tech Career').should('be.visible');
  });
});
