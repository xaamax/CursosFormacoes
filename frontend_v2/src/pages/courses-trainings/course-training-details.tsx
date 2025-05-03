import { Content } from '@/components/content'
import { ContentHeader } from '@/components/content-header'
import { CourseTrainingForm } from './components/course-training-form'
import { useParams } from 'react-router-dom'
import useCourseTrainingService from '@/services/course-training-service'
import { useEffect, useState } from 'react'
import { CourseTraining } from '@/models/course-training'

function CourseTrainingDetails() {
  const { id } = useParams()
  const { getCourseTrainingDetails } = useCourseTrainingService()
  const [ courseTrainingDetails, setCourseTrainingDetails] = useState<CourseTraining | undefined>()

  useEffect(() => {
    if (id)
      getCourseTrainingDetails(Number(id)).then((response) =>
        setCourseTrainingDetails(response)
      )
  }, [id])

  return (
    <Content>
      <ContentHeader title={`${id ? 'Editar' : 'Incluir'} Curso/Formação`} />
      <CourseTrainingForm defaultValues={courseTrainingDetails} />
    </Content>
  )
}

export default CourseTrainingDetails
