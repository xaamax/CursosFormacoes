import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import Sidebar from './sidebar'
import useIsCollapsed from '@/hooks/use-is-collapsed'
import SkipToMain from './skip-to-main'

interface ProtectedRouteProps {
  children: ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [isCollapsed, setIsCollapsed] = useIsCollapsed()
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to='/sign-in' replace />
  }

  return (
    <>
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <main
        id='content'
        className={`overflow-x-hidden pt-16 transition-[margin] md:overflow-y-hidden md:pt-0 ${isCollapsed ? 'md:ml-14' : 'md:ml-64'} h-full`}
      >
        <SkipToMain />
        {children}
      </main>
    </>
  )
}

export default ProtectedRoute
