import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSwal } from '@/hooks/sweet-alert'
import { toast } from '@/components/ui/use-toast'
import { CourseRegistration } from '@/models/course-registration'
import api from './api'
import { Teacher } from '@/models/teacher'
import { CourseTraining } from '@/models/course-training'

const useCourseRegistrationService = () => {
  const swal = useSwal()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const getAllCourseRegistrations = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await api.get(
        `${import.meta.env.VITE_API_COURSE_REGISTRATION}`
      )
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

  const getCourseRegistrationDetails = useCallback(async (id: number) => {
    setIsLoading(true)
    try {
      const response = await api.get(
        `${import.meta.env.VITE_API_COURSE_REGISTRATION}/${id}`
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

  const saveCourseRegistration = useCallback(
    async (courseRegistration: CourseRegistration) => {
      try {
        setIsLoading(true)
        const method = courseRegistration.id ? 'patch' : 'post'
        const baseUrl = `${import.meta.env.VITE_API_COURSE_REGISTRATION}/${
          courseRegistration.id ? `${courseRegistration.id}/progress` : ''
        }`
        const formData = {
          ...(courseRegistration.id
            ? { progress: courseRegistration.progress }
            : courseRegistration),
        }
        await api[method](baseUrl, formData)
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
        setTimeout(() => navigate('/inscricoes'), 1000)
      }
    },
    [navigate]
  )

  const deleteCourseRegistration = useCallback(async (id: number) => {
    setIsLoading(true)
    await api
      .delete(`${import.meta.env.VITE_API_COURSE_REGISTRATION}/${id}`)
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

  const getAllTeachersCourseTrainings = useCallback(async () => {
    setIsLoading(true)
    try {
      const res = await api.get<{
        teachers: Teacher[]
        courses_trainings: CourseTraining[]
      }>(
        `${
          import.meta.env.VITE_API_COURSE_REGISTRATION
        }/teachers_courses_trainings`
      )
      return res.data
    } catch (error) {
      toast({
        title: 'Erro',
        description: String(error),
      })
    } finally {
      setIsLoading(false)
    }
  }, [])

  return {
    getAllTeachersCourseTrainings,
    getAllCourseRegistrations,
    getCourseRegistrationDetails,
    isLoading,
    saveCourseRegistration,
    deleteCourseRegistration,
  }
}

export default useCourseRegistrationService
