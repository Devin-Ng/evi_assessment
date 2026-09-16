# Technical Note — Echo Quest ("Listen & Recall")

One-page note for the Task 2 assessment. This is a proof-of-concept, not a
classroom-ready product.

## 1. Research source and how the interaction maps to it

**Source:** Roediger, H. L., & Karpicke, J. D. (2006). *Test-enhanced learning:
Taking memory tests improves long-term retention.* Psychological Science,
17(3), 249–253.

**Supporting source:** Butler, A. C., Karpicke, J. D., & Roediger, H. L.
(2008). *Correcting a metacognitive error: Feedback increases retention of
low-confidence correct responses.* Journal of Experimental Psychology: Applied,
14(1), 54–65.

**One-line mapping:** Echo Quest is a *free-recall test with immediate
corrective feedback* — a definition is the cue, the learner must produce the
word from memory (not re-read it), feedback arrives instantly, and missed
words are re-tested after a delay (Round 2).

**What would make the idea fail:** if freely recalling the word after hearing
a definition does not produce better retention than simply re-reading the
word + definition (that is, if the "test effect" does not show up in the data
collected), then the design claims are falsified. We make no retention claim
here — this is one session; real evidence would need a delayed post-test.

An *"AI tutor" skin with no learning mechanism* would also fail the design:
here the pedagogy is structural (test → immediate feedback → delayed retest),
not decorative.

## 2. What was built

- Single-page app: **Vite + React + TypeScript + Web Speech API**, no backend, no database.
- Loop: **prompt (TTS definition) → learner action (ASR or typed) → immediate feedback (correct / close / wrong) → retry or next**.
- Round 2 re-tests missed words (retrieval practice + spacing within one session).
- Off-task / empty input is handled (steered back to today's word, hint revealed).
- Typed fallback when mic is denied or the browser lacks the Web Speech API.
- Scores/streaks persist per-device in `localStorage`; no server, no uploads.

## 3. What the model (Claude) drafted and what I changed

Drafted by the AI:

- Full component tree, the `scoring.ts` matcher (normalization + Levenshtein tiers), and the ASR/TTS hook wrappers.
- The state machine (intro → round1 → round2 → end) including the Round-2 retest design.
- CSS for the avatar and feedback styling.

Changed by me (not taken verbatim):

- **Rejected: an image-based `hero.png` landing design.** The scaffold referenced a stock hero image + logomarks; I dropped it for an inline SVG avatar and clean CSS (visual quality isn't the point of the brief; faster and dependency-free).
- Fixed a `public/` directory that became a stray file during scaffolding (build failure), resolved TS "use before declaration" ordering, and moved accidental use-in-render ref reads into effects to satisfy lint.
- Trimmed the scaffold's unused assets (react.svg, vite.svg, App default styles).

## 4. One next step

Add a **delayed spaced-retest memory** (e.g., same words after 2–3 minutes of
a distractor task, or a "revisit tomorrow" list) so the app can actually
demonstrate the retention effect it claims, rather than only session accuracy.
Second choice: swap the static word list for a per-teacher importable list.

## 5. Sensible limits (as asked in the brief)

- No accounts; progress is per-device `localStorage`.
- One fixed word list (12 words) — content lives in `src/data/items.ts`.
- **Privacy disclosure:** no server stores anything. But in Chrome, the Web
  Speech API transcribes audio on Google's servers; it is not kept by us, yet
  it is not fully device-local. This would matter for under-13 data-protection
  rules in a real deployment.
- A full class would need a backed analytics/roster layer (and, for the voice
  feature, a policy decision on cloud transcription) — out of scope for a 12h PoC.