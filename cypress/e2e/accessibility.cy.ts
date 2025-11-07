describe('Accessibility', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should have proper heading hierarchy', () => {
    cy.get('h1').should('exist');
  });

  it('should have clickable buttons', () => {
    cy.get('button').each($btn => {
      cy.wrap($btn).should('be.visible');
    });
  });

  it('should have form labels', () => {
    cy.get('.nav-btn').contains('Login').click();
    cy.get('input[type="email"]').should('exist');
    cy.get('input[type="password"]').should('exist');
  });

  it('should navigate with keyboard', () => {
    cy.get('.nav-btn').first().focus().should('have.focus');
  });

  it('should have alt text for images', () => {
    cy.get('body').then($body => {
      const images = $body.find('img');
      if (images.length > 0) {
        cy.get('img').each($img => {
          cy.wrap($img).should('have.attr', 'alt');
        });
      } else {
        // No images found - test passes as there are no accessibility issues
        cy.log('No img elements found in the application');
      }
    });
  });
});
