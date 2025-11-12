describe('Cross-Browser Compatibility', () => {
  const viewports = [
    { name: 'Desktop', width: 1920, height: 1080 },
    { name: 'Laptop', width: 1366, height: 768 },
    { name: 'Tablet', width: 768, height: 1024 },
    { name: 'Mobile', width: 375, height: 667 }
  ];

  viewports.forEach((viewport) => {
    describe(`${viewport.name} (${viewport.width}x${viewport.height})`, () => {
      beforeEach(() => {
        cy.viewport(viewport.width, viewport.height);
        cy.visit('/');
      });

      it('should display navigation correctly', () => {
        cy.get('.nav-menu').should('be.visible');
      });

      it('should display landing page content', () => {
        cy.contains('Transform Your Tech Career').should('be.visible');
      });

      it('should navigate to workshops', () => {
        cy.contains('button', 'Workshops').click();
        cy.get('.workshop-list-container').should('be.visible');
      });

      it('should handle login flow', () => {
        cy.contains('button', 'Login').click();
        cy.get('.auth-form').should('be.visible');
      });
    });
  });

  it('should handle orientation changes', () => {
    cy.viewport('iphone-6', 'portrait');
    cy.visit('/');
    cy.get('.nav-menu').should('be.visible');

    cy.viewport('iphone-6', 'landscape');
    cy.get('.nav-menu').should('be.visible');
  });
});
