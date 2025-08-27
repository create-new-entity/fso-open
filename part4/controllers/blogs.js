const Blog = require('../models/Blog')
const User = require('../models/User')
const blogsRoutes = require('express').Router()

const baseURL = '/api/blogs'

blogsRoutes.get(baseURL, async (request, response) => {
    const blogs = await Blog.find({}).populate('user')
    response.json(blogs)
})

blogsRoutes.post(baseURL, async (request, response) => {

    const allUsers = await User.find({})
    const candidateUser = allUsers[0]

    console.log('allUsers', allUsers)

    const blogToCreate = request.body
    blogToCreate.user = candidateUser._id
    const blog = new Blog(blogToCreate)
    const result = await blog.save()

    console.log('blogToCreate', blogToCreate)
    console.log('result', result)

    candidateUser.blogs = [
        ...candidateUser.blogs,
        result._id
    ]
    await candidateUser.save()

    response.status(201).json(result)
})

blogsRoutes.delete(`${baseURL}/:id`, async (req, res) => {
    await Blog.findByIdAndDelete(req.params.id)
    res.status(200).end()
})

blogsRoutes.put(`${baseURL}/:id`, async (req, res) => {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body)
    res.status(200).send(updatedBlog)
})

module.exports = blogsRoutes
