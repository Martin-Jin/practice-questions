import { test } from 'node:test';
import assert from 'node:assert/strict';
import { state } from '../src/lib/store.js';
import { check, setSelfMark, openClock, addTime, resetClock, setClockTime, getClock, clockDone, runTotal } from '../src/lib/practice.js';
import { undoLast } from '../src/lib/undo.js';
import { connect } from '../src/lib/toast.js';

connect(() => {});
const question = { uid: 'q', parts: [{ label: 'a', type: 'self' }] };
const run = { id: 'r1', clocks: {} };

test('time counts until the question is marked, then the mark writes one point and freezes the clock', () => {
  state.libRuns.r1 = run;
  openClock('s', 'q', 'r1', 'q');
  assert.equal(addTime('s', 'q', 'r1', 'q', 4000), true);
  assert.equal(setSelfMark('s', 'q', question, 'a', 'right', 'r1', 'q'), 'right');
  assert.equal(clockDone('s', 'q', 'r1', 'q'), true);
  assert.equal(addTime('s', 'q', 'r1', 'q', 1000), false);
  const times = state.libProgress['s/q'].times;
  assert.deepEqual(times.map((t) => [t.ms, t.result, t.runId]), [[4000, 'right', 'r1']]);
  assert.equal(runTotal(run), 4000);
});

test('marking the other way changes the result of the same point; pressing the same mark again removes it and the clock runs again', () => {
  setSelfMark('s', 'q', question, 'a', 'wrong', 'r1', 'q');
  assert.deepEqual(state.libProgress['s/q'].times.map((t) => [t.ms, t.result]), [[4000, 'wrong']]);
  setSelfMark('s', 'q', question, 'a', 'wrong', 'r1', 'q');   // pressing the same button again takes the mark back
  assert.equal(state.libProgress['s/q'].times.length, 0);
  assert.equal(addTime('s', 'q', 'r1', 'q', 1000), true);
  assert.equal(getClock('s', 'q', 'r1', 'q').ms, 5000);
});

test('reset zeroes the question and takes it off the total; undo brings the time back', async () => {
  resetClock('s', 'q', 'r1', 'q');
  assert.equal(getClock('s', 'q', 'r1', 'q').ms, 0);
  assert.equal(runTotal(run), 0);
  await undoLast();
  assert.equal(getClock('s', 'q', 'r1', 'q').ms, 5000);
});

test('a new session gives the same question a fresh clock and a second data point', () => {
  state.libRuns.r2 = { id: 'r2', clocks: {} };
  openClock('s', 'q', 'r2', 'q');
  addTime('s', 'q', 'r2', 'q', 7000);
  setSelfMark('s', 'q', question, 'a', 'right', 'r2', 'q');
  assert.equal(setSelfMark('s', 'q', question, 'a', 'right', 'r1', 'q'), 'right');   // earlier session's mark is its own
  const times = state.libProgress['s/q'].times;
  assert.deepEqual(times.map((t) => [t.ms, t.runId]), [[7000, 'r2'], [5000, 'r1']]);
});

test('outside a session the question keeps one clock on its record', () => {
  const q = { uid: 'n', title: 'n', parts: [{ label: 'a', type: 'numeric', answer: 2 }] };
  openClock('s', 'n');
  addTime('s', 'n', null, 'n', 3000);
  state.libProgress['s/n'].answers = { a: '2' };
  check('s', 'n', q, { run: null, ref: 'n' });
  assert.deepEqual(state.libProgress['s/n'].times.map((t) => [t.ms, t.result, t.runId]), [[3000, 'right', null]]);
});

test('typing a time sets the running clock, the session total follows, and it can be undone', async () => {
  state.libRuns.r2 = { id: 'r2', clocks: {} };
  openClock('s', 't', 'r2', 't');
  addTime('s', 't', 'r2', 't', 2000);
  assert.equal(setClockTime('s', 't', 'r2', 't', 90000), true);
  assert.equal(getClock('s', 't', 'r2', 't').ms, 90000);
  assert.equal(runTotal(state.libRuns.r2), 90000);
  await undoLast();
  assert.equal(getClock('s', 't', 'r2', 't').ms, 2000);
});

test('the time of a marked question can be typed too, and its data point follows', async () => {
  state.libRuns.r3 = { id: 'r3', clocks: {} };
  openClock('s', 'u', 'r3', 'u');
  addTime('s', 'u', 'r3', 'u', 4000);
  setSelfMark('s', 'u', question, 'a', 'right', 'r3', 'u');
  assert.equal(setClockTime('s', 'u', 'r3', 'u', 60000), true);
  assert.equal(getClock('s', 'u', 'r3', 'u').ms, 60000);
  assert.equal(state.libProgress['s/u'].times[0].ms, 60000);
  assert.equal(clockDone('s', 'u', 'r3', 'u'), true);
  await undoLast();
  assert.equal(state.libProgress['s/u'].times[0].ms, 4000);
  assert.equal(getClock('s', 'u', 'r3', 'u').ms, 4000);
});
