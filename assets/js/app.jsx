import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { STENIOS_TRANSLATIONS as T } from './config/translations.jsx';
import { STENIOS_TESTIMONIALS as DEPOS } from './data/testimonials.jsx';
import { FadeSection } from './hooks/animations.jsx';
import { FlagIcon, ImgPH } from './components/media.jsx';

// ─── MAIN APP ────────────────────────────────────────────────────────────────

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [lang, setLang] = useState('pt');
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [addressCopied, setAddressCopied] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const touchStartX = useRef(null);
  const t = T[lang] || T.pt;
  const gold = '#C9A646';
  const mapsUrl = 'https://maps.app.goo.gl/hxRZvFqLEvqU2MAn8';
  const appleMapsUrl = 'https://maps.apple.com/?q=Av.%20Manoel%20Alves%20de%20Moraes%2C%20540%20-%20Balneario%20Guaruj%C3%A1%2C%20Guaruj%C3%A1%20-%20SP%2C%2011441-090';
  const mapEmbedUrl = 'https://www.google.com/maps?q=Av.%20Manoel%20Alves%20de%20Moraes%2C%20540%20-%20Balneario%20Guaruj%C3%A1%2C%20Guaruj%C3%A1%20-%20SP%2C%2011441-090&output=embed';

  useEffect(() => {
    const handler = () => {
      const scrollTop = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(scrollTop > 40);
      setScrollProgress(maxScroll > 0 ? Math.min((scrollTop / maxScroll) * 100, 100) : 0);
    };
    handler();
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);
  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
    return () => document.body.classList.remove('menu-open');
  }, [menuOpen]);
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const services = [
    { icon: '✂', name: t.s1, desc: t.s1d },
    { icon: '🪒', name: t.s2, desc: t.s2d },
    { icon: '⚡', name: t.s3, desc: t.s3d },
    { icon: '◈', name: t.s4, desc: t.s4d },
    { icon: '✦', name: t.s5, desc: t.s5d },
    { icon: '◉', name: t.s6, desc: t.s6d },
    { icon: '◐', name: t.s7, desc: t.s7d },
    { icon: '◟', name: t.s8, desc: t.s8d },
  ];

  const galItems = [
    { label: 'Cabelo, barba e sobrancelha', cls: 'gal-item gal-item-1', src: 'assets/images/gallery-hair-beard-eyebrow.png', webp: 'assets/images/gallery-hair-beard-eyebrow.webp' },
    { label: 'Stenio e corte infantil', cls: 'gal-item gal-item-2', src: 'assets/images/gallery-stenio-kids.png', webp: 'assets/images/gallery-stenio-kids.webp' },
    { label: 'Corte masculino', cls: 'gal-item gal-item-3', src: 'assets/images/gallery-mens-haircut-profile.png', webp: 'assets/images/gallery-mens-haircut-profile.webp' },
    { label: 'Cabelo masculino', cls: 'gal-item gal-item-4', src: 'assets/images/gallery-curly-fade.png', webp: 'assets/images/gallery-curly-fade.webp' },
    { label: 'Corte masculino', cls: 'gal-item gal-item-5', src: 'assets/images/gallery-premium-haircut.png', webp: 'assets/images/gallery-premium-haircut.webp' },
    { label: 'Cabelo infantil', cls: 'gal-item gal-item-6', src: 'assets/images/gallery-kids-haircut.png', webp: 'assets/images/gallery-kids-haircut.webp' },
    { label: 'Corte infantil', cls: 'gal-item gal-item-7', src: 'assets/images/gallery-child-haircut.png', webp: 'assets/images/gallery-child-haircut.webp' },
  ];

  const deposDuplicated = [...DEPOS, ...DEPOS];
  const selectedImage = selectedImageIndex !== null ? galItems[selectedImageIndex] : null;
  const showPrevImage = (event) => {
    event.stopPropagation();
    setSelectedImageIndex((selectedImageIndex - 1 + galItems.length) % galItems.length);
  };
  const showNextImage = (event) => {
    event.stopPropagation();
    setSelectedImageIndex((selectedImageIndex + 1) % galItems.length);
  };
  const handleModalTouchStart = (event) => {
    touchStartX.current = event.touches[0].clientX;
  };
  const handleModalTouchEnd = (event) => {
    if (touchStartX.current === null) return;
    const deltaX = touchStartX.current - event.changedTouches[0].clientX;
    if (Math.abs(deltaX) > 50) {
      deltaX > 0 ? showNextImage(event) : showPrevImage(event);
    }
    touchStartX.current = null;
  };
  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(t.uni_end_v);
      setAddressCopied(true);
      window.setTimeout(() => setAddressCopied(false), 1800);
    } catch {
      setAddressCopied(false);
    }
  };
  const unitIcons = {
    address: (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M12 21s7-5.2 7-11.2A7 7 0 0 0 5 9.8C5 15.8 12 21 12 21Z" />
        <circle cx="12" cy="9.8" r="2.4" />
      </svg>
    ),
    phone: (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M6.6 5.2 8.8 4a1.4 1.4 0 0 1 1.9.6l1 2a1.5 1.5 0 0 1-.3 1.7l-1 1.1a11 11 0 0 0 4.2 4.2l1.1-1a1.5 1.5 0 0 1 1.7-.3l2 1a1.4 1.4 0 0 1 .6 1.9l-1.2 2.2c-.4.8-1.3 1.2-2.2 1A15.3 15.3 0 0 1 5.2 7.4c-.2-.9.2-1.8 1.4-2.2Z" />
      </svg>
    ),
    hours: (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <circle cx="12" cy="12" r="7.5" />
        <path d="M12 7.8v4.5l3.2 1.9" />
      </svg>
    ),
  };
  const navTargets = ['#hero', '#sobre', '#servicos', '#clube'];
  const handleNavClick = () => setMenuOpen(false);
  const nowInBrasilia = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }));
  const currentDay = nowInBrasilia.getDay();
  const currentMinutes = nowInBrasilia.getHours() * 60 + nowInBrasilia.getMinutes();
  const isOpenNow = currentDay >= 2 && currentDay <= 6 && currentMinutes >= 540 && currentMinutes < 1200;
  const statusText = isOpenNow ? t.cta_open : t.cta_closed;

  return (
    <>
      {/* NAV */}
      <div className="scroll-progress" style={{ transform: `scaleX(${scrollProgress / 100})` }} aria-hidden="true"></div>
      <header className="site-header">
        <nav className={scrolled ? 'scrolled' : ''} aria-label="Navegação principal">
        <div className="nav-inner">
          <a className="nav-logo" href="#hero" aria-label="Voltar para o início">
            <img className="nav-logo-icon" src="assets/images/logo-icon-hero.png" alt="" aria-hidden="true" />
            <span className="nav-logo-wordmark">
              <strong>Stenio's</strong>
              <span>Barbearia</span>
            </span>
          </a>
          <ul className="nav-links">
            {(t.nav || []).map((item, i) => (
              <li key={i}>
                {i === 3
                  ? <a href="#clube" className="nav-clube">{item}</a>
                  : <a href={navTargets[i]}>{item}</a>
                }
              </li>
            ))}
          </ul>
          <div className="nav-right">
            <label className="sr-only" htmlFor="language-select">Selecionar idioma</label>
            <div className="lang-select-wrap">
              <FlagIcon code={lang === 'pt' ? 'BR' : lang === 'en' ? 'US' : 'ES'} />
              <select
                id="language-select"
                className="lang-select"
                value={lang}
                onChange={e => setLang(e.target.value)}
              >
                <option value="pt">BR PT</option>
                <option value="en">US EN</option>
                <option value="es">ES ES</option>
              </select>
            </div>
          </div>
          <button
            className={`menu-toggle ${menuOpen ? 'is-open' : ''}`}
            type="button"
            aria-label={menuOpen ? t.menu_close : t.menu_open}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
        </nav>
      </header>
      <button
        className={`menu-overlay ${menuOpen ? 'is-open' : ''}`}
        type="button"
        aria-label={t.menu_close}
        onClick={() => setMenuOpen(false)}
      ></button>
      <aside id="mobile-menu" className={`mobile-drawer ${menuOpen ? 'is-open' : ''}`} aria-label={t.menu_label} aria-hidden={!menuOpen}>
        <div className="mobile-drawer-inner">
          <div className="mobile-drawer-head">
            <span>{t.menu_label}</span>
          </div>
          <nav className="mobile-drawer-nav" aria-label={t.menu_label}>
            {(t.nav || []).map((item, i) => (
              <a
                key={i}
                href={navTargets[i]}
                className={i === 3 ? 'mobile-clube-link' : ''}
                onClick={handleNavClick}
              >
                {item}
              </a>
            ))}
          </nav>
          <div className="mobile-drawer-footer">
            <label className="sr-only" htmlFor="mobile-language-select">Selecionar idioma</label>
            <div className="lang-select-wrap">
              <FlagIcon code={lang === 'pt' ? 'BR' : lang === 'en' ? 'US' : 'ES'} />
              <select
                id="mobile-language-select"
                className="lang-select"
                value={lang}
                onChange={e => setLang(e.target.value)}
              >
                <option value="pt">BR PT</option>
                <option value="en">US EN</option>
                <option value="es">ES ES</option>
              </select>
            </div>
          </div>
        </div>
      </aside>

      <main id="conteudo">
      {/* HERO */}
      <section id="hero">
        <div className="hero-bg">
          <div className="hero-bg-lines"></div>
          <div className="hero-bg-radial"></div>
        </div>
        <div className="hero-photo">
          <ImgPH
            type="video"
            src="assets/images/hero-video-1280.mp4"
            sources={[{ src: 'assets/images/hero-video-1280.webm', type: 'video/webm' }]}
            label="Vídeo institucional da Stenio's Barbearia"
          />
        </div>
        <div className="hero-content">
          <FadeSection>
            <div className="hero-eyebrow">
              <div className="hero-eyebrow-line"></div>
              <span style={{ color: gold }}>{t.hero_eyebrow}</span>
            </div>
          </FadeSection>
          <FadeSection delay={100}>
            <div className="hero-badge">
              <div className="hero-badge-inner">
                <img src="assets/images/logo-icon-hero.png" alt="Stenio's Barbearia" />
              </div>
            </div>
          </FadeSection>
          <FadeSection delay={200}>
            <h1 className="hero-h1">
              {t.hero_h1_a}<br />
              <em>{t.hero_h1_b}</em>
            </h1>
          </FadeSection>
          <FadeSection delay={300}>
            <p className="hero-sub">{t.hero_sub}</p>
          </FadeSection>
          <FadeSection delay={400}>
            <div className="hero-ctas">
              <a
                href="https://wa.me/5513991999025"
                className="btn-gold"
              >
                <svg width="18" height="18" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true" focusable="false">
                  <path d="M16 2C8.268 2 2 8.268 2 16c0 2.462.635 4.775 1.748 6.786L2 30l7.43-1.724A13.94 13.94 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm-3.14 7.46c-.213 0-.56.08-.854.4-.293.32-1.12 1.093-1.12 2.666 0 1.573 1.147 3.094 1.307 3.307.16.213 2.24 3.547 5.48 4.827 2.24.867 3.04.747 3.587.64.547-.107 1.76-.72 2.013-1.413.254-.693.254-1.293.18-1.413-.08-.12-.293-.187-.614-.347-.32-.16-1.893-.933-2.186-1.04-.294-.106-.507-.16-.72.16-.213.32-.827.947-.987 1.16-.16.213-.32.24-.614.08-.293-.16-1.24-.453-2.36-1.453-.867-.773-1.453-1.733-1.626-2.026-.174-.293-.014-.454.12-.6.12-.133.293-.346.44-.52.146-.173.173-.293.266-.493.093-.2.04-.373-.027-.52-.066-.147-.693-1.707-.96-2.334-.253-.6-.507-.52-.72-.52l-.614-.013z"/>
                </svg>
                {t.hero_cta}
              </a>
              <a href="#servicos" className="btn-outline">
                {t.hero_cta2}
              </a>
            </div>
          </FadeSection>
          <FadeSection delay={500}>
            <div className="hero-stats">
              <div>
                <div className="hero-stat-num">{t.stat1}</div>
                <div className="hero-stat-label">{t.stat1l}</div>
              </div>
              <div>
                <div className="hero-stat-num">{t.stat2}</div>
                <div className="hero-stat-label">{t.stat2l}</div>
              </div>
              <div>
                <div className="hero-stat-num">{t.stat3}</div>
                <div className="hero-stat-label">{t.stat3l}</div>
              </div>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* SOBRE */}
      <section id="sobre">
        <div className="container">
          <div className="sobre-grid">
            <FadeSection>
              <div className="sobre-img">
                <ImgPH
                  src="assets/images/about-shop.jpeg"
                  sources={[{ srcSet: 'assets/images/about-shop.webp', type: 'image/webp' }]}
                  label="Ambiente interno da Stenio's Barbearia"
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
            </FadeSection>
            <FadeSection delay={200} className="sobre-content">
              <span className="desde-badge" style={{ color: gold }}>Desde 2019</span>
              <span className="section-label" style={{ color: gold }}>{t.sobre_tag}</span>
              <h2 dangerouslySetInnerHTML={{ __html: t.sobre_h.replace(/(arte|art)/, '<em class="gold-grad-text" style="font-style:italic">$1</em>') }}></h2>
              <p>{t.sobre_p1}</p>
              {t.sobre_p2 && <p>{t.sobre_p2}</p>}
              <div className="sobre-pillars">
                {[
                  [t.p_exp, t.p_exp_d],
                  [t.p_att, t.p_att_d],
                  [t.p_amb, t.p_amb_d],
                  [t.p_prod, t.p_prod_d],
                ].map(([title, desc], i) => (
                  <div className="sobre-pillar" key={i}>
                    <div className="sobre-pillar-title" style={{ color: gold }}>{title}</div>
                    <p>{desc}</p>
                  </div>
                ))}
              </div>
              <a href="https://wa.me/5513991999025" className="btn-gold">
                {t.hero_cta}
              </a>
            </FadeSection>
          </div>
        </div>
      </section>

      {/* SERVIÇOS */}
      <section id="servicos">
        <div className="container">
          <FadeSection className="servicos-head">
            <span className="section-label" style={{ color: gold }}>{t.servicos_tag}</span>
            <h2>{t.servicos_h}</h2>
            <div className="gold-rule" style={{ marginTop: 16, marginBottom: 0 }}>
              <span style={{ color: gold }}>— — —</span>
            </div>
          </FadeSection>
        </div>
        <div className="container" style={{ padding: '0 40px', maxWidth: 1200, margin: '0 auto' }}>
          <FadeSection>
            <div className="services-grid">
              {services.map((s, i) => (
                <div className="service-card" key={i}>
                  <div className="service-shine"></div>
                  <div className="service-icon">{s.icon}</div>
                  <div className="service-name">{s.name}</div>
                  <p className="service-desc">{s.desc}</p>

                </div>
              ))}
            </div>
          </FadeSection>
        </div>
      </section>

      {/* CLUBE */}
      <section id="clube">
          <div className="container">
            <div className="clube-inner">
              <FadeSection className="clube-badge-container">
                <div className="clube-badge" style={{ borderColor: `rgba(201,166,70,0.3)` }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.25em', color: 'var(--white-dim)', marginBottom: 2 }}>PLANO</div>
                  <div className="clube-badge-name" style={{ color: 'var(--white)', fontSize: 20, letterSpacing: '0.08em' }}>BASIC</div>
                  <div className="clube-badge-sub" style={{ marginBottom: 16 }}>Ter — Qui · Ilimitado</div>
                  <div style={{ width: '60%', height: 1, background: 'rgba(201,166,70,0.25)' }}></div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.25em', color: 'var(--white-dim)', marginTop: 16, marginBottom: 2 }}>PLANO</div>
                  <div className="clube-badge-name" style={{ fontSize: 20, letterSpacing: '0.08em' }}>PRIME</div>
                  <div className="clube-badge-sub">Qualquer dia · Ilimitado</div>
                </div>
              </FadeSection>
              <FadeSection delay={200} className="clube-content">
                <span className="section-label" style={{ color: gold }}>{t.clube_tag}</span>
                <h2>{t.clube_h}</h2>
                <p>{t.clube_p}</p>
                <ul className="clube-benefits">
                  {[t.clube_b1, t.clube_b2, t.clube_b3, t.clube_b4, t.clube_b5, t.clube_b6].map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
                <a href="https://wa.me/5513991999025" className="btn-gold">
                  {t.clube_cta}
                </a>
              </FadeSection>
            </div>
          </div>
      </section>

      {/* DEPOIMENTOS */}
      <section id="depoimentos">
        <div className="container">
          <FadeSection className="depoimentos-head">
            <span className="section-label" style={{ color: gold }}>{t.dep_tag}</span>
            <h2>{t.dep_h}</h2>
          </FadeSection>
        </div>
        <div className="depo-track-fade">
          <div className="depoimentos-track">
            <div className="depoimentos-row">
              {deposDuplicated.map((d, i) => (
                <div className="depo-card" key={i}>
                  <div className="depo-stars">
                    {[1,2,3,4,5].map(s => <span className="depo-star" key={s} style={{ color: gold }}>★</span>)}
                  </div>
                  <div className="depo-quote">{d.q}</div>
                  <div className="depo-author">
                    <div className="depo-avatar" style={{ color: gold }}>{d.init}</div>
                    <div>
                      <div className="depo-name">{d.name}</div>
                      <div className="depo-meta">{d.meta}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GALERIA */}
      <section id="galeria">
          <div className="container">
            <FadeSection className="galeria-head">
              <span className="section-label" style={{ color: gold }}>{t.gal_tag}</span>
              <h2>{t.gal_h}</h2>
            </FadeSection>
          </div>
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 40px' }}>
            <FadeSection>
              <div className="galeria-mosaic">
                {galItems.map((g, i) => (
                  <button className={g.cls} key={i} type="button" onClick={() => setSelectedImageIndex(i)}>
                    <ImgPH src={g.src} sources={[{ srcSet: g.webp, type: 'image/webp' }]} label={g.label} style={{ width: '100%', height: '100%' }} />
                    <div className="gal-overlay">
                      <span style={{ color: gold, borderColor: gold }}>Ver foto</span>
                    </div>
                  </button>
                ))}
              </div>
            </FadeSection>
          </div>
      </section>

      {/* UNIDADES */}
      <section id="unidades">
        <div className="container">
          <FadeSection className="unidades-head">
            <span className="section-label" style={{ color: gold }}>{t.uni_tag}</span>
            <h2>{t.uni_h}</h2>
          </FadeSection>
          <FadeSection>
            <div className="unidade-card">
              <div className="unidade-map">
                <iframe className="unidade-map-inner" src={mapEmbedUrl} title="Mapa da localização da Stenio's Barbearia" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen></iframe>
              </div>
              <div className="unidade-info">
                <span className="unidade-tag" style={{ color: gold, borderColor: `rgba(201,166,70,0.3)` }}>{t.uni_badge}</span>
                <div className="unidade-name">{t.uni_name}</div>
                <div className="unidade-details">
                  {[
                    { icon: unitIcons.address, label: t.uni_end, value: t.uni_end_v },
                    { icon: unitIcons.phone, label: t.uni_tel, value: t.uni_tel_v },
                    { icon: unitIcons.hours, label: t.uni_hr, value: t.uni_hr_v },
                  ].map((d, i) => (
                    <div className="unidade-detail" key={i}>
                      <div className="unidade-detail-icon" style={{ borderColor: `rgba(201,166,70,0.2)`, color: gold }}>{d.icon}</div>
                      <div className="unidade-detail-text">
                        <strong>{d.label}</strong>
                        {d.label === t.uni_end
                          ? (
                            <button className="copy-address-btn" type="button" onClick={copyAddress}>
                              <span>{d.value}</span>
                              <span className="copy-address-icon" data-tooltip={addressCopied ? 'Copiado!' : 'Copiar'}>
                                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                                  <path d="M8 8V5.5A1.5 1.5 0 0 1 9.5 4h8A1.5 1.5 0 0 1 19 5.5v8A1.5 1.5 0 0 1 17.5 15H15" />
                                  <path d="M5 9h8a1.5 1.5 0 0 1 1.5 1.5v8A1.5 1.5 0 0 1 13 20H5a1.5 1.5 0 0 1-1.5-1.5v-8A1.5 1.5 0 0 1 5 9Z" />
                                </svg>
                              </span>
                            </button>
                          )
                          : <span>{d.value}</span>
                        }
                      </div>
                    </div>
                  ))}
                </div>
                <div className="map-buttons">
                  <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="btn-outline">
                    Abrir no Google
                  </a>
                  <a href={appleMapsUrl} target="_blank" rel="noopener noreferrer" className="btn-outline">
                    Abrir no Apple Maps
                  </a>
                </div>
                <a href="https://wa.me/5513991999025" className="btn-gold" style={{ background: gold, color: '#0a0a0a', marginTop: 8 }}>
                  {t.hero_cta}
                </a>
              </div>
            </div>
          </FadeSection>
        </div>
      </section>

      <div className="mobile-cta-bar" aria-hidden="false">
        <div className="mobile-cta-status">
          <span className={`status-dot ${isOpenNow ? '' : 'closed'}`}></span>
          <span>{statusText}</span>
        </div>
        <a href="https://wa.me/5513991999025" className="mobile-cta-btn" aria-label={t.hero_cta}>
          WhatsApp
        </a>
      </div>

      </main>

      {selectedImage && (
        <div className="photo-modal" role="dialog" aria-modal="true" aria-label={selectedImage.label} onClick={() => setSelectedImageIndex(null)} onTouchStart={handleModalTouchStart} onTouchEnd={handleModalTouchEnd}>
          <button className="photo-modal-close" type="button" aria-label="Fechar foto ampliada" onClick={() => setSelectedImageIndex(null)}>×</button>
          <button className="photo-modal-nav photo-modal-prev" type="button" aria-label="Ver foto anterior" onClick={showPrevImage}>‹</button>
          <figure className="photo-modal-content" onClick={e => e.stopPropagation()}>
            <img src={selectedImage.src} alt={selectedImage.label} />
            <figcaption>{selectedImage.label} · {selectedImageIndex + 1}/{galItems.length}</figcaption>
          </figure>
          <button className="photo-modal-nav photo-modal-next" type="button" aria-label="Ver próxima foto" onClick={showNextImage}>›</button>
        </div>
      )}

      {/* FOOTER */}
      <footer>
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="footer-logo-badge">
                <img src="assets/images/logo-round-footer.png" alt="Stenio's Barbearia" />
              </div>
            </div>
            <p className="footer-desc">{t.footer_desc}</p>
            <div className="footer-socials">
              <a className="footer-social" href="https://www.instagram.com/barbeariastenios/" target="_blank" rel="noopener noreferrer" aria-label="Instagram da Stenio's Barbearia">
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm0 2A3.8 3.8 0 0 0 4 7.8v8.4A3.8 3.8 0 0 0 7.8 20h8.4a3.8 3.8 0 0 0 3.8-3.8V7.8A3.8 3.8 0 0 0 16.2 4H7.8Zm8.7 2.3a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
                </svg>
              </a>
              <a className="footer-social" href="https://wa.me/5513991999025" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp da Stenio's Barbearia">
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d="M12.04 2a9.86 9.86 0 0 0-8.5 14.86L2.2 22l5.28-1.3A9.93 9.93 0 1 0 12.04 2Zm0 2a7.92 7.92 0 1 1-3.95 14.78l-.35-.2-2.72.67.7-2.63-.23-.38A7.86 7.86 0 0 1 12.04 4Zm-3.1 3.98c-.17 0-.44.06-.68.32-.24.26-.9.88-.9 2.15 0 1.27.92 2.5 1.05 2.67.13.17 1.8 2.86 4.4 3.88 1.8.7 2.44.6 2.88.52.44-.09 1.42-.58 1.62-1.14.2-.56.2-1.04.15-1.14-.06-.1-.24-.15-.5-.28-.25-.13-1.52-.75-1.76-.84-.24-.08-.4-.13-.58.13-.17.26-.66.76-.79.93-.13.17-.26.2-.5.06-.24-.13-1-.36-1.9-1.17-.7-.62-1.17-1.4-1.31-1.63-.14-.24 0-.36.1-.48.1-.1.24-.28.35-.42.12-.14.14-.24.22-.4.07-.16.03-.3-.02-.42-.05-.12-.56-1.37-.77-1.87-.2-.48-.4-.42-.58-.42h-.5Z" />
                </svg>
              </a>
            </div>
          </div>
          <div className="footer-col">
            <h4>{t.footer_links}</h4>
            <ul>
              {(t.nav || []).map((n, i) => (
                <li key={i}><a href={['#hero','#sobre','#servicos','#clube'][i]}>{n}</a></li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <h4>{t.footer_serv}</h4>
            <ul>
              {[t.s1, t.s2, t.s3, t.s4].map((s, i) => (
                <li key={i}><a href="#servicos">{s}</a></li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <h4>{t.footer_cont}</h4>
            <ul>
              <li><a href="tel:+5513991999025">{t.uni_tel_v}</a></li>
              <li><a href="https://wa.me/5513991999025">WhatsApp</a></li>
              <li><a href="https://www.instagram.com/barbeariastenios/" target="_blank" rel="noopener noreferrer">Instagram</a></li>
              <li><a href={mapsUrl} target="_blank" rel="noopener noreferrer">{t.uni_end_v}</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span className="footer-copy">{t.copy}</span>
        </div>
      </footer>
    </>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);






