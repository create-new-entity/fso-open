import { Button } from '@mui/material'
import { useState, useImperativeHandle } from 'react'

const Togglable = (props) => {
  const { buttonLabel, children, ref } = props
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return { toggleVisibility }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisibility}>{buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <Button style={{ marginTop: '5px' }} onClick={toggleVisibility}>Cancel</Button>
      </div>
    </div>
  )
}

export default Togglable
