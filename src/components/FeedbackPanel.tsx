import type { VocabularyItem } from '../data/items'
import type { AnswerTier } from '../lib/scoring'

interface FeedbackPanelProps {
  tier: AnswerTier | 'empty'
  input: string
  item: VocabularyItem
  attemptsLeft: number
  onRetry: () => void
  onNext: () => void
  onSkip: () => void
  onSpeakWord: () => void
  onSpeakDefinition: () => void
  ttsSupported: boolean
}

export function FeedbackPanel({
  tier,
  input,
  item,
  attemptsLeft,
  onRetry,
  onNext,
  onSkip,
  onSpeakWord,
  onSpeakDefinition,
  ttsSupported,
}: FeedbackPanelProps) {
  if (tier === 'correct') {
    return (
      <section className="card feedback feedback--correct" role="status">
        <p className="feedback__headline">
          {'\u2705'} Correct &mdash; it&apos;s &ldquo;{item.word}&rdquo;!
        </p>
        <p className="feedback__example">
          &ldquo;{item.exampleSentence}&rdquo;
        </p>
        {ttsSupported && (
          <div className="feedback__actions">
            <button type="button" className="ghost-btn" onClick={onSpeakWord}>
              {'\u{1F50A}'} Hear the word
            </button>
            <button
              type="button"
              className="ghost-btn"
              onClick={onSpeakDefinition}
            >
              {'\u{1F50A}'} Hear definition
            </button>
          </div>
        )}
        <button type="button" className="primary-btn" onClick={onNext}>
          Next word {'\u2192'}
        </button>
      </section>
    )
  }

  if (tier === 'empty') {
    return (
      <section className="card feedback feedback--empty" role="status">
        <p className="feedback__headline">
          I didn&apos;t catch that. Give it a try below &mdash; or tap the mic
          again.
        </p>
        <button type="button" className="primary-btn" onClick={onRetry}>
          Try again
        </button>
      </section>
    )
  }

  if (tier === 'close') {
    return (
      <section className="card feedback feedback--close" role="status">
        <p className="feedback__headline">
          {'\u{1F7E2}'} &ldquo;{input}&rdquo; is very close!
        </p>
        <p className="feedback__detail">
          Check the spelling and try again. Hint: {item.hint}.
        </p>
        {ttsSupported && (
          <div className="feedback__actions">
            <button
              type="button"
              className="ghost-btn"
              onClick={onSpeakDefinition}
            >
              {'\u{1F50A}'} Hear the definition again
            </button>
          </div>
        )}
        <div className="feedback__actions">
          <button type="button" className="primary-btn" onClick={onRetry}>
            Try again ({attemptsLeft} left)
          </button>
          <button type="button" className="ghost-btn" onClick={onSkip}>
            Skip word
          </button>
        </div>
      </section>
    )
  }

  return (
    <section
      className={`card feedback ${attemptsLeft > 0 ? 'feedback--wrong' : 'feedback--wrong feedback--wrong-final'}`}
      role="status"
    >
      <p className="feedback__headline">
        {'\u274C'} You said &ldquo;{input || '\u2026'}&rdquo; &mdash; not quite.
      </p>
      {attemptsLeft > 0 ? (
        <p className="feedback__detail">
          Focus on today&apos;s word. Hint: {item.hint}. Listen again and
          retry.
        </p>
      ) : (
        <p className="feedback__detail">
          The word is &ldquo;{item.word}&rdquo;. It will come back in Round 2
          so you can show you&apos;ve got it.
        </p>
      )}
      {ttsSupported && (
        <div className="feedback__actions">
          <button
            type="button"
            className="ghost-btn"
            onClick={onSpeakDefinition}
          >
            {'\u{1F50A}'} Hear definition again
          </button>
          {attemptsLeft === 0 && (
            <button type="button" className="ghost-btn" onClick={onSpeakWord}>
              {'\u{1F50A}'} Hear the answer
            </button>
          )}
        </div>
      )}
      <div className="feedback__actions">
        {attemptsLeft > 0 ? (
          <>
            <button type="button" className="primary-btn" onClick={onRetry}>
              Try again ({attemptsLeft} left)
            </button>
            <button type="button" className="ghost-btn" onClick={onSkip}>
              Skip word
            </button>
          </>
        ) : (
          <button type="button" className="primary-btn" onClick={onNext}>
            Next word {'\u2192'}
          </button>
        )}
      </div>
    </section>
  )
}