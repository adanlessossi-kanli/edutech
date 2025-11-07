export class DashboardPage {
  visit() {
    cy.get('.nav-btn').contains('Dashboard').click();
  }

  getWelcomeMessage() {
    return cy.contains('Welcome back');
  }

  getStatCards() {
    return cy.get('.stat-card');
  }

  getProgressTracker() {
    return cy.get('app-progress-tracker');
  }

  getNotifications() {
    return cy.get('app-notifications');
  }
}
