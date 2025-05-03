import { CustomColumnDef } from '@/types/table-types'
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'
import { CourseRegistration } from '@/models/course-registration'

interface ActionButtons {
  delete: (params: CourseRegistration) => void
}

export const columns = (
  actionButtons: ActionButtons
): CustomColumnDef<CourseRegistration>[] => [
  {
    accessorKey: 'id',
    meta: { title: 'Nº Inscrição', className: 'w-fit text-nowrap' },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Nº Inscrição' />
    ),
    cell: ({ row }) => (
      <div>{row.getValue('id')}</div>
    ),
  },
  {
    accessorFn: (row) => row.teacher?.name,
    accessorKey: 'teacher_name',
    meta: { title: 'Professor', className: 'w-fit text-nowrap' },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Professor' />
    ),
    cell: ({ row }) => (
      <div>{row.getValue('teacher_name')}</div>
    ),
  },
  {
    accessorFn: (row) => row.course_training?.title,
    accessorKey: 'course_training_title',
    meta: { title: 'Curso/Formação', className: 'w-fit text-nowrap' },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Curso/Formação' />
    ),
    cell: ({ row }) => (
      <div>{row.getValue('course_training_title')}</div>
    ),
  },
  {
    accessorKey: 'progress',
    meta: { title: 'Formação', className: 'w-fit text-nowrap' },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Progresso' />
    ),
    cell: ({ row }) => (
      <div>{row.getValue('progress')}</div>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <DataTableRowActions row={row} actionButtons={actionButtons} />
    ),
  },
]
