describe('Security Enhancements', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('Security Headers', () => {
    it('should have Content-Security-Policy meta tag', () => {
      cy.get('meta[http-equiv="Content-Security-Policy"]').should('exist');
    });

    it('should have X-Frame-Options meta tag', () => {
      cy.get('meta[http-equiv="X-Frame-Options"]').should('have.attr', 'content', 'DENY');
    });

    it('should have X-Content-Type-Options meta tag', () => {
      cy.get('meta[http-equiv="X-Content-Type-Options"]').should('have.attr', 'content', 'nosniff');
    });

    it('should have secure referrer policy', () => {
      cy.get('meta[name="referrer"]').should('have.attr', 'content', 'strict-origin-when-cross-origin');
    });
  });

  describe('LocalStorage Security', () => {
    it('should not expose sensitive data in localStorage', () => {
      cy.window().then((win) => {
        const keys = Object.keys(win.localStorage);
        keys.forEach(key => {
          const value = win.localStorage.getItem(key);
          expect(value).to.not.include('password');
          expect(value).to.not.include('secret');
        });
      });
    });
  });
});
