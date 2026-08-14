import Calendar from '~/components/Calendar'
import PageTitle from '~/components/PageTitle'

import type { ReactElement } from 'react'

import './styles.scss'

const DashboardPage = (): ReactElement => {
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
