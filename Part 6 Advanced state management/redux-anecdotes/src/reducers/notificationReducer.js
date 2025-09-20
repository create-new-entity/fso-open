import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    message: '',
    show: false
}

export const getCreateNoteNotificationMsg = (anecdoteContent) => {
    return `Created ${anecdoteContent}`
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        showNotification(state, action) {
            state.message = action.payload
            state.show = true
            return state
        },
        hideNotification(state, action) {
            state.message = ''
            state.show = false
            return state
        }
    }
})

export const { showNotification, hideNotification } = notificationSlice.actions
export default notificationSlice.reducer