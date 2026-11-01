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
