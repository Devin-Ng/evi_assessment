import type { VocabularyItem } from '../data/items'
import { AvatarFace, type AvatarState } from './AvatarFace'

interface PromptCardProps {
  item: VocabularyItem
  round: number
  showText: boolean
  onRevealText: () => void
  onSpeakDefinition: () => void
  ttsSupported: boolean
  avatarState: AvatarState
}

export function PromptCard({
  item,
  round,
  showText,
  onRevealText,
  onSpeakDefinition,
  ttsSupported,
  avatarState,
}: PromptCardProps) {
  return (
    <section className="card prompt-card">
      <div className="prompt-card__top">
        {round === 2 ? (
          <span className="chip chip--retest">Round 2 &middot; retest</span>
        ) : (
          <span className="chip">Listen &amp; recall</span>
        )}
        {ttsSupported && (
          <button
            type="button"
            className="ghost-btn"
            onClick={onSpeakDefinition}
          >
            {'\u{1F50A}'} Listen
          </button>
        )}
      </div>

      <div className="prompt-card__avatar">
        <AvatarFace state={avatarState} size={140} />
      </div>

      <p className="prompt-card__say">
        {round === 2 ? 'Remember this one? Listen and recall the word.' : 'Listen to the definition, then tell me the word.'}
      </p>

      {showText ? (
        <p className="definition definition--shown">
          &ldquo;{item.definition}&rdquo;
        </p>
      ) : (
        <button
          type="button"
          className="ghost-btn definition-reveal"
          onClick={onRevealText}
        >
          Show definition text
        </button>
      )}
    </section>
  )
}