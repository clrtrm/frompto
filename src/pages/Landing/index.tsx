import PageTitle from '~/components/PageTitle'

import type { ReactElement } from 'react'

import './styles.scss'

const LandingPage = (): ReactElement => {
  return (
    <div className="landing-page">
      <PageTitle
        textContent="Prompto"
        documentTitle="Cozy Check-ins with Strangers"
      />
      <div className="page-main-container">
        <p className="page-main-container__app-pitch">
          New question, every morning, 10am sharp.
          <br />
          You've got 24 hours to answer before the big reveal.
          <br />
          Show up daily, get a little less stranger-y.
        </p>
      </div>
    </div>
  )
}

export default LandingPage
