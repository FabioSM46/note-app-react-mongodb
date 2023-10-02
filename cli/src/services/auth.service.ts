import { envClientSchema } from '@/clientEnvSchema'
import axios, { AxiosInstance } from 'axios'

class AuthService {
  api: AxiosInstance // Define the 'api' property

  constructor() {
    // Create a new instance of axios with a custom configuration
    this.api = axios.create({
      baseURL: envClientSchema.REACT_APP_SERVER_URL,
      // We set our API's base URL so that all requests use the same base URL
    })

    // Automatically set JWT token in the headers for every request
    this.api.interceptors.request.use((config) => {
      // Retrieve the JWT token from the local storage
      const storedToken = localStorage.getItem('authToken')

      if (storedToken) {
        config.headers['Authorization'] = `Bearer ${storedToken}`
      }    
      return config
    })
  }

  login = (email: string, password: string) => {
    const requestBody = {
      email,
      password,
    }
    return this.api.post('/auth/login', requestBody)
  }

  register = (username: string, email: string, password: string) => {
    const requestBody = {
      username,
      email,
      password,
    }
    return this.api.post('/auth/signup', requestBody)
  }

  verify = () => {
    return this.api.get('/auth/verify')
  }
}

// Create one instance object
const authService = new AuthService()

export default authService
