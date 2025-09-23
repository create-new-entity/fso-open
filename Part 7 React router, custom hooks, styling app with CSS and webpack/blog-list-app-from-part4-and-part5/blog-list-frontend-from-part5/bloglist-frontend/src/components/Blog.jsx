import { useState } from 'react'
import { handleNotification } from '../utils'
import { useDispatch } from 'react-redux'
import { handleUpdateBlog, handleDeleteBlog } from './../reducers/blogsReducer'

const Blog = ({
  blog,
  loggedInUser
}) => {
  const [showDetails, setShowDetails] = useState(false)
  const dispatch = useDispatch()

  const handleVisibility = () => {
    setShowDetails(!showDetails)
  }

  const handleLike = () => {
    dispatch(handleUpdateBlog({
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    }))
  }

  const blogStyle = {
    padding: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: '5px',
  }

  const visiblityButtonStyle = {
    marginLeft: '10px',
  }

  const showDeleteButton = loggedInUser.username === blog.user.username

  const handleDelete = async () => {
    if (window.confirm(`Do you want to delete ${blog.title}?`)) {
      try {
        dispatch(handleDeleteBlog(blog))
      } catch (e) {
        // eslint-disable-next-line no-unused-vars
        const failedNotification = {
          success: false,
          msg: 'Blog deletion failed.',
        }
        handleNotification(failedNotification, dispatch)
      }
    }
  }

  return (
    <div style={blogStyle} className="blog">
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          marginLeft: '10px',
        }}
      >
        <div className="blog-title">{blog.title}</div>
        <button style={visiblityButtonStyle} onClick={handleVisibility}>
          {showDetails ? 'Hide' : 'View'}
        </button>
      </div>
      {showDetails && (
        <div style={{ marginLeft: '10px' }}>
          <p className="blog-author">{blog.author}</p>
          <p className="blog-url">{blog.url}</p>
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <div className="blog-likes">{blog.likes}</div>
            <button style={{ marginLeft: '10px' }} onClick={handleLike}>
              Like
            </button>
          </div>
          <p>Added by {blog.user.username}</p>
          {showDeleteButton && (
            <div>
              <button onClick={handleDelete}>Delete</button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog
