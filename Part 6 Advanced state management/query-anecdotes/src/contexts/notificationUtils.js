
const NOTIFICATION_TIME = 5000

export const handleNotification = (notificationMsg, dispatchNotification) => {
    dispatchNotification({ type: 'show', payload: notificationMsg })
    setTimeout(() => {
        dispatchNotification({ type: 'hide', payload: '' })
    }, NOTIFICATION_TIME)
}