import useDocumentTitle from '~/hooks/useDocumentTitle'

import type { ReactElement } from 'react'

const ProfilePage = (): ReactElement => {
  useDocumentTitle('Profile')

  return (
    <div>
      <h1>Profile</h1>
    </div>
  )
}

export default ProfilePage
