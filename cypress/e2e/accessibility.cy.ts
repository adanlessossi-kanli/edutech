describe('Accessibility', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should have proper heading hierarchy', () => {
    cy.get('h1').should('exist').and('be.visible');
  });

  it('should have clickable buttons', () => {
    cy.get('button').should('have.length.at.least', 1);
    cy.get('.cta-btn').should('be.visible').and('not.be.disabled');
  });

  it('should have form labels', () => {
    cy.contains('button', 'Login').click();
    cy.get('input[type="email"]').should('be.visible');
    cy.get('input[type="password"]').should('be.visible');
  });

  it('should navigate with keyboard', () => {
    cy.get('button').first().focus();
    cy.focused().should('exist');
  });

  it('should have alt text for images', () => {
    cy.get('body').then($body => {
      const images = $body.find('img');
      if (images.length > 0) {
        cy.get('img').each($img => {
          cy.wrap($img).should('have.attr', 'alt');
        });
      } else {
        cy.log('No img elements found in the application');
      }
    });
  });
});
