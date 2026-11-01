// The app's version and its change log (the five latest changes), shown in the welcome window (src/components/Welcome.jsx).
// Version numbers count pushes to main: 1.00 was the first, so a push that lands after N commits on main is
// `${1 + floor(N / 100)}.${N % 100, two digits}` (the 73rd push is 1.72). Every change a user can see adds an entry at the top,
// sets VERSION to it and drops the oldest, so the window opens on the change log after an update. A new feature also needs
// its place in the tutorial in Welcome.jsx.
export const VERSION = '2.33';

export const CHANGELOG = [
  {
    version: '2.33', date: '2026-11-01', title: 'Formula sheet fills the screen',
    items: [
      'In a practice session the formula sheet runs the full height of the window, with no gap above it. Click on it and the left and right arrow keys turn its pages without switching question; click outside it and they switch question again.',
    ],
  },
  {
    version: '2.30', date: '2026-11-01', title: 'Recent sessions in a box',
    items: [
      'Recent sessions sit inside a white box as tall as the practice options beside it, so the page looks the same with one session or many. Finished sessions leave the box a day after they were completed (they stay in See all and History), and the box is hidden when none are left, when the practice options take the full width they had before.',
    ],
  },
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
];

// Which tab the welcome window opens on, given the version stored the last time it was shown: null (nothing to show) when
// the user has seen this version, the tutorial for someone who has never seen it, the change log after an update.
export function startTab(seen) {
  if (seen === VERSION) return null;
  return seen === null || seen === undefined ? 'tutorial' : 'changelog';
}
