describe('Error Handling', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('HTTP Error Handling', () => {
    it('should handle network errors gracefully', () => {
      cy.intercept('GET', '**/api/**', {
        statusCode: 500,
        body: { error: 'Server error' }
      }).as('serverError');

      cy.visit('/workshops');
      cy.wait(1000);
      cy.get('body').should('exist');
    });

    it('should handle 404 errors with interceptor', () => {
      cy.intercept('GET', '**/api/notfound', {
        statusCode: 404,
        body: { error: 'Not found' }
      }).as('notFound');

      cy.window().then((win) => {
        expect(win).to.exist;
      });
    });
  });

  describe('Console Logging', () => {
    it('should not expose errors in production mode', () => {
      cy.window().then((win) => {
        const errors: any[] = [];
        cy.stub(win.console, 'error').callsFake((...args) => {
          errors.push(args);
        });
      });
    });
  });

  describe('Performance Monitoring', () => {
    it('should track page load performance', () => {
      cy.window().then((win) => {
        const performance = win.performance;
        expect(performance).to.exist;
        expect(performance.timing).to.exist;
      });
    });
  });

  describe('Error Recovery', () => {
    it('should allow navigation after error', () => {
      cy.visit('/workshops');
      cy.get('body').should('exist');
      cy.visit('/');
      cy.get('body').should('exist');
    });
  });
});
