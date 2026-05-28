function EquipeCarousel({ team, labels }) {
  const total = team.length;
  const visible = useVisibleCount();
  const maxIdx = Math.max(0, total - visible);
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const wrapRef = useRef(null);

  // Clamp idx if visible count grows
  useEffect(() => {
    if (idx > maxIdx) setIdx(maxIdx);
  }, [maxIdx, idx]);

  useEffect(() => {
    if (paused || total <= visible) return;
    const id = setInterval(() => {
      setIdx(i => (i >= maxIdx ? 0 : i + 1));
    }, 5500);
    return () => clearInterval(id);
  }, [paused, maxIdx, visible, total]);

  const prev = () => setIdx(i => Math.max(0, i - 1));
  const next = () => setIdx(i => Math.min(maxIdx, i + 1));

  // Keyboard nav when carousel in viewport
  useEffect(() => {
    const onKey = (e) => {
      const el = wrapRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const inView = r.top < window.innerHeight * 0.8 && r.bottom > window.innerHeight * 0.2;
      if (!inView) return;
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [idx, maxIdx]);

  // Touch swipe
  const touchX = useRef(null);
  const onTouchStart = (e) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 50) { dx < 0 ? next() : prev(); }
    touchX.current = null;
  };

  // Compute translate: each step is one card width including the gap between cards
  // We use the same flex-basis formula as CSS: card width = (100% - gap*(visible-1)) / visible
  // Translating the track by N cards: -(N * (cardWidth + gap)).
  // Easier: express as percent of the track-wrap width.
  const trackStyle = {
    transform: `translateX(calc(${-idx * 100 / visible}% - ${idx * 24 / visible}px))`,
  };

  const progressPct = total <= visible ? 100 : ((idx + visible) / total) * 100;

  return (
    <div
      className="equipe-carousel"
      aria-label={labels.tag}
      ref={wrapRef}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="equipe-track-wrap"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className="equipe-track" style={trackStyle}>
          {team.map((m, i) => (
            <div className="equipe-card" key={i}>
              <div className="equipe-photo">
                <span className="equipe-photo-num">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <ImgPH label={`foto · ${m.name}`} style={{ width: '100%', height: '100%' }} />
                <div className="equipe-photo-overlay">
                  <div className="equipe-card-name">{m.name}</div>
                  <div className="equipe-card-role">{m.role}</div>
                  <div className="equipe-card-meta">
                    <div className="equipe-card-meta-item">
                      <div className="equipe-card-meta-label">{labels.exp}</div>
                      <div className="equipe-card-meta-val">{m.exp}</div>
                    </div>
                    <div className="equipe-card-meta-item">
                      <div className="equipe-card-meta-label">{labels.spec}</div>
                      <div className="equipe-card-meta-val">{m.spec}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="equipe-controls">
        <div className="equipe-arrows">
          <button className="equipe-arrow" onClick={prev} disabled={idx === 0} aria-label={labels.prev}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className="equipe-arrow" onClick={next} disabled={idx >= maxIdx} aria-label={labels.next}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        <div className="equipe-progress" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow={Math.round(progressPct)} aria-label="Progresso do carrossel">
          <div className="equipe-progress-bar" style={{ width: `${progressPct}%` }}></div>
        </div>
        <div className="equipe-counter">
          <strong>{String(Math.min(total, idx + visible)).padStart(2, '0')}</strong> / {String(total).padStart(2, '0')}
        </div>
      </div>
    </div>
  );
}
