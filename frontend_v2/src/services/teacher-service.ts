import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSwal } from '@/hooks/sweet-alert'
import { toast } from '@/components/ui/use-toast'
import { Teacher } from '@/models/teacher'
import api from './api'

const useTeacherService = () => {
  const swal = useSwal()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const getAllTeachers = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await api.get(`${import.meta.env.VITE_API_TEACHER}`)
      return response.data
    } catch (error) {
      swal.fire({
        title: 'Erro',
        text: String(error),
        icon: 'error',
      })
    } finally {
      setIsLoading(true)
    }
  }, [swal])

  const getTeacherDetails = useCallback(async (id: number) => {
    setIsLoading(true)
    try {
      const response = await api.get(
        `${import.meta.env.VITE_API_TEACHER}/${id}`
      )
      return response.data
    } catch (error) {
      toast({
        title: 'Erro',
        description: String(error),
        variant: 'destructive',
      })
    } finally {
      setIsLoading(true)
    }
  }, [])

  const saveTeacher = useCallback(
    async (teacher: Teacher) => {
      try {
        setIsLoading(true)
        const method = teacher.id ? 'put' : 'post'
        await api[method](`${import.meta.env.VITE_API_TEACHER}`, teacher)
        toast({
          title: 'Sucesso!',
          description: 'Dados salvos.',
        })
      } catch (error) {
        toast({
          title: 'Erro',
          description: String(error),
        })
      } finally {
        setIsLoading(false)
        setTimeout(() => navigate('/professores'), 1000)
      }
    },
    [navigate]
  )

  const deleteTeacher = useCallback(async (id: number) => {
    setIsLoading(true)
    await api
      .delete(`${import.meta.env.VITE_API_TEACHER}/${id}`)
      .then(() => {
        toast({
          title: 'Sucesso!',
          description: 'Registro excluído.',
        })
      })
      .catch((erro) =>
        toast({
          title: 'Erro',
          description: erro,
        })
      )
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  return {
    getAllTeachers,
    getTeacherDetails,
    isLoading,
    saveTeacher,
    deleteTeacher,
  }
}

export default useTeacherService
