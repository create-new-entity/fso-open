import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import Notification from './components/Notification'
import { handleNotification } from './utils'
import { useDispatch, useSelector } from 'react-redux'
import { notificationSelector } from './reducers/notificationReducer'
import { blogsSelector, initializeBlogs } from './reducers/blogsReducer'
import { handleLoginAction, removeUser, setUser, userSelector } from './reducers/userReducer'
import { Route, Routes, useMatch } from 'react-router-dom'
import Users from './components/Users'
import User from './components/User'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import NavMenu from './components/NavMenu'
import { Container } from '@mui/material'

const LOGGED_IN_USER = 'loggedInUser'

const Login = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleUserNameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    dispatch(handleLoginAction({ username, password }))
    setUsername('')
    setPassword('')
  }

  return (
    <>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            Username
            <input value={username} onChange={handleUserNameChange} />
          </label>
        </div>
        <div>
          <label>
            Password
            <input
              value={password}
              onChange={handlePasswordChange}
              type="password"
            />
          </label>
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  )
}

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(userSelector)
  const notification = useSelector(notificationSelector)
  const blogs = useSelector(blogsSelector)
  const match = useMatch('/users/:id')
  const blogMatch = useMatch('/blogs/:id')

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const existingLoggedInUser = JSON.parse(
      window.localStorage.getItem(LOGGED_IN_USER)
    )
    if (existingLoggedInUser) {
      dispatch(setUser(existingLoggedInUser))
      blogService.setToken(existingLoggedInUser.token)
    }
  }, [dispatch])

  const getBlog = () => {
    return blogs.find((blog) => {
      return blog.id.toString() === blogMatch?.params.id.toString()
    })
  }

  return (
    <Container>
      <div>
        {notification && (
          <Notification success={notification.success} msg={notification.msg} />
        )}
        {!user && <Login/>}
        {user && (
          <div>
            <NavMenu/>
            <div>
              <Routes>
                <Route path='/users/:id' element={<User userId={match?.params.id}/>}/>
                <Route path='/users' element={<Users/>}/>
                <Route path='/blogs/:id' element={<Blog blog={getBlog()}/>}/>
                <Route path='/' element={<Blogs blogs={blogs} user={user}/>}/>
              </Routes>
            </div>
          </div>
        )}
      </div>
    </Container>
  )
}

export default App
