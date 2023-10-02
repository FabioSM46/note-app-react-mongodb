import { envClientSchema } from '@/clientEnvSchema'
import axios, { AxiosInstance } from 'axios'

class NoteService {
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

  createNote = (title: string, content?: string, author?: string) => {
    const requestBody = {
      title,
      content,
      author,
    }
    return this.api.post('/api/newnote', requestBody)
  }
}

// Create one instance object
const noteService = new NoteService()

export default noteService
