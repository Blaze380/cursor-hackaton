describe('Auth demo', () => {
  it('renders the sign-in page', () => {
    cy.visit('/auth/sign-in');
    cy.contains('Sign in').should('be.visible');
  });

  it('redirects unauthenticated users from dashboard to sign-in', () => {
    cy.visit('/dashboard');
    cy.url().should('include', '/auth/sign-in');
    cy.url().should('include', 'redirectTo');
  });

  it('shows auth CTAs on the landing page', () => {
    cy.visit('/');
    cy.contains('Sign in').should('be.visible');
    cy.contains('Create account').should('be.visible');
  });
});
