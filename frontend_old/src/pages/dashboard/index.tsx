import { Layout } from '@/components/custom/layout'
import { PageHeader } from '@/components/common/page-header'

function Dashboard() {
  return (
    <Layout>
      <Layout.Body>
        <PageHeader title='Dashboard' />
      </Layout.Body>
    </Layout>
  )
}

export default Dashboard
