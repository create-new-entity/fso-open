import { useEffect, useState } from 'react'
import usersServices from './../services/users'


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
            users.map((user) => {
              return (
                <tr>
                  <td>{user.name}</td>
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