import axios from 'axios'

const OPEN_WEATHER_MAP_API_KEY = import.meta.env.VITE_SOME_KEY

const baseURL = 'https://studies.cs.helsinki.fi/restcountries/api'
export const baseURLWeatherIcon = 'https://openweathermap.org/img/wn'

// Given latitude and longitude, return the URL for the weather API
const getUrlOpenWeatherMap = (lat, lon) => {
    return `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude={minutely,hourly,daily,alerts}&units=metric&appid=${OPEN_WEATHER_MAP_API_KEY}`
}



const enpoints = {
    all: `${baseURL}/all`,
    name: `${baseURL}/name/` // Prefix for the name endpoint
}

const getAll = () => {
    return axios.get(enpoints.all)
        .then(response => response.data)
}

const getCountry = (name) => {
    return axios.get(`${enpoints.name}/${name}`)
        .then(response => response.data)
}

const getWeather = (lat, lon) => {
    return axios.get(getUrlOpenWeatherMap(lat, lon))
        .then(response => response.data)
}

export default {
    getAll,
    getCountry,
    getWeather
}