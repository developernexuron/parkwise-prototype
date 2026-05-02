import { useLayoutEffect, useRef, useState } from 'react';

/** UXPilot frames use max-w ~375px and h ~812px — scale down to fit desktop viewport */
export const DESIGN_WIDTH = 375;
export const DESIGN_HEIGHT = 812;

export function useViewportScale(designW = DESIGN_WIDTH, designH = DESIGN_HEIGHT) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const update = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      if (w < 8 || h < 8) return;
      const s = Math.min(w / designW, h / designH);
      setScale(Number.isFinite(s) && s > 0 ? s : 1);
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener('resize', update);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', update);
    };
  }, [designW, designH]);

  return { viewportRef, scale };
}
