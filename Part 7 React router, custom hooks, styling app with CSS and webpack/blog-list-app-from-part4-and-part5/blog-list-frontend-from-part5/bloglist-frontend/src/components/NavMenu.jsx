import { useDispatch, useSelector } from 'react-redux'
import { removeUser, userSelector } from '../reducers/userReducer'
import { handleNotification } from '../utils'
import { Link } from 'react-router-dom'
import { Box, Button } from '@mui/material'

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F7E0DC',
    borderRadius: '5px',
    padding: '5px'
  },
  links: {
    display: 'flex',
    gap: '5px'
  },
  logoutButton: {
    paddingRight: '0px'
  }
}

const NavMenu = () => {
  const user = useSelector(userSelector)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(removeUser())
    const successNotification = {
      success: true,
      msg: 'Logged out.',
    }
    handleNotification(successNotification, dispatch)
  }

  return (
    <Box sx={styles.container}>
      <Box sx={styles.links}>
        <Link to='/'>Blogs</Link>
        <Link to='/users'>Users</Link>
      </Box>
      <Box>
        {user.name} logged in
        <Button sx={styles.logoutButton} onClick={handleLogout}>Logout</Button>
      </Box>
    </Box>
  )
}

export default NavMenu