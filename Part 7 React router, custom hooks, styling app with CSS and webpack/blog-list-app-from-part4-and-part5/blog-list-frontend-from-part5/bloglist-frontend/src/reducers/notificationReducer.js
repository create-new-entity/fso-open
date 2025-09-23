import { createSlice } from '@reduxjs/toolkit'

export const notificationSelector = (state) => state.notification

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    showNotification(state, action) {
      return action.payload
    },
    hideNotification(state, action) {
      return null
    }
  }
})

export const { showNotification, hideNotification } = notificationSlice.actions
export default notificationSlice.reducer