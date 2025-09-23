const User = require('../models/User')
const usersRoutes = require('express').Router()
const bcrypt = require('bcrypt')

const baseURL = '/api/users'

usersRoutes.get(baseURL, async (req, res) => {
    const users = await User.find({}).populate('blogs')
    res.json(users)
})

usersRoutes.get(`${baseURL}/:id`, async (req, res) => {
    const user = await User.findById(req.params.id).populate('blogs')
    res.json(user)
})

usersRoutes.post(baseURL, async (req, res) => {
    const { username, name, password } = req.body

    if(!password) {
        res.status(400).send({ error: 'Password is required.' })
        return
    }
    if(password.length < 3) {
        res.status(400).send({ error: 'Password should be at least 3 characters long.' })
        return
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash,
        blogs: []
    })

    const savedUser = await user.save()
    res.status(201).json(savedUser)
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
