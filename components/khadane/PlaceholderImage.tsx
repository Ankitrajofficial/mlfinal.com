interface PlaceholderImageProps {
  className?: string
  variant?:
    | 'stone'
    | 'quarry'
    | 'yard'
    | 'stone-grey'
    | 'stone-warm'
    | 'stone-red'
    | 'stone-green'
    | 'portrait'
    | 'belt'
  label?: string
  title?: string
  spec?: string
  aspectRatio?: string
  swapPath?: string
  showCaption?: boolean
}

export default function PlaceholderImage({
  className = '',
  variant = 'stone',
  label = 'PLACEHOLDER',
  title,
  spec,
  aspectRatio = 'aspect-[4/3]',
  swapPath,
  showCaption = true,
}: PlaceholderImageProps) {
  const variantClass = `placeholder-${variant}`

  return (
    <div className={`placeholder-base ${variantClass} ${aspectRatio} ${className}`}>
      {showCaption && (
        <div className="placeholder-caption">
          <span className="ph-label">{label}</span>
          {title && <span className="ph-title">{title}</span>}
          {spec && <span className="ph-spec">{spec}</span>}
          {swapPath && (
            <span className="ph-spec" style={{ marginTop: '0.5rem', opacity: 0.4 }}>
              swap → {swapPath}
            </span>
          )}
        </div>
      )}
    </div>
  )
}
