describe('Complete User Flow', () => {
  it('should complete full user journey', () => {
    cy.visit('/');
    cy.contains('Transform Your Tech Career').should('be.visible');
    
    cy.contains('button', 'Workshops').click();
    cy.get('.workshop-card').should('have.length.greaterThan', 0);
    
    cy.contains('button', 'Login').click();
    cy.get('input[type="email"]').type('user@example.com');
    cy.get('input[type="password"]').type('password');
    cy.get('button[type="submit"]').click();
    
    cy.get('.user-info').should('be.visible');
    cy.contains('button', 'Dashboard').click();
    cy.get('.dashboard-container').should('be.visible');
    
    cy.contains('button', 'Workshops').click();
    cy.get('.enroll-btn').first().should('contain', 'Enroll Now');
    
    cy.logout();
    cy.contains('button', 'Login').should('be.visible');
  });

  it('should complete admin workflow', () => {
    cy.loginAsAdmin();
    
    cy.contains('button', 'Publish').should('be.visible');
    cy.contains('button', 'Publish').click();
    
    cy.get('.form-container').should('be.visible');
    cy.get('input[name="title"]').type('E2E Test Workshop');
    cy.get('textarea[name="description"]').type('Test Description');
    cy.get('input[name="instructor"]').type('Test Instructor');
    cy.get('input[name="duration"]').type('90');
    cy.get('input[name="price"]').type('79');
    cy.get('select[name="category"]').select('Frontend');
    cy.get('select[name="level"]').select('Intermediate');
    cy.get('input[name="maxParticipants"]').type('15');
    
    cy.logout();
  });
});
