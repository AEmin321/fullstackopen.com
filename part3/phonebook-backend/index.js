const express = require('express')
const app = express()
app.use (express.json())

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
  
  const person = {
    id : randomID(),
    name : data.name,
    number : data.number
  }
  persons.concat(person)
  res.json(person)
})

app.get ('/api/persons',(req,res)=>{
    res.json(persons)
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
    const id = Number(req.params.id)
    const person = persons.find(item=>item.id===id)
    
    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

const PORT = 3000
app.listen (PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})