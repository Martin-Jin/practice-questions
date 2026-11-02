// The app's version and its change log (the five latest changes), shown in the welcome window (src/components/Welcome.jsx).
// Version numbers count pushes to main: 1.00 was the first, so a push that lands after N commits on main is
// `${1 + floor(N / 100)}.${N % 100, two digits}` (the 73rd push is 1.72). Every change a user can see adds an entry at the top,
// sets VERSION to it and drops the oldest, so the window opens on the change log after an update. A new feature also needs
// its place in the tutorial in Welcome.jsx.
export const VERSION = '2.67';

export const CHANGELOG = [
  {
    version: '2.67', date: '2026-11-02', title: 'Shorter set tiles',
    items: [
      'On the Question sets tab, the course and counts of a set now share one line instead of two, and the line slides along when the tile is too narrow to show all of it.',
    ],
  },
  {
    version: '2.66', date: '2026-11-02', title: 'The pause reminder asks once',
    items: [
      'After you answer No to "Did you forget to unpause it?", the pop-up stays away until you carry on and pause again. Before, it came back every 5 minutes for as long as the timer stayed paused.',
    ],
  },
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
];

// Which tab the welcome window opens on, given the version stored the last time it was shown: null (nothing to show) when
// the user has seen this version, the tutorial for someone who has never seen it, the change log after an update.
export function startTab(seen) {
  if (seen === VERSION) return null;
  return seen === null || seen === undefined ? 'tutorial' : 'changelog';
}
