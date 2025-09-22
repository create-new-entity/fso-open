import React, { useState, useEffect } from 'react'

const getSpecificDetails = (country) => {
  return {
    name: country.name.common,
    capital: country.capital[0],
    population: country.population,
    flag: country.flags.png
  }
}

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if(name) {
      (async () => {
        try {
          const url = `https://studies.cs.helsinki.fi/restcountries/api/name/${name}`
          const response = await fetch(url)
          let country = await response.json()
          country = { ...getSpecificDetails(country) }
          country.data = country
          country.found = true
          setCountry(country)
        }
        catch(e) {
          setCountry({})
        }
      })()
    }
  }, [name])

  return country
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.data.name} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div> 
      <img src={country.data.flag} height='100' alt={`flag of ${country.data.name}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App