const Blog = require('../models/blog')

const initData = [
    {
        title:'yalla',
        author:'sample author',
        url:'http:/anythingabouturlgoesherer.com',
        likes:234
    },
    {
        title:'yalla',
        author:'sample author',
        url:'http:/anythingabouturlgoesherer.com',
        likes:234
    },
    {
        title:'yalla',
        author:'sample author',
        url:'http:/anythingabouturlgoesherer.com',
        likes:234
    }
]

const getData = async ()=> {
    const data = await Blog.find({})
    return data.map(item=>item.toJSON())
}


module.exports = {
    getData,initData
}