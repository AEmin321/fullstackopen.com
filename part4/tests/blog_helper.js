const Blog = require('../models/blog')
const User = require('../models/user')

const initData = [
    {
        title:'yessir',
        author:'sample author',
        url:'http:/anythingabouturlgoesherer.com',
        likes:234
    },
    {
        title:'bullshit',
        author:'sample author',
        url:'http:/anythingabouturlgoesherer.com',
        likes:234
    },
    {
        title:'shit',
        author:'sample author',
        url:'http:/anythingabouturlgoesherer.com',
        likes:234
    }
]

const usersInDb = async ()=> {
    const users = await User.find({})
    return users.map(user=>user.toJSON())
}

const getData = async ()=> {
    const data = await Blog.find({})
    return data.map(item=>item.toJSON())
}


module.exports = {
    getData,initData,usersInDb
}