import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/providers/auth-provider'
import axios from 'axios'
import { useSwal } from '@/hooks/sweet-alert'
import { toast } from '@/components/ui/use-toast'

const useAuthService = () => {
  const { login } = useAuth()
  const swal = useSwal()
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const signIn = useCallback(async (username: string, password: string) => {
    setIsLoading(true)
    const response = await axios
      .post(`${import.meta.env.VITE_API_URL}/auth/signin`, {
        username,
        password,
      })
      .then((resp) => {
        const { accessToken } = resp.data
        login(accessToken)
        toast({
          title: 'Usuário autenticado',
          description: 'Bem-vindo(a)!',
        })
        setTimeout(() => navigate('/'), 1000)
      })
      .catch((error) =>
        swal
          .fire({
            title: 'Ops!',
            text: error?.message,
            icon: 'error',
          })
          .then(() => navigate('/'))
      )
      .finally(() => setIsLoading(false))
    return response
  }, [login, navigate, swal])

  return { signIn, isLoading }
}

export default useAuthService
