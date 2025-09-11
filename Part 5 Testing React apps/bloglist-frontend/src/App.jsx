import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import NewBlogForm from './components/NewBlogForm'

const LOGGED_IN_USER = 'loggedInUser'

const Login = (props) => {
  const { setUser } = props
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUserNameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    const loggedInUser = await blogService.login({ username, password })
    setUser(loggedInUser)
    window.localStorage.setItem(LOGGED_IN_USER, JSON.stringify(loggedInUser))
    setUsername('')
    setPassword('')
  }

  return (
    <>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            Username
            <input
              value={username}
              onChange={handleUserNameChange}
            />
          </label>
        </div>
        <div>
          <label>
            Password
            <input
              value={password}
              onChange={handlePasswordChange}
              type='password'
            />
          </label>
        </div>
        <button type='submit'>Login</button>
      </form>
    </>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const existingLoggedInUser = JSON.parse(window.localStorage.getItem(LOGGED_IN_USER))
    if(existingLoggedInUser) {
      setUser(existingLoggedInUser)
      blogService.setToken(existingLoggedInUser.token)
    }
  }, [])

  const handleLogOut = () => {
    setUser(null)
    window.localStorage.removeItem(LOGGED_IN_USER)
  }

  return (
    <div>
      {
        !user && <Login setUser={setUser}/>
      }
      {
        user && <>
          <h2>Blogs</h2>
          <div style={{ marginBottom: '20px' }}>
            <span>{user.name} logged in</span>
            <button style={{ marginLeft: '15px' }} onClick={handleLogOut}>Logout</button>
          </div>
          <NewBlogForm setBlogs={setBlogs}/>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </>
      }
    </div>
  )
}

export default App