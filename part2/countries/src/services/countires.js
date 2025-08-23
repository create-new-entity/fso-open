import axios from 'axios'

const baseURL = 'https://studies.cs.helsinki.fi/restcountries/api'

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

export default {
    getAll,
    getCountry
}