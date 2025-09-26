import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { createNewBlog } from '../reducers/blogsReducer'
import { handleNotification } from '../utils'
import Togglable from './Togglable'
import NewBlogForm from './../components/NewBlogForm'
import BlogListItem from './BlogListItem'
import { Box } from '@mui/material'

const Blogs = ({ blogs, user }) => {
  const togglableRef = useRef()
  const dispatch = useDispatch()
  const handleSave = async (title, author, url) => {
    try {
      dispatch(createNewBlog({ title, author, url }))
      const successNotification = {
        success: true,
        msg: 'Created new blog.',
      }
      handleNotification(successNotification, dispatch)
      togglableRef.current.toggleVisibility()
    } catch (e) {

      const failedNotification = {
        success: false,
        msg: 'Failed to create new blog.',
      }
      handleNotification(failedNotification, dispatch)
    }
  }

  return (
    <Box>
      <h2>Blogs</h2>
      <Box style={{ marginBottom: '10px' }}>
        <Togglable buttonLabel={'Create New Blog'} ref={togglableRef}>
          <NewBlogForm handleSave={handleSave} />
        </Togglable>
      </Box>

      {blogs.map((blog) => (
        <BlogListItem
          blog={blog}
          key={blog.id}
        />
      ))}
    </Box>
  )
}

export default Blogs