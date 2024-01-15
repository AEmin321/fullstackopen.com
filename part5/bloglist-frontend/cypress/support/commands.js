Cypress.Commands.add('Login', (user) => {
  cy.request('POST', 'http://localhost:3002/api/login', {
    username:user.username, password:user.password
  }).then(({ body }) => {
    localStorage.setItem('loggedUser', JSON.stringify(body))
    cy.visit('http://localhost:5173')
  })
})