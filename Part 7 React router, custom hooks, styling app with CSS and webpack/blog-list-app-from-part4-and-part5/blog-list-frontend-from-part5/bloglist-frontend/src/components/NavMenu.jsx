import { useDispatch, useSelector } from 'react-redux'
import { removeUser, userSelector } from '../reducers/userReducer'
import { handleNotification } from '../utils'
import { Link } from 'react-router-dom'


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
    <div style={{ display: 'flex', gap: '5px', backgroundColor: '#F7E0DC' }}>
      <div style={{ display: 'flex', gap: '5px' }}>
        <Link to='/'>Blogs</Link>
        <Link to='/users'>Users</Link>
      </div>
      <div>
        {user.name} logged in
        <button style={{ marginLeft: '10px' }} onClick={handleLogout}>Logout</button>
      </div>
    </div>
  )
}

export default NavMenu