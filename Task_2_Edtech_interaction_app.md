# Task 2 - Edtech interaction app

Build a small, playable interaction app for learning - not a slide deck and not a static website. A learner (or teacher) must be able to do something, get a response, and try again. Name one published learning idea (paper, textbook chapter, or curriculum source) and show how the interaction maps to it.

## What "interaction" means here

The app takes input from the learner, does something useful with it, and gives feedback in the same session. Input and output can be text, taps, voice, or a mix. One activity is enough.

Example (optional): you may use ASR (speech-to-text) and TTS (text-to-speech) so the learner talks and hears a reply - for instance a simple tutor face or avatar that listens, then speaks a short prompt. ASR/TTS is only an example of a richer interaction. Typed or tap-based interaction is equally acceptable if the learning loop is clear.

## What to finish

- One interactive activity a primary or junior-secondary learner (or their teacher) could actually try.
- A clear loop: prompt → learner action → feedback → retry or next item.
- A named research or curriculum source, and a one-line mapping from that idea to what the app does.
- If you use the voice example: ASR in the happy path, TTS for the reply. A typed fallback when the mic is denied is fine.

## What a good submission shows

### 1. Research fit

You name a real source. The interaction matches that claim (for example retrieval practice, immediate feedback, self-explanation, or oral rehearsal). An "AI tutor" skin with no source is not enough. You can say in one minute what would count as the idea failing.

### 2. Someone else can use it

A reviewer can start the app and complete one full interaction in about five minutes without you. A Figma file or a crashed build is not a finish.

### 3. A real interaction, not a content page

The learner's input changes what happens next. Off-task or empty input is handled (steer back, or say you cannot help). An unbounded general chatbot with no learning goal is not enough.

### 4. If you choose the ASR/TTS example

Spoken input becomes usable text in the happy path, and the reply is spoken aloud. A simple face or avatar is optional. Browser Web Speech API or a cloud STT/TTS is fine; document any keys. A mute video with only a text box is not a finish for this example. Skip this section entirely if your app is text- or tap-based.

### 5. How you used AI tools

One-page note: research source, what you built, what the model drafted, one suggestion you rejected and why, and one next step. You can explain the interaction path we point at (including ASR/TTS wiring if you used that example).

### 6. Sensible limits

Keys and setup are in the README. You do not silently upload learner audio or personal data. You do not claim it is classroom-ready if it is a 12-hour PoC. You can say what would break with a full class.

## Constraints

One scene / one activity is enough. Do not build a content studio or a full LMS.

Visual quality is not the point. A clean web app, mobile web, or desktop window is fine.

## Please send

- GitHub link or zip we can run.
- README (how to start, env vars, how to complete one interaction; mention ASR/TTS only if you used them).
- 3-5 minute demo of one full interaction (if you used voice, show a spoken turn, or say if the recording had no mic).
- One-page technical note (see section 5).

## Expected salary

Timebox: about 8-12 hours over 5 calendar days. AI coding tools (Cursor, Claude Code, Copilot, and similar) are allowed and expected. We will ask what the model drafted and what you changed.