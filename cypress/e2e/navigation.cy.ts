describe('Application Navigation', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should navigate between all main pages', () => {
    cy.get('.nav-btn').contains('Workshops').click();
    cy.get('.workshop-list-container').should('be.visible');
    
    cy.get('.nav-btn').contains('Home').click();
    cy.contains('Transform Your Tech Career').should('be.visible');
  });

  it('should navigate to all benefit pages from landing', () => {
    const benefits = ['Expert Instructors', 'Hands-On Learning', 'Certificates', 'Career Support', 'Flexible Schedule', 'Community'];
    
    benefits.forEach(benefit => {
      cy.visit('/');
      cy.get('.benefit').contains(benefit).click();
      cy.wait(200);
    });
  });

  it('should show active state on current page', () => {
    cy.get('.nav-btn').contains('Workshops').click();
    cy.get('.nav-btn').contains('Workshops').should('have.class', 'active');
  });

  it('should navigate back to home', () => {
    cy.get('.nav-btn').contains('Workshops').click();
    cy.get('.nav-btn').contains('Home').click();
    cy.contains('Transform Your Tech Career').should('be.visible');
  });
});
