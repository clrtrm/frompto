import { Link } from 'react-router-dom'
import dayjs from 'dayjs'

import PageTitle from '~/components/PageTitle'
import useDailyPrompts from '~/hooks/useDailyPrompts'
import useDocumentTitle from '~/hooks/useDocumentTitle'

import type { TDailyPrompt } from '~/types/dailyPrompt'
import type { ReactElement } from 'react'

import './styles.scss'

interface IMonthGroup {
  monthLabel: string
  dailyPrompts: TDailyPrompt[]
}

const RevealPage = (): ReactElement => {
  /** Hooks */
  useDocumentTitle('Reveals')

  const { dailyPrompts } = useDailyPrompts()

  /** Helpers */
  const groupPromptsByMonth = (): IMonthGroup[] => {
    const grouped: IMonthGroup[] = []

    dailyPrompts.reverse().forEach((el) => {
      const monthLabel = dayjs(el.date).format('MMMM YYYY')

      const existingGroup = grouped.find((el) => el.monthLabel === monthLabel)

      if (existingGroup) {
        existingGroup.dailyPrompts.push(el)
      } else {
        grouped.push({ monthLabel, dailyPrompts: [el] })
      }
    })

    return grouped
  }

  /** Render */
  const groupedPrompts = groupPromptsByMonth()

  return (
    <div className="reveals-page">
      <PageTitle textContent="Reveals" />
      <div className="reveals-page-content">
        {groupedPrompts.length > 0 ? (
          <>
            {groupedPrompts.map(({ monthLabel, dailyPrompts }) => (
              <section key={monthLabel} className="month">
                <h2 className="month__label">{monthLabel}</h2>
                <ul className="month__list">
                  {dailyPrompts.map(({ date, body, id }) => (
                    <li>
                      {dayjs(date).format('DD')}:{' '}
                      <Link
                        className="month__list__item"
                        to={`${id}`}
                        key={date}
                      >
                        {body}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </>
        ) : null}
      </div>
    </div>
  )
}

export default RevealPage
