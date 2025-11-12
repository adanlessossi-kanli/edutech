export class WorkshopsPage {
  visit() {
    cy.visit('/');
    cy.contains('button', 'Workshops').click();
  }

  searchWorkshop(query: string) {
    cy.get('.search-input').type(query);
  }

  filterByCategory(category: string) {
    cy.get('.filters select').first().should('be.visible').select(category);
  }

  filterByLevel(level: string) {
    cy.get('.filters select').eq(1).should('be.visible').select(level);
  }

  getWorkshopCards() {
    return cy.get('.workshop-card');
  }

  clickFirstWorkshop() {
    cy.get('.workshop-card').first().click();
  }
}
