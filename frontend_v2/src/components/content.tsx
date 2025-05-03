import { Layout } from '@/components/custom/layout'
import { ReactNode } from 'react'
import ThemeSwitch from './theme-switch'
import { UserNav } from './user-nav'

interface ContentProps {
  children: ReactNode
}

export function Content({ children }: ContentProps) {
  return (
    <Layout fixed>
      <Layout.Header>
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>
      <Layout.Body>{children}</Layout.Body>
    </Layout>
  )
}
