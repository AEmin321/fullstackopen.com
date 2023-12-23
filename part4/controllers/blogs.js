const blogRoutes = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRoutes.get('/', async(request, response) => {
    const blogs = await Blog.find({}).populate('user',{username:1,name:1})
    response.json(blogs)
})

blogRoutes.delete('/:id',async(request,response)=>{
    const theId = request.params.id
    await Blog.findByIdAndDelete(theId)
    response.status(204).end()
})

blogRoutes.put('/:id',async(request,response)=>{
    const data = request.body
    const update = {
        title:data.title,
        author:data.author,
        url:data.url,
        likes:data.likes
    }
    const updatedItem = await Blog.findByIdAndUpdate(request.params.id,update,{new:true})
    response.json(updatedItem)
})
  
blogRoutes.post('/', async(request, response) => {
    const data = request.body
    const user = await User.findById(data.userId)
    const blog = new Blog({
        title:data.title,
        author:data.author,
        url:data.url,
        likes:data.likes,
        user:user.id
    })
    const result = await blog.save()
    user.blogs = user.blogs.concat(result._id)
    await user.save()
    response.status(201).json(result)
})

module.exports = blogRoutes