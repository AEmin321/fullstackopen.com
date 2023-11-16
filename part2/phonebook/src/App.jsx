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

  const handleDelete =(id)=>{
    const getObj = persons.find(item=>item.id===id)
    if (window.confirm(`Are you sure you want to delete ${getObj.name}`)) {
      services.deleteData(id).then(data=>{
        setPersons(persons.filter(item=>item.id!==id))
      })
    }
  }

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
    const findValue=persons.some(item=>item.name===newName)
    console.log(findValue)

    if(findValue) {
      const selected=persons.find(item=>item.name===newName)
      if (selected.name===newName && selected.number===newNumber) {
        return alert(`${newName} and ${newNumber} already exists in your phonebook.`)
      }
  
      if (selected.name===newName && selected.number!==newNumber) {
        const updatedObj ={...selected ,number:newNumber}
        if(window.confirm(`${selected.name} is already in your phonebook, do you want to update the phone number ?`)) {
          services.updateData(selected.id,updatedObj).then(data=>{
            setPersons(persons.map(item=>item.id!==data.id ? item : data))
          })
        }
      }
      setNewName('')
      setNewNumber('')
      return
    }
    const newObj={
      name: newName,
      number: newNumber
    }
    services.postData(newObj).then(res=>{
      setPersons(persons.concat(res))
    })
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterValue={filterValue} handleFilter={handleFilter}/>
      <h2>Add New</h2>
      <PersonForm newName={newName} handleName={handleName} newNumber={newNumber} handleNumber={handleNumber} handleSubmit={handleSubmit}/>
      <h2>Numbers</h2>
      <Person persons={allPersons} handleDelete={handleDelete}/>
    </div>
  )
}

export default App