
const config = require('./utils/config')
const logger = require('./utils/logger')
const morgan = require('morgan')
const mongoose = require('mongoose')
const blogsRoutes = require('./controllers/blogs')
const middlewares = require('./utils/middleware')

morgan.token('requestBody', function getId (req) {
    return req.body
})

const express = require('express')

const app = express()

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :requestBody'))
app.use(blogsRoutes)

app.use(middlewares.unknownEndpoint)
app.use(middlewares.errorHandler)

mongoose
    .connect(config.MONGODB_URI)
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch((error) => {
        logger.error('error connection to MongoDB:', error.message)
    })

module.exports = app