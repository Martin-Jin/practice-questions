// Focus mode: a setting (kept in localStorage, off by default) that asks for full screen when a session starts and reminds the
// user to stay on the question if they leave it. The prompts are in components/FocusMode.jsx.
import { useSyncExternalStore } from 'react';

const KEY = 'focusMode';
const listeners = new Set();

export function focusModeOn() {
  try { return localStorage.getItem(KEY) === 'true'; } catch { return false; }
}

export function setFocusMode(on) {
  try { localStorage.setItem(KEY, String(on)); } catch { /* storage blocked */ }
  listeners.forEach((f) => f());
}

const subscribe = (fn) => { listeners.add(fn); return () => listeners.delete(fn); };
export const useFocusMode = () => useSyncExternalStore(subscribe, focusModeOn);

// The session a route belongs to, or null away from a question: #/run/<id>/<n> and #/practice/<id>/<uid>, not the summary.
export function sessionOfHash(hash) {
  const [view, id, extra] = hash.replace(/^#\/?/, '').split('/').filter(Boolean);
  if (!id || extra === 'summary') return null;
  if (view === 'run') return id;
  if (view === 'practice' && extra) return id;
  return null;
}

// Esc leaves full screen, and some browsers also pass the key to the page, where it would close the run and so hide the
// reminder. This tells the Esc handlers that the key belonged to full screen: it is down while full screen is on, or was a
// moment ago.
let escAt = -Infinity;
try {
  document.addEventListener('fullscreenchange', () => { if (!document.fullscreenElement) escAt = performance.now(); });
  window.addEventListener('keydown', (e) => { if (e.key === 'Escape' && document.fullscreenElement) escAt = performance.now(); }, true);
} catch { /* no window: tests */ }
export const escWasForFullscreen = () => performance.now() - escAt < 500;

// Full screen from the page (the Fullscreen API) or from the browser's own F11, which the API does not report.
export function isFullScreen() {
  if (document.fullscreenElement) return true;
  if (window.matchMedia('(display-mode: fullscreen)').matches) return true;
  return window.innerHeight >= screen.height - 1 && window.innerWidth >= screen.width - 1;
}
