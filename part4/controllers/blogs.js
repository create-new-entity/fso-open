const Blog = require('../models/Blog')
const blogsRoutes = require('express').Router()

blogsRoutes.get('/api/blogs', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRoutes.post('/api/blogs', async (request, response) => {
    const blog = new Blog(request.body)

    const result = await blog.save()
    response.status(201).json(result)
})

module.exports = blogsRoutes
