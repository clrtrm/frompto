import type { ReactElement } from 'react'
import Calendar from '~/components/Calendar'

const DashboardPage = (): ReactElement => {
  return (
    <div className="dashboard-page">
      <h1>Dashboard</h1>
      <Calendar />
    </div>
  )
}

export default DashboardPage
