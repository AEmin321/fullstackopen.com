const express = require('express')
const morgan = require('morgan')
require('dotenv').config()
const Contact = require('./modules/contact')
const app = express()

const unknownEndPoints = (req,res)=> {
	res.status(404).send({error:'Unknown end point.'})
}

const errorHandler = (error,req,res,next) =>{
	console.error(error.message,next)
	if (error.name==='CastError') {
		return res.status(400).send({error:'input id is not valid.'})
	}else if (error.name==='ValidationError'){
		return res.status(400).send({error:error.message})
	}
}

app.use (express.json())
app.use (express.static('dist'))

morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body'))

app.post ('/api/persons',(req,res,next)=>{
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
	}).catch(error=>next(error))
})

app.get ('/api/persons',(req,res)=>{
	Contact.find({}).then(response=>{
		res.json(response)
	})
})

app.get ('/api/info',(req,res)=>{
	const now = new Date()
	const getDate = now.toLocaleString()
	Contact.find({}).count().then(response=>{
		res.send(`<div><h3>Phonebook had info for ${response} people.</h3><p>${getDate}</p></div>`)
	})
})

app.delete ('/api/persons/:id',(req,res,next)=>{
	Contact.findByIdAndDelete(req.params.id).then(()=>{
		res.status(204).end()
	}).catch(error=>next(error))
})

app.put ('/api/persons/:id',(req,res,next)=>{
	const {name,number}=req.body
	Contact.findByIdAndUpdate(req.params.id,{name,number},{new:true,runValidators:true,context:'query'}).then(response=>{
		res.json(response)
	}).catch(error=>next(error))
})

app.get ('/api/persons/:id',(req,res,next)=>{
	Contact.findById(req.params.id).then(response=>{
		res.json(response)
	}).catch(error=>next(error))
})

app.use(unknownEndPoints)
app.use(errorHandler)

const PORT = process.env.PORT||3002
app.listen (PORT,()=>{
	console.log(`Server is running on port ${PORT}`)
})