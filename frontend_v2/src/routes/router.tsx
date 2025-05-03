import React, { Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import Login from '@/pages/auth/login';
import UnauthorizedError from '@/pages/errors/unauthorizad-error';
import ProtectedRoute from './protected-route';

const Dashboard = React.lazy(() => import('@/pages/dashboard/dashboard'));
const Teachers = React.lazy(() => import('@/pages/teachers/teachers'));
const TeacherDetails = React.lazy(() => import('@/pages/teachers/teacher-details'));
const CourseTrainings = React.lazy(() => import('@/pages/courses-trainings/courses-trainings'));
const CourseTrainingDetails = React.lazy(() => import('@/pages/courses-trainings/course-training-details'));
const CourseRegistrations = React.lazy(() => import('@/pages/course-registrations/course-registrations'));
const CourseRegistrationDetails = React.lazy(() => import('@/pages/course-registrations/course-registration-details'));

const LazyRoute = (Component: React.LazyExoticComponent<React.FC>) => (
  <Suspense fallback="Carregando...">
    <Component />
  </Suspense>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: LazyRoute(Dashboard),
      },
      {
        path: 'professores',
        element: LazyRoute(Teachers),
      },
      {
        path: 'incluir-professor',
        element: LazyRoute(TeacherDetails),
      },
      {
        path: 'editar-professor/:id',
        element: LazyRoute(TeacherDetails),
      },
      {
        path: 'cursos-formacoes',
        element: LazyRoute(CourseTrainings),
      },
      {
        path: 'incluir-curso-formacao',
        element: LazyRoute(CourseTrainingDetails),
      },
      {
        path: 'editar-curso-formacao/:id',
        element: LazyRoute(CourseTrainingDetails),
      },
      {
        path: 'inscricoes',
        element: LazyRoute(CourseRegistrations),
      },
      {
        path: 'incluir-inscricao',
        element: LazyRoute(CourseRegistrationDetails),
      },
      {
        path: 'editar-inscricao/:id',
        element: LazyRoute(CourseRegistrationDetails),
      },
    ],
  },
  { 
    path: '/login', 
    element: <Login />,
  },
  { 
    path: '/401', 
    element: <UnauthorizedError />,
  },
  {
    path: '*',
    element: <Navigate to="/dashboard" replace />,
  }
]);

export default router;