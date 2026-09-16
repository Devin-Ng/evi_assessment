import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'
import { AvatarFace } from './components/AvatarFace'
import { AnswerInput } from './components/AnswerInput'
import { EndScreen } from './components/EndScreen'
import { FeedbackPanel } from './components/FeedbackPanel'
import { PromptCard } from './components/PromptCard'
import { ScoreHUD } from './components/ScoreHUD'
import { DEFAULT_ITEMS, type VocabularyItem } from './data/items'
import { useSpeechRecognition } from './hooks/useSpeechRecognition'
import { useSpeechSynthesis } from './hooks/useSpeechSynthesis'
import { evaluateAnswer, isEmptyInput, shuffle, type AnswerTier } from './lib/scoring'
import {
  incrementPlayCount,
  loadBestScore,
  loadBestStreak,
  saveBestScore,
  saveBestStreak,
} from './lib/storage'

type Phase = 'intro' | 'round1' | 'round2' | 'end'
type AvatarMood = 'idle' | 'listening' | 'speaking' | 'thinking'
type Feedback = {
  tier: AnswerTier | 'empty'
  input: string
} | null

const MAX_ATTEMPTS = 2

export default function App() {
  const [phase, setPhase] = useState<Phase>('intro')
  const [queue, setQueue] = useState<VocabularyItem[]>([])
  const [index, setIndex] = useState(0)
  const [attempts, setAttempts] = useState(0)
  const [feedback, setFeedback] = useState<Feedback>(null)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [maxStreak, setMaxStreak] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [missed, setMissed] = useState<VocabularyItem[]>([])
  const [bestScore, setBestScore] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)
  const [newBest, setNewBest] = useState(false)
  const [muted, setMuted] = useState(false)
  const [showText, setShowText] = useState(false)
  const [avatarState, setAvatarState] = useState<AvatarMood>('idle')

  const advanceTimer = useRef<number | null>(null)
  const autoSubmitted = useRef(false)
  const current = queue[index]

  const clearAdvanceTimer = () => {
    if (advanceTimer.current !== null) {
      window.clearTimeout(advanceTimer.current)
      advanceTimer.current = null
    }
  }

  const { supported: asrSupported, listening, transcript, error, start, stop, reset } =
    useSpeechRecognition(handleFinalTranscript)
  const { speak, stop: stopSpeaking, supported: ttsSupported } = useSpeechSynthesis(muted)

  const sayDefinition = useCallback(
    (item: VocabularyItem) => {
      setAvatarState('speaking')
      speak(item.definition)
      window.setTimeout(() => setAvatarState('idle'), 900)
    },
    [speak],
  )

  function submitAnswer(raw: string) {
    clearAdvanceTimer()
    stopSpeaking()
    if (!current) return

    if (isEmptyInput(raw)) {
      setFeedback({ tier: 'empty', input: raw })
      setAvatarState('thinking')
      return
    }

    const tier = evaluateAnswer(raw, current.word)
    if (tier === 'correct') {
      setStreak((s) => {
        const ns = s + 1
        setMaxStreak((m) => Math.max(m, ns))
        return ns
      })
      setScore((s) => s + (attempts === 0 ? 3 : 1))
      setCorrectCount((c) => c + 1)
      setFeedback({ tier, input: raw })
      setAvatarState('speaking')
      speak(`Correct! ${current.word}. ${current.exampleSentence}`)
      advanceTimer.current = window.setTimeout(() => {
        clearAdvanceTimer()
        advance()
      }, 5500)
    } else {
      const remainingAttempts = MAX_ATTEMPTS - (attempts + 1)
      setStreak(0)
      setFeedback({ tier, input: raw })
      setAvatarState('thinking')
      if (remainingAttempts <= 0) {
        setMissed((m) => (m.includes(current) ? m : [...m, current]))
      }
      setAttempts(attempts + 1)
    }
  }

  function handleFinalTranscript(text: string) {
    if (phase !== 'round1' && phase !== 'round2') return
    if (feedback !== null) return
    if (autoSubmitted.current) return
    autoSubmitted.current = true
    submitAnswer(text)
  }

  function advance() {
    clearAdvanceTimer()
    setFeedback(null)
    setAttempts(0)
    autoSubmitted.current = false
    setShowText(false)
    setAvatarState('listening')
    const next = index + 1
    if (next >= queue.length) {
      finishRound()
      return
    }
    setIndex(next)
    const item = queue[next]
    if (item) window.setTimeout(() => sayDefinition(item), 350)
  }

  function finishRound() {
    if (phase === 'round2') {
      finishGame()
      return
    }
    if (missed.length > 0) {
      setPhase('round2')
      setQueue(shuffle(missed))
      setIndex(0)
      setAttempts(0)
      setFeedback(null)
      setShowText(false)
      setAvatarState('listening')
      const first = missed[0]
      if (first) window.setTimeout(() => sayDefinition(first), 350)
    } else {
      finishGame()
    }
  }

  function finishGame() {
    clearAdvanceTimer()
    const finalScore = score
    const finalStreak = maxStreak
    const best = Math.max(bestScore, finalScore)
    const bestS = Math.max(bestStreak, finalStreak)
    setNewBest(finalScore > bestScore && finalScore > 0)
    setBestScore(best)
    setBestStreak(bestS)
    saveBestScore(best)
    saveBestStreak(bestS)
    setPhase('end')
    setAvatarState('idle')
  }

  const begin = () => {
    setScore(0)
    setStreak(0)
    setMaxStreak(0)
    setCorrectCount(0)
    setMissed([])
    setBestScore(loadBestScore())
    setBestStreak(loadBestStreak())
    setNewBest(false)
    incrementPlayCount()
    setPhase('round1')
    startRound(DEFAULT_ITEMS)
  }

  function startRound(items: VocabularyItem[]) {
    setQueue(shuffle(items))
    setIndex(0)
    setAttempts(0)
    setFeedback(null)
    setShowText(false)
    setAvatarState('listening')
    const first = items[0]
    if (first) window.setTimeout(() => sayDefinition(first), 350)
  }

  function handleRetry() {
    clearAdvanceTimer()
    setFeedback(null)
    autoSubmitted.current = false
    setShowText(false)
    if (current) {
      setAvatarState('listening')
      window.setTimeout(() => sayDefinition(current), 250)
    }
  }

  function handleSkip() {
    if (current) setMissed((m) => (m.includes(current) ? m : [...m, current]))
    advance()
  }

  function handleNext() {
    stopSpeaking()
    advance()
  }

  function handleToggleMic() {
    if (listening) {
      stop()
      return
    }
    stopSpeaking()
    reset()
    setFeedback(null)
    autoSubmitted.current = false
    setAvatarState('listening')
    start()
  }

  function handleSubmit(text: string) {
    if (listening) stop()
    submitAnswer(text)
  }

  useEffect(
    () => () => {
      clearAdvanceTimer()
    },
    [],
  )

  if (phase === 'intro') {
    return (
      <main className="app">
        <section className="card intro-card">
          <div className="avatar-wrap">
            <AvatarFace state="listening" size={150} />
          </div>
          <h1>Echo Quest</h1>
          <p className="intro-card__tagline">
            Listen to a definition, recall the word, get instant feedback. Your
            answers decide what happens next.
          </p>
          <ul className="intro-card__how">
            <li>{'\u{1F50A}'} Click Listen to hear a definition</li>
            <li>{'\u{1F3A4}'} Say the word &mdash; or type it</li>
            <li>{'\u2728'} Instant feedback, then a Round 2 retest</li>
          </ul>
          <button
            type="button"
            className="primary-btn primary-btn--large"
            onClick={begin}
          >
            Start playing {'\u2192'}
          </button>
          {!asrSupported && (
            <p className="note">
              Mic input isn&apos;t supported in this browser, so you&apos;ll
              type your answers. Everything else works the same.
            </p>
          )}
        </section>
      </main>
    )
  }

  if (phase === 'end') {
    return (
      <main className="app">
        <ScoreHUD
          current={0}
          total={0}
          round={1}
          score={score}
          streak={streak}
          bestStreak={bestStreak}
          muted={muted}
          onToggleMute={() => setMuted((m) => !m)}
        />
        <EndScreen
          score={score}
          bestScore={bestScore}
          correctCount={correctCount}
          total={DEFAULT_ITEMS.length}
          maxStreak={maxStreak}
          isNewBest={newBest}
          missedWords={missed.map((m) => m.word)}
          onRestart={begin}
        />
      </main>
    )
  }

  if (!current) return null
  const answered = feedback !== null

  return (
    <main className="app">
      <ScoreHUD
        current={index + 1}
        total={queue.length}
        round={phase === 'round2' ? 2 : 1}
        score={score}
        streak={streak}
        bestStreak={bestStreak}
        muted={muted}
        onToggleMute={() => setMuted((m) => !m)}
      />

      <PromptCard
        item={current}
        round={phase === 'round2' ? 2 : 1}
        showText={showText || answered}
        onRevealText={() => setShowText(true)}
        onSpeakDefinition={() => sayDefinition(current)}
        ttsSupported={ttsSupported}
        avatarState={avatarState}
      />

      {!answered ? (
        <AnswerInput
          asrSupported={asrSupported}
          listening={listening}
          transcript={transcript}
          error={error}
          onToggleMic={handleToggleMic}
          onSubmit={handleSubmit}
          disabled={listening}
        />
      ) : (
        <FeedbackPanel
          tier={feedback.tier}
          input={feedback.input}
          item={current}
          attemptsLeft={MAX_ATTEMPTS - attempts}
          onRetry={handleRetry}
          onNext={handleNext}
          onSkip={handleSkip}
          onSpeakWord={() => {
            setAvatarState('speaking')
            speak(current.word)
            window.setTimeout(() => setAvatarState('idle'), 900)
          }}
          onSpeakDefinition={() => sayDefinition(current)}
          ttsSupported={ttsSupported}
        />
      )}
    </main>
  )
}