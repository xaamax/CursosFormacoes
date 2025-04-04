import React from 'react'
import ReactDOM from 'react-dom/client'
import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from '@/components/theme-provider'
import '@/index.css'
import router from './routes/router'
import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
      <Toaster />
    </ThemeProvider>
  </React.StrictMode>
)
