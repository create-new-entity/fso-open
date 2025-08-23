let { persons } = require('./data')

const express = require('express')
const { getRandomInteger } = require('./utils')
const app = express()

app.use(express.json())

const PORT = 3001


app.get('/', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end('At home page')
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => { 
    const id = req.params.id
    const person = persons.find(person => person.id === id)
    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.get('/info', (req, res) => {
    const date = new Date()
    const response = `
        <div>
            <p>Phonebook has info for ${persons.length} people</p>
            <p>${date}</p>
        </div>
    `
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end(response)
})

app.post('/api/persons', (req, res) => {
    const person = req.body
    person.id = getRandomInteger()
    persons = persons.concat(person)
    res.status(201).json(person)
})

app.delete('/api/persons/:id', (req, res) => {
    const deleteId = req.params.id
    persons = persons.filter(person => person.id !== deleteId)
    res.status(204).end()
})

app.listen(PORT)

console.log(`Server running on port ${PORT}`)