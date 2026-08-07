import PageTitle from '~/components/PageTitle'
import useDocumentTitle from '~/hooks/useDocumentTitle'

import type { ReactElement } from 'react'

import './styles.scss'

const LandingPage = (): ReactElement => {
  useDocumentTitle('Cozy Check-ins with Strangers')

  return (
    <div className="page landing-page">
      <div className="title-and-pitch">
        <PageTitle textContent="Prompto" />
        <span className="app-pitch">
          New question, every morning, 10am sharp.
          <br />
          You've got 24 hours to answer before the big reveal.
          <br />
          Show up daily, get a little less stranger-y.
        </span>
      </div>
    </div>
  )
}

export default LandingPage
