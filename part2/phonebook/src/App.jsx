import { useState,useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Person from './components/Persons'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue,setFilterValue] = useState('')
  const [filter,setFilter] = useState(true)

  useEffect(()=>{
    axios.get('http://localhost:3002/persons').then(promise=>{
      setPersons(promise.data)
      console.log('Done from effect')
    })
  },[])

  const allPersons=filter ? persons : persons.filter(item=>item.name.toLowerCase().includes(filterValue.toLowerCase()))

  const handleFilter =(event)=>{
    setFilterValue(event.target.value)
    setFilter(false)
  }

  const handleName=(event)=>{
    setNewName(event.target.value)
  }

  const handleNumber=(event)=>{
    setNewNumber(event.target.value)
  }

  const handleSubmit=(event)=>{
    event.preventDefault()
    if (persons.some((item)=>item.name===newName)) {
      return alert(`${newName}  is already added to phonebook.`)
    }
    const newObj={
      name: newName,
      number: newNumber
    }
    axios.post('http://localhost:3002/persons',newObj).then(res=>{
      setPersons(persons.concat(res.data))
      setNewName('')
      setNewNumber('')
    })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterValue={filterValue} handleFilter={handleFilter}/>
      <h2>Add New</h2>
      <PersonForm newName={newName} handleName={handleName} newNumber={newNumber} handleNumber={handleNumber} handleSubmit={handleSubmit}/>
      <h2>Numbers</h2>
      <Person persons={allPersons}/>
    </div>
  )
}

export default App