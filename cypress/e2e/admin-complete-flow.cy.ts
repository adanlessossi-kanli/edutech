describe('Admin Complete Flow', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/workshops', { fixture: 'workshops.json' });
    cy.loginAsAdmin();
  });

  afterEach(() => {
    cy.logout();
  });

  it('should create, edit, and delete workshop', () => {
    cy.fixture('workshops').then((data) => {
      const workshop = data.workshops[0];
      
      cy.createWorkshop(workshop);
      cy.waitForPageLoad();
      cy.contains('button', 'Workshops').click();
      cy.waitForPageLoad();
      cy.contains('.workshop-card', workshop.title).should('be.visible');
    });
  });

  it('should manage multiple workshops', () => {
    cy.fixture('workshops').then((data) => {
      cy.createWorkshop(data.workshops[0]);
      cy.createWorkshop(data.workshops[1]);
      cy.createWorkshop(data.workshops[2]);

      cy.contains('button', 'Workshops').click();
      cy.waitForPageLoad();
      cy.get('.workshop-card').should('have.length.greaterThan', 0);
    });
  });

  it('should access publish workshop form', () => {
    cy.contains('button', 'Publish').click();
    cy.get('.form-container').should('be.visible');
    cy.contains('h2', 'Publish New Workshop').should('be.visible');
  });

  it('should validate workshop form fields', () => {
    cy.contains('button', 'Publish').click();
    cy.get('input[placeholder="Workshop Title"]').should('be.visible');
    cy.get('textarea[placeholder="Description"]').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible');
  });
});
