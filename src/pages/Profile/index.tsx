import type { ReactElement } from 'react'
import useDocumentTitle from '~/hooks/useDocumentTitle'

const ProfilePage = (): ReactElement => {
  useDocumentTitle('Profile')

  return (
    <div>
      <h1>Profile</h1>
    </div>
  )
}

export default ProfilePage
