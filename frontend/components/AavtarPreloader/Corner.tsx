interface CornerProps {
  className?: string
  style?: React.CSSProperties
}

export default function Corner({ className, style }: CornerProps) {
  return (
    <div className={className} style={style}>
      <svg viewBox="0 0 40 40" fill="none" width="40" height="40">
        <path
          d="M2 22 L2 2 L22 2"
          stroke="var(--color-slate-custom)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}
