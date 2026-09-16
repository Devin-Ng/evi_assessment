export type AvatarState = 'idle' | 'listening' | 'speaking' | 'thinking'

interface AvatarFaceProps {
  state: AvatarState
  size?: number
}

export function AvatarFace({ state, size = 180 }: AvatarFaceProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      role="img"
      aria-label={`Echo the tutor is ${state}`}
      className={`avatar avatar--${state}`}
    >
      <g>
        <ellipse cx="42" cy="70" rx="16" ry="22" fill="#f6a7c1" />
        <ellipse cx="158" cy="70" rx="16" ry="22" fill="#f6a7c1" />
        <circle cx="100" cy="104" r="72" fill="#ffd8a8" />
        <circle cx="100" cy="88" r="52" fill="#ffe8cc" />

        {state === 'listening' ? (
          <g>
            <circle cx="80" cy="92" r="9" fill="#333" />
            <circle cx="120" cy="92" r="9" fill="#333" />
            <circle cx="83" cy="95" r="3" fill="#fff" />
            <circle cx="123" cy="95" r="3" fill="#fff" />
          </g>
        ) : (
          <g>
            <path
              d={
                state === 'idle'
                  ? 'M70 94 Q80 90 90 94'
                  : 'M110 94 Q120 90 130 94'
              }
              stroke="#333"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M110 94 Q120 88 130 94"
              stroke="#333"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
          </g>
        )}

        <circle cx="100" cy="84" r="4" fill="#f7b293" />

        {state === 'speaking' ? (
          <g className="avatar__mouth">
            <path
              d="M80 122 Q100 146 120 122"
              stroke="#333"
              strokeWidth="4"
              strokeLinecap="round"
              fill="#fff"
            />
            <ellipse cx="100" cy="126" rx="11" ry="7" fill="#d65a5a" />
          </g>
        ) : (
          <path
            d={
              state === 'thinking'
                ? 'M88 126 Q100 120 112 126'
                : 'M85 126 Q100 132 115 126'
            }
            stroke="#333"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
        )}

        {state === 'thinking' && (
          <g>
            <circle cx="148" cy="54" r="5" fill="#333" opacity="0.5" />
            <circle cx="158" cy="42" r="7" fill="#333" opacity="0.6" />
            <circle cx="170" cy="30" r="9" fill="#333" />
          </g>
        )}

        {state === 'listening' && (
          <g className="avatar__listening-waves">
            <circle cx="168" cy="120" r="5" fill="none" stroke="#6366f1" strokeWidth="3" opacity="0.4" />
            <circle cx="168" cy="120" r="12" fill="none" stroke="#6366f1" strokeWidth="3" opacity="0.6" />
            <circle cx="168" cy="120" r="20" fill="none" stroke="#6366f1" strokeWidth="3" opacity="0.2" />
          </g>
        )}
      </g>
    </svg>
  )
}