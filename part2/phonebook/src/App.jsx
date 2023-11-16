import { useState,useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Person from './components/Persons'
import axios from 'axios'
import services from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue,setFilterValue] = useState('')
  const [filter,setFilter] = useState(false)

  useEffect(()=>{
    services.getData().then(data=>{
      setPersons(data)
      console.log('inside effect')
    })
  },[])

  const allPersons=filter ? persons.filter(item=>item.name.toLowerCase().includes(filterValue.toLowerCase())) : persons

  const handleFilter =(event)=>{
    setFilterValue(event.target.value)
    setFilter(true)
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
    services.postData(newObj).then(res=>{
      setPersons(persons.concat(res))
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