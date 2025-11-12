export class EnrollmentPage {
  visit() {
    cy.visit('/');
    cy.get('.nav-btn').contains('Workshops').click();
  }

  enrollInWorkshop(title: string) {
    cy.contains('.workshop-card', title).within(() => {
      cy.get('.enroll-btn').click();
    });
  }

  verifyEnrollmentSuccess() {
    cy.contains('Successfully enrolled').should('be.visible');
  }

  viewEnrolledWorkshops() {
    cy.get('.nav-btn').contains('Dashboard').click();
    return cy.get('.enrolled-workshops');
  }

  cancelEnrollment(title: string) {
    this.viewEnrolledWorkshops();
    cy.contains('.workshop-card', title).within(() => {
      cy.get('.cancel-btn').click();
    });
  }
}
