import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'

let idTracker = 0

const Filter = ({ handleFilterChange, filter }) => {
  return (
    <div>
      filter shown with <input onChange={handleFilterChange} value={filter}/>
    </div>
  )
}

const Persons = (props) => {
  const { persons, filter } = props
  return (
    <>
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
    </>
  )
}

const PersonForm = (props) => {
  const {
    handleAdd,
    handleNameChange,
    newName,
    handleNumberChange,
    newNumber
  } = props
  return (
    <>
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
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/persons')
        setPersons(response.data)
      }
      catch(e) {
        console.log('Something is rotten in the state of Denmark.', e)
      }
    }
    fetchData()
  }, [])



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
      <Filter handleFilterChange={handleFilterChange} filter={filter}/>
      
      <h3>Add a new</h3>
      <PersonForm
        handleAdd={handleAdd}
        handleNameChange={handleNameChange}
        newName={newName}
        handleNumberChange={handleNumberChange}
        newNumber={newNumber}
      />
      
      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter}/>
    </div>
  )
}

export default App