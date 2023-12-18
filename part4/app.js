const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const config = require('./utils/config')
require('express-async-errors')
const app = express()
const blogRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')

mongoose.connect(config.mongoUrl).then(() => {
    logger.info('Connected to the mongodb..')
}).catch(error => {
    logger.info('cant connect to the mongodb')
})

app.use(cors())
app.use(express.json())
app.use(middleware.reqLogger)
app.use('/api/blogs',blogRouter)
app.use(middleware.unknownEndPoint)
app.use(middleware.errorHnadler)

module.exports = app