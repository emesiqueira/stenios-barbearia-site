export function ImgPH({ label, src, sources = [], type = 'image', style = {} }) {
  if (type === 'video') {
    return (
      <video className="media-fill" style={style} autoPlay muted loop playsInline preload="metadata" aria-label={label}>
        {sources.map(source => <source key={source.src} src={source.src} type={source.type} />)}
        <source src={src} type="video/mp4" />
        {label}
      </video>
    );
  }

  if (src) {
    if (sources.length > 0) {
      return (
        <picture>
          {sources.map(source => <source key={source.srcSet} srcSet={source.srcSet} type={source.type} />)}
          <img className="media-fill" src={src} alt={label} style={style} loading="lazy" />
        </picture>
      );
    }
    return <img className="media-fill" src={src} alt={label} style={style} loading="lazy" />;
  }

  return (
    <div className="img-placeholder" style={style} role="img" aria-label={label}>
      <div className="ph-icon">▣</div>
      <span>{label}</span>
    </div>
  );
}

export function FlagIcon({ code }) {
  const palette = {
    BR: ['#009739', '#FEDD00', '#012169'],
    US: ['#B22234', '#FFFFFF', '#3C3B6E'],
    ES: ['#AA151B', '#F1BF00', '#AA151B'],
  };
  const colors = palette[code] || palette.BR;

  return (
    <svg className="flag-icon" viewBox="0 0 24 16" aria-hidden="true" focusable="false">
      <rect width="24" height="16" rx="2" fill={colors[0]} />
      <rect y="5" width="24" height="6" fill={colors[1]} />
      <circle cx="12" cy="8" r="3" fill={colors[2]} />
    </svg>
  );
}

