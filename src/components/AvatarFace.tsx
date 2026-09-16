export type AvatarState = 'idle' | 'listening' | 'speaking' | 'thinking'

interface AvatarFaceProps {
  state: AvatarState
  size?: number
}

export function AvatarFace({ state, size = 180 }: AvatarFaceProps) {
  const eyesLift = state === 'thinking' ? 'translate(0 -4)' : undefined

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      role="img"
      aria-label={`Echo the tutor is ${state}`}
      className={`avatar avatar--${state}`}
    >
      <defs>
        <radialGradient id="echo-skin" cx="0.5" cy="0.4" r="0.78">
          <stop offset="0%" stopColor="#ffefda" />
          <stop offset="55%" stopColor="#ffdcae" />
          <stop offset="100%" stopColor="#f7c68c" />
        </radialGradient>
        <radialGradient id="echo-face" cx="0.5" cy="0.38" r="0.85">
          <stop offset="0%" stopColor="#fff8e9" />
          <stop offset="100%" stopColor="#ffe8c4" />
        </radialGradient>
      </defs>

      {state === 'listening' && (
        <g className="avatar__rings">
          <circle cx="100" cy="100" r="76" fill="none" stroke="#8b7cf0" strokeWidth="3" />
          <circle cx="100" cy="100" r="76" fill="none" stroke="#8b7cf0" strokeWidth="3" />
          <circle cx="100" cy="100" r="76" fill="none" stroke="#8b7cf0" strokeWidth="3" />
        </g>
      )}

      <ellipse className="avatar__shadow" cx="100" cy="184" rx="46" ry="9" fill="#4c478a" opacity="0.1" />

      <g className="avatar__body">
        <g className="avatar__ears">
          <circle cx="40" cy="56" r="21" fill="#f6a8c5" />
          <circle cx="160" cy="56" r="21" fill="#f6a8c5" />
          <circle cx="40" cy="56" r="12" fill="#ffd2e2" />
          <circle cx="160" cy="56" r="12" fill="#ffd2e2" />
        </g>

        <circle cx="100" cy="100" r="72" fill="url(#echo-skin)" />
        <circle cx="100" cy="86" r="50" fill="url(#echo-face)" />

        <path
          className="avatar__ahoge"
          d="M100 30 C 96 18 106 10 114 16"
          stroke="#e9b98c"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />

        <ellipse cx="64" cy="116" rx="11" ry="6.5" fill="#ff9fb0" opacity="0.45" />
        <ellipse cx="136" cy="116" rx="11" ry="6.5" fill="#ff9fb0" opacity="0.45" />

        <g transform={eyesLift}>
          <g className="avatar__blink">
            <ellipse cx="80" cy="94" rx="8" ry="9" fill="#3d3350" />
            <ellipse cx="120" cy="94" rx="8" ry="9" fill="#3d3350" />
            <circle cx="77.5" cy="90.5" r="2.8" fill="#fff" opacity="0.95" />
            <circle cx="117.5" cy="90.5" r="2.8" fill="#fff" opacity="0.95" />
            <circle cx="83" cy="98" r="1.4" fill="#fff" opacity="0.7" />
            <circle cx="123" cy="98" r="1.4" fill="#fff" opacity="0.7" />
          </g>
        </g>

        {state === 'thinking' && (
          <g stroke="#3d3350" strokeWidth="3.5" strokeLinecap="round" fill="none" opacity="0.5">
            <path d="M70 78 Q80 71 90 78" />
            <path d="M110 78 Q120 71 130 78" />
          </g>
        )}

        {state === 'speaking' ? (
          <g className="avatar__mouth-talk">
            <ellipse cx="100" cy="127" rx="12" ry="9.5" fill="#a14e5e" />
            <ellipse cx="100" cy="132" rx="7" ry="4" fill="#f08ea2" />
          </g>
        ) : state === 'listening' ? (
          <g>
            <ellipse cx="100" cy="128" rx="6.5" ry="5" fill="#a14e5e" />
            <ellipse cx="100" cy="130.5" rx="3.6" ry="2" fill="#f08ea2" />
          </g>
        ) : state === 'thinking' ? (
          <path
            d="M89 128 Q94.5 123 100 128 T111 128"
            stroke="#3d3350"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
        ) : (
          <path
            d="M85 123 Q100 137 115 123"
            stroke="#3d3350"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
        )}

        {state === 'thinking' && (
          <g className="avatar__dots" fill="#6c5ce7">
            <circle cx="144" cy="60" r="5" opacity="0.35" />
            <circle cx="157" cy="46" r="6.5" opacity="0.6" />
            <circle cx="171" cy="30" r="8" />
          </g>
        )}
      </g>
    </svg>
  )
}
