describe('Workshop Card', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('.nav-btn').contains('Workshops').click();
  });

  it('should display workshop cards', () => {
    cy.get('.workshop-card').should('have.length.greaterThan', 0);
  });

  it('should display workshop details', () => {
    cy.get('.workshop-card').first().within(() => {
      cy.get('h3').should('be.visible');
      cy.get('.instructor').should('be.visible');
      cy.get('.price').should('be.visible');
    });
  });

  it('should show enroll button', () => {
    cy.get('.enroll-btn').should('have.length.greaterThan', 0);
  });

  it('should display workshop meta', () => {
    cy.get('.workshop-meta').should('have.length.greaterThan', 0);
  });

  it('should toggle reviews', () => {
    cy.get('.reviews-btn').first().click();
  });

  it('should show live badge for live workshops', () => {
    cy.get('.live-badge').should('exist');
  });
});
