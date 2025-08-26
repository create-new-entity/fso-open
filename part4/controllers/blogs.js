const Blog = require('../models/Blog')
const blogsRoutes = require('express').Router()

const baseURL = '/api/blogs'

blogsRoutes.get(baseURL, async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRoutes.post(baseURL, async (request, response) => {
    const blog = new Blog(request.body)

    const result = await blog.save()
    response.status(201).json(result)
})

blogsRoutes.delete(`${baseURL}/:id`, async (req, res) => {
    await Blog.findByIdAndDelete(req.params.id)
    res.status(200).end()
})

module.exports = blogsRoutes
