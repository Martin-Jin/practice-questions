import { useLayoutEffect } from 'react';

const MARGIN = 14;   // the page's side padding on a phone

// Keeps a popped-up list (a drop-down, a menu) inside the window with the page's side margin: when it would run past an edge, it is
// shifted sideways, away from where it would be, just far enough. `ref` is the list's element, which exists while `active`.
export function useKeepInView(ref, active) {
  useLayoutEffect(() => {
    const el = ref.current;
    if (!active || !el) return undefined;
    const fit = () => {
      el.style.transform = '';
      const r = el.getBoundingClientRect();
      const width = document.documentElement.clientWidth;
      let shift = 0;
      if (r.right > width - MARGIN) shift = width - MARGIN - r.right;
      if (r.left + shift < MARGIN) shift = MARGIN - r.left;
      if (shift) el.style.transform = `translateX(${Math.round(shift)}px)`;
    };
    fit();
    window.addEventListener('resize', fit);
    return () => { window.removeEventListener('resize', fit); el.style.transform = ''; };
  }, [active]);
}
