import { useEffect } from 'react';

// When a one-line box (the location line, a heading) is longer than its room, it slides to its end and back on its own (and stays put once touched).
export function useAutoSlide(ref, key) {
  useEffect(() => {
    const box = ref.current;
    if (!box || box.scrollWidth <= box.clientWidth + 1) return undefined;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) { box.scrollLeft = box.scrollWidth; return undefined; }
    let frame = 0; let wait = 0; let stopped = false;
    const stop = () => { stopped = true; cancelAnimationFrame(frame); clearTimeout(wait); };
    const glide = (to, done) => {
      const from = box.scrollLeft;
      const ms = Math.max(900, Math.abs(to - from) * 14);
      const start = performance.now();
      const step = (now) => {
        if (stopped) return;
        const t = Math.min(1, (now - start) / ms);
        box.scrollLeft = from + (to - from) * (t < .5 ? 2 * t * t : 1 - 2 * (1 - t) * (1 - t));
        if (t < 1) frame = requestAnimationFrame(step); else done();
      };
      frame = requestAnimationFrame(step);
    };
    const cycle = () => { wait = setTimeout(() => glide(box.scrollWidth - box.clientWidth, () => { wait = setTimeout(() => glide(0, cycle), 1500); }), 1500); };
    cycle();
    for (const type of ['pointerdown', 'wheel', 'touchstart']) box.addEventListener(type, stop, { once: true, passive: true });
    return stop;
  }, [key]);
}
