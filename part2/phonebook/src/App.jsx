import { useState } from 'react'

let idTracker = 0

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: idTracker++ },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: idTracker++ },
    { name: 'Dan Abramov', number: '12-43-234345', id: idTracker++ },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: idTracker++ }
  ]) 

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

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

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with <input onChange={handleFilterChange} value={filter}/>
      <h2>add a new</h2>
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
        persons
          .filter((person) => {
            return person.name.toLowerCase().includes(filter.toLowerCase())
          })
          .map((person) => {
            return (
              <p key={person.id}>{person.name} {person.number}</p>
            )
          })
      }
    </div>
  )
}

export default App