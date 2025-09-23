import { useEffect, useState } from 'react'
import usersServices from './../services/users'


const User = (props) => {
  const { userId } = props
  const [user, setUser] = useState()

  useEffect(() => {
    (async () => {
      const user = await usersServices.getUserDetails(userId)
      setUser(user)
    })()
  }, [userId])

  if(!user) {
    return null
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <div>
        <h3>added blogs</h3>
        <ul>
          {
            user.blogs.map((blog, index) => {
              return (
                <li key={index + blog.title}>{blog.title}</li>
              )
            })
          }
        </ul>
      </div>
    </div>
  )
}

export default User