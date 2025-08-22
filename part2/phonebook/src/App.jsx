import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleAddName = (event) => {
    event.preventDefault()

    if(!newName) {
      return
    }

    const hasDuplicate = persons.some((person) => {
      return person.name.toLowerCase() === newName.toLowerCase()
    })

    if(hasDuplicate) {
      window.alert(`${newName} is already added to phonebook`)
      return
    }

    const nameObject = {
      name: newName
    }
    setPersons(persons.concat(nameObject))
    setNewName('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleAddName}>
        <div>
          name: <input onChange={handleNameChange} value={newName} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {
        persons.map((person, index) => 
          <p key={index}>{person.name}</p>  
        )
      }
    </div>
  )
}

export default App