export type AnswerTier = 'correct' | 'close' | 'wrong'

export function normalize(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s'-]/g, ' ')
    .replace(/[\s'-]+/g, ' ')
    .trim()
}

export function levenshtein(a: string, b: string): number {
  if (a === b) return 0
  const dp: number[] = Array.from({ length: b.length + 1 }, (_, j) => j)
  for (let i = 1; i <= a.length; i++) {
    let prev = dp[0]
    dp[0] = i
    for (let j = 1; j <= b.length; j++) {
      const tmp = dp[j]
      dp[j] = Math.min(
        dp[j] + 1,
        dp[j - 1] + 1,
        prev + (a[i - 1] === b[j - 1] ? 0 : 1),
      )
      prev = tmp
    }
  }
  return dp[b.length]
}

export function evaluateAnswer(raw: string, word: string): AnswerTier {
  const input = normalize(raw)
  const target = normalize(word)
  if (!input || !target) return 'wrong'
  if (input === target) return 'correct'
  const inputTokens = input.split(' ').filter(Boolean)
  const targetTokens = target.split(' ').filter(Boolean)
  if (inputTokens.includes(target) && inputTokens.length === 1) return 'correct'
  let matched = 0
  for (const tok of targetTokens) {
    if (inputTokens.includes(tok)) matched++
  }
  if (matched === targetTokens.length) return 'correct'
  if (inputTokens.length === 1 && levenshtein(input, target) <= 1) return 'close'
  if (inputTokens.length === 1 && target.includes(input) && input.length >= 3) return 'close'
  return 'wrong'
}

export function isEmptyInput(raw: string): boolean {
  return normalize(raw).length === 0
}

export function shuffle<T>(arr: T[]): T[] {
  const out = [...arr]
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}