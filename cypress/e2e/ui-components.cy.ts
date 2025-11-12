describe('UI Components', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display header with logo', () => {
    cy.get('.logo').should('be.visible').and('contain', 'EduTech Pro');
  });

  it('should display navigation buttons', () => {
    cy.get('button').should('have.length.greaterThan', 1);
  });

  it('should display benefit cards on landing', () => {
    cy.get('.benefit').should('have.length', 6);
  });

  it('should display workshop cards with all info', () => {
    cy.contains('button', 'Workshops').click();
    cy.get('.workshop-card').first().within(() => {
      cy.get('h3').should('exist');
      cy.get('.instructor').should('exist');
      cy.get('.price').should('exist');
      cy.get('.workshop-meta').should('exist');
    });
  });

  it('should display filters sidebar', () => {
    cy.contains('button', 'Workshops').click();
    cy.get('.filters-sidebar').should('be.visible');
    cy.get('.filters-sidebar h3').should('contain', 'Filters');
  });

  it('should display CTA button on landing', () => {
    cy.get('.cta-btn').should('be.visible');
  });

  it('should show user info when logged in', () => {
    cy.loginAsUser();
    cy.get('.user-info').should('be.visible');
  });

  it('should show logout button when logged in', () => {
    cy.loginAsUser();
    cy.get('.logout-btn').should('be.visible');
  });
});
