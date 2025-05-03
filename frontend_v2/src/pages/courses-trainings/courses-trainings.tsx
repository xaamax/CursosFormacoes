import { columns } from './components/courses-trainings-columns'
import { Content } from '@/components/content'
import { Layout } from '@/components/custom/layout'
import { CourseTrainingsPrimaryButtons } from './components/course-training-primary-buttons'
import { CourseTrainingsTable } from './components/courses-trainings-table'
import useCourseTrainingService from '@/services/course-training-service'
import { useEffect, useState } from 'react'
import { CourseTraining } from '@/models/course-training'
import { useSwal } from '@/hooks/sweet-alert'

export default function CourseTrainings() {
  const swal = useSwal()
  const { getAllCourseTrainings, deleteCourseTraining } = useCourseTrainingService()
  const [courseTrainingList, setCourseTrainingList] = useState<CourseTraining[]>([])

  useEffect(() => {
    getAllCourseTrainings().then((response) => setCourseTrainingList(response))
  }, [])

  const handleCourseTrainingDelete = (courseTraining: CourseTraining) => {
    swal
      .fire({
        title: 'Tem certeza que deseja excluir?',
        html: `
      <div style="display: flex; flex-direction: column; align-items: center;">
        <strong>Curso:</strong> ${courseTraining.title} <br />
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
          deleteCourseTraining(Number(courseTraining.id)).then(() =>
            getAllCourseTrainings().then((response) => setCourseTrainingList(response))
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
              Lista de Cursos/Formações
            </h2>
            <p className='text-muted-foreground'>
              Gerencie as informações cadastradas
            </p>
          </div>
          <CourseTrainingsPrimaryButtons />
        </div>
        <CourseTrainingsTable
          data={courseTrainingList}
          columns={columns({ delete: handleCourseTrainingDelete })}
        />
      </Layout.Body>
    </Content>
  )
}
