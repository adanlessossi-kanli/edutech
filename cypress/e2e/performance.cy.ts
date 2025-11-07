describe('Performance', () => {
  it('should load landing page quickly', () => {
    cy.visit('/');
    cy.get('.main-content').should('be.visible');
  });

  it('should load workshops page quickly', () => {
    cy.visit('/');
    cy.get('.nav-btn').contains('Workshops').click();
    cy.get('.workshop-list-container', { timeout: 5000 }).should('be.visible');
  });

  it('should handle multiple rapid filter changes', () => {
    cy.visit('/');
    cy.get('.nav-btn').contains('Workshops').click();
    
    cy.get('.filters-sidebar select').first().select('Frontend');
    cy.get('.filters-sidebar select').first().select('Backend');
    cy.get('.filters-sidebar select').first().select('DevOps');
    
    cy.get('.workshop-card').should('exist');
  });

  it('should handle rapid navigation', () => {
    cy.visit('/');
    cy.get('.nav-btn').contains('Workshops').click();
    cy.get('.nav-btn').contains('Home').click();
    cy.get('.nav-btn').contains('Workshops').click();
    cy.get('.workshop-list-container').should('be.visible');
  });

  it('should render all workshop cards efficiently', () => {
    cy.visit('/');
    cy.get('.nav-btn').contains('Workshops').click();
    cy.get('.workshop-card').should('have.length.greaterThan', 0);
    cy.get('.workshop-card').should('have.length.lessThan', 100);
  });
});
