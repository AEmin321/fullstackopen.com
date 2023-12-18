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

test('Testing the missing likes',async ()=>{
    const likeMissing = {
        title:'yalla',
        author:'sample author',
        url:'http:/anythingabouturlgoesherer.com',
    }
    await api.post('/api/blogs').send(likeMissing).expect(201).expect('Content-Type',/application\/json/)
    const getData = await helper.getData()
    const desiredData = getData[getData.length-1]
    expect(desiredData.likes).toBe(0)
})

test('Testing missing title', async()=>{
    const titleMissing = {
        author:'sample author',
        url:'http:/anythingabouturlgoesherer.com',
        likes:2342
    }
    await api.post('/api/blogs').send(titleMissing).expect(400)
},10000)

test('Testing missing url',async()=>{
    const urlMissing = {
        title:'yalla',
        author:'sample author',
        likes:23
    }
    await api.post('/api/blogs').send(urlMissing).expect(400)
},10000)

test('Testing if id is defined',async()=>{
    const getBlogs = await helper.getData()
    const ids = getBlogs.map(item=>item.id)
    expect(ids).toBeDefined()
})

describe('Tests for deletion of and item', ()=>{
    test('code 204 it works and does not contain the deleted file',async()=>{
        const dataAtStart = await helper.getData()
        const itemToDelete = dataAtStart[0]
        await api.delete(`/api/blogs/${itemToDelete._id}`).expect(204)
        const dataAtEnd = await helper.getData()
        const dataTitles = dataAtEnd.map(item=>item.title)
        
        expect(dataAtEnd).toHaveLength(helper.initData.length-1)
        expect(dataTitles).not.toContain(itemToDelete.title)
    })
})

describe('Tests for updating an object',()=>{
    test('testing if an item updated when put',async()=>{
        const getDataBeforeUpdate = await helper.getData()
        const sampleObj = {
            title:'a',
            author:'a',
            url:'a',
            likes:111
        }
        await api.put(`/api/blogs/${getDataBeforeUpdate[0]._id}`).send(sampleObj).expect(200).expect('Content-Type',/application\/json/)
        const dataAfterUpdate = await helper.getData()
        expect(dataAfterUpdate[0].likes).toBe(111)
        expect(dataAfterUpdate[0].title).toEqual('a')
    })
})

afterAll (async () => {
    await mongoose.connection.close()
}, 10000)