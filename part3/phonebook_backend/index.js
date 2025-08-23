const persons = require('./data')

const express = require('express')
const app = express()

const PORT = 3001


app.get('/', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end('At home page')
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
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

app.listen(PORT)

console.log(`Server running on port ${PORT}`)