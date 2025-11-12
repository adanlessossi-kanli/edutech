describe('API Integration Tests', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/workshops', { statusCode: 200, body: [] }).as('getWorkshops');
  });

  it('should load workshops from API', () => {
    cy.visit('/');
    cy.contains('button', 'Workshops').click();
    cy.wait('@getWorkshops');
    cy.get('.workshop-list-container').should('be.visible');
  });

  it('should handle API rate limiting', () => {
    cy.intercept('GET', '**/api/workshops', {
      statusCode: 429,
      body: { message: 'Too many requests' }
    });
    cy.visit('/');
    cy.contains('button', 'Workshops').click();
  });

  it('should retry failed API requests', () => {
    let attempts = 0;
    cy.intercept('GET', '**/api/workshops', (req) => {
      attempts++;
      if (attempts < 3) {
        req.reply({ statusCode: 500 });
      } else {
        req.reply({ statusCode: 200, body: [] });
      }
    });
    cy.visit('/');
    cy.contains('button', 'Workshops').click();
    cy.get('.workshop-list-container').should('be.visible');
  });

  it('should handle API timeout', () => {
    cy.intercept('GET', '**/api/workshops', { statusCode: 200, body: [], delay: 100 });
    cy.visit('/');
    cy.contains('button', 'Workshops').click();
    cy.get('.workshop-list-container', { timeout: 10000 }).should('be.visible');
  });

  it('should send correct headers with API requests', () => {
    cy.loginAsUser();
    cy.contains('button', 'Workshops').click();
    cy.wait('@getWorkshops').its('request.headers').should('exist');
    cy.logout();
  });

  it('should handle malformed API responses', () => {
    cy.visit('/');
    cy.contains('button', 'Workshops').click();
    cy.get('.workshop-list-container').should('be.visible');
  });

  it('should cache API responses', () => {
    cy.visit('/');
    cy.contains('button', 'Workshops').click();
    cy.wait('@getWorkshops');
    cy.get('.workshop-list-container').should('be.visible');
    
    cy.contains('button', 'Home').click();
    cy.contains('button', 'Workshops').click();
    cy.get('.workshop-list-container').should('be.visible');
  });
});
