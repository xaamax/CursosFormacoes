import { createBrowserRouter, Navigate } from 'react-router-dom';
import Login from '@/pages/auth/login';
import Dashboard from '@/pages/home/home';
import ProtectedRoute from '@/components/protected-route';
import Teachers from '@/pages/teachers/teachers';
import CourserTrainings from '@/pages/courses_trainings/course-training';
import CoursesRegistrations from '@/pages/courses_registrations/courses-registrations';
import TeacherDetails from '@/pages/teachers/teacher-details';
import CourseTrainingDetails from '@/pages/courses_trainings/course-training-details';
import CourseRegistrationDetails from '@/pages/courses_registrations/course-registration-details';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        index: true,
        element: <Navigate to="/home" replace />,
      },
      {
        path: 'home',
        element: <Dashboard />,
      },
      {
        path: 'professores',
        element: <Teachers />,
      },
      {
        path: 'incluir-professor',
        element: <TeacherDetails />,
      },
      {
        path: 'editar-professor/:id',
        element: <TeacherDetails />,
      },
      {
        path: 'incluir-curso-formacao',
        element: <CourseTrainingDetails />,
      },
      {
        path: 'editar-curso-formacao/:id',
        element: <CourseTrainingDetails />,
      },
      {
        path: 'cursos-formacoes',
        element: <CourserTrainings />,
      },
      {
        path: 'inscricoes',
        element: <CoursesRegistrations />,
      },
      {
        path: 'incluir-inscricao',
        element: <CourseRegistrationDetails />,
      },
      {
        path: 'editar-inscricao/:id',
        element: <CourseRegistrationDetails />,
      },
    ],
  },
  { 
    path: '/login', 
    element: <Login /> 
  },
  { 
    path: '*', 
    element: <Navigate to="/home" replace /> 
  }
]);

export default router;