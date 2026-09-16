# Echo Quest — Listen & Recall

A small, playable vocabulary-recall game for junior-secondary learners
(ages ~11–14). Part of the **Task 2 — Edtech interaction app** assessment.

Listen to a word's definition, then **say the word** (speech-to-text) or
**type it**. You get immediate, specific feedback and a Round 2 retest of the
words you missed.

## How one interaction works (the learning loop)

1. **Prompt** — Echo (a simple tutor avatar) speaks a definition, e.g. *"Existing in large quantities; more than enough."*
2. **Learner action** — you either
   - tap the **mic button** and say the word (`generous`), or
   - type the word in the text box and press **Submit**.
3. **Feedback** — one of:
   - ✅ **Correct** — spoken praise + the word used in an example sentence (3 pts on first try, 1 pt on retry).
   - 🟢 **Close** — e.g. `generous ~ generus`: you hear what was captured and can retry (hint shown).
   - ❌ **Wrong / off-task / empty** — steered back to today's word with a hint; after 2 attempts the word is queued for Round 2.
4. **Retry or next** — correct answers auto-advance; missed words return **shuffled in Round 2** (the delayed re-test), then you see a score summary.

You can mute/unmute Echo's voice with the speaker button in the top bar.

## Start the app

Requirements: Node.js 18+ (developed against Node 24).

```bash
npm install      # first time only
npm run dev      # http://localhost:5173
```

Or build and preview a production bundle:

```bash
npm run build
npm run preview  # http://localhost:4173
```

> **Microphone note:** speech recognition requires a secure context, so you
> must use **`localhost`** or an **HTTPS** URL. Open the app in **Chrome or
> Edge** for the voice happy path. Firefox/Safari lack the Web Speech API here,
> so the app automatically falls back to typed input.

## Environment variables

**None.** There is no backend, no API keys, and no setup step. Browser
speech-to-text (Web Speech API) and speech synthesis are used in place of cloud
STT/TTS so the app runs with zero configuration.

## How to complete one full interaction (under 5 minutes)

1. `npm run dev` (or open the deployed URL) → click **Start playing**.
2. Click **🔊 Listen** — Echo reads a definition.
3. Tap **🎤** and say the word, **or** type it and hit Submit.
4. See the feedback. Get it right → automatic next word. Get it wrong → retry once with a hint, or skip to keep the word for Round 2.
5. Finish Round 1 (12 words) → tackle the retest words in Round 2 → read your score.

Two full interactions take about 3 minutes.

## Design & research basis

- **Source:** Roediger & Karpicke (2006), *Test-Enhanced Learning*, Psychological Science **7(3)**, 249–253 — retrieval practice.
- **Also:** Butler, Karpicke & Roediger (2008) on *corrective feedback* that improves retention from tests.
- **Mapping:** every item is a **free-recall test** (not passive re-study): a definition cue, learner produces the word, immediate corrective feedback follows, and missed items are re-tested in Round 2.

## Browser support & privacy (what to know)

- **Chrome / Edge** (desktop + Android): full voice experience (ASR + TTS) with typed fallback.
- **Firefox / Safari:** typed-only; mic button hidden and a note is shown.
- **Microphone denied:** the app detects it and guides you to the typed input.
- **Privacy:** there is **no backend and no data storage on any server**. Scores/streaks are kept in your browser's `localStorage` on the device. One disclosure: in Chrome, the Web Speech API processes speech audio **on Google's servers** to transcribe it. Audio is not stored by us, but it is not fully device-local — worth flagging for school use.

## What this is not (honest limits)

This is a **12-hour proof of concept**, not classroom-ready software. It has a
single fixed word list (swap it in `src/data/items.ts`), no accounts, no
teacher dashboard, and per-device progress only. A full class would need a
small backend for real analytics, roster management, and privacy-compliant
audio handling.

## Project layout

```
src/
  App.tsx                       interaction state machine
  data/items.ts                 word list (edit this to change content)
  hooks/useSpeechRecognition.ts browser voice-to-text wrapper + fallback
  hooks/useSpeechSynthesis.ts   text-to-speech wrapper + mute
  lib/scoring.ts                answer normalization + Levenshtein matching
  lib/storage.ts                localStorage scores/streaks
  components/                   avatar, prompt, answer input, feedback, HUD, end screen
```

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | dev server at :5173 |
| `npm run build` | type-check + production build to `dist/` |
| `npm run preview` | serve the production build at :4173 |
| `npm run lint` | oxlint checks |

## Also in this repo

- `PLAN.md` — the design/stack plan
- `TECHNICAL_NOTE.md` — one-page note on research fit and how AI tools were used
- `DEMO_SCRIPT.md` — walkthrough for the 3–5 minute demo recording
- `Task_2_Edtech_interaction_app.md` / `.docx` — the assignment brief