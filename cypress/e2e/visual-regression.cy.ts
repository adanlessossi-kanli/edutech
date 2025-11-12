describe('Visual Regression Testing', () => {
  it('should match landing page snapshot', () => {
    cy.visit('/');
    cy.get('body').should('be.visible');
    cy.screenshot('landing-page');
  });

  it('should match workshops page snapshot', () => {
    cy.visit('/');
    cy.contains('button', 'Workshops').click();
    cy.get('.workshop-list-container').should('be.visible');
    cy.screenshot('workshops-page');
  });

  it('should match login page snapshot', () => {
    cy.visit('/');
    cy.contains('button', 'Login').click();
    cy.get('.auth-form').should('be.visible');
    cy.screenshot('login-page');
  });

  it('should match dashboard snapshot', () => {
    cy.loginAsUser();
    cy.contains('button', 'Dashboard').click();
    cy.get('.dashboard-container').should('be.visible');
    cy.screenshot('dashboard-page');
    cy.logout();
  });

  it('should match admin page snapshot', () => {
    cy.loginAsAdmin();
    cy.contains('button', 'Publish').click();
    cy.get('.form-container').should('be.visible');
    cy.screenshot('admin-page');
    cy.logout();
  });

  it('should verify button hover states', () => {
    cy.visit('/');
    cy.get('button').first().trigger('mouseover');
    cy.screenshot('button-hover');
  });

  it('should verify mobile layout', () => {
    cy.viewport('iphone-6');
    cy.visit('/');
    cy.screenshot('mobile-landing');
  });

  it('should verify tablet layout', () => {
    cy.viewport('ipad-2');
    cy.visit('/');
    cy.screenshot('tablet-landing');
  });
});
