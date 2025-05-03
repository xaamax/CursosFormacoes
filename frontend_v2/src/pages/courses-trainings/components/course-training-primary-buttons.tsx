import { IconPlus } from '@tabler/icons-react'
import { Button } from '@/components/custom/button'
import { useNavigate } from 'react-router-dom'

export function CourseTrainingsPrimaryButtons() {
  const navigate = useNavigate();
  return (
    <div className='flex gap-2'>
      <Button className='space-x-1' onClick={() => navigate('/incluir-curso-formacao')}>
        <IconPlus size={18} /> <span>Incluir Curso/Formação</span> 
      </Button>
    </div>
  )
}
