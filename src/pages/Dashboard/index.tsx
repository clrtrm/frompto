import Calendar from '~/components/Calendar'
import PageTitle from '~/components/PageTitle'
import useDocumentTitle from '~/hooks/useDocumentTitle'

import type { ReactElement } from 'react'

import './styles.scss'

const DashboardPage = (): ReactElement => {
  useDocumentTitle('Admin dashboard')

  return (
    <div className="dashboard-page">
      <PageTitle textContent="Admin dashboard" />
      <div className="dashboard-page-content">
        <span>
          New day, new prompt! Make sure each day has a prompt assigned.
        </span>
        <Calendar />
      </div>
    </div>
  )
}

export default DashboardPage
