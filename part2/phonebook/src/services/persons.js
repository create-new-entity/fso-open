import axios from 'axios'

const baseUrl = 'http://localhost:3002/api/persons'

const getAll = () => {
    return axios.get(baseUrl).then(response => response.data)
}

const update = (id, newPerson) => {
    return axios
        .put(`${baseUrl}/${id}`, newPerson)
        .then(response => response.data)
        .catch(error => {
            console.error('Error updating person:', error)
            throw error
        })
}

const create = (newPerson) => {
    return axios
        .post(baseUrl, newPerson)
        .then(response => response.data)
        .catch(error => {
            console.error('Error creating person:', error)
            throw error
        })
}

const deletePerson = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
        .then((response) => {
            return response.data
        })
        .catch(error => {
            console.error('Error deleting person:', error)
            throw error
        })
}

export default {
    getAll,
    update,
    create,
    deletePerson
}

