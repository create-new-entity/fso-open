import { useState } from 'react'

let idTracker = 0

const App = () => {
  const [persons, setPersons] = useState([
    { id: idTracker++, name: 'Arto Hellas', number: '040-123456' },
  ]) 

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleAdd = (event) => {
    event.preventDefault()

    if(!newName || !newNumber) {
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
      name: newName,
      number: newNumber,
      id: idTracker++
    }
    setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleAdd}>
        <div>
          name: <input onChange={handleNameChange} value={newName} />
        </div>
        <div>
          number: <input onChange={handleNumberChange} value={newNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {
        persons.map((person) => {
          return (
            <p key={person.id}>{person.name} {person.number}</p>
          )
        })
      }
    </div>
  )
}

export default App