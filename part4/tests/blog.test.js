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


describe('dummy test', () => {
    test('dummy returns one', () => {
        const blogs = []

        const result = listHelper.dummy(blogs)
        assert.strictEqual(result, 1)
    })
})

describe('Likes suite', () => {
    test('totalLikes function works', () => {
        assert.strictEqual(listHelper.totalLikes(testDataBlogs), 77)
    })

    test('mostLikes function works', () => {
        assert.deepStrictEqual(listHelper.mostLikes(testDataBlogs), { author: 'Edgar Norton', likes: 29 })
    })
})

describe('Favorite blog suite', () => {
    test('favoriteBlog function works', () => {
        assert.deepStrictEqual(listHelper.favoriteBlog(testDataBlogs), testDataBlogs[2])
    })

    test('mostBlogs function works', () => {
        assert.deepStrictEqual(listHelper.mostBlogs(testDataBlogs), { author: 'Edgar Norton', blogs: 3 })
    })
})

describe('API test suite', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
        const savePromises = initialData.map((initialD) => {
            return new Blog(initialD).save()
        })
        await Promise.all(savePromises)
    })

    test('GET request returns correct amount of blog items.', async () => {
        const response = await api.get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
        assert.strictEqual(response.body.length, initialData.length)
    })

    test('Unique identifier property is "id", not something else.', async () => {
        const response = await api.get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
        const blogs = response.body
        const keysInBlog = Object.keys(blogs[0]).sort()
        const expectedKeys = [ 'id', 'title', 'author', 'url', 'likes' ].sort()
        assert.deepStrictEqual(keysInBlog, expectedKeys)
        assert.ok(areIdsUniq(blogs))
    })
})

after(async () => {
    await mongoose.connection.close()
    console.log('DB Connection closed.')
})
