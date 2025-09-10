import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'

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

  return (
    <div>
      {
        !user && <Login setUser={setUser}/>
      }
      {
        user && <>
          <h2>Blogs</h2>
          <p>{user.name} logged in</p>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </>
      }
    </div>
  )
}

export default App