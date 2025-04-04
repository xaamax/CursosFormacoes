import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react'

// Interface para o tipo do contexto
interface AuthContextType {
  isAuthenticated: boolean
  login: () => void
  logout: () => void
}

// Criação do contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

// Componente provedor para o AuthContext
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

  const login = () => {
    setIsAuthenticated(true)
    // localStorage.setItem('ACCESS-TOKEN'); // Armazena o token no localStorage (ou use cookies)
  }

  const logout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('authToken')
  }

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem('token')

      if (!token) {
        setIsAuthenticated(false)
        return
      }

      try {
        const response = await fetch('/api/validate-token', {
          headers: { Authorization: `Bearer ${token}` },
        })

        if (response.ok) {
          setIsAuthenticated(true)
        } else {
          localStorage.removeItem('token')
          setIsAuthenticated(false)
        }
      } catch (error) {
        localStorage.removeItem('token')
        setIsAuthenticated(false)
      }
    }
    validateToken()
  }, [])

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// Hook para acessar o contexto
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
