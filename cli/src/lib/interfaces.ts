export interface User {
  _id: string
  email: string
  username: string
  iat: number
  exp: number
}

export interface IAuth {
  isLoggedIn: boolean
  isLoading: boolean
  user: User | null
  storeToken: (token: string) => void
  authenticateUser: () => void
  logOutUser: () => void
}

export interface Note {
  _id: string
  title: string
  content: string
  author: string
}
