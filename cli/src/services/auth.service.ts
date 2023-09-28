import { envClientSchema } from '@/clientEnvSchema'
import axios from 'axios'

const API_URL = envClientSchema.REACT_APP_SERVER_URL

export const register = (username: string, email: string, password: string) => {
  return axios.post(API_URL + '/auth/register', {
    username,
    email,
    password,
  })
}

export const login = (email: string, password: string) => {
  return axios
    .post(API_URL + '/auth/login', {
      email,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem('user', JSON.stringify(response.data))
      }

      return response.data
    })
}

export const logout = () => {
  localStorage.removeItem('user')
}

export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user')
  if (userStr) return JSON.parse(userStr)

  return null
}
