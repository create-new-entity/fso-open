import { showNotification, hideNotification } from './reducers/notificationReducer'

const NOTIFICATION_DURATION = 3000

export const handleNotification = (newNotification, dispatch) => {
  dispatch(showNotification(newNotification))
  setTimeout(() => {
    dispatch(hideNotification())
  }, NOTIFICATION_DURATION)
}
