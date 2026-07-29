import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'
import { useEffect, useState } from 'react'
import type { ReactElement } from 'react'
import clsx from 'clsx'

import Button from '~/components/Button'
import DatePanel from '~/pages/Dashboard/DatePanel'
import { fetchDailyPrompts } from '~/api/dailyPrompts'

import './styles.scss'

const Calendar = (): ReactElement => {
  /** Hooks */
  const [selectedMonth, setSelectedMonth] = useState<Dayjs>(dayjs())
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null)
  const [promptsByDate, setPromptsByDate] = useState<Map<string, string>>(
    new Map(),
  )

  /** Local State */
  const startOfMonth = selectedMonth.startOf('month')
  const daysInMonth = selectedMonth.daysInMonth()
  const startWeekday = (startOfMonth.day() + 6) % 7

  const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  const days: (number | null)[] = [
    ...Array(startWeekday).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]

  /** Handlers */
  const goToPreviousMonth = (): void => {
    setSelectedMonth((prev) => prev.subtract(1, 'month'))
  }

  const goToNextMonth = (): void => {
    setSelectedMonth((prev) => prev.add(1, 'month'))
  }

  const handleDayClick = (day: number): void => {
    setSelectedDate(selectedMonth.date(day))
  }

  const handlePanelClose = (dateKey: string, body: string): void => {
    setSelectedDate(null)
    setPromptsByDate((prev) => {
      const next = new Map(prev)
      if (body) next.set(dateKey, body)
      else next.delete(dateKey)
      return next
    })
  }

  /** Effects */
  useEffect(() => {
    const load = async (): Promise<void> => {
      const dailyPrompts = await fetchDailyPrompts()
      setPromptsByDate(
        new Map(dailyPrompts.map(({ date, body }) => [date, body])),
      )
    }
    void load()
  }, [])

  /** Render */
  return (
    <div className="calendar-component">
      <div className="month-navigation">
        <Button label="‹" onClick={goToPreviousMonth} variant="ghost" />
        <span>{selectedMonth.format('MMMM YYYY')}</span>
        <Button label="›" onClick={goToNextMonth} variant="ghost" />
      </div>

      <div className="calendar-grid calendar-weekdays">
        {WEEKDAYS.map((day) => (
          <div key={day} className="calendar-weekday">
            {day}
          </div>
        ))}
      </div>

      <div className="calendar-grid">
        {days.map((day, index) => {
          const date = day ? selectedMonth.date(day) : null
          const dateKey = date?.format('YYYY-MM-DD')
          const promptBody = dateKey ? promptsByDate.get(dateKey) : undefined

          const cellClasses = clsx('calendar-cell', {
            'calendar-cell--past': date?.isBefore(dayjs(), 'day'),
            'calendar-cell--assigned': !!promptBody,
          })

          return (
            <div
              key={index}
              className={cellClasses}
              onClick={() => day && handleDayClick(day)}
            >
              {day ? (
                <>
                  <span className="calendar-cell__day-number">{day}</span>
                  {promptBody ? (
                    <span className="calendar-cell__prompt">{promptBody}</span>
                  ) : null}
                </>
              ) : null}
            </div>
          )
        })}
      </div>
      {selectedDate ? (
        <DatePanel
          date={selectedDate}
          onClose={(body) =>
            handlePanelClose(selectedDate.format('YYYY-MM-DD'), body)
          }
        />
      ) : null}
    </div>
  )
}

export default Calendar
