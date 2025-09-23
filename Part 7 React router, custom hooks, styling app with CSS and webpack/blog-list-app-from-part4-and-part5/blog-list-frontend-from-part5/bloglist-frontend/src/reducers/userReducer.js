import { createSlice } from '@reduxjs/toolkit'
import blogsService from './../services/blogs'
import { handleNotification } from '../utils'

const LOGGED_IN_USER = 'loggedInUser'

export const userSelector = (state) => state.user

export const handleLoginAction = (credentials) => {
  return async (dispatch) => {
    try {
      const loggedInUser = await blogsService.login(credentials)
      dispatch(setUser(loggedInUser))
      const successNotification = {
        success: true,
        msg: 'Logged in.',
      }
      handleNotification(successNotification, dispatch)
    }
    catch(e) {

      const failedNotification = {
        success: false,
        msg: 'Login failed.',
      }
      handleNotification(failedNotification, dispatch)
    }
  }
}

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      window.localStorage.setItem(LOGGED_IN_USER, JSON.stringify(action.payload))
      return action.payload
    },
    removeUser(state, action) {
      window.localStorage.removeItem(LOGGED_IN_USER)
      return null
    }
  }
})

export const { setUser, removeUser } = userSlice.actions
export default userSlice.reducer