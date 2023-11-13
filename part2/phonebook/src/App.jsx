import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleChange=(event)=>{
    setNewName(event.target.value)
  }

  const handleSubmit=(event)=>{
    event.preventDefault()
    const newObj={
      name: newName
    }
    setPersons(persons.concat(newObj))
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleChange}/>
        </div>
        <div>
          <button onClick={handleSubmit} type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(item=><li key={item.name}>{item.name}</li>)}
      </ul>
    </div>
  )
}

export default App