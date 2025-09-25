import { useState } from 'react'
import { handleNotification } from '../utils'
import { useDispatch } from 'react-redux'
import { handleUpdateBlog, handleDeleteBlog } from '../reducers/blogsReducer'
import { Link } from 'react-router-dom'

const BlogListItem = ({
  blog
}) => {
  const [showDetails, setShowDetails] = useState(false)
  const dispatch = useDispatch()

  const blogStyle = {
    padding: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: '5px',
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
        <div className="blog-title">
          <Link to={`/blogs/${blog.id}`}>
            {blog.title}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default BlogListItem
