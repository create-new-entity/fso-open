import { createContext, useReducer } from "react"

const initialState = {
    message: '',
    show: false
}

const notificationReducer = (state, action) => {
    switch(action.type) {
        case 'show':
            return {
                message: action.payload,
                show: true
            }
        case 'hide':
            return {
                message: action.payload,
                show: false
            }
        default:
            return initialState
    }
}

const NotificationContext = createContext()


export const NotificationProvider = (props) => {
    const [notification, dispatchNotification] = useReducer(notificationReducer, initialState)
    const value = [notification, dispatchNotification]
    return (
        <NotificationContext.Provider value={value}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export default NotificationContext