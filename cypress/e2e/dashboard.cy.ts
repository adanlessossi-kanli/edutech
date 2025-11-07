import { DashboardPage } from '../support/page-objects';

describe('User Dashboard', () => {
  const dashboardPage = new DashboardPage();

  beforeEach(() => {
    cy.loginAsUser();
    dashboardPage.visit();
  });

  it('should display welcome message', () => {
    dashboardPage.getWelcomeMessage().should('be.visible');
  });

  it('should display stats cards', () => {
    dashboardPage.getStatCards().should('have.length', 3);
  });

  it('should display progress tracker', () => {
    dashboardPage.getProgressTracker().should('be.visible');
  });

  it('should display notifications', () => {
    dashboardPage.getNotifications().should('be.visible');
  });

  it('should show enrolled workshops count', () => {
    cy.get('.stat-card').first().within(() => {
      cy.get('h3').should('be.visible');
      cy.contains('Enrolled Workshops').should('be.visible');
    });
  });
});
