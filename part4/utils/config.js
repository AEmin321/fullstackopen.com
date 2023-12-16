require('dotenv').config()

const PORT = process.env.PORT
const mongoUrl = process.env.NODE_ENV==='test' ? process.env.MONGO_URL_TEST : process.env.MONGO_URL

module.exports = {
    mongoUrl,PORT
}