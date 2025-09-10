import axios from 'axios'

const server = 'http://localhost:3003'
const baseUrl = '/api/blogs'
const loginBaseUrl = '/api/login'

let token

const setToken = (newToken) => {
  token = newToken
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const login = async (payload) => {
  const response = await axios.post(`${server}${loginBaseUrl}`, payload)
  setToken(response.data.token)
  return response.data
}

export default { getAll, login }