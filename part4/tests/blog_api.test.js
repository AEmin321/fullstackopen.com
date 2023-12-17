const mongoose = require('mongoose')
mongoose.set('bufferTimeoutMS', 30000)
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./blog_helper')
const Blog = require('../models/blog')

beforeEach(async()=>{
    await Blog.deleteMany({})
    const testBlogs = helper.initData.map(item=>new Blog(item))
    const promiseBlogs = testBlogs.map(item=>item.save())
    await Promise.all(promiseBlogs)
},100000)

test('Testing to see if data fetched', async ()=> {
    await api.get('/api/blogs').expect(200).expect('Content-Type',/application\/json/)
    const getBlogs = await helper.getData()
    expect(getBlogs.length).toBe(3)
}, 10000)

test('Posting to the database',async()=>{
    const newObj = {
        title:'yalla',
        author:'sample author',
        url:'http:/anythingabouturlgoesherer.com',
        likes:234
    }
    await api.post('/api/blogs').send(newObj).expect(201).expect('Content-Type',/application\/json/)
    const getData = await helper.getData()
    const getTitles = getData.map(item=>item.title)
    console.log(getData.length,helper.initData.length)
    expect(getData).toHaveLength(helper.initData.length+1)
    expect(getTitles).toContain('yalla')
})

test('Testing if id is defined',async()=>{
    const getBlogs = await helper.getData()
    const ids = getBlogs.map(item=>item.id)
    expect(ids).toBeDefined()
})

afterAll (async () => {
    await mongoose.connection.close()
}, 10000)