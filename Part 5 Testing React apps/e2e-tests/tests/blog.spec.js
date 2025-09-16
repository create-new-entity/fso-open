

const {
    test,
    expect,
    describe
} = require('@playwright/test')
const testUtils = require('./testutils')

const testUser = {
    'username': 'testuser',
    'name': 'testuser',
    'password': 'password'
}

const testUser2 = {
    'username': 'testuser2',
    'name': 'testuser2',
    'password': 'password'
}

const testBlog = {
    title: 'TestBlog',
    author: 'TestAuthor',
    url: 'testurl.com'
}

const testBlog2 = {
    title: 'TestBlog2',
    author: 'TestAuthor2',
    url: 'testurl2.com'
}



describe('Blog app', () => {

    test.beforeEach(async ({ page, request }) => {
        await request.post('http://localhost:3003/api/testing/reset')
        await request.post('http://localhost:3003/api/users', {
            data: testUser
        })
        await request.post('http://localhost:3003/api/users', {
            data: testUser2
        })
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

        test('Login works with correct credentials', async ({ page }) => {
            await testUtils.login(page, testUser)

            const loggedInText = page.getByText(`${testUser.username} logged in`)
            await expect(loggedInText).toBeVisible()
        })

        test('Login fails with wrong credentials', async ({ page }) => {
            await testUtils.login(page, { ...testUser, username: 'wrong_user_name' })

            const loggedInText = page.getByText(`${testUser.username} logged in`)
            expect(loggedInText).not.toBeVisible()
            expect(page.getByText('Login')).toBeVisible()
        })

        describe('Post login features tests.', () => {
            test.beforeEach(async ({ page, request }) => {
                await testUtils.login(page, testUser)
            })

            test('A new blog can be created', async ({ page }) => {
                await testUtils.createABlog(page, testBlog)
                const createdBlog = page.locator('.blog').nth(0)
                await expect(createdBlog).toBeVisible()
                const blogTitle = createdBlog.locator('.blog-title')
                expect(blogTitle).toBeVisible()
                expect(blogTitle).toContainText(testBlog.title)
            })

            test('A blog can be liked.', async ({ page }) => {
                await testUtils.createABlog(page, testBlog)
                
                let createdBlog = page.locator('.blog').nth(0)
                const viewButton = createdBlog.getByText('View')
                await expect(viewButton).toBeVisible()
                await viewButton.click()

                let likesNumberDiv = createdBlog.locator('.blog-likes')
                await expect(likesNumberDiv).toContainText('0')

                const likeButton = createdBlog.getByText('Like')
                await likeButton.click()

                createdBlog = page.locator('.blog').nth(0)

                await expect(createdBlog).toBeVisible()

                likesNumberDiv = createdBlog.locator('.blog-likes')
                await expect(likesNumberDiv).toBeVisible()
                await expect(likesNumberDiv).toContainText('1')
            })

            test('A blog can be deleted by the user.', async ({ page }) => {
                await testUtils.createABlog(page, testBlog)
                
                let createdBlog = page.locator('.blog').nth(0)
                const viewButton = createdBlog.getByText('View')
                await expect(viewButton).toBeVisible()
                await viewButton.click()

                const deleteButton = createdBlog.getByText('Delete')
                expect(deleteButton).toBeVisible()
                page.on('dialog', (dialog) => dialog.accept())
                await deleteButton.click()

                
                await expect(page.locator('.blog')).not.toBeVisible()
            })
        })
    })
})