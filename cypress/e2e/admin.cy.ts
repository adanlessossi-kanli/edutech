import { AdminPage } from '../support/page-objects';

describe('Admin Features', () => {
  const adminPage = new AdminPage();

  beforeEach(() => {
    cy.loginAsAdmin();
  });

  it('should show publish button for admin', () => {
    cy.contains('button', 'Publish').should('be.visible');
  });

  it('should access admin panel', () => {
    adminPage.visit();
    cy.get('.form-container').should('be.visible');
  });

  it('should create new workshop', () => {
    adminPage.visit();
    adminPage.fillTitle('New Workshop');
    adminPage.fillDescription('Workshop Description');
    adminPage.fillInstructor('Instructor Name');
    adminPage.fillDuration('120');
    adminPage.fillPrice('99');
    adminPage.selectCategory('Frontend');
    adminPage.selectLevel('Beginner');
    adminPage.fillMaxParticipants('20');
    adminPage.fillDates('2024-12-01T10:00', '2024-12-01T12:00');
    adminPage.submit();
  });

  it('should have category dropdown', () => {
    cy.contains('button', 'Publish').click();
    cy.get('select[name="category"]').children().should('have.length.greaterThan', 1);
  });

  it('should have level dropdown', () => {
    cy.contains('button', 'Publish').click();
    cy.get('select[name="level"]').children().should('have.length.greaterThan', 1);
  });
});