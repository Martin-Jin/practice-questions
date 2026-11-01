// The app's version and its change log (the five latest changes), shown in the welcome window (src/components/Welcome.jsx).
// Version numbers count pushes to main: 1.00 was the first, so a push that lands after N commits on main is
// `${1 + floor(N / 100)}.${N % 100, two digits}` (the 73rd push is 1.72). Every change a user can see adds an entry at the top,
// sets VERSION to it and drops the oldest, so the window opens on the change log after an update. A new feature also needs
// its place in the tutorial in Welcome.jsx.
export const VERSION = '2.65';

export const CHANGELOG = [
  {
    version: '2.65', date: '2026-11-02', title: 'Edit mode switches itself off',
    items: [
      'Edit mode now turns off when you click or tab to anything other than its own buttons, so Space pauses the timer again instead of toggling it. It stays on when you move to another question.',
    ],
  },
  {
    version: '2.64', date: '2026-11-02', title: 'Type the time in coding questions',
    items: [
      'In a coding run, clicking the question time now lets you type a new one (4:07, or minutes), like in the other quizzes, and the total follows. If the editor cannot load because the app was updated while the page was open, a message now says to reload.',
    ],
  },
  {
    version: '2.63', date: '2026-11-02', title: 'A single question stands alone',
    items: [
      'A question opened on its own no longer shows its position (1 / 12) or offers the arrow keys to move to the other questions in the set.',
    ],
  },
  {
    version: '2.62', date: '2026-11-02', title: 'A single question opens like a session',
    items: [
      'Opening one question from a set now looks like a practice session: no top bar, the timer at the top centre, and a back button beside the path that returns to the set. Leaving it drops its time unless you marked it, and I got it and Not quite start unpressed.',
    ],
  },
  {
    version: '2.61', date: '2026-11-02', title: 'One-line shortcut descriptions',
    items: [
      'Each row in the Keyboard shortcuts window now has a short description on one line. One that is still too long slides along when you hover it, and scrolls by hand on a phone.',
    ],
  },
];

// Which tab the welcome window opens on, given the version stored the last time it was shown: null (nothing to show) when
// the user has seen this version, the tutorial for someone who has never seen it, the change log after an update.
export function startTab(seen) {
  if (seen === VERSION) return null;
  return seen === null || seen === undefined ? 'tutorial' : 'changelog';
}
