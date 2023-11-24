const express = require('express')
const morgan = require('morgan')
require('dotenv').config()
const Contact = require('./modules/contact')
const app = express()
app.use (express.json())
app.use (express.static('dist'))

morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body'));


let persons=[
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const randomID = () => {
  return Math.floor(Math.random()*500)+1
}

app.post ('/api/persons',(req,res)=>{
  const data = req.body
  if (data.name===undefined || data.number===undefined){
    return res.status(400).json({error:'Name or the number is missing.'})
  }
  const newContact = new Contact({
    name: data.name,
    number: data.number
  })
  newContact.save().then(response=>{
    res.json(response)
  })
})

app.get ('/api/persons',(req,res)=>{
    Contact.find({}).then(response=>{
      res.json(response)
    })
})

app.get ('/api/info',(req,res)=>{
    const now = new Date()
    const getDate = now.toLocaleString()
    res.send (`<div><h3>Phonebook had info for ${persons.length} people.</h3><p>${getDate}</p></div>`)
})

app.delete ('/api/persons/:id',(req,res)=>{
  const id = Number(req.params.id)
  persons=persons.filter(item=>item.id!==id)
  res.status(204).end()
})

app.get ('/api/persons/:id',(req,res)=>{
    Contact.findById(req.params.id).then(response=>{
      res.json(response)
    }).catch(error=>{
      console.log('cant find the given contact.',error)
    })
})

const PORT = process.env.PORT||3000
app.listen (PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})