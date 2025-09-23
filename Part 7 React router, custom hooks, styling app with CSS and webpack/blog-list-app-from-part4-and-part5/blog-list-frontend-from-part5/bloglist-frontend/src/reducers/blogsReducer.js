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
    }
  }
})

export const { setBlogs, createBlog } = blogsSlice.actions
export default blogsSlice.reducer

