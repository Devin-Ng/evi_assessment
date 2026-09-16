import { useCallback, useEffect, useRef, useState } from 'react'

const TTS_SUPPORTED =
  typeof window !== 'undefined' && 'speechSynthesis' in window

export function useSpeechSynthesis(muted: boolean) {
  const [supported] = useState(() => TTS_SUPPORTED)
  const mutedRef = useRef(muted)
  const tokenRef = useRef(0)
  useEffect(() => {
    mutedRef.current = muted
  }, [muted])

  const speak = useCallback(
    (text: string, rate = 0.95, onEnd?: () => void) => {
      if (!supported || mutedRef.current) return
      const synth = window.speechSynthesis
      synth.cancel()
      const token = ++tokenRef.current
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'en-US'
      utterance.rate = rate
      utterance.pitch = 1
      const voices = synth.getVoices()
      const preferred =
        voices.find((v) => v.lang.startsWith('en') && v.localService) ??
        voices.find((v) => v.lang.startsWith('en'))
      if (preferred) utterance.voice = preferred
      const finish = () => {
        if (tokenRef.current === token) onEnd?.()
      }
      utterance.onend = finish
      utterance.onerror = finish
      synth.speak(utterance)
    },
    [supported],
  )

  const stop = useCallback(() => {
    if (!supported) return
    tokenRef.current++
    window.speechSynthesis.cancel()
  }, [supported])

  useEffect(
    () => () => {
      if (supported) window.speechSynthesis.cancel()
    },
    [supported],
  )

  return { supported, speak, stop }
}