require('dotenv').config()

const mongoUrl = process.env.MONGO_URL
const PORT = process.env.PORT

module.exports = {
    mongoUrl,PORT
}