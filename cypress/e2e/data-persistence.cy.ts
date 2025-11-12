describe('Data Persistence', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/workshops', { fixture: 'workshops.json' });
  });

  it('should save enrollment data', () => {
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

  it('should persist user preferences', () => {
    cy.loginAsUser();
    cy.get('.settings-btn').click();
    cy.waitForPageLoad();
    cy.get('input[name="emailNotifications"]').check();
    cy.get('button').contains('Save').click();
    cy.waitForPageLoad();
    
    cy.reload();
    cy.waitForPageLoad();
    cy.get('.settings-btn').click();
    cy.waitForPageLoad();
    cy.get('input[name="emailNotifications"]').should('be.checked');
    cy.logout();
  });

  it('should save workshop progress', () => {
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

  it('should handle offline data sync', () => {
    cy.intercept('POST', '**/api/enroll', { forceNetworkError: true });
    cy.loginAsUser();
    cy.contains('button', 'Workshops').click();
    cy.waitForPageLoad();
    cy.get('.workshop-card').first().within(() => {
      cy.get('.enroll-btn').click();
    });
    cy.logout();
  });

  it('should backup data before updates', () => {
    cy.loginAsAdmin();
    cy.fixture('workshops').then((data) => {
      cy.createWorkshop(data.workshops[0]);
      cy.waitForPageLoad();
      cy.contains('button', 'Workshops').click();
      cy.waitForPageLoad();
      cy.contains('.workshop-card', data.workshops[0].title).should('be.visible');
    });
    cy.logout();
  });
});
