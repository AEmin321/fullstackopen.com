const blogRoutes = require('express').Router()
const Blog = require('../models/blog')

blogRoutes.get('/', async(request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogRoutes.delete('/:id',async(request,response)=>{
    const theId = request.params.id
    await Blog.findByIdAndDelete(theId)
    response.status(204).end()
})
  
blogRoutes.post('/', async(request, response) => {
    const data = request.body
    const blog = new Blog({
        title:data.title,
        author:data.author,
        url:data.url,
        likes:data.likes
    })
    const result = await blog.save()
    response.status(201).json(result)
})

module.exports = blogRoutes