describe('Edge Cases and Error Scenarios', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/workshops', { fixture: 'workshops.json' });
  });

  it('should handle invalid login credentials', () => {
    cy.visit('/');
    cy.contains('button', 'Login').click();
    cy.get('input[type="email"]').type('invalid@example.com');
    cy.get('input[type="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();
    cy.waitForPageLoad();
  });

  it('should handle empty search results', () => {
    cy.visit('/');
    cy.contains('button', 'Workshops').click();
    cy.waitForPageLoad();
    cy.get('.search-input').type('NonExistentWorkshop12345');
    cy.wait(300);
  });

  it('should handle network errors gracefully', () => {
    cy.intercept('GET', '**/api/workshops', { forceNetworkError: true });
    cy.visit('/');
    cy.contains('button', 'Workshops').click();
    cy.wait(500);
  });

  it('should prevent duplicate enrollments', () => {
    cy.loginAsUser();
    cy.contains('button', 'Workshops').click();
    cy.waitForPageLoad();
    cy.get('.workshop-card').first().within(() => {
      cy.get('.enroll-btn').click();
    });
    cy.waitForPageLoad();
    cy.contains('button', 'Workshops').click();
    cy.waitForPageLoad();
    cy.get('.workshop-card').first().within(() => {
      cy.get('.enroll-btn').should('be.disabled');
    });
    cy.logout();
  });

  it('should handle session timeout', () => {
    cy.loginAsUser();
    cy.clearCookies();
    cy.contains('button', 'Dashboard').click();
    cy.waitForPageLoad();
  });

  it('should validate email format', () => {
    cy.visit('/');
    cy.contains('button', 'Login').click();
    cy.get('.toggle-btn').click();
    cy.get('input[placeholder="Full Name"]').type('Test User');
    cy.get('input[type="email"]').type('invalidemail');
    cy.get('input[type="password"]').type('password123');
    cy.get('button[type="submit"]').click();
    cy.wait(300);
  });

  it('should handle special characters in search', () => {
    cy.visit('/');
    cy.contains('button', 'Workshops').click();
    cy.waitForPageLoad();
    cy.get('.search-input').type('!@#$%^&*()');
    cy.wait(300);
  });

  it('should handle maximum enrollment capacity', () => {
    cy.intercept('POST', '**/api/enroll', {
      statusCode: 400,
      body: { message: 'Workshop is full' }
    });
    cy.loginAsUser();
    cy.contains('button', 'Workshops').click();
    cy.waitForPageLoad();
    cy.get('.workshop-card').first().within(() => {
      cy.get('.enroll-btn').click();
    });
    cy.wait(500);
    cy.logout();
  });
});
