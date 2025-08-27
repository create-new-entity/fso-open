const { test, describe, beforeEach, after } = require('node:test')
const assert = require('node:assert')

const supertest = require('supertest')
const app = require('../../app')
const api = supertest(app)

const User = require('../../models/User')
const mongoose = require('mongoose')
const { generateRandomNUsers } = require('./initialData')
const R = require('ramda')

const baseURL = '/api/users'


describe('User functionalities tests.', () => {

    describe('CRUD REST API tests', () => {
        test('POST, Users: Create new user works.', async () => {
            let response

            response = await api.get(baseURL)
                .expect(200)
            const usersBeforeCreate = response.body

            const newUserToCreate = generateRandomNUsers(1, 1)
            response = await api.post(baseURL)
                .send(newUserToCreate)
                .expect(201)
            const createdUser = response.body

            response = await api.get(baseURL)
                .expect(200)
            const usersAfterCreate = response.body

            assert.equal(usersAfterCreate.length, usersBeforeCreate.length + 1)
            const fieldsToPick = ['username', 'name']
            assert.strictEqual(R.pick(fieldsToPick, newUserToCreate), R.pick(fieldsToPick, createdUser))
        })
    })

    after(async () => {
        await mongoose.connection.close()
        console.log('User tests done. DB connection closed.')
    })
})