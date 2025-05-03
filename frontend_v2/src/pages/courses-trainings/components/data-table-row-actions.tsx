import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { Row } from '@tanstack/react-table'
import { IconEdit, IconTrash } from '@tabler/icons-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { CourseTraining } from '@/models/course-training'
import { Button } from '@/components/custom/button'
import { useNavigate } from 'react-router-dom'

interface DataTableRowActionsProps {
  row: Row<CourseTraining>
  actionButtons: {
    edit?: (id: number) => void
    delete: (params: CourseTraining) => void
  }
}

export function DataTableRowActions({
  row,
  actionButtons,
}: DataTableRowActionsProps) {
  const navigate = useNavigate()
  const handleCourseTrainingEdit = (id: number) =>
    navigate(`/editar-curso-formacao/${id}`)

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            className='data-[state=open]:bg-muted flex h-8 w-8 p-0'
          >
            <DotsHorizontalIcon className='h-4 w-4' />
            <span className='sr-only'>Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='w-[160px]'>
          <DropdownMenuItem
            onClick={() => handleCourseTrainingEdit(Number(row.original.id))}
          >
            Editar
            <DropdownMenuShortcut>
              <IconEdit size={16} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => actionButtons.delete(row.original)}
            className='!text-red-500'
          >
            Excluir
            <DropdownMenuShortcut>
              <IconTrash size={16} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
