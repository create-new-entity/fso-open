const User = require('../models/User')
const usersRoutes = require('express').Router()
const bcrypt = require('bcrypt')

const baseURL = '/api/users'

usersRoutes.get(baseURL, async (request, response) => {
    const users = await User.find({})
    response.json(users)
})

usersRoutes.post(baseURL, async (request, response) => {
    const { username, name, password } = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash
    })

    const savedUser = await user.save()
    response.status(201).json(savedUser)
})

usersRoutes.delete(`${baseURL}/:id`, async (req, res) => {
    await User.findByIdAndDelete(req.params.id)
    res.status(200).end()
})

usersRoutes.put(`${baseURL}/:id`, async (req, res) => {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body)
    res.status(200).send(updatedUser)
})

module.exports = usersRoutes
