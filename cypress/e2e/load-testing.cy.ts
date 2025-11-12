describe('Load and Stress Testing', () => {
  it('should handle large number of workshops', () => {
    const workshops = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      title: `Workshop ${i}`,
      description: 'Description',
      instructor: 'Instructor',
      price: 99
    }));

    cy.intercept('GET', '**/api/workshops', {
      statusCode: 200,
      body: workshops
    });

    cy.visit('/');
    cy.contains('button', 'Workshops').click();
    cy.waitForPageLoad();
    cy.get('.workshop-card', { timeout: 10000 }).should('be.visible');
  });

  it('should implement pagination for large datasets', () => {
    cy.intercept('GET', '**/api/workshops', { fixture: 'workshops.json' });
    cy.visit('/');
    cy.contains('button', 'Workshops').click();
    cy.waitForPageLoad();
    cy.get('.workshop-card').should('be.visible');
  });

  it('should lazy load images', () => {
    cy.intercept('GET', '**/api/workshops', { fixture: 'workshops.json' });
    cy.visit('/');
    cy.contains('button', 'Workshops').click();
    cy.waitForPageLoad();
    cy.get('.workshop-card').should('be.visible');
  });

  it('should handle rapid filter changes', () => {
    cy.intercept('GET', '**/api/workshops', { fixture: 'workshops.json' });
    cy.visit('/');
    cy.contains('button', 'Workshops').click();
    cy.waitForPageLoad();
    
    for (let i = 0; i < 5; i++) {
      cy.get('.filters select').first().select('Frontend');
      cy.wait(100);
      cy.get('.filters select').first().select('Backend');
      cy.wait(100);
    }
    
    cy.get('.workshop-card').should('be.visible');
  });

  it('should debounce search input', () => {
    cy.intercept('GET', '**/api/workshops*', { fixture: 'workshops.json' }).as('search');
    cy.visit('/');
    cy.contains('button', 'Workshops').click();
    cy.waitForPageLoad();
    
    cy.get('.search-input').type('React');
    cy.wait(500);
    cy.get('.workshop-card').should('be.visible');
  });

  it('should handle multiple concurrent enrollments', () => {
    cy.intercept('GET', '**/api/workshops', { fixture: 'workshops.json' });
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
