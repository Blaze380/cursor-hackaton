describe('smoke', () => {
  it('loads the home page', () => {
    cy.visit('/');
    cy.contains('Forge Web').should('be.visible');
  });
});
