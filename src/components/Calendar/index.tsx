import { useState } from 'react'
import dayjs from 'dayjs'

import Button from '~/components/Button'
import useDailyPrompts from '~/hooks/useDailyPrompts'
import DatePanel from '~/pages/Dashboard/DatePanel'

import CalendarCell from './CalendarCell'

import type { Dayjs } from 'dayjs'
import type { ReactElement } from 'react'

import './styles.scss'

const Calendar = (): ReactElement => {
  /** Hooks */
  const [selectedMonth, setSelectedMonth] = useState<Dayjs>(dayjs())
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null)
  const { promptsByDate, setPromptsByDate } = useDailyPrompts()

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

  const handlePanelClose = (): void => {
    setSelectedDate(null)
  }

  const handlePanelSave = (dateKey: string, newPromptBody: string): void => {
    handlePanelClose()
    setPromptsByDate((prev) => {
      const next = new Map(prev)
      if (newPromptBody) next.set(dateKey, newPromptBody)
      else next.delete(dateKey)
      return next
    })
  }

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

          return (
            <CalendarCell
              date={date}
              key={index}
              textContent={promptBody}
              day={day}
              onClick={() => day && handleDayClick(day)}
            />
          )
        })}
      </div>
      {selectedDate ? (
        <DatePanel
          date={selectedDate}
          onSave={(body) =>
            handlePanelSave(selectedDate.format('YYYY-MM-DD'), body)
          }
          onClose={handlePanelClose}
        />
      ) : null}
    </div>
  )
}

export default Calendar
