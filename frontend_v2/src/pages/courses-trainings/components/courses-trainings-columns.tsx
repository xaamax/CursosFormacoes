import { ColumnDef } from '@tanstack/react-table'
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'
import { CourseTraining } from '@/models/course-training'
import moment from 'moment'

interface ActionButtons {
  delete: (params: CourseTraining) => void
}

export const columns = (actionButtons: ActionButtons): ColumnDef<CourseTraining>[] => [
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Título' />
    ),
    cell: ({ row }) => (
      <div className='w-fit text-nowrap'>{row.getValue('title')}</div>
    ),
  },
  {
    accessorKey: 'start_date',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Data Início' />
    ),
    cell: ({ row }) => (
      <div className='w-fit text-nowrap'>{moment(row.getValue('start_date')).format('DD/MM/YYYY HH:mm')}</div>
    ),
  },
  {
    accessorKey: 'end_date',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Data Término' />
    ),
    cell: ({ row }) => (
      <div className='w-fit text-nowrap'>{moment(row.getValue('end_date')).format('DD/MM/YYYY HH:mm')}</div>
    ),
  },
  {
    accessorKey: 'total_hours',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Total Horas' />
    ),
    cell: ({ row }) => (
      <div className='w-fit text-nowrap'>{row.getValue('total_hours')}</div>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <DataTableRowActions row={row} actionButtons={actionButtons} />
    ),
  },
]
