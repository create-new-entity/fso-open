import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

export const blogsSelector = (state) => state.blogs

const sortBlogsByLike = (blog1, blog2) => {
  return blog2.likes - blog1.likes
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createNewBlog = (newBlog) => {
  return async (dispatch) => {
    const createdBlog = await blogService.createNewBlog(newBlog)
    dispatch(createBlog(createdBlog))
  }
}

export const handleUpdateBlog = (blog) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.updateBlog(blog)
    dispatch(updateBlog(updatedBlog))
  }
}

export const handleDeleteBlog = (blog) => {
  return async (dispatch) => {
    await blogService.deleteBlog(blog)
    dispatch(deleteBlog(blog.id))
  }
}

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload.sort(sortBlogsByLike)
    },
    createBlog(state, action) {
      state.push(action.payload)
      return state
    },
    updateBlog(state, action) {
      const updated = state.map(blog =>
        blog.id.toString() === action.payload.id.toString()
          ? { ...blog, likes: action.payload.likes, comments: action.payload.comments }
          : blog
      )
      updated.sort(sortBlogsByLike)
      return updated
    },
    deleteBlog(state, action) {
      const foundIndex = state.findIndex((blog) => blog.id.toString() === action.payload.toString())
      if(foundIndex !== -1) {
        state.splice(foundIndex, 1)
      }
      return state
    }
  }
})

export const { setBlogs, createBlog, updateBlog, deleteBlog } = blogsSlice.actions
export default blogsSlice.reducer

