import { createBrowserRouter } from 'react-router-dom'
import SignIn from '@/pages/auth/sign-in'
import ProtectedRoute from '@/components/protected-route'
import React, { Suspense, lazy } from 'react'
import AppShell from '@/components/app-shell'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<div>Carregando...</div>}>
        {/* Componente do Shell da Aplicação */}
        <AppShell />
      </Suspense>
    ),
    children: [
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute>
            <Suspense fallback={<div>Carregando Dashboard...</div>}>
            {React.createElement(lazy(() => import('@/pages/dashboard/index')))}
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: 'professores',
        element: (
          <ProtectedRoute>
            <Suspense fallback={<div>Carregando Professores...</div>}>
            {React.createElement(lazy(() => import('@/pages/teachers/index')))}
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: 'cursos-formacoes',
        element: (
          <ProtectedRoute>
            <Suspense fallback={<div>Carregando Cursos / Fromações...</div>}>
            {React.createElement(lazy(() => import('@/pages/course_trainings/index')))}
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: 'inscricoes',
        element: (
          <ProtectedRoute>
            <Suspense fallback={<div>Carregando Inscrições...</div>}>
            {React.createElement(lazy(() => import('@/pages/course_registrations/index')))}
            </Suspense>
          </ProtectedRoute>
        ),
      },
    ],
  },
  { path: '/sign-in', Component: SignIn },
])

export default router