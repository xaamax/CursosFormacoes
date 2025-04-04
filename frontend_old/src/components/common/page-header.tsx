import { Layout } from '../custom/layout'
import ThemeSwitch from '../theme-switch'
import { UserNav } from '../user-nav'

interface Props {
  title: string
}

function PageHeader({ ...props }: Props) {
  return (
    <>
      <Layout.Header sticky>
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>
      <div className='mb-2 flex items-center justify-between space-y-2'>
        <h1 className='text-2xl font-bold tracking-tight'>{props.title}</h1>
      </div>
    </>
  )
}

export { PageHeader }
