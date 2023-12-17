const mongoose = require('mongoose')
mongoose.set('bufferTimeoutMS', 30000)
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
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

beforeEach(async()=>{
    await Blog.deleteMany({})
    const testBlogs = initData.map(item=>new Blog(item))
    const promiseBlogs = testBlogs.map(item=>item.save())
    await Promise.all(promiseBlogs)
},100000)

test('is data received in json', async ()=> {
    await api.get('/api/blogs').expect(200).expect('Content-Type',/application\/json/)
    const getBlogs = await Blog.find({})
    expect(getBlogs.length).toBe(3)
}, 10000)

test('is id defined',async()=>{
    const getBlogs = await Blog.find({})
    const ids = getBlogs.map(item=>item.id)
    console.log(ids)
    expect(ids).toBeDefined()
})

afterAll (async () => {
    await mongoose.connection.close()
}, 10000)