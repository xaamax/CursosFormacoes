import { IconUserPlus } from '@tabler/icons-react'
import { Button } from '@/components/custom/button'
import { useNavigate } from 'react-router-dom'

export function TeachersPrimaryButtons() {
  const navigate = useNavigate();
  return (
    <div className='flex gap-2'>
      <Button className='space-x-1' onClick={() => navigate('/incluir-professor')}>
      <IconUserPlus size={18} /> <span>Incluir Professor</span>
      </Button>
    </div>
  )
}
