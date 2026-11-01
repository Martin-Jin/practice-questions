// The app's version and its change log (the five latest changes), shown in the welcome window (src/components/Welcome.jsx).
// Version numbers count pushes to main: 1.00 was the first, so a push that lands after N commits on main is
// `${1 + floor(N / 100)}.${N % 100, two digits}` (the 73rd push is 1.72). Every change a user can see adds an entry at the top,
// sets VERSION to it and drops the oldest, so the window opens on the change log after an update. A new feature also needs
// its place in the tutorial in Welcome.jsx.
export const VERSION = '2.29';

export const CHANGELOG = [
  {
    version: '2.29', date: '2026-11-01', title: 'Tidier practice panel',
    items: [
      'Practice mode on an imported set is an underlined drop-down like the section picker, and the space under the Practise heading is tighter. See all sessions lines up with the Leave out completed line, and the Questions in this set heading sits close above its sentence.',
    ],
  },
  {
    version: '2.28', date: '2026-11-01', title: 'Recent sessions line up with the practice box',
    items: [
      'The last row in Recent sessions ends level with the bottom of the practice mode box beside it.',
    ],
  },
  {
    version: '2.27', date: '2026-11-01', title: 'Shorter recent session rows',
    items: [
      'The rows in Recent sessions are a little shorter, so four of them fit beside the practice options.',
    ],
  },
  {
    version: '2.26', date: '2026-11-01', title: 'Remove a recent session from its row',
    items: [
      'Hovering over a row in Recent sessions shows a × at its right that abandons or deletes that session (after a confirmation, and Undo brings it back), so you no longer need to open See all.',
    ],
  },
  {
    version: '2.25', date: '2026-11-01', title: 'Current question number readable when difficult',
    items: [
      'In the question number strip, the current question keeps its light text when it is also marked as difficult.',
    ],
  },
];

// Which tab the welcome window opens on, given the version stored the last time it was shown: null (nothing to show) when
// the user has seen this version, the tutorial for someone who has never seen it, the change log after an update.
export function startTab(seen) {
  if (seen === VERSION) return null;
  return seen === null || seen === undefined ? 'tutorial' : 'changelog';
}
