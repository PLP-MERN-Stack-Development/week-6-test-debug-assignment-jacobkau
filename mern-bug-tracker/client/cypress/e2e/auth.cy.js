describe('Authentication Flows', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should allow user to register and login', () => {
    // Register new user
    cy.get('[data-testid="register-link"]').click();
    cy.get('[data-testid="name-input"]').type('Test User');
    cy.get('[data-testid="email-input"]').type('test@example.com');
    cy.get('[data-testid="password-input"]').type('Password123!');
    cy.get('[data-testid="confirm-password-input"]').type('Password123!');
    cy.get('[data-testid="register-button"]').click();

    // Verify successful registration
    cy.url().should('include', '/dashboard');
    cy.get('[data-testid="welcome-message"]').should('contain', 'Welcome, Test User');

    // Logout
    cy.get('[data-testid="logout-button"]').click();
    cy.url().should('include', '/login');

    // Login with same credentials
    cy.get('[data-testid="email-input"]').type('test@example.com');
    cy.get('[data-testid="password-input"]').type('Password123!');
    cy.get('[data-testid="login-button"]').click();

    // Verify successful login
    cy.url().should('include', '/dashboard');
    cy.get('[data-testid="welcome-message"]').should('contain', 'Welcome, Test User');
  });

  it('should show error for invalid login', () => {
    cy.get('[data-testid="login-link"]').click();
    cy.get('[data-testid="email-input"]').type('invalid@example.com');
    cy.get('[data-testid="password-input"]').type('wrongpassword');
    cy.get('[data-testid="login-button"]').click();
    cy.get('[data-testid="error-message"]').should('be.visible');
  });
});