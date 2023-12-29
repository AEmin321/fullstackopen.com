const mongoose = require('mongoose')
mongoose.set('bufferTimeoutMS', 30000)
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./blog_helper')
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const getToken = '658df0400159651adc9cee3e'

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
        likes:234,
        user:'658df0400159651adc9cee3e'
    }
    await api.post('/api/blogs').set('Authorization',helper.generateToken(getToken)).send(newObj).expect(201).expect('Content-Type',/application\/json/)
    const getData = await helper.getData()
    const getTitles = getData.map(item=>item.title)
    console.log(getData.length,helper.initData.length)
    expect(getData).toHaveLength(helper.initData.length+1)
    expect(getTitles).toContain('yalla')
})

test('Testing if adding blog fails if token is not provided', async()=>{
    const blog = {
        title:'aaaaa',
        author:'sampleauthor',
        url:'htttp:/asnyiskla;s/asdjf',
        user:'658df0400159651adc9cee3e'
    }
    await api.post('/api/blogs').send(blog).expect(401)
})

test('Testing the missing likes',async ()=>{
    const likeMissing = {
        title:'yalla',
        author:'sample author',
        url:'http:/anythingabouturlgoesherer.com',
        user:'658df0400159651adc9cee3e'
    }
    await api.post('/api/blogs').set('Authorization',helper.generateToken(getToken)).send(likeMissing).expect(201).expect('Content-Type',/application\/json/)
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
    await api.post('/api/blogs').set('Authorization',helper.generateToken(getToken)).send(titleMissing).expect(400)
},10000)

test('Testing missing url',async()=>{
    const urlMissing = {
        title:'yalla',
        author:'sample author',
        likes:23
    }
    await api.post('/api/blogs').set('Authorization',helper.generateToken(getToken)).send(urlMissing).expect(400)
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
        await api.delete(`/api/blogs/${itemToDelete._id}`).set('Authorization',helper.generateToken(itemToDelete.user)).expect(204)
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

describe('Tests for users router', ()=>{
    beforeEach(async()=>{
        await User.deleteMany({})
        const hashPass = await bcrypt.hash('password',10)
        const user = new User({
            _id:'658df0400159651adc9cee3e',
            username:'root',
            name:'root',
            passwordHash:hashPass
        })
        await user.save()
    })
    test('testing if creating fresh user works', async()=>{
        const getUsers = await helper.usersInDb()
        const newUser = {
            username:'hellooo',
            name:'motherfucker',
            password:'hellooo'
        }
        await api.post('/api/users').send(newUser).expect(201).expect('Content-Type',/application\/json/)
        const usersAfter = await helper.usersInDb()
        const usernames = usersAfter.map(user=>user.username)
        
        expect(usersAfter).toHaveLength(getUsers.length+1)
        expect(usernames).toContain('hellooo')
    })
    test('testing the username uniquness and validation', async()=>{
        const usersBefore = await helper.usersInDb()
        const newUser = {
            username:'root',
            name:'farketmez',
            password:'budasikimde'
        }
        const result=await api.post('/api/users').send(newUser).expect(400).expect('Content-Type',/application\/json/)
        expect(result.body.error).toContain('expected `username` to be unique')
        const usersAfter = await helper.usersInDb()
        expect(usersAfter).toEqual(usersBefore)
    })
})

afterAll (async () => {
    await mongoose.connection.close()
}, 10000)