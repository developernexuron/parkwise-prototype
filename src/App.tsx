import { HashRouter, Navigate, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { useCallback, useEffect } from 'react';
import { SCREEN_FLOW, SLUG_SET, titleForSlug } from './screens';
import { DESIGN_HEIGHT, DESIGN_WIDTH, useViewportScale } from './useViewportScale';
import './App.css';

function ScreenView() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const safeSlug = slug && SLUG_SET.has(slug) ? slug : 'splash';

  useEffect(() => {
    if (slug && !SLUG_SET.has(slug)) {
      navigate('/screen/splash', { replace: true });
    }
  }, [slug, navigate]);

  const ix = SCREEN_FLOW.findIndex((s) => s.slug === safeSlug);
  const prevSlug = ix > 0 ? SCREEN_FLOW[ix - 1].slug : null;
  const nextSlug = ix < SCREEN_FLOW.length - 1 ? SCREEN_FLOW[ix + 1].slug : null;

  const goPrev = useCallback(() => {
    if (prevSlug) navigate('/screen/' + prevSlug);
  }, [navigate, prevSlug]);

  const goNext = useCallback(() => {
    if (nextSlug) navigate('/screen/' + nextSlug);
  }, [navigate, nextSlug]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goPrev, goNext]);

  const src = `${import.meta.env.BASE_URL}screens/${safeSlug}.html`;
  const { viewportRef, scale } = useViewportScale(DESIGN_WIDTH, DESIGN_HEIGHT);

  return (
    <div className="pw-root">
      <header className="pw-chrome" role="navigation" aria-label="Prototype navigation">
        <div className="pw-chrome-inner">
          <span className="pw-brand">ParkWise prototype</span>
          <button type="button" className="pw-btn" onClick={goPrev} disabled={!prevSlug} title="Previous (←)">
            ← Prev
          </button>
          <select
            className="pw-select"
            value={safeSlug}
            onChange={(e) => navigate('/screen/' + e.target.value)}
            aria-label="Jump to screen"
          >
            {SCREEN_FLOW.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.title}
              </option>
            ))}
          </select>
          <button type="button" className="pw-btn" onClick={goNext} disabled={!nextSlug} title="Next (→)">
            Next →
          </button>
        </div>
        <div className="pw-subbar">
          <span className="pw-hint">
            {titleForSlug(safeSlug)} · tap frame buttons or Prev/Next · ← →
          </span>
        </div>
      </header>
      <main ref={viewportRef} className="pw-main">
        <div
          className="pw-scale-clip"
          style={{
            width: DESIGN_WIDTH * scale,
            height: DESIGN_HEIGHT * scale,
          }}
        >
          <iframe
            title={titleForSlug(safeSlug)}
            src={src}
            className="pw-frame"
            width={DESIGN_WIDTH}
            height={DESIGN_HEIGHT}
            style={{
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
            }}
          />
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/screen/splash" replace />} />
        <Route path="/screen/:slug" element={<ScreenView />} />
        <Route path="*" element={<Navigate to="/screen/splash" replace />} />
      </Routes>
    </HashRouter>
  );
}
