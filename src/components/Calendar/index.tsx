import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'
import { useState } from 'react'
import type { ReactNode } from 'react'

import './styles.scss'
import Button from '~/components/Button'

const Calendar = (): ReactNode => {
  const [currentMonth, setCurrentMonth] = useState<Dayjs>(dayjs())

  const startOfMonth = currentMonth.startOf('month')
  const daysInMonth = currentMonth.daysInMonth()
  const startWeekday = startOfMonth.day()

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
        {days.map((day, index) => (
          <div key={index} className="calendar-cell">
            {day}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Calendar
