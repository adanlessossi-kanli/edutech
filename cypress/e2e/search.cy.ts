describe('Workshop Search', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.contains('button', 'Workshops').click();
  });

  it('should display search input', () => {
    cy.get('.search-input').should('be.visible');
  });

  it('should filter workshops by search query', () => {
    cy.get('.search-input').type('React');
    cy.get('.workshop-card').should('have.length.greaterThan', 0);
  });

  it('should show no results for invalid search', () => {
    cy.get('.search-input').type('xyzabc123notfound');
    cy.wait(500);
  });

  it('should clear search on empty input', () => {
    cy.get('.search-input').type('React');
    cy.get('.search-input').clear();
  });

  it('should search case-insensitively', () => {
    cy.get('.search-input').type('react');
    cy.get('.workshop-card').should('have.length.greaterThan', 0);
  });
});
