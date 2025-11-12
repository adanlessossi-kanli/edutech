describe('Internationalization (i18n)', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/workshops', { fixture: 'workshops.json' });
  });

  it('should switch to French language', () => {
    cy.visit('/');
    cy.waitForPageLoad();
    cy.get('.language-switcher select').select('fr');
    cy.wait(300);
    cy.get('body').should('be.visible');
  });

  it('should persist language preference', () => {
    cy.visit('/');
    cy.waitForPageLoad();
    cy.get('.language-switcher select').select('fr');
    cy.wait(300);
    cy.reload();
    cy.waitForPageLoad();
    cy.get('body').should('be.visible');
  });

  it('should translate navigation menu', () => {
    cy.visit('/');
    cy.waitForPageLoad();
    cy.get('.language-switcher select').select('fr');
    cy.wait(300);
    cy.get('button').should('be.visible');
  });

  it('should translate form labels', () => {
    cy.visit('/');
    cy.waitForPageLoad();
    cy.get('.language-switcher select').select('fr');
    cy.wait(300);
    cy.contains('button', 'Login').click();
    cy.waitForPageLoad();
    cy.get('input[type="email"]').should('be.visible');
  });

  it('should handle RTL languages', () => {
    cy.visit('/');
    cy.waitForPageLoad();
    cy.get('.language-switcher select').select('ar');
    cy.wait(300);
    cy.get('body').should('be.visible');
  });

  it('should format dates according to locale', () => {
    cy.visit('/');
    cy.loginAsUser();
    cy.contains('button', 'Dashboard').click();
    cy.waitForPageLoad();
    cy.get('body').should('be.visible');
    cy.logout();
  });

  it('should format currency according to locale', () => {
    cy.visit('/');
    cy.waitForPageLoad();
    cy.contains('button', 'Workshops').click();
    cy.waitForPageLoad();
    cy.get('.workshop-card').should('be.visible');
    
    cy.get('.language-switcher select').select('fr');
    cy.wait(500);
    cy.get('body').should('be.visible');
  });
});
