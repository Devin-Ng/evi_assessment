interface EndScreenProps {
  score: number
  bestScore: number
  correctCount: number
  total: number
  maxStreak: number
  isNewBest: boolean
  missedWords: string[]
  onRestart: () => void
}

export function EndScreen({
  score,
  bestScore,
  correctCount,
  total,
  maxStreak,
  isNewBest,
  missedWords,
  onRestart,
}: EndScreenProps) {
  const stars = correctCount === 0 ? 0 : Math.max(1, Math.round((correctCount / total) * 3))
  const starRow = '\u{1F31F}'.repeat(stars) + '\u2606'.repeat(3 - stars)

  return (
    <section className="card end-card">
      <div className="end-card__stars" aria-label={`${stars} out of 3 stars`}>
        {starRow}
      </div>
      <h1 className="end-card__title">Round complete!</h1>
      <p className="end-card__summary">
        You recalled <strong>{correctCount}</strong> of <strong>{total}</strong>{' '}
        words and scored <strong>{score}</strong>.
      </p>
      <ul className="end-card__stats">
        <li>
          Best streak this game
          <span>{maxStreak}</span>
        </li>
        <li>
          Score this game
          <span>{score}</span>
        </li>
        <li>
          All-time best score
          <span>{bestScore}</span>
        </li>
      </ul>
      {isNewBest && (
        <p className="end-card__newbest">{'\u{1F389}'} New personal best!</p>
      )}
      {missedWords.length > 0 && (
        <p className="end-card__missed">
          Keep these in mind next time:{' '}
          <strong>{missedWords.join(', ')}</strong>
        </p>
      )}
      <button type="button" className="primary-btn" onClick={onRestart}>
        Play again
      </button>
    </section>
  )
}