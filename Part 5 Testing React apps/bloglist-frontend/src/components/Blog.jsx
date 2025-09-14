import { useState } from "react"

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false)

  const handleVisibility = () => {
    setShowDetails(!showDetails)
  }

  const handleLike = () => {
    consnole.log('Handle like.')
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
        </div>
      }
    </div>  
  )
}

export default Blog