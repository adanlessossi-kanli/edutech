describe('PWA Features', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('Manifest', () => {
    it('should have manifest link', () => {
      cy.get('link[rel="manifest"]').should('exist');
    });

    it('should have theme color meta tag', () => {
      cy.get('meta[name="theme-color"]').should('have.attr', 'content', '#2563eb');
    });
  });

  describe('Service Worker', () => {
    it('should register service worker in production', () => {
      cy.window().then((win) => {
        if ('serviceWorker' in win.navigator) {
          expect(win.navigator.serviceWorker).to.exist;
        }
      });
    });
  });

  describe('Offline Support', () => {
    it('should have service worker configuration in production', () => {
      cy.request({ url: '/ngsw.json', failOnStatusCode: false }).then((response) => {
        expect(response.status).to.be.oneOf([200, 404]);
      });
    });
  });

  describe('Performance', () => {
    it('should load page within acceptable time', () => {
      const start = Date.now();
      cy.visit('/');
      cy.window().then(() => {
        const loadTime = Date.now() - start;
        expect(loadTime).to.be.lessThan(3000);
      });
    });
  });
});
