describe('Complete User Journey', () => {
  let testUser;

  before(() => {
    const timestamp = Date.now();
    testUser = {
      name: `Test User ${timestamp}`,
      email: `testuser${timestamp}@example.com`,
      password: 'TestPass123!'
    };
  });

  beforeEach(() => {
    cy.intercept('GET', '**/api/workshops', { fixture: 'workshops.json' });
  });

  it('should complete full user journey from registration to enrollment', () => {
    cy.visit('/');
    cy.waitForPageLoad();
    cy.contains('Transform Your Tech Career').should('be.visible');

    cy.register(testUser.name, testUser.email, testUser.password);
    cy.get('.user-info').should('contain', testUser.name);

    cy.contains('button', 'Workshops').click();
    cy.waitForPageLoad();
    cy.get('.workshop-card').should('have.length.greaterThan', 0);

    cy.get('.search-input').type('React');
    cy.get('.workshop-card').first().within(() => {
      cy.get('h3').should('be.visible');
      cy.get('.enroll-btn').click();
    });
    cy.waitForPageLoad();

    cy.contains('button', 'Dashboard').click();
    cy.waitForPageLoad();
    cy.get('.enrolled-workshops').should('be.visible');

    cy.logout();
    cy.contains('button', 'Login').should('be.visible');
  });

  it('should handle workshop browsing and filtering journey', () => {
    cy.visit('/');
    cy.waitForPageLoad();
    cy.contains('button', 'Workshops').click();
    cy.waitForPageLoad();

    cy.get('.filter-select').first().select('Frontend');
    cy.wait(300);
    cy.get('.workshop-card').should('have.length.greaterThan', 0);

    cy.get('.filter-select').eq(1).select('Beginner');
    cy.wait(300);
    cy.get('.workshop-card').should('have.length.greaterThan', 0);

    cy.get('.search-input').clear().type('Advanced');
    cy.wait(300);

    cy.get('.reset-filters-btn').click();
    cy.wait(300);
  });
});
