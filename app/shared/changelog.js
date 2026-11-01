// The app's version and its change log (the five latest changes), shown in the welcome window (src/components/Welcome.jsx).
// Version numbers count pushes to main: 1.00 was the first, so a push that lands after N commits on main is
// `${1 + floor(N / 100)}.${N % 100, two digits}` (the 73rd push is 1.72). Every change a user can see adds an entry at the top,
// sets VERSION to it and drops the oldest, so the window opens on the change log after an update. A new feature also needs
// its place in the tutorial in Welcome.jsx.
export const VERSION = '2.53';

export const CHANGELOG = [
  {
    version: '2.53', date: '2026-11-02', title: 'Settings fills a phone screen',
    items: [
      'On a phone, Settings opens full screen like the tutorial. The editor and practice options, which were squashed out of sight in a scrolling dialog, show again.',
    ],
  },
  {
    version: '2.52', date: '2026-11-02', title: 'Focus mode sees F11, and formula sheets take focus',
    items: [
      'Focus mode now notices when you leave full screen with F11, not only Esc, and Esc in a coding run only leaves full screen instead of closing the run. The formula sheet panel takes keyboard focus when it opens, so you can scroll it without clicking first.',
    ],
  },
  {
    version: '2.51', date: '2026-11-02', title: 'The tutorial fits a phone',
    items: [
      'On a phone the tutorial opens full screen. Its contents list is one column with one line per item (a long item slides along by itself), and nothing is cut off at the edge any more.',
    ],
  },
  {
    version: '2.50', date: '2026-11-02', title: 'Space pauses the timer, and a focus mode',
    items: [
      'Press Space to pause or resume the timers (not while typing, in the editor or on a focused button). Settings > Practice > Focus mode asks for full screen when a session starts, and shows a reminder to get back to the question if you leave full screen before the session ends.',
    ],
  },
  {
    version: '2.49', date: '2026-11-01', title: 'Drop-downs stay inside the page',
    items: [
      'Drop-down lists and menus that would run past the edge of a phone screen are shifted sideways to keep the page margin, instead of being cut off.',
    ],
  },
];

// Which tab the welcome window opens on, given the version stored the last time it was shown: null (nothing to show) when
// the user has seen this version, the tutorial for someone who has never seen it, the change log after an update.
export function startTab(seen) {
  if (seen === VERSION) return null;
  return seen === null || seen === undefined ? 'tutorial' : 'changelog';
}
