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

const RevealsPage = (): ReactElement => {
  /** Hooks */
  useDocumentTitle('Reveals')

  const { dailyPrompts } = useDailyPrompts()

  /** Helpers */
  const groupPromptsByMonth = (): IMonthGroup[] => {
    const grouped: IMonthGroup[] = []

    const reversedPrompts = [...dailyPrompts].reverse()

    reversedPrompts.forEach((el) => {
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
          <div className="prompts">
            {groupedPrompts.map(({ monthLabel, dailyPrompts }) => (
              <section key={monthLabel} className="month-section">
                <h2 className="month-section__title">{monthLabel}</h2>
                <ul className="month-section__items">
                  {dailyPrompts.map(({ date, body }) => (
                    <li className="daily-prompt">
                      <Link
                        className="daily-prompt__link"
                        to={`${date}`}
                        key={date}
                      >
                        <div className="daily-prompt__link__day">
                          <span>{dayjs(date).format('D')}</span>
                        </div>
                        <p className="daily-prompt__link__body">{body}</p>
                      </Link>
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
