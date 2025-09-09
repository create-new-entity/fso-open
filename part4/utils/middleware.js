const logger = require('./logger')

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        request.token = authorization.replace('Bearer ', '')
    }
    next()
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }
    else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }
    else if(error.name === 'JsonWebTokenError') {
        return response.status(401).json({ error: 'Invalid token' })
    }
    else if(error.name === 'MongoServerError' && error.message.includes('duplicate key error collection')) {
        const duplicateField = Object.keys(error['keyValue'])[0]
        return response.status(400).json({ error: `Duplicate ${duplicateField} is not allowed.` })
    }

    next(error)
}

const middlewares = {
    unknownEndpoint,
    errorHandler,
    tokenExtractor
}

module.exports = middlewares