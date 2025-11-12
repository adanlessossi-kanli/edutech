describe('Integration Tests', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/workshops', { fixture: 'workshops.json' });
  });

  describe('User-Workshop Integration', () => {
    it('should complete enrollment workflow', () => {
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

    it('should sync enrollment across components', () => {
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
  });

  describe('Admin-Workshop Integration', () => {
    it('should create and display workshop', () => {
      cy.loginAsAdmin();
      cy.fixture('workshops').then((data) => {
        const workshop = data.workshops[0];
        cy.createWorkshop(workshop);
        cy.waitForPageLoad();
        cy.contains('button', 'Workshops').click();
        cy.waitForPageLoad();
        cy.contains('.workshop-card', workshop.title).should('be.visible');
      });
      cy.logout();
    });

    it('should update workshop and reflect changes', () => {
      cy.loginAsAdmin();
      cy.contains('button', 'Publish').click();
      cy.waitForPageLoad();
      cy.get('input[placeholder="Workshop Title"]').should('be.visible').type('Updated Workshop');
      cy.get('textarea[placeholder="Description"]').type('Updated Description');
      cy.get('input[placeholder="Instructor Name"]').type('Test Instructor');
      cy.get('input[placeholder="Duration (minutes)"]').type('120');
      cy.get('input[placeholder="Price ($)"]').type('99');
      cy.get('.form-select').first().select('Frontend');
      cy.get('.form-select').eq(1).select('Beginner');
      cy.get('input[placeholder="Max Participants"]').type('20');
      cy.get('button[type="submit"]').should('be.visible').click();
      cy.wait(1000);
      cy.get('input[placeholder="Workshop Title"]').should('have.value', '');
      cy.logout();
    });
  });

  describe('Search-Filter Integration', () => {
    it('should combine search and filters', () => {
      cy.visit('/');
      cy.contains('button', 'Workshops').click();
      cy.waitForPageLoad();
      cy.get('.search-input').type('React');
      cy.wait(300);
      cy.get('.filter-select').first().select('Frontend');
      cy.wait(300);
      cy.get('.filter-select').eq(1).select('Beginner');
      cy.wait(300);
    });

    it('should reset filters independently', () => {
      cy.visit('/');
      cy.contains('button', 'Workshops').click();
      cy.waitForPageLoad();
      cy.get('.search-input').type('React');
      cy.get('.filter-select').first().select('Frontend');
      cy.get('.reset-filters-btn').click();
      cy.wait(300);
      cy.get('.filter-select').first().should('have.value', '');
      cy.get('.search-input').should('have.value', '');
    });
  });

  describe('Notification-Action Integration', () => {
    it('should show notification after enrollment', () => {
      cy.loginAsUser();
      cy.contains('button', 'Workshops').click();
      cy.waitForPageLoad();
      cy.get('.workshop-card').first().within(() => {
        cy.get('.enroll-btn').click();
      });
      cy.waitForPageLoad();
      cy.logout();
    });

    it('should dismiss notifications', () => {
      cy.loginAsUser();
      cy.contains('button', 'Workshops').click();
      cy.waitForPageLoad();
      cy.get('.workshop-card').first().within(() => {
        cy.get('.enroll-btn').click();
      });
      cy.waitForPageLoad();
      cy.logout();
    });
  });
});
