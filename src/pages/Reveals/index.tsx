import dayjs from 'dayjs'

import PageTitle from '~/components/PageTitle'
import useDailyPrompts from '~/hooks/useDailyPrompts'
import useDocumentTitle from '~/hooks/useDocumentTitle'

import type { ReactElement } from 'react'

import './styles.scss'

interface IMonthGroup {
  monthLabel: string
  elements: [string, string][]
}

const RevealPage = (): ReactElement => {
  /** Hooks */
  useDocumentTitle('Reveals')

  const { promptsByDate } = useDailyPrompts()

  /** Helpers */
  const groupPromptsByMonth = (): IMonthGroup[] => {
    const grouped: IMonthGroup[] = []

    Array.from(promptsByDate)
      .reverse()
      .forEach(([date, question]) => {
        const monthLabel = dayjs(date).format('MMMM YYYY')

        const existingGroup = grouped.find((el) => el.monthLabel === monthLabel)

        if (existingGroup) {
          existingGroup.elements.push([date, question])
        } else {
          grouped.push({ monthLabel, elements: [[date, question]] })
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
            {groupedPrompts.map(({ monthLabel, elements }) => (
              <section key={monthLabel} className="month">
                <h2 className="month__label">{monthLabel}</h2>
                <ul>
                  {elements.map(([date, question]) => (
                    <li key={date}>
                      {dayjs(date).format('DD')}: {question}
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
