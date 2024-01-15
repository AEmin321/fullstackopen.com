describe('Blog App', function(){
  beforeEach(function(){
    cy.request('POST','http://localhost:3002/api/testing/reset')
    cy.visit('http://localhost:5173')
  })
  it('login form is shown', function(){
    cy.contains('login to application')
    cy.get('form').should('exist')
    cy.get('input[name="Username"]').should('exist')
    cy.get('input[name="Password"]').should('exist')
    cy.get('button[type="submit"]').should('exist')
  })
})