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

  createNote = async (title: string, content?: string, author?: string) => {
    const requestBody = {
      title,
      content,
      author,
    }

    try {
      await this.api.post('/api/newnote', requestBody)
    } catch (error) {
      console.log(error)
    }
  }

  getUserWithNotes = async (id: string) => {
    try {
      const result = await this.api.get(`/api/notes/${id}`)
      return result
    } catch (error) {
      console.log(error)
    }
  }

  deleteNote = async (id: string) => {
    try {
      await this.api.delete(`/api/notes/del/${id}`)
      console.log('Note deleted')
    } catch (error) {
      console.log(error)
    }
  }

  updateNote = async (
    id: string,
    title: string,
    content: string,
  ) => {
    const requestBody = {
      title,
      content,
    }

    try {
      await this.api.patch(`/api/notes/update/${id}`, requestBody)
      console.log('Note updated')
    } catch (error) {
      console.log(error)
    }
  }
}

// Create one instance object
const noteService = new NoteService()

export default noteService
