import { useState, useEffect } from 'react'
import countiresService from './services/countires'

const Search = (props) => {
  const {
    searchInput,
    setSearchInput,
    allCountries,
    setFilteredCountries
  } = props

  const handleSearchInputChange = (event) => {
    const searchInputText = event.target.value
    setSearchInput(searchInputText)
    const newFilteredCountries = allCountries.filter((country) => {
      return country.name.common.toLowerCase().includes(searchInputText.toLowerCase())
    })
    setFilteredCountries(newFilteredCountries)
  }

  return (
    <div>
      find countries <input value={searchInput} onChange={handleSearchInputChange} />
    </div>
  )
}

const CountryList = (props) => {
  const { filteredCountries } = props

  return (
    <div>
      {filteredCountries.map((country) => (
        <div key={country.name.common}>{country.name.common}</div>
      ))}
    </div>
  )
}

const Country = (props) => {
  const { country } = props

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <h2>languages</h2>
      <ul>
        {
          Object.values(country.languages).map((language) => (
            <li key={language}>{language}</li>
          ))
        }
      </ul>
      <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
    </div>
  )
}

const App = () => {
  const [searchInput, setSearchInput] = useState('')
  const [allCountries, setAllCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    countiresService.getAll()
      .then((countries) => {
        setAllCountries(countries)
      })
      .catch((error) => {
        console.log('Failed to fetch countries', error)
      })
  }, [])

  return (
    <>
      <Search
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        allCountries={allCountries}
        setFilteredCountries={setFilteredCountries}
      />
      {
        filteredCountries.length > 10 &&
        <p>Too many matches, specify another filter</p>
      }
      {
        filteredCountries.length > 1 && filteredCountries.length <= 10 &&
        <CountryList filteredCountries={filteredCountries} />
      }
      {
        filteredCountries.length === 1 &&
        <Country country={filteredCountries[0]} />
      }
    </>
  )
}

export default App
