
import axios from 'axios'

export const getAnecdotes = () => {
    return axios.get('http://localhost:3001/anecdotes').then(res => res.data)
}

export const createAnecdote = (newAnecdote) => {
    return axios.post('http://localhost:3001/anecdotes', newAnecdote).then(res => res.data)
}

export const updateAnecdote = (anecdote) => {
    return axios.put(`http://localhost:3001/anecdotes/${anecdote.id}`, anecdote).then(res => res.data)
}