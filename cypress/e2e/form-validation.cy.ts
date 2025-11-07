describe('Form Validation', () => {
  describe('Login Form', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.get('.nav-btn').contains('Login').click();
    });

    it('should display login form fields', () => {
      cy.get('input[type="email"]').should('be.visible');
      cy.get('input[type="password"]').should('be.visible');
      cy.get('button[type="submit"]').should('be.visible');
    });

    it('should login with valid credentials', () => {
      cy.get('input[type="email"]').type('user@example.com');
      cy.get('input[type="password"]').type('password');
      cy.get('button[type="submit"]').click();
      cy.get('.user-info').should('be.visible');
    });

    it('should toggle to register mode', () => {
      cy.get('.toggle-btn').click();
      cy.contains('Register').should('be.visible');
    });
  });

  describe('Admin Workshop Form', () => {
    beforeEach(() => {
      cy.loginAsAdmin();
      cy.get('.nav-btn').contains('Publish').click();
    });

    it('should display all required fields', () => {
      cy.get('input[name="title"]').should('be.visible');
      cy.get('textarea[name="description"]').should('be.visible');
      cy.get('input[name="instructor"]').should('be.visible');
      cy.get('input[name="duration"]').should('be.visible');
      cy.get('input[name="price"]').should('be.visible');
      cy.get('select[name="category"]').should('be.visible');
      cy.get('select[name="level"]').should('be.visible');
    });

    it('should accept valid workshop data', () => {
      cy.get('input[name="title"]').type('Valid Workshop');
      cy.get('textarea[name="description"]').type('Valid description');
      cy.get('input[name="instructor"]').type('Valid Instructor');
      cy.get('input[name="duration"]').type('120');
      cy.get('input[name="price"]').type('99');
      cy.get('select[name="category"]').select('Backend');
      cy.get('select[name="level"]').select('Advanced');
      cy.get('input[name="maxParticipants"]').type('25');
    });
  });
});
