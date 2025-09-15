

const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const usernameLocator = page.getByLabel('Username')
    const passwordLocator = page.getByLabel('Password')
    const loginButtonLocator = page.getByText('Login')

    await expect(usernameLocator).toBeVisible()
    expect(passwordLocator).toBeVisible()
    expect(loginButtonLocator).toBeVisible()
  })
})