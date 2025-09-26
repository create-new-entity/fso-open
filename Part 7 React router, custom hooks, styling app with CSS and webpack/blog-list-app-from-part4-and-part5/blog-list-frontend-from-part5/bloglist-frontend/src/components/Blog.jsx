import { useState, useEffect } from 'react'
import blogsServices from './../services/blogs'
import { useDispatch } from 'react-redux'
import { handleUpdateBlog } from '../reducers/blogsReducer'

const Blog = (props) => {
  const { blogId } = props
  const [blog, setBlog] = useState()
  const dispatch = useDispatch()

  const handleLike = () => {
    const newBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    dispatch(handleUpdateBlog({ ...newBlog, user: blog.user.id }))
    setBlog(newBlog)
  }

  useEffect(() => {
    (async () => {
      const responseBlog = await blogsServices.getBlog(blogId)
      setBlog(responseBlog)
    })()
  }, [blogId])

  if(!blog) {
    return null
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <a>{blog.url}</a>
      <div>
        {blog.likes} likes
        <button onClick={handleLike}>Like</button>
      </div>
      <p>Added by {blog.author}</p>
      <div>
        <h2>Comments</h2>
        <ul>
          {
            blog.comments.map((comment, index) => {
              return (
                <li key={index}>{comment}</li>
              )
            })
          }
        </ul>
      </div>
    </div>
  )
}

export default Blog