import type { RecognitionError } from '../hooks/useSpeechRecognition'

interface AnswerInputProps {
  asrSupported: boolean
  listening: boolean
  transcript: string
  error: RecognitionError | null
  value: string
  onChangeText: (text: string) => void
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
    default:
      return null
  }
}

export function AnswerInput({
  asrSupported,
  listening,
  transcript,
  error,
  value,
  onChangeText,
  onToggleMic,
  onSubmit,
  disabled = false,
}: AnswerInputProps) {
  const micError = errorMessage(error)
  const shown = listening ? transcript : value

  const handleSubmit = () => {
    if (disabled) return
    const trimmed = value.trim()
    if (!trimmed) return
    onSubmit(trimmed)
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
            disabled={disabled && !listening}
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
            value={shown}
            placeholder={'Type the word\u2026'}
            onChange={(e) => onChangeText(e.target.value)}
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
        </div>

        <button
          type="button"
          className="primary-btn"
          onClick={handleSubmit}
          disabled={disabled || listening || !value.trim()}
        >
          Submit
        </button>
      </div>
      <p className="answer-card__tip">
        Tap the mic and say the word &mdash; I&apos;ll drop it in the box for
        you to check. Press Submit when it looks right.
      </p>
    </section>
  )
}