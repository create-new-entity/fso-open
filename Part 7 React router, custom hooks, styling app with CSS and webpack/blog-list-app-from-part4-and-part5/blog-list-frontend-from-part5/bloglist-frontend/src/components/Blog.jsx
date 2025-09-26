import { useDispatch } from 'react-redux'
import { handleUpdateBlog } from '../reducers/blogsReducer'

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
  console.log('blog', blog)
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input name='newComment'/>
        <button type='submit'>Add Comment</button>
      </form>
    </div>
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
      </div>
    </div>
  )
}

export default Blog