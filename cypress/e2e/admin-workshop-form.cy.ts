import { AdminPage } from '../support/page-objects';

describe('Admin Workshop Form', () => {
  const adminPage = new AdminPage();

  beforeEach(() => {
    cy.loginAsAdmin();
    adminPage.visit();
  });

  it('should display form container', () => {
    cy.get('.form-container').should('be.visible');
  });

  it('should display all form fields', () => {
    cy.get('input[name="title"]').should('be.visible');
    cy.get('textarea[name="description"]').should('be.visible');
    cy.get('input[name="instructor"]').should('be.visible');
    cy.get('input[name="duration"]').should('be.visible');
    cy.get('input[name="price"]').should('be.visible');
  });

  it('should submit workshop form', () => {
    adminPage.fillTitle('Test Workshop');
    adminPage.fillDescription('Test Description');
    adminPage.fillInstructor('Test Instructor');
    adminPage.fillDuration('120');
    adminPage.fillPrice('99');
    adminPage.selectCategory('Frontend');
    adminPage.selectLevel('Beginner');
    adminPage.fillMaxParticipants('20');
    adminPage.fillDates('2024-12-01T10:00', '2024-12-01T12:00');
    adminPage.submit();
  });

  it('should display category options', () => {
    cy.get('select[name="category"]').children().should('have.length.greaterThan', 1);
  });

  it('should display level options', () => {
    cy.get('select[name="level"]').children().should('have.length.greaterThan', 1);
  });
});
