import clsx from 'clsx'
import dayjs from 'dayjs'
import type { MouseEventHandler, ReactElement } from 'react'

interface Props {
  date: dayjs.Dayjs | null
  key: number
  textContent?: string
  day: number | null
  onClick: MouseEventHandler<HTMLElement>
}

const CalendarCell = ({
  date,
  day,
  key,
  textContent,
  onClick,
}: Props): ReactElement => {
  const classes = clsx('calendar-cell', {
    'calendar-cell--past': date?.isBefore(dayjs(), 'day'),
    'calendar-cell--assigned': !!textContent,
  })

  return (
    <div key={key} className={classes} onClick={onClick}>
      {day ? (
        <>
          <span className="calendar-cell__day-number">{day}</span>
          {textContent ? (
            <span className="calendar-cell__prompt">{textContent}</span>
          ) : null}
        </>
      ) : null}
    </div>
  )
}

export default CalendarCell
