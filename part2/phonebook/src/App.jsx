import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue,setFilterValue] = useState('')
  const [filter,setFilter] = useState(true)

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
      number: newNumber,
      id: persons.length+1
    }
    setPersons(persons.concat(newObj))
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with : <input value={filterValue} onChange={handleFilter} type='text'/>
      </div>
      <h2>Add New</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleName}/>
        </div>
        <div>
          number: <input value={newNumber} type="tel" onChange={handleNumber}/>
        </div>
        <div>
          <button onClick={handleSubmit} type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {allPersons.map(item=><li key={item.id}>{item.name} - {item.number}</li>)}
      </ul>
    </div>
  )
}

export default App