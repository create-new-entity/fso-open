

const {
    test,
    expect,
    beforeEach,
    describe
} = require('@playwright/test')

const testUser = {
    'username': 'testuser',
    'name': 'testuser',
    'password': 'password'
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
        await request.post('http://localhost:3003')
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
  })
})