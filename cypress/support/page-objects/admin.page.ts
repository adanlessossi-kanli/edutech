export class AdminPage {
  visit() {
    cy.get('.nav-btn').contains('Publish').click();
  }

  fillTitle(title: string) {
    cy.get('input[name="title"]').type(title);
  }

  fillDescription(description: string) {
    cy.get('textarea[name="description"]').type(description);
  }

  fillInstructor(instructor: string) {
    cy.get('input[name="instructor"]').type(instructor);
  }

  fillDuration(duration: string) {
    cy.get('input[name="duration"]').type(duration);
  }

  fillPrice(price: string) {
    cy.get('input[name="price"]').type(price);
  }

  selectCategory(category: string) {
    cy.get('select[name="category"]').select(category);
  }

  selectLevel(level: string) {
    cy.get('select[name="level"]').select(level);
  }

  fillMaxParticipants(max: string) {
    cy.get('input[name="maxParticipants"]').type(max);
  }

  fillDates(start: string, end: string) {
    cy.get('input[name="startDate"]').type(start);
    cy.get('input[name="endDate"]').type(end);
  }

  submit() {
    cy.get('.submit-btn').click();
  }
}
