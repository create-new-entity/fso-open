import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import NewBlogForm from './components/NewBlogForm'
import Notification, { handleNotification } from './components/Notification'
import Togglable from './components/Togglable'

const LOGGED_IN_USER = 'loggedInUser'

const Login = (props) => {
  const { setUser, setNotification } = props
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
    try {
      const loggedInUser = await blogService.login({ username, password })
      setUser(loggedInUser)
      window.localStorage.setItem(LOGGED_IN_USER, JSON.stringify(loggedInUser))
      setUsername('')
      setPassword('')

      const successNotification = {
          success: true,
          msg: 'Logged in.'
      }
      handleNotification(successNotification, setNotification)
    }
    catch(e) {
      const failedNotification = {
          success: false,
          msg: 'Login failed.'
      }
      handleNotification(failedNotification, setNotification)
    }
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
  const [notification, setNotification] = useState(null)
  const togglableRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      blogs.sort((blog1, blog2) => {
        return blog2.likes - blog1.likes
      })
      setBlogs( blogs )
    })  
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
    const successNotification = {
        success: true,
        msg: 'Logged out.'
    }
    handleNotification(successNotification, setNotification)
  }

  return (
    <div>
      {
        notification && <Notification
          success={notification.success}
          msg={notification.msg}
        />
      }
      {
        !user && <Login setUser={setUser} setNotification={setNotification}/>
      }
      {
        user && <>
          <h2>Blogs</h2>
          <div style={{ marginBottom: '20px' }}>
            <span>{user.name} logged in</span>
            <button style={{ marginLeft: '15px' }} onClick={handleLogOut}>Logout</button>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <Togglable buttonLabel={'Create New Blog'} ref={togglableRef}>
              <NewBlogForm
                setBlogs={setBlogs}
                setNotification={setNotification}
                togglableRef={togglableRef}
              />
            </Togglable>
          </div>
          {blogs.map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              setBlogs={setBlogs}
              loggedInUser={user}
              setNotification={setNotification}
            />
          )}
        </>
      }
    </div>
  )
}

export default App