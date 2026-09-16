import { useState } from 'react'
import type { RecognitionError } from '../hooks/useSpeechRecognition'

interface AnswerInputProps {
  asrSupported: boolean
  listening: boolean
  transcript: string
  error: RecognitionError | null
  onToggleMic: () => void
  onSubmit: (text: string) => void
  disabled?: boolean
}

function errorMessage(error: RecognitionError | null): string | null {
  switch (error) {
    case 'not-allowed':
      return 'Microphone permission was denied. Type your answer below \u2014 that works too!'
    case 'no-speech':
      return "I didn't catch anything. Try speaking again, or type below."
    case 'network':
      return 'Speech recognition hit a network error. Type below, or try the mic again.'
    case 'unsupported':
      return 'This browser does not support speech recognition. Type your answer below.'
    case 'aborted':
      return null
    default:
      return 'Something went wrong with the microphone. Type below, or try the mic again.'
  }
}

export function AnswerInput({
  asrSupported,
  listening,
  transcript,
  error,
  onToggleMic,
  onSubmit,
  disabled = false,
}: AnswerInputProps) {
  const [text, setText] = useState('')
  const micError = errorMessage(error)
  const value = listening ? transcript : text

  const handleSubmit = () => {
    if (disabled) return
    const value = text.trim()
    if (!value) return
    onSubmit(value)
    setText('')
  }

  return (
    <section className="card answer-card">
      <div className="answer-card__row">
        {asrSupported ? (
          <button
            type="button"
            className={`mic-btn ${listening ? 'mic-btn--listening' : ''}`}
            onClick={onToggleMic}
            aria-label={listening ? 'Stop recording' : 'Speak your answer'}
            disabled={disabled}
          >
            {listening ? '\u23F9' : '\u{1F3A4}'}
          </button>
        ) : (
          <span className="asr-note">
            Speech recognition is not supported in this browser &mdash; typing
            below.
          </span>
        )}

        <div className="answer-card__field">
          <input
            type="text"
            value={value}
            placeholder={'Type the word\u2026'}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSubmit()
            }}
            disabled={disabled || listening}
            autoComplete="off"
            spellCheck={false}
            aria-label="Type your answer"
          />
          {listening && (
            <div className="listening-hint">
              Listening&hellip;{' '}
              {transcript ? `I hear \u201c${transcript}\u201d` : 'speak now'}
            </div>
          )}
          {!listening && micError && (
            <div className="listening-hint listening-hint--error">{micError}</div>
          )}
          {!listening && error === 'aborted' && (
            <div className="listening-hint">
              Recording stopped. Press Submit to check your answer, or try the
              mic again.
            </div>
          )}
        </div>

        <button
          type="button"
          className="primary-btn"
          onClick={handleSubmit}
          disabled={disabled || listening || !text.trim()}
        >
          Submit
        </button>
      </div>
      <p className="answer-card__tip">
        Tap the mic and say the word, or type it. Your answer decides what
        happens next.
      </p>
    </section>
  )
}