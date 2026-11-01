// The app's version and its change log (the five latest changes), shown in the welcome window (src/components/Welcome.jsx).
// Version numbers count pushes to main: 1.00 was the first, so a push that lands after N commits on main is
// `${1 + floor(N / 100)}.${N % 100, two digits}` (the 73rd push is 1.72). Every change a user can see adds an entry at the top,
// sets VERSION to it and drops the oldest, so the window opens on the change log after an update. A new feature also needs
// its place in the tutorial in Welcome.jsx.
export const VERSION = '2.25';

export const CHANGELOG = [
  {
    version: '2.25', date: '2026-11-01', title: 'Current question number readable when difficult',
    items: [
      'In the question number strip, the current question keeps its light text when it is also marked as difficult.',
    ],
  },
  {
    version: '2.24', date: '2026-11-01', title: 'Search and thin rows in past sessions',
    items: [
      'The Past sessions window of a set has the History search box and the thin run rows. Recent sessions beside the practice options shows as many sessions as fit, and See all is a plain link-style button.',
      'The run lists on a set page and a folder page use the thin rows too.',
    ],
  },
  {
    version: '2.20', date: '2026-10-31', title: 'Click a run row to open it',
    items: [
      'On the dashboard and in History the whole run row is a link into the run (or its results when finished), so the Resume button is gone. The progress is one slim bar with done / total across it, so the rows are shorter.',
    ],
  },
  {
    version: '2.19', date: '2026-10-31', title: 'Smaller Resume button in run rows',
    items: [
      'In the thin run rows (dashboard and History) the Resume and Results buttons are small outlined pills instead of solid red blocks.',
    ],
  },
  {
    version: '2.18', date: '2026-10-31', title: 'Thin run rows on the dashboard',
    items: [
      'The runs on the dashboard use the same thin rows as History, so more of them fit on screen, with a smaller Resume button. On a phone they take two short lines. When a row is too narrow for its name and set, the text is cut off and slides along while you hover over the row.',
    ],
  },
];

// Which tab the welcome window opens on, given the version stored the last time it was shown: null (nothing to show) when
// the user has seen this version, the tutorial for someone who has never seen it, the change log after an update.
export function startTab(seen) {
  if (seen === VERSION) return null;
  return seen === null || seen === undefined ? 'tutorial' : 'changelog';
}
