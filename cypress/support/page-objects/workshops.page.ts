export class WorkshopsPage {
  visit() {
    cy.visit('/');
    cy.get('.nav-btn').contains('Workshops').click();
  }

  searchWorkshop(query: string) {
    cy.get('.search-input').type(query);
  }

  filterByCategory(category: string) {
    cy.get('select').first().select(category);
  }

  filterByLevel(level: string) {
    cy.get('select').eq(1).select(level);
  }

  getWorkshopCards() {
    return cy.get('.workshop-card');
  }

  clickFirstWorkshop() {
    cy.get('.workshop-card').first().click();
  }
}
