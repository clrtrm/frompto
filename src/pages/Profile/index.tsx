import PageTitle from '~/components/PageTitle'
import useAuth from '~/context/auth/useAuth'

import type { ReactElement } from 'react'

import './styles.scss'

const ProfilePage = (): ReactElement => {
  const { user } = useAuth()

  /** Render */
  return (
    <div className="profile-page">
      <PageTitle textContent="Profile" />
      <div className="page-main-content">
        <div className="user-info">
          <div className="user-info__image" />
          <div className="user-info__text">
            <span className="user-info-key">Username:</span>
            <span>{user?.username}</span>

            <span className="user-info-key">Display name:</span>
            {user?.displayName ? (
              <span className="user-info-value">{user.displayName}</span>
            ) : (
              <span className="user-info-value--default">
                No display name defined
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
