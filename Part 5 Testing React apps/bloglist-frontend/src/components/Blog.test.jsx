import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'

test('Blog component renders content', async () => {
  const loggedInUser = { username: 'testuser' }
  const blogTitle = 'Test Blog'
  const testAuthor = 'Test Author'
  const testUrl = 'testurl'
  const blog = {
    title: blogTitle,
    author: testAuthor,
    url: testUrl,
    likes: 3,
    user: loggedInUser.username
  }
  const setBlogs = vi.fn()
  const setNotification = vi.fn()

  const { container } = render(
    <Blog
      blog={blog}
      loggedInUser={loggedInUser}
      setBlogs={setBlogs}
      setNotification={setNotification}
    />
  )

  const divContainingTitle = container.querySelector('.blog-title')
  expect(divContainingTitle).toBeDefined()
  expect(divContainingTitle.textContent).toBe(blogTitle)

  const user = userEvent.setup()
  const button = screen.getByText('View')
  await user.click(button)

  const pAuthor = container.querySelector('.blog-author')
  expect(pAuthor).toBeDefined()
  expect(pAuthor.textContent).toBe(testAuthor)

  const pUrl = container.querySelector('.blog-url')
  expect(pUrl).toBeDefined()
  expect(pUrl.textContent).toBe(testUrl)

  const pLikes = container.querySelector('.blog-likes')
  expect(pLikes).toBeDefined()
})

test('If like button is pressed twice, handler is called twice.', async () => {
  const loggedInUser = { username: 'testuser' }
  const blogTitle = 'Test Blog'
  const testAuthor = 'Test Author'
  const testUrl = 'testurl'
  const blog = {
    title: blogTitle,
    author: testAuthor,
    url: testUrl,
    likes: 3,
    user: loggedInUser.username
  }
  const setBlogs = vi.fn()
  const setNotification = vi.fn()
  const handleLike = vi.fn()

  await render(
    <Blog
      blog={blog}
      loggedInUser={loggedInUser}
      setBlogs={setBlogs}
      setNotification={setNotification}
      handleLike={handleLike}
    />
  )

  const user = userEvent.setup()
  const viewButton = screen.getByText('View')
  await user.click(viewButton)
  const likeButton = screen.getByText('Like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(handleLike.mock.calls).toHaveLength(2)
})