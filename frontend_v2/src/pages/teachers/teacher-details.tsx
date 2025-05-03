import { Content } from '@/components/content'
import { ContentHeader } from '@/components/content-header'
import { TeacherForm } from './components/teacher-form'
import { useParams } from 'react-router-dom'
import useTeacherService from '@/services/teacher-service'
import { useEffect, useState } from 'react'
import { Teacher } from '@/models/teacher'

function TeacherDetails() {
  const { id } = useParams()
  const { getTeacherDetails } = useTeacherService()
  const [tacherDetails, setTeacherDetails] = useState<Teacher | undefined>()

  useEffect(() => {
    if (id)
      getTeacherDetails(Number(id)).then((response) =>
        setTeacherDetails(response)
      )
  }, [id])

  return (
    <Content>
      <ContentHeader title={`${id ? 'Editar' : 'Incluir'} Professor`} />
      <TeacherForm defaultValues={tacherDetails} />
    </Content>
  )
}

export default TeacherDetails
