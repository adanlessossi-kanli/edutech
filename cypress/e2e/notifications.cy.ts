describe('Notifications', () => {
  beforeEach(() => {
    cy.loginAsUser();
    cy.get('.nav-btn').contains('Dashboard').click();
  });

  it('should display notifications container', () => {
    cy.get('.notifications-container').should('be.visible');
  });

  it('should display notification items', () => {
    cy.get('.notification-item').should('have.length.greaterThan', 0);
  });

  it('should mark notification as read', () => {
    cy.get('.notification-item.unread').first().within(() => {
      cy.get('.read-btn').click();
    });
    cy.get('.notification-item.unread').should('have.length.lessThan', 3);
  });

  it('should mark all as read', () => {
    cy.get('.mark-read-btn').click();
    cy.get('.notification-item.unread').should('not.exist');
  });

  it('should display notification icons', () => {
    cy.get('.notification-icon').should('have.length.greaterThan', 0);
  });
});
