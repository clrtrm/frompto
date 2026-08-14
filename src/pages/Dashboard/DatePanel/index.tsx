import { useState } from 'react'

import { upsertDailyPrompt } from '~/api/dailyPrompts'
import Button from '~/components/Button'
import useDailyPromptEditor from '~/hooks/useDailyPromptEditor'

import type { Prompt } from '~/api/prompts'
import type { Dayjs } from 'dayjs'
import type { ChangeEvent, ReactElement, SubmitEventHandler } from 'react'

import './styles.scss'

interface Props {
  date: Dayjs
  onSave: (newPromptBody: string) => void
  onClose: VoidFunction
}

const DatePanel = ({
  date,
  onClose: handleClose,
  onSave: handleSave,
}: Props): ReactElement => {
  /** Hooks */
  const [isSaving, setIsSaving] = useState(false)
  const [errors, setErrors] = useState<string[]>([])

  /** Local State */
  const dateKey = date.format('YYYY-MM-DD')
  const { body, setBody, prompts, isLoading } = useDailyPromptEditor(dateKey)

  /** Handlers */
  const handleSelectPrompt = (e: ChangeEvent<HTMLSelectElement>): void => {
    const selected = prompts.find(
      (p: Prompt) => String(p.id) === e.target.value,
    )
    if (selected) setBody(selected.body)
  }

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (
    e,
  ): Promise<void> => {
    e.preventDefault()
    const trimmedBody = body.trim()

    if (trimmedBody === '') {
      const confirmed = window.confirm(
        'This will delete the prompt for this day. Continue?',
      )
      if (!confirmed) return
    }

    setIsSaving(true)
    const result = await upsertDailyPrompt(dateKey, trimmedBody)
    setIsSaving(false)

    if (result.status === 'invalid') {
      setErrors(result.errors ?? [])
      return
    }

    setErrors([])
    handleSave(result.dailyPrompt?.body ?? '')
  }

  /** Render */
  return (
    <div className="date-panel-component">
      <div className="panel-header">
        <h2>{date.format('MMMM D, YYYY')}</h2>
        <Button label="✕" onClick={handleClose} variant="ghost" />
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
              placeholder="Write a prompt for this day..."
            />
            {errors.length > 0 ? (
              <ul className="panel-body__errors">
                {errors.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            ) : null}
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
