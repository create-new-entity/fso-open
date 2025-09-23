import { useEffect, useState } from 'react'
import usersServices from './../services/users'
import { Link } from 'react-router-dom'


const Users = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    (async () => {
      const userDetails = await usersServices.getUsersDetails()
      setUsers(userDetails)
    })()
  }, [])

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map((user, index) => {
              return (
                <tr key={user + index}>
                  <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
                  <td>{user.blogs.length}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default Users