import axios from 'axios'


const server = 'http://localhost:3003'
const usersBaseUrl = '/api/users'

const getUsersDetails = async () => {
  const response = await axios.get(`${server}${usersBaseUrl}`)
  return response.data
}

const getUserDetails = async (userId) => {
  const response = await axios.get(`${server}${usersBaseUrl}/${userId}`)
  return response.data
}

export default {
  getUserDetails,
  getUsersDetails
}

