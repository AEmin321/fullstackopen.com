const mongoose = require('mongoose')
require('dotenv').config()

mongoose.set('strictQuery',false)

const url = process.env.MONGODB_URI
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
    number: {
        type:String,
        validate:{
            validator:function(v){
                return /\d{3}-\d{3}\d{4}/.test(v);
            },
            message:props=>`${props.value} is not a valid phone number!`
        },
        required:[true,'Phone number is required'],
        minLength:8
    }
})

contactSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
})

module.exports = mongoose.model('Contact',contactSchema)
