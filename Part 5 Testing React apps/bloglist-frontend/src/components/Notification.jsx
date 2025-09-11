

const NOTIFICATION_DURATION = 3000

export const handleNotification = (newNotification, setNotification) => {
    setNotification(newNotification)
    setTimeout(() => {
        setNotification(null)
    }, NOTIFICATION_DURATION)
}

const Notification = (props) => {
    const { success, msg } = props
    const color = success ? 'green' : 'red'
    const style = {
        borderRadius: '5px',
        borderColor: color,
        color: color,
        borderStyle: 'solid',
        backgroundColor: '#BABABA',
        padding: '5px',
        fontSize: '20px',
        marginBottom: '20px'
    }

    return (
        <div style={style}>
            {msg}
        </div>
    )
}

export default Notification