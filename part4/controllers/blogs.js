const Blog = require('../models/Blog')
const User = require('../models/User')
const blogsRoutes = require('express').Router()
const jwt = require('jsonwebtoken')


const baseURL = '/api/blogs'

blogsRoutes.get(baseURL, async (request, response) => {
    const blogs = await Blog.find({}).populate('user')
    response.json(blogs)
})

blogsRoutes.post(baseURL, async (request, response) => {

    const token = request.token

    if(!token) {
        response.status(401).json({ error: 'Token not provided.' })
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

    if(!decodedToken.id) {
        response.status(401).json({ error: 'Invalid token' })
    }

    const candidateUser = await User.findById(decodedToken.id)
    if (!candidateUser) {
        return response.status(400).json({ error: 'UserId missing or not valid' })
    }

    const blogToCreate = request.body
    blogToCreate.user = candidateUser._id
    const blog = new Blog(blogToCreate)
    const result = await blog.save()

    candidateUser.blogs = [
        ...candidateUser.blogs,
        result._id
    ]
    await candidateUser.save()

    response.status(201).json(result)
})

blogsRoutes.delete(`${baseURL}/:id`, async (req, res) => {
    const token = req.token

    if(!token) {
        res.status(401).json({ error: 'Token not provided.' })
        return
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

    if(!decodedToken.id) {
        res.status(401).json({ error: 'Invalid token' })
        return
    }

    const candidateUser = await User.findById(decodedToken.id)
    if (!candidateUser) {
        return res.status(400).json({ error: 'UserId missing or not valid' })
    }
    
    const blogToBeDeleted = await Blog.findById(req.params.id)

    const isAllowedToDelete = blogToBeDeleted.user.toString() === candidateUser._id.toString()

    if(!isAllowedToDelete) {
        res.status(401).json({ error: 'User does not have permission to delete this blog.' })
        return
    }

    await Blog.findByIdAndDelete(req.params.id)

    candidateUser.blogs = candidateUser.blogs.filter((blogId) => {
        return blogId.toString() !== req.params.id
    })

    await candidateUser.save()

    res.status(200).end()
})

blogsRoutes.put(`${baseURL}/:id`, async (req, res) => {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body)
    res.status(200).send(updatedBlog)
})

module.exports = blogsRoutes
