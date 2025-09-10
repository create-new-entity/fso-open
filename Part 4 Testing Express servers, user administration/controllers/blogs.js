const Blog = require('../models/Blog')
const blogsRoutes = require('express').Router()
const { userExtractor } = require('../utils/middleware')


const baseURL = '/api/blogs'

blogsRoutes.get(baseURL, async (request, response) => {
    const blogs = await Blog.find({}).populate('user')
    response.json(blogs)
})

blogsRoutes.post(baseURL, userExtractor, async (request, response) => {

    const candidateUser = request.user
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

blogsRoutes.delete(`${baseURL}/:id`, userExtractor, async (req, res) => {
    
    const candidateUser = req.user
    const blogToBeDeleted = await Blog.findById(req.params.id)
    if(!blogToBeDeleted) {
        res.status(400).json({ error: 'Blog not found.' })
    }
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
