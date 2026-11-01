import { useEffect, useReducer, useRef, useState } from 'react';
import { openClock, getClock, clockDone, addTime, resetClock, setClockTime, runTotal } from '../lib/practice.js';
import { isPaused, togglePause, enterContext, onPauseChange, pageActive } from '../lib/timer.js';
import { formatDuration, parseDuration } from '../../shared/timing.js';
import Icon from './Icon.jsx';
import { toast } from '../lib/toast.js';

// The timer note: time on this question and, in a practice session, the session's total. It counts while the question is open
// and the window is showing and focused, stops when the question is marked (the time is saved with that attempt), and clicking
// the total pauses every timer, and where the source can `set` the time, clicking this question's time types a new one (4:07, or minutes). Imported sets show it as a standing note at the bottom right (at the top centre during a practice session, which has no top bar), where the
// formula sheets cover it; the coding run shows it inline in its top bar (`inline`).
//
// While the timers stay paused, a note every 5 minutes asks whether the user forgot to carry on (it waits for the tab to be showing).
//
// `identity` names the question (the clocks restart when it changes) and `pauseKey` the session or context the pause belongs
// to. `source` supplies the data: open(), read() -> { ms, done }, add(ms) -> whether the time counted, set(ms) (optional) -> whether it was changed, reset(), and
// total() -> ms or null; `frozen` stops counting (a finished session being reviewed).
const REMIND_MS = 5 * 60 * 1000;

export default function Timer({ identity, pauseKey, source, frozen = false, inline = false, top = false }) {
  const [, redraw] = useReducer((n) => n + 1, 0);
  const latest = useRef(source);
  latest.current = source;
  const [typing, setTyping] = useState(null);
  useEffect(() => setTyping(null), [identity]);

  useEffect(() => {
    enterContext(pauseKey);
    if (isPaused(pauseKey)) togglePause(pauseKey);
    latest.current.open();
    redraw();
    return onPauseChange(redraw);
  }, [identity, pauseKey]);

  useEffect(() => {
    let last = performance.now();
    const id = setInterval(() => {
      const t = performance.now();
      const dt = t - last;
      last = t;
      if (frozen || isPaused(pauseKey) || !pageActive() || dt > 1500) return;
      if (latest.current.add(dt)) redraw();
    }, 250);
    return () => clearInterval(id);
  }, [identity, pauseKey, frozen]);

  const pausedNow = isPaused(pauseKey);
  useEffect(() => {
    if (!pausedNow || frozen) return undefined;
    const id = setInterval(() => {
      if (document.visibilityState !== 'visible' || !isPaused(pauseKey)) return;
      toast('The timer is paused. Did you forget to unpause it, or are you still there?', 'info', { action: 'Resume', ms: 12000, onClick: () => { if (isPaused(pauseKey)) togglePause(pauseKey); } });
    }, REMIND_MS);
    return () => clearInterval(id);
  }, [pausedNow, pauseKey, frozen]);

  const { ms, done } = source.read();
  const total = source.total();
  const paused = isPaused(pauseKey);
  const state = done ? 'check' : paused ? 'pause' : null;
  const canSet = !!source.set;
  const commit = () => {
    const value = parseDuration(typing);
    if (value !== null && value !== ms) latest.current.set(value);
    setTyping(null);
    redraw();
  };
  const hint = done ? 'Marked: this time is saved. Click to pause every timer.' : paused ? 'Paused. Click to carry on.' : 'Click to pause every timer.';

  return (
    <div className={`timer${inline ? ' inline' : ''}${top ? ' top' : ''}${paused ? ' paused' : ''}${done ? ' done' : ''}`} role="group" aria-label="Timers">
      {state && <span className="timer-state" title={done ? 'Marked' : 'Paused'}><Icon name={state} /></span>}
      {typing !== null ? (
        <label className="timer-read">
          <span className="timer-label">This question</span>
          <input className="timer-edit" autoFocus value={typing} aria-label="Time on this question, like 4:07" onChange={(e) => setTyping(e.target.value)} onFocus={(e) => e.target.select()}
            onBlur={commit} onKeyDown={(e) => { e.stopPropagation(); if (e.key === 'Enter') commit(); else if (e.key === 'Escape') setTyping(null); }} />
        </label>
      ) : canSet ? (
        <button type="button" className="timer-read" title={done ? 'Marked: this time is saved.' : 'Click to set the time, like 4:07.'} disabled={done} onClick={() => setTyping(formatDuration(ms))}>
          <span className="timer-label">This question</span>
          <span className="timer-time" role="timer">{formatDuration(ms)}</span>
          {!done && <span className="timer-hover" aria-hidden="true"><Icon name="pencil" /></span>}
        </button>
      ) : (
        <button type="button" className="timer-read" aria-pressed={paused} title={hint} onClick={() => togglePause(pauseKey)}>
          <span className="timer-label">This question</span>
          <span className="timer-time" role="timer">{formatDuration(ms)}</span>
          <span className="timer-hover" aria-hidden="true"><Icon name={paused ? 'play' : 'pause'} /></span>
        </button>
      )}
      {total === null && canSet && (
        <button type="button" className="timer-reset" aria-pressed={paused} title={hint} aria-label={paused ? 'Carry on' : 'Pause every timer'} onClick={() => togglePause(pauseKey)}><Icon name={paused ? 'play' : 'pause'} /></button>
      )}
      {total !== null && (
        <button type="button" className="timer-read" aria-pressed={paused} title={hint} onClick={() => togglePause(pauseKey)}>
          <span className="timer-label">Total</span>
          <span className="timer-time" role="timer">{formatDuration(total)}</span>
          <span className="timer-hover" aria-hidden="true"><Icon name={paused ? 'play' : 'pause'} /></span>
        </button>
      )}
      <button type="button" className="timer-reset" disabled={ms === 0 && !done} title="Reset this question's timer (it comes off the total)" aria-label="Reset this question's timer"
        onClick={() => source.reset()}><Icon name="refresh" /></button>
    </div>
  );
}

// The timer of an imported-set question. `uid` is the question's id here (in a session, its id in the session);
// `recordSetId`/`recordUid` name its progress record.
export function QuestionTimer({ recordSetId, recordUid, uid, run, top = false }) {
  const runId = run ? run.id : null;
  const source = {
    open: () => openClock(recordSetId, recordUid, runId, uid),
    read: () => { const clock = getClock(recordSetId, recordUid, runId, uid); return { ms: clock ? clock.ms : 0, done: clockDone(recordSetId, recordUid, runId, uid) }; },
    add: (ms) => addTime(recordSetId, recordUid, runId, uid, ms),
    set: (ms) => setClockTime(recordSetId, recordUid, runId, uid, ms),
    reset: () => resetClock(recordSetId, recordUid, runId, uid),
    total: () => (run ? runTotal(run) : null),
  };
  return <Timer identity={`${recordSetId}/${recordUid}/${runId}/${uid}`} pauseKey={runId || 'solo'} source={source} frozen={!!(run && run.completedAt)} top={top} />;
}
