const { test, describe, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const testDataBlogs = require('./testData')
const initialData = require('./initialData')
const app = require('../app')
const supertest = require('supertest')
const Blog = require('../models/Blog')
const { areIdsUniq } = require('./testUtils')
const { default: mongoose } = require('mongoose')
const api = supertest(app)

const blogsBaseUrl = '/api/blogs'


describe('dummy test', () => {
    test('dummy returns one', () => {
        const blogs = []

        const result = listHelper.dummy(blogs)
        assert.strictEqual(result, 1)
    })
})

describe('REST API test suite.', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
        const savePromises = initialData.initialBlogs.map((initialD) => {
            return new Blog(initialD).save()
        })
        await Promise.all(savePromises)
    })

    test('GET request returns correct amount of blog items.', async () => {
        const response = await api.get(blogsBaseUrl)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        assert.strictEqual(response.body.length, initialData.initialBlogs.length)
    })

    test('Unique identifier property is "id", not something else.', async () => {
        const response = await api.get(blogsBaseUrl)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        const blogs = response.body
        const keysInBlog = Object.keys(blogs[0]).sort()
        const expectedKeys = [ 'id', 'title', 'author', 'url', 'likes' ].sort()
        assert.deepStrictEqual(keysInBlog, expectedKeys)
        assert.ok(areIdsUniq(blogs))
    })

    describe('POST endpoint tests', () => {
        test('POST request works.', async () => {
            let response
            response = await api.get(blogsBaseUrl)
                .expect(200)
                .expect('Content-Type', /application\/json/)
            const nBlogsBefore = response.body.length

            response = await api.post(blogsBaseUrl)
                .send(initialData.dummyBlog)
                .expect(201)
                .expect('Content-Type', /application\/json/)
            const createdBlog = response.body

            response = await api.get(blogsBaseUrl)
                .expect(200)
                .expect('Content-Type', /application\/json/)
            const nBlogsAfter = response.body.length

            assert.equal(nBlogsBefore + 1, nBlogsAfter)
            assert.deepStrictEqual({ ...initialData.dummyBlog, id: createdBlog.id }, createdBlog)
        }),

        test('POST request, set likes to 0 if not provided.', async () => {
            let response

            const payload = { ...initialData.dummyBlog }
            delete payload.likes
            
            response = await api.post(blogsBaseUrl)
                .send(payload)
                .expect(201)
                .expect('Content-Type', /application\/json/)

            const createdBlog = response.body

            assert.equal(createdBlog.likes, 0)
        }),

        test('POST request, title and author are required.', async () => {
            const payloadNoTitle = { ...initialData.dummyBlog }
            delete payloadNoTitle.title
            await api.post(blogsBaseUrl)
                .send(payloadNoTitle)
                .expect(400)

            const payloadNoAuthor = { ...initialData.dummyBlog }
            delete payloadNoAuthor.author
            await api.post(blogsBaseUrl)
                .send(payloadNoAuthor)
                .expect(400)
        })
    })
    
    test('DELETE request works.', async () => {
        let response
        response = await api.get(blogsBaseUrl)
            .expect(200)
        const blogToDelete = response.body[0]
        await api.delete(`${blogsBaseUrl}/${blogToDelete.id}`)
            .expect(200)
    })

    test('UPDATE request works.', async () => {
        let response
        response = await api.get(blogsBaseUrl).expect(200)
        const blogToUpdate = response.body[0]
        const UPDATED_AUTHOR_NAME = 'Updated author name'
        const LIKES_CHANGE = 10
        const updatedBlog = {
            ...blogToUpdate,
            author: UPDATED_AUTHOR_NAME,
            likes: blogToUpdate.likes + LIKES_CHANGE
        }

        response = await api.put(`${blogsBaseUrl}/${blogToUpdate.id}`)
            .send(updatedBlog)
            .expect(200)
        assert.equal(response.body.likes, blogToUpdate.likes + LIKES_CHANGE)
        assert.strictEqual(response.body.author, UPDATED_AUTHOR_NAME)
    })
})

describe('Utility functions test suite.', () => {
    test('totalLikes function works', () => {
        assert.strictEqual(listHelper.totalLikes(testDataBlogs), 77)
    })

    test('mostLikes function works', () => {
        assert.deepStrictEqual(listHelper.mostLikes(testDataBlogs), { author: 'Edgar Norton', likes: 29 })
    })

    test('favoriteBlog function works', () => {
        assert.deepStrictEqual(listHelper.favoriteBlog(testDataBlogs), testDataBlogs[2])
    })

    test('mostBlogs function works', () => {
        assert.deepStrictEqual(listHelper.mostBlogs(testDataBlogs), { author: 'Edgar Norton', blogs: 3 })
    })
})


after(async () => {
    await mongoose.connection.close()
    console.log('DB Connection closed.')
})
