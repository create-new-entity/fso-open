import { useState, useEffect } from 'react'
import countiresService, { baseURLWeatherIcon } from './services/countires'

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

const getInitialStateOfShowCountry = (filteredCountries) => {
  const initialState = {}
  filteredCountries.forEach((country) => {
    initialState[country.name.common] = false
  })
  return initialState
}


const Weather = (props) => {
  const { capital, capitalInfo } = props
  const [weather, setWeather] = useState(null)

  const { latlng } = capitalInfo

  useEffect(() => {
    countiresService.getWeather(latlng[0], latlng[1])
        .then((weather) => {
          setWeather(weather)
        })
        .catch((error) => {
          console.log('Failed to fetch weather', error)
        })
  }, [latlng])
  
  return (
    <div>
      <h2>Weather in {capital[0]}</h2>
      {
        weather &&
        <>
          <p>Temperature {weather.current.temp} Celsius</p>
          <img src={`${baseURLWeatherIcon}/${weather.current.weather[0].icon}@2x.png`} alt="Weather icon" />
          <p>Wind {weather.current.wind_speed} m/s</p>
        </>
      }
      
    </div>
  )
}

const CountryList = (props) => {
  const { filteredCountries } = props
  const [showCountry, setShowCountry] = useState(getInitialStateOfShowCountry(filteredCountries))

  const getHandleShowCountry = (countryCommonName) => {
    return () => {
      setShowCountry((prevState) => {
        const newState = { ...prevState }
        newState[countryCommonName] = !newState[countryCommonName]
        return newState
      })
    }
  }

  return (
    <div>
      {filteredCountries.map((country) => {
        return (
          <div key={country.name.common}>
            {country.name.common}
            <button style={{ marginLeft: '5px' }} onClick={getHandleShowCountry(country.name.common)}>
              {
                showCountry[country.name.common] ? 'Hide' : 'Show'
              }
            </button>
            {
              showCountry[country.name.common] && <Country country={country} />
            }
          </div>
        )
      })}
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
      <Weather capital={country.capital} capitalInfo={country.capitalInfo} />
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
        searchInput &&filteredCountries.length > 10 &&
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
