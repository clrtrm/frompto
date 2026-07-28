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
  const [currentMonth, setCurrentMonth] = useState<Dayjs>(dayjs())
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null)
  const [assignedDates, setAssignedDates] = useState<Set<string>>(new Set())

  /** Local State */
  const startOfMonth = currentMonth.startOf('month')
  const daysInMonth = currentMonth.daysInMonth()
  const startWeekday = (startOfMonth.day() + 6) % 7

  const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  const days: (number | null)[] = [
    ...Array(startWeekday).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]

  /** Handlers */
  const goToPreviousMonth = (): void => {
    setCurrentMonth((prev) => prev.subtract(1, 'month'))
  }

  const goToNextMonth = (): void => {
    setCurrentMonth((prev) => prev.add(1, 'month'))
  }

  const handleDayClick = (day: number): void => {
    setSelectedDate(currentMonth.date(day))
  }

  const handlePanelClose = (dateKey: string, hasBody: boolean): void => {
    setSelectedDate(null)
    setAssignedDates((prev) => {
      const next = new Set(prev)
      if (hasBody) next.add(dateKey)
      else next.delete(dateKey)
      return next
    })
  }

  /** Effects */
  useEffect(() => {
    const load = async (): Promise<void> => {
      const dailyPrompts = await fetchDailyPrompts()
      setAssignedDates(new Set(dailyPrompts.map(({ date }) => date)))
    }
    void load()
  }, [])

  /** Render */
  return (
    <div className="calendar-component">
      <div className="month-navigation">
        <Button label="‹" onClick={goToPreviousMonth} variant="ghost" />
        <span>{currentMonth.format('MMMM YYYY')}</span>
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
          const date = day ? currentMonth.date(day) : null
          const dateKey = date?.format('YYYY-MM-DD')

          const cellClasses = clsx('calendar-cell', {
            'calendar-cell--past': date?.isBefore(dayjs(), 'day'),
            'calendar-cell--assigned': dateKey
              ? assignedDates.has(dateKey)
              : false,
          })

          return (
            <div
              key={index}
              className={cellClasses}
              onClick={() => day && handleDayClick(day)}
            >
              {day}
            </div>
          )
        })}
      </div>
      {selectedDate ? (
        <DatePanel
          date={selectedDate}
          onClose={(hasBody) =>
            handlePanelClose(selectedDate.format('YYYY-MM-DD'), hasBody)
          }
        />
      ) : null}
    </div>
  )
}

export default Calendar
