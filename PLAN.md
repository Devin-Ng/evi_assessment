# PLAN — "Listen & Recall" (Echo Quest)

An EdTech interaction app for a primary/junior-secondary learner. Built for the
`Task_2_Edtech_interaction_app` assessment brief.

## 1. Decisions

| Decision | Choice | Why |
|---|---|---|
| **Language** | TypeScript | Type safety for the interaction state machine; strong AI-tool fit |
| **Framework** | Vite + React (SPA) | Fast setup, clean components for the loop, professional assessment signal |
| **Backend server** | **No** | Nothing needs it: Web Speech API is client-side, no keys to hide, privacy-friendly, fewer review-friction points |
| **Database** | **No** | `localStorage` covers per-device streaks/progress for a PoC |
| **Voice (ASR/TTS)** | Browser **Web Speech API** | Free, no API keys, no proxy; task explicitly allows it |
| **Hosting** | Vercel or GitHub Pages | Free HTTPS — required for microphone access; reviewer opens a URL and finishes in <5 min |

### Why no backend / no database

1. **Timebox (8–12h)** — a server adds auth, hosting, CORS, and deploy work that scores nothing against the rubric ("one activity is enough").
2. **Web Speech API is fully client-side** — no keys to protect, so no server proxy. (Cloud STT/TTS like ElevenLabs *would* force a backend to hide keys — avoided.)
3. **Privacy is a scoring point**: "do not silently upload learner audio or personal data." Local-first, zero-backend architecture is the strongest answer.
4. **Reviewer friction**: static deploy = one URL, done in ~5 minutes, "without you."
5. **When you'd need them** (say this in the technical note to show judgment): teacher dashboards, class rosters, cross-device progress, analytics → small API (e.g., Express/Supabase) + DB.

**Honesty caveat to document:** Chrome's `SpeechRecognition` sends audio to Google's servers — disclose this in the README instead of presenting it as fully local.

## 2. Activity design

**Learner:** junior-secondary (ages 11–14) vocabulary building.
**Content:** ~12 static words in `src/data/items.ts` — each item: `word`, `definition`, `exampleSentence`, `hint` (first letter / syllable count).

**Core loop (one round):**
1. **Prompt** — TTS speaks the definition (simple avatar/speaker card with "Listen again" button); text also shown after first listen for accessibility.
2. **Learner action** — tap/hold 🎤 to speak (ASR with interim transcript), or type in the fallback box.
3. **Feedback (immediate, specific)**
   - ✅ Correct → spoken praise + example sentence via TTS, streak +1, auto-advance.
   - 🔶 Close (edit-distance ≤1 or homophone) → "You said *X* — almost! Check the spelling," retry allowed (max 2 per item).
   - ❌ Wrong/empty/off-task → hint revealed, steer-back message ("Let's try the definition again"), streak resets.
4. **Retry or next** → progress HUD (item 5/12, streak, score).

**Round 2 (delayed re-test):** after the set, missed words return shuffled — this operationalizes retrieval practice, not just Q&A. End screen: score summary + "Play again".

## 3. Voice handling (rubric §4)

- `useSpeechRecognition`: wraps `webkitSpeechRecognition`; feature-detect → if unsupported (e.g., Firefox) show typed mode with a note.
- Mic denied/error → **automatic typed fallback** (task explicitly allows) + retry-mic button.
- `useSpeechSynthesis`: TTS for definition, feedback, example sentence; mute toggle.
- Answer matching in `lib/scoring.ts`: lowercase, strip punctuation, Levenshtein distance for the "close" tier.

## 4. File structure

```
├── README.md            ← start, env vars: NONE, 5-min walkthrough, privacy note
├── TECHNICAL_NOTE.md    ← 1-page: source, AI usage, rejected suggestion, next step
└── src/
    ├── App.tsx          ← state machine: idle→listening→answer→feedback→round2→done
    ├── data/items.ts
    ├── hooks/useSpeechRecognition.ts · useSpeechSynthesis.ts
    ├── components/PromptCard · AnswerInput · FeedbackPanel · ScoreHUD · EndScreen · AvatarFace
    └── lib/scoring.ts · storage.ts
```

## 5. Research mapping (README + note)

- **Source:** Roediger & Karpicke (2006), *Test-Enhanced Learning*, Psychological Science — retrieval practice; + Butler, Karpicke & Roediger (2008) — immediate feedback.
- **One-line mapping:** every item is a free-recall test (not re-study), with immediate corrective feedback and a delayed re-test round.
- **Failure criterion:** if delayed re-test scores don't exceed a re-study control, the design claim fails.

## 6. Build order (~9h)

1. Scaffold Vite + React + TS, deploy pipeline (1h)
2. `items.ts` + scoring + core typed loop working end-to-end (2h)
3. TTS + ASR hooks, fallback logic (2h)
4. Round-2 re-test, HUD, localStorage, end screen (1.5h)
5. UI polish + simple avatar face (1h)
6. README, TECHNICAL_NOTE, demo recording script (1.5h)

## 7. Verification

- `npm run build && npm run preview` clean; test matrix: Chrome w/ mic · mic denied · Firefox (no ASR → typed) · mobile Chrome (deployed HTTPS URL).
- Reviewer simulation: complete one full interaction in <5 min from the deployed URL.

## 8. Known limits to disclose (rubric §6)

- Chrome ASR sends audio to Google servers (disclosed, not silent).
- No accounts — progress is per-device localStorage.
- A full class (~30 users) would need a real backend for analytics.

## 9. Deliverables checklist

1. App (Vite + React + TS) — voice happy path + typed fallback
2. GitHub repo pushed (`github.com/Devin-Ng/evi_assessment`)
3. Deployed URL (HTTPS)
4. README (start, no env vars, walkthrough, privacy note)
5. 3–5 min demo recording (show one spoken turn)
6. One-page `TECHNICAL_NOTE.md`