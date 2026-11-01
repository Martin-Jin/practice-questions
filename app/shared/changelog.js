// The app's version and its change log (the five latest changes), shown in the welcome window (src/components/Welcome.jsx).
// Version numbers count pushes to main: 1.00 was the first, so a push that lands after N commits on main is
// `${1 + floor(N / 100)}.${N % 100, two digits}` (the 73rd push is 1.72). Every change a user can see adds an entry at the top,
// sets VERSION to it and drops the oldest, so the window opens on the change log after an update. A new feature also needs
// its place in the tutorial in Welcome.jsx.
export const VERSION = '2.47';

export const CHANGELOG = [
  {
    version: '2.47', date: '2026-11-01', title: 'Button rows stay on one line',
    items: [
      'The Mark as difficult / Solution / Formulas buttons, I got it / Not quite and Previous / Next stay on one line. When there is no room they are cut off at the padding and you scroll them sideways by hand.',
    ],
  },
  {
    version: '2.46', date: '2026-11-01', title: 'Long titles stay inside the screen',
    items: [
      'A long set title or details line no longer pushes past the edge of a phone screen: it is cut off at the page margin and slides along by itself. The same goes for the section name beside Questions in, which is cut off and slides instead of pushing Questions in onto a second line. In a practice session the location line no longer slides by itself: you scroll it by hand.',
    ],
  },
  {
    version: '2.45', date: '2026-11-01', title: 'Text that slides on its own on phones',
    items: [
      'On a touch screen, one-line text that is too long for its space (titles, rows, the location line) now slides along by itself, slowly, with pauses and not all at once, since there is no hover. Drag it with a finger to read at your own pace: touching it pauses the sliding, which carries on a few seconds after you let go. The question page title does this too.',
    ],
  },
  {
    version: '2.44', date: '2026-11-01', title: 'Notes fit phones',
    items: [
      'On a phone, notes are centred, stay within the window and keep to one line that slides along when it is too long. Only three show at once, and the oldest fades out quickly when a newer one arrives.',
    ],
  },
  {
    version: '2.43', date: '2026-11-01', title: 'Compact question rows',
    items: [
      'In a set, each question row keeps its title and its details on one line each and slides sideways when they are too long. The set title and its details line, and tick-box lines on a phone, do the same. Recent sessions on a phone fit four rows like on a desktop. On a phone the rows are shorter: the marks and answer-type chips are left out and Delete is just its icon.',
    ],
  },
];

// Which tab the welcome window opens on, given the version stored the last time it was shown: null (nothing to show) when
// the user has seen this version, the tutorial for someone who has never seen it, the change log after an update.
export function startTab(seen) {
  if (seen === VERSION) return null;
  return seen === null || seen === undefined ? 'tutorial' : 'changelog';
}
