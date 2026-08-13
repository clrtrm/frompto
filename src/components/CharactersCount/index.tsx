import clsx from 'clsx'

import type { ReactElement } from 'react'

import './styles.scss'

interface Props {
  currentLength: number
  maxLength: number
  minLength: number
}

const CharactersCount = ({
  currentLength,
  maxLength,
  minLength,
}: Props): ReactElement => {
  return (
    <span className="characters-count-component">
      <span
        className={clsx('counter', {
          'counter--valid':
            currentLength >= minLength && currentLength < maxLength * 0.9,
          'counter--warning':
            currentLength > maxLength * 0.9 && currentLength < maxLength,
        })}
      >
        {currentLength}
        {currentLength === maxLength ? ' 🫪' : null}
      </span>
      / {maxLength}
    </span>
  )
}

export default CharactersCount
