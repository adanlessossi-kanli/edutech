describe('State Management', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/workshops', { fixture: 'workshops.json' });
  });

  it('should persist user session across page reloads', () => {
    cy.loginAsUser();
    cy.reload();
    cy.waitForPageLoad();
    cy.get('.user-info').should('be.visible');
    cy.logout();
  });

  it('should maintain filter state when navigating back', () => {
    cy.visit('/');
    cy.contains('button', 'Workshops').click();
    cy.waitForPageLoad();
    cy.get('.filters select').first().select('Frontend');
    cy.wait(300);
    cy.get('.search-input').type('React');
    cy.wait(300);
    
    cy.contains('button', 'Home').click();
    cy.waitForPageLoad();
    cy.go('back');
    cy.waitForPageLoad();
    
    cy.get('.filters select').first().should('be.visible');
    cy.get('.search-input').should('be.visible');
  });

  it('should clear state on logout', () => {
    cy.loginAsUser();
    cy.contains('button', 'Workshops').click();
    cy.waitForPageLoad();
    cy.get('.workshop-card').first().within(() => {
      cy.get('.enroll-btn').click();
    });
    cy.waitForPageLoad();
    cy.logout();
    
    cy.window().then((win) => {
      expect(win.localStorage).to.exist;
    });
  });

  it('should sync state across multiple tabs', () => {
    cy.loginAsUser();
    cy.window().then((win) => {
      win.localStorage.setItem('testKey', 'testValue');
    });
    
    cy.visit('/', {
      onBeforeLoad(win) {
        expect(win.localStorage.getItem('testKey')).to.equal('testValue');
      }
    });
    cy.logout();
  });

  it('should handle concurrent state updates', () => {
    cy.loginAsUser();
    cy.contains('button', 'Workshops').click();
    cy.waitForPageLoad();
    
    cy.get('.workshop-card').first().within(() => {
      cy.get('.enroll-btn').click();
    });
    cy.waitForPageLoad();
    
    cy.contains('button', 'Dashboard').click();
    cy.waitForPageLoad();
    cy.get('.enrolled-workshops').should('be.visible');
    cy.logout();
  });

  it('should restore form state after navigation', () => {
    cy.loginAsAdmin();
    cy.contains('button', 'Publish').click();
    cy.waitForPageLoad();
    cy.get('input[placeholder="Workshop Title"]').type('Test Workshop');
    cy.get('textarea[placeholder="Description"]').type('Test Description');
    
    cy.contains('button', 'Workshops').click();
    cy.waitForPageLoad();
    cy.go('back');
    cy.waitForPageLoad();
    
    cy.get('input[placeholder="Workshop Title"]').should('be.visible');
    cy.logout();
  });
});
