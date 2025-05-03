import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { Content } from '@/components/content'
import { ContentHeader } from '@/components/content-header'
import { CourseRegistrationForm } from './components/course-registration-form'

import useCourseRegistrationService from '@/services/course-registration-service'

import { CourseRegistration } from '@/models/course-registration'
import { Teacher } from '@/models/teacher'
import { CourseTraining } from '@/models/course-training'
import Loading from '@/components/custom/loading/loading'

function CourseRegistrationDetails() {
  const { id } = useParams()
  const {
    getCourseRegistrationDetails,
    getAllTeachersCourseTrainings,
    isLoading,
  } = useCourseRegistrationService()
  const [formData, setFormData] = useState<{
    course_registration: CourseRegistration | undefined
    teachers: Teacher[]
    courses_trainings: CourseTraining[]
  }>({
    course_registration: undefined,
    teachers: [],
    courses_trainings: [],
  })

  useEffect(() => {
    getAllTeachersCourseTrainings().then((response) => {
      setFormData((prevs) => ({
        ...prevs,
        teachers: response?.teachers ?? [],
        courses_trainings: response?.courses_trainings ?? [],
        course_registration: undefined,
      }))
    })
  }, [])

  useEffect(() => {
    if (id)
      getCourseRegistrationDetails(Number(id)).then((response) =>
        setFormData((prevs) => ({ ...prevs, course_registration: response }))
      )
  }, [id])

  return (
    <Content>
      {isLoading && <Loading />}
      <ContentHeader title={`${id ? 'Editar' : 'Incluir'} Inscrição`} />
      <CourseRegistrationForm defaultValues={formData} />
    </Content>
  )
}

export default CourseRegistrationDetails
