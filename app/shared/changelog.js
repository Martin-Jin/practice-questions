// The app's version and its change log (the five latest changes), shown in the welcome window (src/components/Welcome.jsx).
// Version numbers count pushes to main: 1.00 was the first, so a push that lands after N commits on main is
// `${1 + floor(N / 100)}.${N % 100, two digits}` (the 73rd push is 1.72). Every change a user can see adds an entry at the top,
// sets VERSION to it and drops the oldest, so the window opens on the change log after an update. A new feature also needs
// its place in the tutorial in Welcome.jsx.
export const VERSION = '2.45';

export const CHANGELOG = [
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
  {
    version: '2.42', date: '2026-11-01', title: 'Smoother on phones',
    items: [
      'The dashboard picture is lighter on phones and touch screens (fewer symbols, about 30 frames a second, and it pauses when scrolled out of view), so it no longer lags. The folder heading on the question sets page stays on one line and slides when too long, with its Practise and Select buttons showing only icons on a phone. The search button has no border on a phone.',
    ],
  },
  {
    version: '2.41', date: '2026-11-01', title: 'Better on phones',
    items: [
      'The location line stays on one line and, when it is too long for the window, slides to its end and back by itself (touch it to stop). The floating timer says Question instead of This question, so it takes two lines, and is a little smaller on phones. The formula sheet covers the whole screen on a phone, closed with its x.',
    ],
  },
];

// Which tab the welcome window opens on, given the version stored the last time it was shown: null (nothing to show) when
// the user has seen this version, the tutorial for someone who has never seen it, the change log after an update.
export function startTab(seen) {
  if (seen === VERSION) return null;
  return seen === null || seen === undefined ? 'tutorial' : 'changelog';
}
