const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  const { message } = props
  return (
    <div style={style}>
      {message}
    </div>
  )
}

export default Notification