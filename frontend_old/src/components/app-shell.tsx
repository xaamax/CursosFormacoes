import { Outlet } from 'react-router-dom'

export default function AppShell() {
  return (
    <div className='relative h-full overflow-hidden bg-background'>
        <Outlet />
    </div>
  )
}
