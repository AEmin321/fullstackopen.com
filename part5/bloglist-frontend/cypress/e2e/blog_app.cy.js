describe('Blog App', function(){
  beforeEach(function(){
    cy.request('POST','http://localhost:3002/api/testing/reset')
    const user = {
      username:'testing',
      name:'testAuthor',
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
      cy.contains('testAuthor is logged in')
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
      cy.login({ username:'testing',password:'testing' })
    })
    it('User can create new blog', function(){
      cy.contains('Create New Blog').click()
      cy.get('input[placeholder="title"]').type('sample title')
      cy.get('input[placeholder="author"]').type('testAuthor')
      cy.get('input[placeholder="url"]').type('thisistheurlprovided')
      cy.contains('Save').click()

      cy.contains('sample title')
    })

    describe('When a new blog created', function(){
      beforeEach(function(){
        cy.createBlog({ title:'sampletitle',author:'testAuthor',url:'https/theurlyouarelookingfor' })
        cy.createBlog({ title:'newmooonn',author:'testWrong',url:'https/theurlyouarelookingfor' })
        cy.createBlog({ title:'secondtitle',author:'testAuthor',url:'https/theurlyouarelookingfor' })
      })
      it('Users can like a blog', function(){
        cy.contains('secondtitle').parent().contains('View').click()
        cy.contains('secondtitle').parent().contains('0')
        cy.contains('secondtitle').parent().contains('like').click()
        cy.contains('secondtitle').parent().contains('1')
      })
      it('Blog can be deleted by the user who created', function(){
        cy.contains('sampletitle').parent().contains('View').click()
        cy.contains('sampletitle').parent().contains('Remove').click().should('not.exist')
      })
      it('Only user who created blog can see remove button', function(){
        cy.contains('sampletitle').parent().contains('View').click()
        cy.contains('sampletitle').parent().contains('Remove')

        cy.contains('newmooonn').parent().contains('View').click()
        cy.contains('newmooonn').parent().contains('Remove').should('not.exist')
      })
    })
  })
})