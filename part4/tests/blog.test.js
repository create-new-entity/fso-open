const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const testDataBlogs = require('./testData')

describe('dummy test', () => {
    test('dummy returns one', () => {
        const blogs = []

        const result = listHelper.dummy(blogs)
        assert.strictEqual(result, 1)
    })
})

describe('Total likes suite', () => {
    test('totalLikes function works', () => {
        assert.strictEqual(listHelper.totalLikes(testDataBlogs), 48)
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
