import { useState } from "react"
import blogService from '../services/blogs'


const Blog = ({ blog, setBlogs }) => {
  const [showDetails, setShowDetails] = useState(false)

  const handleVisibility = () => {
    setShowDetails(!showDetails)
  }

  const handleLike = async () => {
    const updatedBlog = await blogService.updateBlog({ ...blog, likes: blog.likes + 1,  user: blog.user.id })
    setBlogs((prevBlogs) => {
      const newBlogs = [...prevBlogs]
      const newBlog = newBlogs.find(nBlog => nBlog.id === updatedBlog.id)
      newBlog.likes = updatedBlog.likes
      return newBlogs.sort((blog1, blog2) => {
        return blog2.likes - blog1.likes
      })
    })
  }

  const blogStyle = {
    padding: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: '5px'
  }

  const visiblityButtonStyle = {
    marginLeft: '10px'
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title}
        <button style={visiblityButtonStyle} onClick={handleVisibility}>{showDetails ? 'Hide' : 'View'}</button>
      </div>
      {
        showDetails &&
        <div>
          <p>{blog.author}</p>
          <p>{blog.url}</p>
          <div>
            {blog.likes} <button onClick={handleLike}>Like</button>
          </div>
          <p>Added by {blog.user.username}</p>
        </div>
      }
    </div>  
  )
}

export default Blog