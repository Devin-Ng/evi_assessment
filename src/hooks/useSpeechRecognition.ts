import { useCallback, useEffect, useRef, useState } from 'react'

export type RecognitionError =
  | 'not-allowed'
  | 'no-speech'
  | 'network'
  | 'aborted'
  | 'unsupported'
  | 'other'

interface UseSpeechRecognition {
  supported: boolean
  listening: boolean
  transcript: string
  error: RecognitionError | null
  start: () => void
  stop: () => void
  reset: () => void
}

type RecognitionConstructor = new () => any

function getConstructor(): RecognitionConstructor | null {
  if (typeof window === 'undefined') return null
  const w = window as unknown as Record<string, unknown>
  const Ctor = w.SpeechRecognition ?? w.webkitSpeechRecognition
  return typeof Ctor === 'function' ? (Ctor as RecognitionConstructor) : null
}

export const SPEECH_RECOGNITION_SUPPORTED = getConstructor() !== null

export function useSpeechRecognition(
  onFinal: (text: string) => void,
): UseSpeechRecognition {
  const [listening, setListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [error, setError] = useState<RecognitionError | null>(null)
  const [supported] = useState(() => SPEECH_RECOGNITION_SUPPORTED)

  const onFinalRef = useRef(onFinal)
  useEffect(() => {
    onFinalRef.current = onFinal
  })

  const recRef = useRef<any>(null)

  const stop = useCallback(() => {
    recRef.current?.stop()
  }, [])

  const reset = useCallback(() => {
    setTranscript('')
    setError(null)
  }, [])

  const start = useCallback(() => {
    setError(null)
    setTranscript('')
    const Ctor = getConstructor()
    if (!Ctor) {
      setError('unsupported')
      return
    }
    let rec = recRef.current
    if (!rec) {
      rec = new Ctor()
      rec.continuous = false
      rec.interimResults = true
      rec.lang = 'en-US'
      rec.onresult = (e: any) => {
        let interim = ''
        let final = ''
        for (let i = e.resultIndex; i < e.results.length; i++) {
          const r = e.results[i]
          if (r.isFinal) final += r[0].transcript
          else interim += r[0].transcript
        }
        if (final) {
          setTranscript(final)
          onFinalRef.current(final)
        } else {
          setTranscript(interim)
        }
      }
      rec.onerror = (e: any) => {
        const err = e?.error
        if (
          err === 'not-allowed' ||
          err === 'service-not-allowed' ||
          err === 'permission-denied'
        ) {
          setError('not-allowed')
        } else if (err === 'no-speech') {
          setError('no-speech')
        } else if (err === 'network') {
          setError('network')
        } else if (err === 'aborted') {
          setError('aborted')
        } else {
          setError('other')
        }
      }
      rec.onend = () => setListening(false)
      recRef.current = rec
    }
    try {
      rec.start()
      setListening(true)
    } catch {
      setError('other')
      setListening(false)
    }
  }, [])

  useEffect(
    () => () => {
      recRef.current?.abort?.()
    },
    [],
  )

  return { supported, listening, transcript, error, start, stop, reset }
}