import type { Dayjs } from 'dayjs'
import { useEffect, useState } from 'react'
import type { ChangeEvent, ReactElement, SubmitEventHandler } from 'react'

import Button from '~/components/Button'
import { fetchDailyPrompt, upsertDailyPrompt } from '~/api/dailyPrompts'
import { fetchPrompts } from '~/api/prompts'
import type { Prompt } from '~/api/prompts'

import './styles.scss'

interface Props {
  date: Dayjs
  onClose: () => void
}

const DatePanel = ({ date, onClose }: Props): ReactElement => {
  const [body, setBody] = useState('')
  const [prompts, setPrompts] = useState<Prompt[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  const dateKey = date.format('YYYY-MM-DD')

  const handleSelectPrompt = (e: ChangeEvent<HTMLSelectElement>): void => {
    const selected = prompts.find((p) => String(p.id) === e.target.value)
    if (selected) setBody(selected.body)
  }

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (
    e,
  ): Promise<void> => {
    e.preventDefault()
    setIsSaving(true)
    await upsertDailyPrompt(dateKey, body)
    setIsSaving(false)
    onClose()
  }

  useEffect(() => {
    const load = async (): Promise<void> => {
      setIsLoading(true)
      const [dailyPrompt, availablePrompts] = await Promise.all([
        fetchDailyPrompt(dateKey),
        fetchPrompts(),
      ])
      setBody(dailyPrompt?.body ?? '')
      setPrompts(availablePrompts)
      setIsLoading(false)
    }
    void load()
  }, [dateKey])

  return (
    <div className="date-panel-component">
      <div className="panel-header">
        <h2>{date.format('MMMM D, YYYY')}</h2>
        <Button label="✕" onClick={onClose} variant="ghost" />
      </div>

      <div className="panel-body">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <form className="panel-body__form" onSubmit={handleSubmit}>
            {prompts.length > 0 ? (
              <select onChange={handleSelectPrompt} defaultValue="">
                <option value="" disabled>
                  Use a template (optional)
                </option>
                {prompts.map((prompt) => (
                  <option key={prompt.id} value={prompt.id}>
                    {prompt.body}
                  </option>
                ))}
              </select>
            ) : null}

            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={6}
              placeholder="Write the prompt for this day..."
            />

            <Button
              label={isSaving ? 'Saving...' : 'Save'}
              type="submit"
              disabled={isSaving}
            />
          </form>
        )}
      </div>
    </div>
  )
}

export default DatePanel
