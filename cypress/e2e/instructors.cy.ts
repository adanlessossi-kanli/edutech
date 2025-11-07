describe('Instructors Page', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('.benefit').contains('Expert Instructors').click();
  });

  it('should display page header', () => {
    cy.contains('Meet Our Expert Instructors').should('be.visible');
  });

  it('should display 6 instructor cards', () => {
    cy.get('.instructor-card').should('have.length', 6);
  });

  it('should display instructor details', () => {
    cy.get('.instructor-card').first().within(() => {
      cy.get('h3').should('be.visible');
      cy.get('.title').should('be.visible');
      cy.get('.stats').should('be.visible');
    });
  });

  it('should display expertise tags', () => {
    cy.get('.skill-tag').should('have.length.greaterThan', 0);
  });

  it('should display instructor avatars', () => {
    cy.get('.instructor-avatar').should('have.length', 6);
  });
});
