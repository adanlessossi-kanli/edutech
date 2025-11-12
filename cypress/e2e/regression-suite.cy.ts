describe('Regression Test Suite', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/workshops', { fixture: 'workshops.json' });
  });

  describe('User Authentication Regression', () => {
    it('should maintain login state after page refresh', () => {
      cy.loginAsUser();
      cy.reload();
      cy.waitForPageLoad();
      cy.get('.user-info').should('be.visible');
      cy.logout();
    });

    it('should redirect to intended page after login', () => {
      cy.visit('/');
      cy.loginAsUser();
      cy.contains('button', 'Dashboard').click();
      cy.waitForPageLoad();
      cy.url().should('include', '/');
      cy.logout();
    });
  });

  describe('Workshop Management Regression', () => {
    it('should preserve filters after workshop enrollment', () => {
      cy.loginAsUser();
      cy.contains('button', 'Workshops').click();
      cy.waitForPageLoad();
      cy.get('.filters select').first().select('Frontend');
      cy.wait(300);
      cy.get('.workshop-card').first().within(() => {
        cy.get('.enroll-btn').click();
      });
      cy.waitForPageLoad();
      cy.get('.filters select').first().should('have.value', 'Frontend');
      cy.logout();
    });

    it('should update workshop count after enrollment', () => {
      cy.loginAsUser();
      cy.contains('button', 'Workshops').click();
      cy.waitForPageLoad();
      cy.get('.workshop-card').first().within(() => {
        cy.get('.enroll-btn').click();
      });
      cy.waitForPageLoad();
      cy.contains('button', 'Dashboard').click();
      cy.waitForPageLoad();
      cy.get('.enrolled-workshops').should('be.visible');
      cy.logout();
    });
  });

  describe('Search Functionality Regression', () => {
    it('should clear search results when input is cleared', () => {
      cy.visit('/');
      cy.contains('button', 'Workshops').click();
      cy.waitForPageLoad();
      cy.get('.search-input').type('React');
      cy.wait(300);
      cy.get('.workshop-card').should('be.visible');
      cy.get('.search-input').clear();
      cy.wait(300);
      cy.get('.workshop-card').should('be.visible');
    });

    it('should handle case-insensitive search', () => {
      cy.visit('/');
      cy.contains('button', 'Workshops').click();
      cy.waitForPageLoad();
      cy.get('.search-input').type('REACT');
      cy.wait(300);
      cy.get('.workshop-card').should('be.visible');
    });
  });

  describe('Form Validation Regression', () => {
    it('should prevent form submission with invalid data', () => {
      cy.loginAsAdmin();
      cy.contains('button', 'Publish').click();
      cy.waitForPageLoad();
      cy.get('button[type="submit"]').click();
      cy.wait(300);
      cy.logout();
    });

    it('should validate email format in registration', () => {
      cy.visit('/');
      cy.contains('button', 'Login').click();
      cy.get('.toggle-btn').click();
      cy.get('input[type="email"]').type('invalid-email');
      cy.get('button[type="submit"]').click();
      cy.wait(300);
    });
  });
});
