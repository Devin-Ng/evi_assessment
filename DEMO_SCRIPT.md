# Demo Script — Echo Quest (3–5 min recording)

Goal of the demo: show one full interaction — **prompt → learner action →
feedback → retry/next** — covering both the voice happy path and the typed
fallback, in about 3 minutes. Use a laptop mic (or phone in front of speakers).

## Setup (30 s)

1. `npm run dev` and open `http://localhost:5173` in **Chrome or Edge** (allows the mic).
   *(Or open the deployed HTTPS URL.)*
2. Restart the page so scores reset for a clean demo if you like.
3. Start your screen recording (OBS / QuickTime / Xbox Game Bar / Loom). If you're using a phone for audio, test voice entry **before** recording.

## Part 1 — Voice happy path (≈90 s)

1. Land on the intro screen → click **Start playing**.
2. Echo's avatar appears and automatically reads definition #1 — point out that the learner only *hears* it (text is hidden behind "Show definition text").
3. Click **🎤 mic** and say the word clearly, e.g. *"abundant"* (say the one that matches; README words are shown in the same order as shuffled — for the demo, just read whichever definition was spoken and answer it).
4. **Reflect on the moment:** interim transcript appears while you speak → the app auto-submits → "✅ Correct" + Praise + example sentence is *spoken back* by TTS.
5. Note the "Next word" auto-advance and the streak/score ticking up in the HUD.

## Part 2 — Feedback + retry (≈45 s)

1. On the next word, deliberately answer with a **one-letter misspelling** (e.g. `enormos`) or go wrong.
2. Show the "🟢 very close / ❌ not quite" feedback with the **hint**.
3. Click **Try again** and answer correctly on the second attempt — show score (+1 vs +3) and that it does **not** go to Round 2.

## Part 3 — Typed fallback (≈45 s)

1. Open the browser's Inspect/URL bar note: on the next word, click the **🔊 Listen** button to hear the definition again, then **type** the word in the text box and press **Submit**.
2. Mention: *"If the mic is denied or the browser lacks speech recognition, everything still works by typing."* (If you want, deny the mic once in a separate tab to show the error message — optional.)
3. Finish a couple more words fast, then — if time allows — skip a word to show **Round 2 retest** bringing it back shuffled, and land on the end screen with stars/best score.

## Part 4 — Wrap-up (30 s)

1. Briefly point to `README.md` for the research basis: **Roediger & Karpicke (2006), retrieval practice + immediate feedback, delayed retest**.
2. Say the honest limits in one line: "12-hour PoC, no accounts, per-device progress, Chrome Web Speech API transcribes via Google."

Keep it to **3–5 minutes total**. End on the score screen or the README — not mid-feedback.

## If you have no mic available

Say so in the recording ("recording had no mic"), and demo Parts 1–3 in **typed
mode** — the learning loop works fully without voice. That is explicitly
acceptable per the brief.