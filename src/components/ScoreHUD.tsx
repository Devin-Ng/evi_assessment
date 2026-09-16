interface ScoreHUDProps {
  current: number
  total: number
  round: number
  score: number
  streak: number
  bestStreak: number
  muted: boolean
  onToggleMute: () => void
}

export function ScoreHUD({
  current,
  total,
  round,
  score,
  streak,
  bestStreak,
  muted,
  onToggleMute,
}: ScoreHUDProps) {
  return (
    <header className="hud">
      <div className="hud__brand">
        <span className="hud__logo">{'\u{1F3A4}'}</span> Echo Quest
      </div>
      <div className="hud__stats">
        <span className="hud__stat">
          Item {current}/{total} {round === 2 ? '\u00b7 R2' : ''}
        </span>
        <span className="hud__stat">Score {score}</span>
        <span className="hud__stat">
          Streak {streak} <small>(best {bestStreak})</small>
        </span>
        <button
          type="button"
          className="ghost-btn hud__mute"
          onClick={onToggleMute}
          aria-label={muted ? 'Unmute voice' : 'Mute voice'}
          title={muted ? 'Unmute' : 'Mute'}
        >
          {muted ? '\u{1F507}' : '\u{1F50A}'}
        </button>
      </div>
    </header>
  )
}