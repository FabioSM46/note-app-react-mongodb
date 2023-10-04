import { useState, useEffect, createContext, PropsWithChildren } from 'react'
import authService from '../services/auth.service'
import { IAuth } from '@/lib/interfaces'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext({} as IAuth)

function AuthProviderWrapper(props: PropsWithChildren) {
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState(null)
  const storeToken = (token: string): void => {
    localStorage.setItem('authToken', token)
  }

  const authenticateUser = () => {
    // Get the stored token from the localStorage
    const storedToken = localStorage.getItem('authToken')

    // If the token exists in the localStorage
    if (storedToken) {
      // We must send the JWT token in the request's "Authorization" Headers
      authService
        .verify()
        .then((response) => {
          // If the server verifies that the JWT token is valid
          if (response.status !== 200) {
            throw new Error('Invalid token')
          }
          const user = response.data

          // Update state variables
          setIsLoggedIn(true)
          setIsLoading(false)
          setUser(user)
        })
        .catch((error) => {
          console.log(error)
          setIsLoggedIn(false)
          setIsLoading(false)
          setUser(null)
        })
    } else {
      // If the token is not available (or is removed)
      setIsLoggedIn(false)
      setIsLoading(false)
      setUser(null)
    }
  }

  const removeToken = () => {
    // Upon logout, remove the token from the localStorage
    localStorage.removeItem('authToken')
  }

  const logOutUser = () => {
    // To log out the user, remove the token
    removeToken()
    // and update the state variables
    authenticateUser()
    navigate('/')
  }

  useEffect(() => {
    authenticateUser()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        user,
        storeToken,
        authenticateUser,
        logOutUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export { AuthProviderWrapper, AuthContext }
