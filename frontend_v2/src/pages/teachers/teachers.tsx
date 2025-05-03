import { columns } from './components/teachers-columns'
import { Content } from '@/components/content'
import { Layout } from '@/components/custom/layout'
import { TeachersPrimaryButtons } from './components/teachers-primary-buttons'
import { TeachersTable } from './components/teachers-table'
import useTeacherService from '@/services/teacher-service'
import { useEffect, useState } from 'react'
import { Teacher } from '@/models/teacher'
import { useSwal } from '@/hooks/sweet-alert'

export default function Teachers() {
  const swal = useSwal()
  const { getAllTeachers, deleteTeacher } = useTeacherService()
  const [teacherList, setTeacherList] = useState<Teacher[]>([])

  useEffect(() => {
    getAllTeachers().then((response) => setTeacherList(response))
  }, [])

  const handleTeacherDelete = (teacher: Teacher) => {
    swal
      .fire({
        title: 'Tem certeza que deseja excluir?',
        html: `
      <div style="display: flex; flex-direction: column; align-items: center;">
        <strong>Professor:</strong> ${teacher.name} <br />
        <strong>Email:</strong> ${teacher.email}
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
          deleteTeacher(Number(teacher.id)).then(() =>
            getAllTeachers().then((response) => setTeacherList(response))
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
              Lista de Professores
            </h2>
            <p className='text-muted-foreground'>
              Gerencie as informações cadastradas
            </p>
          </div>
          <TeachersPrimaryButtons />
        </div>
        <TeachersTable
          data={teacherList}
          columns={columns({ delete: handleTeacherDelete })}
        />
      </Layout.Body>
    </Content>
  )
}
