import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '043-1234567' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

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
    setPersons(persons.concat(newObj))
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
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
        {persons.map(item=><li key={item.name}>{item.name} - {item.number}</li>)}
      </ul>
    </div>
  )
}

export default App