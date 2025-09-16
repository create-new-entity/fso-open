const { expect } = require('@playwright/test')

const createABlog = async (page, testBlog) => {
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
    await expect(createButton).toBeVisible()
    await createButton.click()
}

const login = async (page, testUser) => {
    const usernameLocator = page.getByLabel('Username')
    const passwordLocator = page.getByLabel('Password')
    const loginButtonLocator = page.getByText('Login')

    await usernameLocator.fill(testUser.username)
    await passwordLocator.fill(testUser.password)
    await loginButtonLocator.click()
}

const testUtils = {
    login,
    createABlog
}

module.exports = testUtils