import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'
import { useState } from 'react'
import type { ReactElement } from 'react'
import clsx from 'clsx'

import Button from '~/components/Button'
import DatePanel from '~/pages/Dashboard/DatePanel'

import './styles.scss'

const Calendar = (): ReactElement => {
  const [currentMonth, setCurrentMonth] = useState<Dayjs>(dayjs())

  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null)

  const startOfMonth = currentMonth.startOf('month')
  const daysInMonth = currentMonth.daysInMonth()
  const startWeekday = (startOfMonth.day() + 6) % 7

  const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  const days: (number | null)[] = [
    ...Array(startWeekday).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]

  const goToPreviousMonth = (): void => {
    setCurrentMonth((prev) => prev.subtract(1, 'month'))
  }

  const goToNextMonth = (): void => {
    setCurrentMonth((prev) => prev.add(1, 'month'))
  }

  const handleDayClick = (day: number): void => {
    setSelectedDate(currentMonth.date(day))
  }

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

          const cellClasses = clsx('calendar-cell', {
            'calendar-cell--past': date?.isBefore(dayjs(), 'day'),
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
        <DatePanel date={selectedDate} onClose={() => setSelectedDate(null)} />
      ) : null}
    </div>
  )
}

export default Calendar
