const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.post('/', async(request,response)=>{
    const {username,name,password} = request.body
    const saltRound = 10
    const hashPassword = await bcrypt.hash(password,saltRound)

    const user = new User({
        username:username,
        name:name,
        passwordHash:hashPassword
    })

    const savedUser = await user.save()
    response.status(201).json(savedUser)
})

usersRouter.get('/', async(request,response)=>{
    const getUsers = await User.find({}).populate('blogs',{ur:1,title:1,author:1})
    response.json(getUsers)
})

module.exports = usersRouter