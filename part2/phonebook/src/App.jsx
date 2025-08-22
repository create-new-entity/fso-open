import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import personService from './services/persons'

const Filter = ({ handleFilterChange, filter }) => {
  return (
    <div>
      filter shown with <input onChange={handleFilterChange} value={filter}/>
    </div>
  )
}

const Persons = (props) => {
  const { persons, filter, setPersons } = props

  const handleDelete = (id) => {
    const foundPerson = persons.find((person) => person.id === id)
    if(!foundPerson) {
      return () => {}
    }
    return () => {
      const deleteMsg = `Delete ${foundPerson.name}?`
      if(window.confirm(deleteMsg)) {
        personService.deletePerson(id)
            .then(() => {
              const filteredPersons = persons.filter((person) => person.id !== id)
              setPersons(filteredPersons)
            })
            .catch((error) => {
              console.error('Error deleting person:', error)
            })
      }
    }
  }
  return (
    <>
      {
        persons
          .filter((person) => {
            return person.name.toLowerCase().includes(filter.toLowerCase())
          })
          .map((person) => {
            return (
              <div key={`${person.id} ${person.name}`}>
                <p>{person.name} {person.number}</p>
                <button onClick={handleDelete(person.id)}>delete</button>
              </div>
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

    const existingPerson = persons.find((person) => {
      return person.name.toLowerCase() === newName.toLowerCase()
    })

    if(existingPerson) {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedPerson = {
          ...existingPerson,
          number: newNumber
        }
        personService.update(existingPerson.id, updatedPerson)
          .then((response) => {
            setPersons(persons.map((person) => person.id !== existingPerson.id ? person : response))
            setNewName('')
            setNewNumber('')
          })
          .catch((error) => {
            console.error('Error updating person:', error)
          })
      }
      return
    }

    const nameObject = {
      name: newName,
      number: newNumber
    }

    personService.create(nameObject)
      .then((response) => {
        setPersons(persons.concat(response))
        setNewName('')
        setNewNumber('')
      })
      .catch((error) => {
          console.log('Failed to create new person:', error)
      })
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
      <Persons persons={persons} filter={filter} setPersons={setPersons}/>
    </div>
  )
}

export default App