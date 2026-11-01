// The app's version and its change log (the five latest changes), shown in the welcome window (src/components/Welcome.jsx).
// Version numbers count pushes to main: 1.00 was the first, so a push that lands after N commits on main is
// `${1 + floor(N / 100)}.${N % 100, two digits}` (the 73rd push is 1.72). Every change a user can see adds an entry at the top,
// sets VERSION to it and drops the oldest, so the window opens on the change log after an update. A new feature also needs
// its place in the tutorial in Welcome.jsx.
export const VERSION = '2.63';

export const CHANGELOG = [
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
  {
    version: '2.60', date: '2026-11-02', title: 'Search the keyboard shortcuts',
    items: [
      'The Keyboard shortcuts window has a search box that filters by what a shortcut does or its keys, so typing ctrl z finds Undo.',
    ],
  },
  {
    version: '2.59', date: '2026-11-02', title: 'No keyboard shortcuts entry on a phone',
    items: [
      'The three-dot menu no longer lists Keyboard shortcuts on a phone, where there is no keyboard to use them with.',
    ],
  },
];

// Which tab the welcome window opens on, given the version stored the last time it was shown: null (nothing to show) when
// the user has seen this version, the tutorial for someone who has never seen it, the change log after an update.
export function startTab(seen) {
  if (seen === VERSION) return null;
  return seen === null || seen === undefined ? 'tutorial' : 'changelog';
}
