import clsx from 'clsx'
import dayjs from 'dayjs'

import type { MouseEventHandler, ReactElement } from 'react'

import './styles.scss'

interface Props {
  date: dayjs.Dayjs | null
  textContent?: string
  day: number | null
  onClick: MouseEventHandler<HTMLElement>
}

const CalendarCell = ({
  date,
  day,
  textContent,
  onClick,
}: Props): ReactElement => {
  const classes = clsx('calendar-cell-component', {
    'calendar-cell-component--has-day': !!day,
    'calendar-cell-component--past': date?.isBefore(dayjs(), 'day'),
    'calendar-cell-component--assigned': !!textContent,
  })

  return (
    <div className={classes} onClick={onClick}>
      {day ? (
        <>
          <span className="calendar-cell-component__day">{day}</span>
          {textContent ? (
            <span className="calendar-cell-component__prompt">
              {textContent}
            </span>
          ) : null}
        </>
      ) : null}
    </div>
  )
}

export default CalendarCell
