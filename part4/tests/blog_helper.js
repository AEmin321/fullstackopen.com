const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const initData = [
    {
        title:'yessir',
        author:'sample author',
        url:'http:/anythingabouturlgoesherer.com',
        likes:234,
        user:'658df0400159651adc9cee3e'
    },
    {
        title:'bullshit',
        author:'sample author',
        url:'http:/anythingabouturlgoesherer.com',
        likes:234,
        user:'658df0400159651adc9cee3e'
    },
    {
        title:'shit',
        author:'sample author',
        url:'http:/anythingabouturlgoesherer.com',
        likes:234,
        user:'658df0400159651adc9cee3e'
    }
]

const generateToken = (userId) => {
    const token = jwt.sign({id:userId},process.env.SECRET)
    return `Bearer ${token}`
}

const usersInDb = async ()=> {
    const users = await User.find({})
    return users.map(user=>user.toJSON())
}

const getData = async ()=> {
    const data = await Blog.find({})
    return data.map(item=>item.toJSON())
}


module.exports = {
    getData,initData,usersInDb,generateToken
}