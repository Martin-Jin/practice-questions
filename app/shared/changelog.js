// The app's version and its change log (the five latest changes), shown in the welcome window (src/components/Welcome.jsx).
// Version numbers count pushes to main: 1.00 was the first, so a push that lands after N commits on main is
// `${1 + floor(N / 100)}.${N % 100, two digits}` (the 73rd push is 1.72). Every change a user can see adds an entry at the top,
// sets VERSION to it and drops the oldest, so the window opens on the change log after an update. A new feature also needs
// its place in the tutorial in Welcome.jsx.
export const VERSION = '2.60';

export const CHANGELOG = [
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
  {
    version: '2.58', date: '2026-11-02', title: 'Search is Ctrl+Alt+O',
    items: [
      'The browser kept Ctrl+O for its own open-file box, so search is now Ctrl+Alt+O (still changeable in Settings). If you changed the search shortcut yourself, nothing changes for you.',
    ],
  },
  {
    version: '2.57', date: '2026-11-02', title: 'Copy any question, solution or formula image',
    items: [
      'Hover a question image, a solution page or a formula sheet and press the new copy button beside the magnifying glass to copy just the picture shown (the page on screen for a PDF) to the clipboard. The larger viewer has one too.',
    ],
  },
  {
    version: '2.56', date: '2026-11-02', title: 'Re-upload a set, new search and palette keys',
    items: [
      'The pencil menu on a question set has Re-upload the PDF (or the folder): pick the changed file and the set updates in place, keeping your answers and progress for the questions still there. Search is now Ctrl+O and the command palette Ctrl+P (both can be changed in Settings), and the palette has a Search command. A tick-box line that is too long scrolls sideways by hand.',
    ],
  },
];

// Which tab the welcome window opens on, given the version stored the last time it was shown: null (nothing to show) when
// the user has seen this version, the tutorial for someone who has never seen it, the change log after an update.
export function startTab(seen) {
  if (seen === VERSION) return null;
  return seen === null || seen === undefined ? 'tutorial' : 'changelog';
}
