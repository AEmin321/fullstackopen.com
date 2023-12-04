const blogRoutes = require('express').Router()
const Blog = require('../models/blog')

blogRoutes.get('/', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
    })
})
  
blogRoutes.post('/', (request, response) => {
    const blog = new Blog(request.body)
  
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
    })
})

module.exports = blogRoutes