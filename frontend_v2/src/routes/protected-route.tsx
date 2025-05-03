import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/providers/auth-provider'
import useIsCollapsed from '@/hooks/use-is-collapsed'
import Sidebar from "@/components/sidebar";
import SkipToMain from '@/components/skip-to-main';
// import Wrapper from "./wrapper";
// import Sidebar from './sidebar'
// import useIsCollapsed from '@/hooks/use-is-collapsed'
// import SkipToMain from './skip-to-main'

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth()
  const [isCollapsed, setIsCollapsed] = useIsCollapsed()

  if (!isAuthenticated) {
    return <Navigate to='/401' replace />
  }

  return (
    <>
      <div className='bg-background relative h-full overflow-hidden'>
        <SkipToMain />
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        <main
          id='content'
          className={`overflow-x-hidden pt-16 transition-[margin] md:overflow-y-hidden md:pt-0 ${
            isCollapsed ? 'md:ml-14' : 'md:ml-64'
          } h-full`}
        >
          <Outlet />
        </main>
      </div>
    </>
  )
}

export default ProtectedRoute
