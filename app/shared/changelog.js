// The app's version and its change log (the five latest changes), shown in the welcome window (src/components/Welcome.jsx).
// Version numbers count pushes to main: 1.00 was the first, so a push that lands after N commits on main is
// `${1 + floor(N / 100)}.${N % 100, two digits}` (the 73rd push is 1.72). Every change a user can see adds an entry at the top,
// sets VERSION to it and drops the oldest, so the window opens on the change log after an update. A new feature also needs
// its place in the tutorial in Welcome.jsx.
export const VERSION = '2.39';

export const CHANGELOG = [
  {
    version: '2.39', date: '2026-11-01', title: 'Timers show what a click does',
    items: [
      'Hovering over a timer overlays an icon on its time: a pen on This question (click to type the time) and pause or play on the Total.',
    ],
  },
  {
    version: '2.38', date: '2026-11-01', title: 'Paused-timer reminder',
    items: [
      'While the timers are paused, a note every 5 minutes asks whether you forgot to unpause or are still there. Its Resume button carries on. In a practice session, notes now show at the top left, level with the timer.',
    ],
  },
  {
    version: '2.37', date: '2026-11-01', title: 'Enlarged figures open at 75%',
    items: [
      'Opening a question, solution or other figure in the large viewer starts at 75% instead of 100%, which was too big. + and the wheel still zoom in, and 0 or the percentage button returns to 75%.',
    ],
  },
  {
    version: '2.36', date: '2026-11-01', title: 'Sharp when zoomed in',
    items: [
      'Zooming into a question, a solution or a formula sheet PDF redraws it at the new size a moment after you stop, so it stays sharp instead of going blurry.',
    ],
  },
  {
    version: '2.35', date: '2026-11-01', title: 'Longer, darker undo note',
    items: [
      'The Undo note stays for five seconds instead of one, and follows the light or dark theme. Opening the list of every question (All 5) dims and blurs the page behind it, like the command palette.',
    ],
  },
];

// Which tab the welcome window opens on, given the version stored the last time it was shown: null (nothing to show) when
// the user has seen this version, the tutorial for someone who has never seen it, the change log after an update.
export function startTab(seen) {
  if (seen === VERSION) return null;
  return seen === null || seen === undefined ? 'tutorial' : 'changelog';
}
