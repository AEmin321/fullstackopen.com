const blogRoutes = require('express').Router()
const middleware = require('../utils/middleware')
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogRoutes.get('/', async(request, response) => {
    const blogs = await Blog.find({}).populate('user',{username:1,name:1})
    response.json(blogs)
})

blogRoutes.delete('/:id',middleware.userExptractor,async(request,response)=>{
    const theId = request.params.id
    // const decodeToken = await jwt.verify(request.token,process.env.SECRET)
    const blog = await Blog.findById(theId)
    // if (!decodeToken.id){
    //     return response.status(401).json({error:'token invalid'})
    // }
    const user = request.user
    if (user.id.toString()===blog.user.toString()){
        await Blog.findByIdAndDelete(theId)
        return response.status(204).end()
    }
    response.status(401).json({error:'token invalid'})
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
  
blogRoutes.post('/',middleware.userExptractor, async(request, response) => {
    const data = request.body
    // const decodeToken = jwt.verify(request.token,process.env.SECRET)
    // if (!decodeToken.id){
    //     return response.status(401).json({error:'token invalid'})
    // }
    const user = request.user
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