const BEST_SCORE_KEY = 'echoquest.bestScore'
const BEST_STREAK_KEY = 'echoquest.bestStreak'
const PLAY_COUNT_KEY = 'echoquest.playCount'

function readNumber(key: string): number {
  try {
    const raw = localStorage.getItem(key)
    if (raw === null) return 0
    const n = Number(raw)
    return Number.isFinite(n) && n >= 0 ? n : 0
  } catch {
    return 0
  }
}

function writeNumber(key: string, value: number): void {
  try {
    localStorage.setItem(key, String(value))
  } catch {
    // storage may be unavailable (private mode) — fail silently
  }
}

export function loadBestScore(): number {
  return readNumber(BEST_SCORE_KEY)
}

export function saveBestScore(value: number): void {
  writeNumber(BEST_SCORE_KEY, value)
}

export function loadBestStreak(): number {
  return readNumber(BEST_STREAK_KEY)
}

export function saveBestStreak(value: number): void {
  writeNumber(BEST_STREAK_KEY, value)
}

export function loadPlayCount(): number {
  return readNumber(PLAY_COUNT_KEY)
}

export function incrementPlayCount(): number {
  const next = loadPlayCount() + 1
  writeNumber(PLAY_COUNT_KEY, next)
  return next
}