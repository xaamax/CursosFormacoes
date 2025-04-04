import { useState, useCallback } from 'react'
import api from './api'
import { toast } from '@/components/ui/use-toast'

const useUserService = () => {
  const [ isLoading, setIsLoading] = useState(false)

  const signIn = useCallback(async (username: string, password: string) => {
    setIsLoading(true)
    try {
      const response = await api.post('/auth/signin', { username, password })
      localStorage.setItem("ACCESS-TOKEN", JSON.stringify(response.data.accessToken));
      setIsLoading(false)
      return response.data
    } catch (error) {
      toast({
        title: 'Erro ao Logar',
        description: 'E-mail ou senha inválidos',
        variant: 'destructive',
      })
      setIsLoading(false)
    }
  }, [])

  return { signIn, isLoading }
}

export default useUserService
