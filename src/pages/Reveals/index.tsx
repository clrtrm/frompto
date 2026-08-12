import { FaLock } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import dayjs from 'dayjs'

import PageTitle from '~/components/PageTitle'
import useReveals from '~/hooks/useReveals'

import type { IRevealSummary } from '~/types/reveal'
import type { ReactElement } from 'react'

import './styles.scss'

interface IMonthGroup {
  monthLabel: string
  reveals: IRevealSummary[]
}

const RevealsPage = (): ReactElement => {
  /** Hooks */

  const { reveals } = useReveals()

  /** Helpers */
  const groupRevealsByMonth = (): IMonthGroup[] => {
    const grouped: IMonthGroup[] = []

    reveals.forEach((el) => {
      const monthLabel = dayjs(el.date).format('MMMM YYYY')

      const existingGroup = grouped.find((el) => el.monthLabel === monthLabel)

      if (existingGroup) {
        existingGroup.reveals.push(el)
      } else {
        grouped.push({ monthLabel, reveals: [el] })
      }
    })

    return grouped
  }

  /** Render */
  const groupedReveals = groupRevealsByMonth()

  return (
    <div className="reveals-page">
      <PageTitle textContent="Reveals" />
      <div className="reveals-page-content">
        {groupedReveals.length > 0 ? (
          <div className="reveals">
            {groupedReveals.map(({ monthLabel, reveals }) => (
              <section key={monthLabel} className="month-section">
                <h2 className="month-section__title">{monthLabel}</h2>
                <ul className="month-section__items">
                  {reveals.map(({ date, body, locked }) => (
                    <li
                      className={clsx('reveal-item', {
                        'reveal-item--locked': locked,
                        'reveal-item--unlocked': !locked,
                      })}
                      key={date}
                    >
                      {locked ? (
                        <div className="reveal-item__classic-wrapper">
                          <div className="reveal__day">
                            <span>{dayjs(date).format('D')}</span>
                          </div>
                          <p className="reveal__body">{body}</p>
                          <FaLock />
                        </div>
                      ) : (
                        <Link
                          className="reveal-item__link-wrapper"
                          to={`${date}`}
                        >
                          <div className="reveal__day">
                            <span>{dayjs(date).format('D')}</span>
                          </div>
                          <p className="reveal__body">{body}</p>
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default RevealsPage
