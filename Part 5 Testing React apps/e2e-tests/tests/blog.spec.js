

const {
    test,
    expect,
    beforeEach,
    describe
} = require('@playwright/test')
const { afterEach } = require('node:test')

const testUser = {
    'username': 'testuser',
    'name': 'testuser',
    'password': 'password'
}

const testBlog = {
    title: 'TestBlog',
    author: 'TestAuthor',
    url: 'testurl.com'
}

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const usernameLocator = page.getByLabel('Username')
    const passwordLocator = page.getByLabel('Password')
    const loginButtonLocator = page.getByText('Login')

    await expect(usernameLocator).toBeVisible()
    await expect(passwordLocator).toBeVisible()
    await expect(loginButtonLocator).toBeVisible()
  })

  describe('Login tests', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('http://localhost:3003/api/testing/reset')
        await request.post('http://localhost:3003/api/users', {
            data: testUser
        })
    })

    test('Login works with correct credentials', async ({ page }) => {
        const usernameLocator = page.getByLabel('Username')
        const passwordLocator = page.getByLabel('Password')
        const loginButtonLocator = page.getByText('Login')

        await usernameLocator.fill(testUser.username)
        await passwordLocator.fill(testUser.password)
        await loginButtonLocator.click()

        const loggedInText = page.getByText(`${testUser.username} logged in`)
        await expect(loggedInText).toBeVisible()
    })

    test('Login fails with wrong credentials', async ({ page }) => {
        const usernameLocator = page.getByLabel('Username')
        const passwordLocator = page.getByLabel('Password')
        const loginButtonLocator = page.getByText('Login')

        await usernameLocator.fill('wrong_user_name')
        await passwordLocator.fill(testUser.password)
        await loginButtonLocator.click()

        const loggedInText = page.getByText(`${testUser.username} logged in`)
        expect(loggedInText).not.toBeVisible()
        expect(page.getByText('Login')).toBeVisible()
    })

    describe('Post login features tests.', () => {
        beforeEach(async ({ page }) => {
            const usernameLocator = page.getByLabel('Username')
            const passwordLocator = page.getByLabel('Password')
            const loginButtonLocator = page.getByText('Login')

            await usernameLocator.fill(testUser.username)
            await passwordLocator.fill(testUser.password)
            await loginButtonLocator.click()
        })

        test('A new blog can be created', async ({ page }) => {
            const createNewBlogButton = page.getByText('Create New Blog')
            await expect(createNewBlogButton).toBeVisible()
            await createNewBlogButton.click()

            const titleLocator = page.getByLabel('title:')
            const authorLocator = page.getByLabel('author:')
            const urlLocator = page.getByText('url:')
            const createButton = page.getByText('Create', { exact: true })

            await titleLocator.fill(testBlog.title)
            await authorLocator.fill(testBlog.author)
            await urlLocator.fill(testBlog.url)
            await createButton.click()

            const createdBlog = page.locator('.blog').nth(0)
            await expect(createdBlog).toBeVisible()
            const blogTitle = createdBlog.locator('.blog-title')
            expect(blogTitle).toBeVisible()
            expect(blogTitle).toContainText(testBlog.title)
        })
    })
  })
})