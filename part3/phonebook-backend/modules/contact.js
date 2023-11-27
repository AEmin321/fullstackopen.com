const mongoose = require('mongoose')
require('dotenv').config()

mongoose.set('strictQuery',false)

const url = process.env.PHONEBOOK_URL
console.log('Connecting to the URL:',url)

mongoose.connect(url).then(res=>{
    console.log('Connected to mongoDB...')
}).catch(error=>{
    console.log('An error occured while connecting to mongoDB:',error.message)
})

const contactSchema = new mongoose.Schema({
    name: {
        type:String,
        minLength:3,
        required:true
    },
    number: String
})

contactSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
})

module.exports = mongoose.model('Contact',contactSchema)
