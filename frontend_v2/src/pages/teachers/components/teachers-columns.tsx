import { ColumnDef } from '@tanstack/react-table'
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'
import { Teacher } from '@/models/teacher'

interface ActionButtons {
  delete: (params: Teacher) => void
}

export const columns = (actionButtons: ActionButtons): ColumnDef<Teacher>[] => [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Nome' />
    ),
    cell: ({ row }) => (
      <div className='w-fit text-nowrap'>{row.getValue('name')}</div>
    ),
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='E-mail' />
    ),
    cell: ({ row }) => (
      <div className='w-fit text-nowrap'>{row.getValue('email')}</div>
    ),
  },
  {
    accessorKey: 'school',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Escola' />
    ),
    cell: ({ row }) => (
      <div className='w-fit text-nowrap'>{row.getValue('school')}</div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'school_class',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Turma' />
    ),
    cell: ({ row }) => (
      <div className='w-fit text-nowrap'>{row.getValue('school_class')}</div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <DataTableRowActions row={row} actionButtons={actionButtons} />
    ),
  },
]
