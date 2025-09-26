import { useDispatch } from 'react-redux'
import { handleUpdateBlog } from '../reducers/blogsReducer'
import { Box, Button, Input } from '@mui/material'

const NewCommentForm = (props) => {
  const { blog } = props
  const dispatch = useDispatch()
  const handleSubmit = (e) => {
    e.preventDefault()
    if(e.target.newComment.value) {
      const newBlog = { ...blog }
      newBlog.comments = blog.comments.concat(e.target.newComment.value)
      e.target.newComment.value = ''
      dispatch(handleUpdateBlog(newBlog))
    }
    e.target.newComment.value = ''
  }

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Input name='newComment'/>
        <Button type='submit'>Add Comment</Button>
      </form>
    </Box>
  )
}

const Blog = (props) => {
  const { blog } = props
  const dispatch = useDispatch()

  const handleLike = () => {
    const newBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    dispatch(handleUpdateBlog({ ...newBlog, user: blog.user.id }))
  }

  if(!blog) {
    return null
  }


  return (
    <Box>
      <h2>{blog.title}</h2>
      <a>{blog.url}</a>
      <Box>
        {blog.likes} likes
        <Button onClick={handleLike}>Like</Button>
      </Box>
      <p>Added by {blog.author}</p>
      <Box>
        <h2>Comments</h2>
        <NewCommentForm blog={blog}/>
        <ul>
          {
            blog.comments.map((comment, index) => {
              return (
                <li key={index}>{comment}</li>
              )
            })
          }
        </ul>
      </Box>
    </Box>
  )
}

export default Blog