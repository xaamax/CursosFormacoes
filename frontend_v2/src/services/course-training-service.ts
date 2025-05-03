import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSwal } from '@/hooks/sweet-alert'
import { toast } from '@/components/ui/use-toast'
import { CourseTraining } from '@/models/course-training'
import api from './api'

const useCourseTrainingService = () => {
  const swal = useSwal()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const getAllCourseTrainings = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await api.get(`${import.meta.env.VITE_API_COURSE_TRAINING}`)
      return response.data
    } catch (error) {
      swal.fire({
        title: 'Erro',
        text: String(error),
        icon: 'error',
      })
    } finally {
      setIsLoading(false)
    }
  }, [swal])

  const getCourseTrainingDetails = useCallback(async (id: number) => {
    setIsLoading(true)
    try {
      const response = await api.get(
        `${import.meta.env.VITE_API_COURSE_TRAINING}/${id}`
      )
      return response.data
    } catch (error) {
      toast({
        title: 'Erro',
        description: String(error),
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }, [])

  const saveCourseTraining = useCallback(
    async (courseTraining: CourseTraining) => {
      try {
        setIsLoading(true)
        const method = courseTraining.id ? 'put' : 'post'
        await api[method](`${import.meta.env.VITE_API_COURSE_TRAINING}`, courseTraining)
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
        setTimeout(() => navigate('/cursos-formacoes'), 1000)
      }
    },
    [navigate]
  )

  const deleteCourseTraining = useCallback(async (id: number) => {
    setIsLoading(true)
    await api
      .delete(`${import.meta.env.VITE_API_COURSE_TRAINING}/${id}`)
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
    getAllCourseTrainings,
    getCourseTrainingDetails,
    isLoading,
    saveCourseTraining,
    deleteCourseTraining,
  }
}

export default useCourseTrainingService
