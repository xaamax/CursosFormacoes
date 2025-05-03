import { columns } from './components/courses-registrations-columns'
import { Content } from '@/components/content'
import { Layout } from '@/components/custom/layout'
import { CourseRegistrationsPrimaryButtons } from './components/course-registration-primary-buttons'
import { DataTable as CourseRegistrationsTable } from '@/components/data-table/data-table'
import useCourseRegistrationService from '@/services/course-registration-service'
import { useEffect, useState } from 'react'
import { CourseRegistration } from '@/models/course-registration'
import { useSwal } from '@/hooks/sweet-alert'

export default function CourseRegistrations() {
  const swal = useSwal()
  const { getAllCourseRegistrations, deleteCourseRegistration } =
    useCourseRegistrationService()
  const [courseRegistrationList, setCourseRegistrationList] = useState<
    CourseRegistration[]
  >([])

  useEffect(() => {
    getAllCourseRegistrations().then((response) =>
      setCourseRegistrationList(response)
    )
  }, [])

  const handleCourseRegistrationDelete = (
    courseRegistration: CourseRegistration
  ) => {
    swal
      .fire({
        title: 'Tem certeza que deseja excluir?',
        html: `
      <div style="display: flex; flex-direction: column; align-items: center;">
          <strong>Nº Inscrição:</strong> ${courseRegistration.id} <br />
          <strong>Professor:</strong> ${courseRegistration.teacher?.name} <br />
          <strong>Curso:</strong> ${courseRegistration.course_training?.title} <br />
      </div>
    `,
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar',
      })
      .then((result) => {
        if (result.isConfirmed) {
          deleteCourseRegistration(Number(courseRegistration.id)).then(() =>
            getAllCourseRegistrations().then((response) =>
              setCourseRegistrationList(response)
            )
          )
        }
      })
  }

  return (
    <Content>
      <Layout.Body className='flex flex-col'>
        <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>
              Lista de Inscrições
            </h2>
            <p className='text-muted-foreground'>
              Gerencie as informações cadastradas
            </p>
          </div>
          <CourseRegistrationsPrimaryButtons />
        </div>
        <CourseRegistrationsTable
          data={courseRegistrationList}
          columns={columns({ delete: handleCourseRegistrationDelete })}
          facetedFilters={[
            { field: 'teacher_name', label: 'Professor' },
            { field: 'course_training_title', label: 'Curso/Formação' },
            { field: 'progress', label: 'Progresso' },
          ]}
        />
      </Layout.Body>
    </Content>
  )
}
