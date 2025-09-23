import axios from 'axios'


const server = 'http://localhost:3003'
const usersBaseUrl = '/api/users'

const getUsersDetails = async () => {
  const response = await axios.get(`${server}${usersBaseUrl}`)
  return response.data
}

export default {
  getUsersDetails
}

