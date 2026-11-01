import { useEffect } from 'react';

// Slides a one-line box along to its end and back on its own, slowly enough to read, with a pause at each end, while it is wider
// than its room and on screen. Starts at a random moment so a list of rows does not move in step. Touching or scrolling it by hand
// (a finger drag, a wheel) pauses it, and it carries on from where it was left a few seconds after the last touch.
// `pace` is the milliseconds per pixel and `hold` the pause at the ends. Returns the function that stops it.
const TOUCH = ['pointerdown', 'pointerup', 'touchstart', 'touchmove', 'touchend', 'wheel'];
const RESUME = 4000;   // quiet time after the last touch before the sliding carries on

export function startAutoSlide(box, { pace = 26, hold: hold_ = 2000 } = {}) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {};
  let frame = 0; let wait = 0; let stopped = false; let visible = true;
  const watch = typeof IntersectionObserver === 'undefined' ? null : new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
  if (watch) watch.observe(box);
  const halt = () => { cancelAnimationFrame(frame); clearTimeout(wait); };
  const stop = () => { stopped = true; halt(); if (watch) watch.disconnect(); for (const type of TOUCH) box.removeEventListener(type, hold); };
  const glide = (to, done) => {
    const from = box.scrollLeft;
    const ms = Math.max(1200, Math.abs(to - from) * pace);
    const start = performance.now();
    const step = (now) => {
      if (stopped) return;
      const t = Math.min(1, (now - start) / ms);
      box.scrollLeft = from + (to - from) * (t < .5 ? 2 * t * t : 1 - 2 * (1 - t) * (1 - t));
      if (t < 1) frame = requestAnimationFrame(step); else done();
    };
    frame = requestAnimationFrame(step);
  };
  const later = (fn, ms) => { wait = setTimeout(fn, ms); };
  const cycle = () => {
    // checked each round, so a resize or a turn of the phone is picked up
    if (!visible || box.scrollWidth <= box.clientWidth + 1) { later(cycle, 1000); return; }
    glide(box.scrollWidth - box.clientWidth, () => later(() => glide(0, () => later(cycle, hold_)), hold_));
  };
  // a touch or a wheel turn: stop moving by ourselves, and carry on after a quiet spell
  function hold() { if (stopped) return; halt(); later(cycle, RESUME); }
  later(cycle, hold_ + Math.random() * 1500);
  for (const type of TOUCH) box.addEventListener(type, hold, { passive: true });
  return stop;
}

// A one-line box (the location line, a heading) that slides to its end and back on its own when it is longer than its room.
export function useAutoSlide(ref, key, options) {
  useEffect(() => {
    const box = ref.current;
    if (!box) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (box.scrollWidth > box.clientWidth + 1) box.scrollLeft = box.scrollWidth;
      return undefined;
    }
    return startAutoSlide(box, options);
  }, [key]);
}
