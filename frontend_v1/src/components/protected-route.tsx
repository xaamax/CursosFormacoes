import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/providers/auth-provider";
import Navbar from "./navbar";
import Wrapper from "./wrapper";
// import Sidebar from './sidebar'
// import useIsCollapsed from '@/hooks/use-is-collapsed'
// import SkipToMain from './skip-to-main'

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <main>
      <Wrapper>
        <Navbar />
        <Outlet />
      </Wrapper>
    </main>
  );
};

export default ProtectedRoute;
