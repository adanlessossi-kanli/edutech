describe('Responsive Design', () => {
  const viewports = [
    { device: 'iphone-6', width: 375, height: 667 },
    { device: 'ipad-2', width: 768, height: 1024 },
    { device: 'macbook-15', width: 1440, height: 900 }
  ];

  viewports.forEach(({ device, width, height }) => {
    describe(`${device} viewport`, () => {
      beforeEach(() => {
        cy.viewport(width, height);
        cy.visit('/');
      });

      it('should display navigation', () => {
        cy.get('.nav-menu').should('be.visible');
      });

      it('should display landing page content', () => {
        cy.contains('Transform Your Tech Career').should('be.visible');
      });

      it('should navigate to workshops', () => {
        cy.get('.nav-btn').contains('Workshops').click();
        cy.get('.workshop-list-container').should('be.visible');
      });

      it('should display workshop cards', () => {
        cy.get('.nav-btn').contains('Workshops').click();
        cy.get('.workshop-card').should('have.length.greaterThan', 0);
      });
    });
  });
});
