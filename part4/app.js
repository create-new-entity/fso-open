
const config = require('./utils/config')
const logger = require('./utils/logger')
const morgan = require('morgan')
const mongoose = require('mongoose')
const blogsRoutes = require('./controllers/blogs')
const usersRoutes = require('./controllers/users')
const middlewares = require('./utils/middleware')

morgan.token('requestBody', function getRequestBody (req) {
    return JSON.stringify(req.body)
})

const express = require('express')
const loginRouter = require('./controllers/login')


const app = express()

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :requestBody'))

app.use(loginRouter)
app.use(blogsRoutes)
app.use(usersRoutes)

app.use(middlewares.unknownEndpoint)
app.use(middlewares.errorHandler)


mongoose.set('returnOriginal', false) // https://mongoosejs.com/docs/5.x/docs/api/model.html#model_Model.findByIdAndUpdate
mongoose
    .connect(config.MONGODB_URI)
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch((error) => {
        logger.error('error connection to MongoDB:', error.message)
    })

module.exports = app