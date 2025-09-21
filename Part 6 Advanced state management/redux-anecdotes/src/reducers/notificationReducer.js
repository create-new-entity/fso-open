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

export const setNotification = (message, time) => {
    return async (dispatch) => {
        dispatch(showNotification(message))
        setTimeout(() => {
            dispatch(hideNotification(''))
        }, time)
    }
}

export const { showNotification, hideNotification } = notificationSlice.actions
export default notificationSlice.reducer