import UnauthorizedError from '@/pages/errors/unauthorizad-error'
import api from '@/services/api'
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react'

// Interface do contexto
interface AuthContextType {
  isAuthenticated: boolean
  login: (token: string) => void
  logout: () => void
}

// Criando o contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(
    undefined
  )

  const login = (accessToken: string) => {
    setIsAuthenticated(true)
    localStorage.setItem('token', accessToken)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setIsAuthenticated(false)
  }

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        setIsAuthenticated(false)
        return
      }
      try {
        await api.get('/auth/validate_token', {
          headers: { Authorization: `Bearer ${token}` },
        })
        setIsAuthenticated(true)
      } catch {
        localStorage.removeItem('token')
      }
    }

    validateToken()
  }, [])

  if (isAuthenticated === undefined) {
    return <UnauthorizedError />
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
