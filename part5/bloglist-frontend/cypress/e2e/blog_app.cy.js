describe('Blog App', function(){
  beforeEach(function(){
    cy.request('POST','http://localhost:3002/api/testing/reset')
    const user = {
      username:'testing',
      name:'theTEst',
      password:'testing'
    }
    cy.request('POST','http://localhost:3002/api/users/', user)
    cy.visit('http://localhost:5173')
  })
  it('login form is shown', function(){
    cy.contains('login to application')
    cy.get('form').should('exist')
    cy.get('input[name="Username"]').should('exist')
    cy.get('input[name="Password"]').should('exist')
    cy.get('button[type="submit"]').should('exist')
  })

  describe('Login', function(){
    it('Succeeds using correct username and password', function(){
      cy.get('input[name="Username"]').type('testing')
      cy.get('input[name="Password"]').type('testing')
      cy.contains('Login').click()
      cy.contains('theTEst is logged in')
    })
    it('Faild login using wrong username or password', function(){
      cy.get('input[name="Username"]').type('testing')
      cy.get('input[name="Password"]').type('wrong')
      cy.contains('Login').click()
      cy.contains('Wrong user name or password')
    })
  })

  describe('When a user is logged in', function(){
    beforeEach(function(){
      cy.request('POST','http://localhost:3002/api/login',{ username:'testing',password:'testing' }).then(response => {
        localStorage.setItem('loggedUser',JSON.stringify(response.body))
        cy.visit('http://localhost:5173')
      })
    })
    it('User can create new blog', function(){
      cy.contains('Create New Blog').click()
      cy.get('input[placeholder="title"]').type('sample title')
      cy.get('input[placeholder="author"]').type('sample author')
      cy.get('input[placeholder="url"]').type('thisistheurlprovided')
      cy.contains('Save').click()

      cy.contains('sample title')
    })

    describe('When a new blog created', function(){
      beforeEach(function(){
        cy.contains('Create New Blog').click()
        cy.get('input[placeholder="title"]').type('sample title')
        cy.get('input[placeholder="author"]').type('sample author')
        cy.get('input[placeholder="url"]').type('thisistheurlprovided')
        cy.contains('Save').click()

        cy.contains('sample title')
      })
      it('Users can like a blog', function(){
        cy.contains('View').click()
        cy.contains('0')
        cy.contains('like').click()
        cy.contains('1')
      })
    })
  })
})